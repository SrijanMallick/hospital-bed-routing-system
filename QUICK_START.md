# ⚡ Quick Start Guide

## 🎯 Get Running in 2 Minutes

### Windows Users

1. **Open TWO PowerShell/Command Prompt windows**

2. **Window 1 - Backend:**
   ```cmd
   cd backend
   npm install
   npm start
   ```
   Wait for: `✅ Server running on http://localhost:3001`

3. **Window 2 - Frontend:**
   ```cmd
   cd frontend
   npm install
   npm run dev
   ```
   Wait for: `➜  Local:   http://localhost:3000/`

4. **Open Browser:** http://localhost:3000

### Mac/Linux Users

1. **Terminal 1 - Backend:**
   ```bash
   cd backend && npm install && npm start
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend && npm install && npm run dev
   ```

3. **Open Browser:** http://localhost:3000

---

## 🎮 Quick Demo Flow (30 seconds)

1. Click **"Begin Triage"**
2. Answer questions (use these for a CRITICAL patient):
   - Conscious: **No**
   - Severe bleeding: **Yes**
   - Breathing: **Severe**
   - Other questions: Answer as you like
3. Click through to see **hospital recommendations**
4. Click **"Admin"** in header to see bed management

---

## 📁 What You Just Built

```
Hospital Bed Routing System
├── Backend (Node.js + Express)
│   ├── Triage Logic (severity scoring)
│   ├── Routing Engine (hospital matching)
│   └── Mock Data (15 hospitals)
│
└── Frontend (React + TypeScript)
    ├── Triage Form (7 questions)
    ├── Results Screen (recommendations)
    └── Admin Panel (bed management)
```

---

## 🎯 Test Scenarios

### Scenario 1: Critical Patient
- Set patient as **unconscious** or **severe bleeding**
- Should recommend **ICU beds**
- Should show **CRITICAL** severity

### Scenario 2: Stable Patient
- Answer all questions with **normal/none**
- Should recommend **general ward**
- Should show **STABLE** severity

### Scenario 3: No Capacity
1. Go to **Admin** panel
2. Set all **ICU beds to 0**
3. Submit a **critical** patient
4. Should show **"No Confirmed Capacity"** warning

---

## 🔧 Troubleshooting

### "Port already in use"
- Backend: Change port in `backend/server.js` (line 7)
- Frontend: Change port in `frontend/vite.config.ts` (line 6)

### "Cannot find module"
- Run `npm install` in both `backend` and `frontend` folders

### "API not responding"
- Make sure backend is running first
- Check `http://localhost:3001/health` shows `{"status":"OK"}`

---

## 📚 Documentation

- **README.md** - Full project documentation
- **SETUP.md** - Detailed setup instructions
- **DEMO_SCRIPT.md** - Presentation guide
- **PROJECT_OVERVIEW.md** - Technical deep dive
- **VISUAL_GUIDE.md** - UI/UX reference

---

## 🎓 Key Features

✅ **Patient Triage** - 7 non-clinical questions  
✅ **Severity Scoring** - CRITICAL/URGENT/STABLE classification  
✅ **Smart Routing** - Distance + Availability + Load  
✅ **Fallback Options** - 2 alternative hospitals  
✅ **Admin Panel** - Real-time bed management  
✅ **Responsive Design** - Works on mobile & desktop  

---

## 🚀 Next Steps

1. **Explore the code** - Clean, modular, well-commented
2. **Customize hospitals** - Edit `backend/data/hospitals.json`
3. **Modify triage logic** - See `backend/services/triageLogic.js`
4. **Adjust UI** - Tailwind CSS in `frontend/src/index.css`

---

**Built for demo purposes. Production requires authentication, database, and real-time updates.**

🎉 **You're all set! Start exploring the system.**

