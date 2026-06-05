package db

import "database/sql"

func Migrate(database *sql.DB) error {
	// Step 1: create all tables that don't yet exist.
	_, err := database.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id         BIGSERIAL PRIMARY KEY,
			email      TEXT UNIQUE NOT NULL,
			password   TEXT NOT NULL,
			first_name TEXT NOT NULL DEFAULT '',
			last_name  TEXT NOT NULL DEFAULT '',
			role       TEXT NOT NULL DEFAULT 'operator',
			created_at TIMESTAMPTZ DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS devices (
			id          BIGSERIAL PRIMARY KEY,
			ip_address  TEXT NOT NULL,
			hostname    TEXT NOT NULL,
			mac_address TEXT NOT NULL DEFAULT '',
			status      TEXT NOT NULL DEFAULT 'online',
			created_at  TIMESTAMPTZ DEFAULT NOW(),
			updated_at  TIMESTAMPTZ DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS alerts (
			id             BIGSERIAL PRIMARY KEY,
			title          TEXT NOT NULL,
			description    TEXT NOT NULL,
			source_ip      TEXT NOT NULL,
			destination_ip TEXT NOT NULL,
			severity       TEXT NOT NULL,
			category       TEXT NOT NULL,
			status         TEXT NOT NULL DEFAULT 'active',
			packets_count  INT  NOT NULL DEFAULT 0,
			created_at     TIMESTAMPTZ DEFAULT NOW(),
			updated_at     TIMESTAMPTZ DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS discovery_jobs (
			id          BIGSERIAL PRIMARY KEY,
			status      TEXT NOT NULL DEFAULT 'running',
			start_ip    TEXT NOT NULL DEFAULT '',
			end_ip      TEXT NOT NULL DEFAULT '',
			cidr        TEXT,
			community   TEXT NOT NULL DEFAULT 'public',
			alive_count INT  NOT NULL DEFAULT 0,
			snmp_count  INT  NOT NULL DEFAULT 0,
			created_at  TIMESTAMPTZ DEFAULT NOW(),
			updated_at  TIMESTAMPTZ DEFAULT NOW()
		);
	`)
	if err != nil {
		return err
	}

	// Step 2: idempotently add columns that may not exist on older schemas.
	alterStmts := []string{
		`ALTER TABLE devices ADD COLUMN IF NOT EXISTS snmp_enabled       BOOLEAN     NOT NULL DEFAULT FALSE`,
		`ALTER TABLE devices ADD COLUMN IF NOT EXISTS system_name        TEXT        NOT NULL DEFAULT ''`,
		`ALTER TABLE devices ADD COLUMN IF NOT EXISTS system_description TEXT        NOT NULL DEFAULT ''`,
		`ALTER TABLE devices ADD COLUMN IF NOT EXISTS last_seen          TIMESTAMPTZ`,
	}
	for _, stmt := range alterStmts {
		if _, err := database.Exec(stmt); err != nil {
			return err
		}
	}
	return nil
}
