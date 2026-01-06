# Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Install Dependencies

**Option A: Using PowerShell (Windows)**
```powershell
# Install backend
cd backend
npm install

# Install frontend
cd ..\frontend
npm install
cd ..
```

**Option B: Using Bash (Mac/Linux)**
```bash
# Install backend
cd backend && npm install

# Install frontend
cd ../frontend && npm install
cd ..
```

### Step 2: Start the Application

You need **TWO terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

Wait until you see:
```
🏥 Hospital Triage Backend Server
✅ Server running on http://localhost:3001
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev
```

Wait until you see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### Step 3: Open Browser

Navigate to: **http://localhost:3000**

## ✅ Verification Checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 3000
- [ ] Can see the home page with "Quick Patient Triage & Hospital Routing"
- [ ] Click "Begin Triage" to test the flow
- [ ] Navigate to "Admin" to see bed management panel

## 🎯 Quick Demo Flow

### For Ambulance Driver/Caregiver:
1. Click "Begin Triage" on home page
2. Answer 7 questions about patient condition
3. See severity classification and hospital recommendations
4. Get travel time and directions

### For Hospital Admin:
1. Click "Admin" in header
2. View system-wide bed availability
3. Click "Edit" on any bed count
4. Update availability and click "Save"
5. See updated capacity in real-time

## 🐛 Troubleshooting

### Port Already in Use
If port 3001 or 3000 is already in use:

**Backend (change port 3001):**
Edit `backend/server.js`:
```javascript
const PORT = 3002; // Change to any free port
```

**Frontend (change port 3000):**
Edit `frontend/vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to any free port
}
```

### Backend Not Connecting
Make sure you're running the backend first, then the frontend.

### Module Not Found Errors
Run `npm install` again in the respective directory.

### API Errors
Check that both servers are running and the frontend can reach `http://localhost:3001/api`

## 📱 Testing Scenarios

### Scenario 1: Critical Patient (ICU Needed)
- Is conscious: **No**
- Has severe bleeding: **Yes**
- Result: Should classify as CRITICAL and recommend ICU beds

### Scenario 2: Urgent Patient (Oxygen Bed Needed)
- Breathing difficulty: **Severe**
- Chest pain: **Yes**
- Result: Should classify as URGENT and recommend oxygen beds

### Scenario 3: Stable Patient (General Ward)
- All symptoms: Normal/None
- Result: Should classify as STABLE and recommend general ward

### Scenario 4: Test Bed Availability
1. Go to Admin panel
2. Set all ICU beds to 0 for all hospitals
3. Submit a CRITICAL patient triage
4. Should show "No Confirmed Capacity" warning

## 📊 Demo Data

The system includes 15 mock government hospitals:
- Government General Hospital (Central Delhi)
- AIIMS Trauma Center (South Delhi)
- GTB Hospital (East Delhi)
- And 12 more...

Each has realistic bed counts and locations across Delhi.

## 🎓 For Presentation/Interview

**Key talking points:**
1. **Problem:** Coordination failure, not bed scarcity
2. **Solution:** Decision support, not diagnosis
3. **Impact:** Reduces ambulance rejection rates
4. **Human-in-loop:** Final decision always with medical staff
5. **Scalability:** Mock data → Can integrate with real HIS systems

**Architecture highlights:**
- Clean separation: Triage logic / Routing logic / UI
- Type-safe with TypeScript
- RESTful API design
- Responsive, accessible UI
- Real-world constraints considered

---

Ready to demo! 🎉

