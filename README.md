# Hospital Bed Routing System

A web-based prototype for a **Centralized Patient Triage & Hospital Bed Routing System** designed for government hospitals in India. This system helps ambulance drivers, caregivers, and healthcare workers quickly assess patient severity and find available hospital beds.

## 🚨 IMPORTANT DISCLAIMER

**THIS IS A GITHUB DEMONSTRATION PROJECT ONLY**

⚠️ **DO NOT USE THIS SYSTEM FOR ACTUAL MEDICAL EMERGENCIES OR DECISIONS**

This is a portfolio/educational project with mock data. It is NOT connected to real hospitals and should NOT be used for actual patient care. Always call emergency services (108 in India) for real medical emergencies.

---

## 🎯 What This System Does

This is **NOT** a diagnostic tool. It's a decision-support layer that:

- Quickly assesses patient severity using non-clinical questions
- Matches severity with near real-time hospital bed availability
- Recommends the best hospital + ward, with fallbacks
- Preserves human override for final decisions

**The core problem solved:** Coordination failure, not medical scarcity.

## 🏗️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Node.js (Express)
- **Data:** Mock JSON data (no database required)
- **Maps/Distance:** Haversine formula for distance calculation

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone or download this repository**

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

### Running the Application

You'll need to run both the backend and frontend servers.

#### Terminal 1: Start Backend Server

```bash
cd backend
npm start
```

Backend will run on `http://localhost:3001`

#### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
- **Main Application:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin-panel-2024 (hidden URL for administrators)

## 📁 Project Structure

```
.
├── backend/
│   ├── data/
│   │   └── hospitals.json          # Mock hospital and bed data
│   ├── services/
│   │   ├── triageLogic.js          # Patient severity assessment logic
│   │   └── routingLogic.js         # Hospital recommendation engine
│   ├── server.js                   # Express API server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.tsx             # Landing page
    │   │   ├── TriageFlow.tsx       # Triage workflow orchestrator
    │   │   ├── TriageForm.tsx       # Patient assessment form
    │   │   ├── ResultsScreen.tsx    # Hospital recommendations display
    │   │   └── AdminPanel.tsx       # Bed management interface
    │   ├── services/
    │   │   └── api.ts               # API client
    │   ├── types/
    │   │   └── index.ts             # TypeScript type definitions
    │   ├── App.tsx                  # Main app component
    │   ├── main.tsx                 # React entry point
    │   └── index.css                # Tailwind CSS styles
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.js
    └── package.json
```

## 🔧 Core Features

### 1. Patient Triage Flow

- **7 non-clinical questions** covering:
  - Consciousness level
  - Severe bleeding
  - Breathing difficulty
  - Chest pain
  - High fever
  - Severe trauma
  - Age group

- **Severity Classification:**
  - Critical (ICU required)
  - Urgent (Oxygen bed required)
  - Stable (General ward)

- **Confidence Scoring:**
  - Flags low-confidence cases
  - Detects conflicting signals
  - Recommends human review when needed

### 2. Hospital & Bed Data

- **15 mock government hospitals** across Delhi
- Each hospital has:
  - ICU beds
  - Oxygen beds
  - General beds
  - Location coordinates
  - Last updated timestamp

### 3. Routing & Recommendation Engine

**Ranking factors:**
- Ward availability (must have required bed type)
- Distance from patient location
- Travel time estimation
- Current hospital load

**Output:**
- Top recommended hospital
- 2 fallback options
- Clear "no capacity" warning if needed
- Alternative ward suggestions when applicable

### 4. Results Screen

Displays:
- Severity classification with confidence level
- Recommended hospital with travel time
- Fallback options
- Warning for low-confidence assessments
- Google Maps directions link
- Important disclaimers

### 5. Admin Panel

Allows hospital staff to:
- Update bed availability in real-time
- View system-wide capacity statistics
- Monitor hospital load distribution
- Identify critical capacity alerts

## 🎨 Design Principles

- **Low-literacy friendly:** Large buttons, clear language, no medical jargon
- **Minimal clicks:** Streamlined workflow, 7 questions maximum
- **Calm & decisive:** Clear visual hierarchy, color-coded severity
- **Mobile-responsive:** Works on phones, tablets, and desktops

## 📊 API Endpoints

### Public Endpoints

- `GET /api/hospitals` - Get all hospitals with bed availability
- `GET /api/hospitals/:id` - Get specific hospital details
- `POST /api/triage` - Submit triage responses and get recommendations

### Admin Endpoints

- `PUT /api/admin/hospitals/:id/beds` - Update bed availability
- `GET /api/admin/dashboard` - Get system-wide statistics

### Example Triage Request

```json
POST /api/triage

{
  "responses": {
    "isConscious": true,
    "hasSevereBleeding": false,
    "breathingDifficulty": "mild",
    "hasChestPain": false,
    "hasHighFever": true,
    "hasSevereTrauma": false,
    "ageGroup": "adult"
  },
  "patientLocation": {
    "lat": 28.6139,
    "lng": 77.2090
  }
}
```

## 🧪 Testing the System

### Scenario 1: Critical Patient
- Set `isConscious: false` or `hasSevereBleeding: true`
- Should classify as CRITICAL
- Should recommend ICU beds

### Scenario 2: Stable Patient
- All symptoms minimal or none
- Should classify as STABLE
- Should recommend general ward

### Scenario 3: No Capacity
- Manually set all ICU beds to 0 in admin panel
- Submit critical patient triage
- Should show "no capacity" warning with alternatives

### Scenario 4: Low Confidence
- Answer with conflicting signals (e.g., unconscious but no other symptoms)
- Should flag for human review

## 🔐 Important Notes

⚠️ **This is a prototype for demonstration purposes**

- No authentication or authorization
- No real database (data resets on server restart)
- No real-time bed updates (manual refresh required)
- No EHR integration
- No actual medical diagnosis

**Production requirements would include:**
- User authentication & role-based access
- Persistent database (PostgreSQL/MongoDB)
- Real-time WebSocket updates
- Hospital API integrations
- Audit logging
- Data privacy compliance (HIPAA, GDPR, etc.)
- Load balancing & high availability

## 👥 Target Users

1. **Ambulance drivers** - Quick triage and routing
2. **Caregivers/Family members** - Finding appropriate hospital
3. **ASHA/PHC workers** - Community health support
4. **Hospital administrators** - Capacity management (admin panel)

## 🎓 Use Cases

This prototype demonstrates:
- **Systems thinking:** Triage → Capacity → Routing → Override
- **AI for coordination:** Decision support, not diagnosis
- **Real-world problem solving:** Addressing coordination failures in healthcare
- **Clean architecture:** Separation of concerns, modular design

Perfect for:
- Product management interviews
- Business analyst case studies
- Full-stack development portfolios
- Healthcare technology demonstrations

## 📝 License

This is a demonstration project. Feel free to use and modify for educational purposes.

## 🤝 Contributing

This is a prototype. Suggested improvements:

- Add real-time updates with WebSockets
- Integrate with actual hospital systems
- Add multi-language support (Hindi, regional languages)
- Implement voice-based triage for low-literacy users
- Add ambulance tracking
- SMS/WhatsApp notification system
- Historical analytics dashboard

## 📧 Support

For questions about this prototype, please refer to the inline code comments and this documentation.

---

**Built with ❤️ for improving healthcare coordination in India**

