import { motion } from 'framer-motion'
import {
  Database,
  Activity,
  Shield,
  Clock,
  CheckCircle,
  LogIn,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

interface Stat {
  label: string
  value: string | number
  subtitle: string
  icon: string
}

interface UserTopStatsProps {
  stats: Stat[]
}

export default function UserTopStats({ stats }: UserTopStatsProps) {
  const iconMap = {
    database: Database,
    activity: Activity,
    shield: Shield,
    clock: Clock,
    check: CheckCircle,
    login: LogIn,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
    >
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] || Database
        const isNumeric = typeof stat.value === 'number'

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-xl p-5 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(7,16,34,0.8) 0%, rgba(3,16,40,0.6) 100%)',
              boxShadow: '0 0 20px rgba(0,255,195,0.05), inset 0 0 20px rgba(22,224,181,0.02)',
            }}
            whileHover={{ y: -2 }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at top right, rgba(0,255,195,0.1) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{stat.label}</p>
                <Icon className="w-5 h-5 text-cyan-400/50" />
              </div>

              <p className="text-2xl font-bold text-white">{stat.value}</p>

              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
