# 🎉 Lopam AI - Database Access Management Platform

Professional, enterprise-grade DAM platform with organized frontend and backend folders.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend (App)** | https://dam-six-lake.vercel.app |
| **Backend (API)** | https://lopam-dam-backend.onrender.com |

> ⏱️ The backend runs on a free tier and may take ~30–50 seconds to wake up on the first request after being idle.

### 🔑 Login

```
Email:    admin@lopam.ai
Password: Admin@123456
```

Open the app → **"Get Started" → "Admin Portal"** → log in with the credentials above → view the dashboard at `/dashboard/admin/enterprise`.

---

## 🚀 Local Development

### **Start Everything** (Recommended)

```bash
cd lopam-ai
bash start-dev.sh
```

This automatically starts both frontend and backend.

### **Start Separately**

**Terminal 1:**
```bash
bash start-backend.sh
```

**Terminal 2:**
```bash
bash start-frontend.sh
```

### **Stop All**

```bash
bash stop.sh
```

---

## 📁 Project Structure

```
lopam-ai/
├── frontend/          ← Next.js 14 React App
├── backend/           ← Express.js Server
├── database/          ← Database schemas
├── start-dev.sh       ← Start both servers
├── start-backend.sh   ← Backend only
├── start-frontend.sh  ← Frontend only
├── stop.sh            ← Stop servers
└── [documentation]
```

---

## 📚 Docs

- **PROJECT_STRUCTURE.md** - Complete setup guide
- **ENTERPRISE_DASHBOARD_SUMMARY.md** - Dashboard overview

---

## ✨ Included

✅ 13 dashboard widgets
✅ Professional dark theme
✅ Complete authentication
✅ Real sample data
✅ Enterprise design
