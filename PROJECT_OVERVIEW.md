# Project Overview: Hospital Bed Routing System

## 📋 Executive Summary

A functional web-based prototype that helps ambulance drivers and caregivers quickly assess patient severity and find available hospital beds in government hospitals across India. Built as a decision-support tool, not a diagnostic system.

**Problem Solved:** Coordination failure in hospital bed allocation  
**Target Users:** Ambulance drivers, caregivers, ASHA workers  
**Time to Complete:** Under 3 minutes per patient  
**Tech Stack:** React + TypeScript, Node.js, Tailwind CSS  

---

## 🎯 Core Value Proposition

### What It Does
1. **Quick Triage:** 7 non-clinical questions assess patient severity
2. **Smart Matching:** Matches severity to required ward type (ICU/Oxygen/General)
3. **Intelligent Routing:** Recommends best hospital based on availability, distance, and load
4. **Fallback Options:** Provides 2 alternative hospitals
5. **Admin Control:** Real-time bed availability management

### What It Doesn't Do
- ❌ Medical diagnosis or treatment recommendations
- ❌ Replace doctor's judgment
- ❌ Store patient medical records
- ❌ Handle payments or insurance
- ❌ Integrate with existing EHR systems (in prototype)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │  Triage  │  │ Results  │  │  Admin   │   │
│  │   Page   │  │   Form   │  │  Screen  │  │  Panel   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                           ↓                                  │
│                    API Client (Fetch)                        │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/JSON
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express API)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes:                                              │  │
│  │  • POST /api/triage                                   │  │
│  │  • GET  /api/hospitals                                │  │
│  │  • PUT  /api/admin/hospitals/:id/beds                 │  │
│  │  • GET  /api/admin/dashboard                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌─────────────────┐           ┌─────────────────┐         │
│  │  Triage Logic   │           │  Routing Logic  │         │
│  │  • Severity     │           │  • Distance     │         │
│  │  • Confidence   │           │  • Availability │         │
│  │  • Conflicts    │           │  • Load Score   │         │
│  └─────────────────┘           └─────────────────┘         │
│                           ↓                                  │
│                  hospitals.json (Mock Data)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧮 Key Algorithms

### 1. Triage Severity Scoring

**Inputs:** 7 patient condition indicators  
**Output:** Severity level (CRITICAL/URGENT/STABLE) + Confidence score

**Scoring Logic:**
- Unconscious: +10 points
- Severe bleeding: +9 points
- Severe breathing difficulty: +8 points
- Chest pain: +7 points
- Severe trauma: +8 points
- High fever: +2 points
- Vulnerable age (infant/elderly): +2 points

**Classification:**
- Score ≥15: CRITICAL → ICU required
- Score 7-14: URGENT → Oxygen bed required
- Score <7: STABLE → General ward

**Confidence Assessment:**
- Detects conflicting signals (e.g., unconscious but no other symptoms)
- Flags low-confidence cases for human review
- Based on signal clarity and consistency

### 2. Hospital Routing Algorithm

**Inputs:** Required ward type, patient location, hospital data  
**Output:** Ranked list of hospitals with recommendations

**Ranking Factors:**
1. **Availability:** Must have beds in required ward type
2. **Distance:** Closer hospitals ranked higher (0-5km: +30, 5-10km: +20, etc.)
3. **Capacity:** More available beds = higher score (up to +30)
4. **Load:** Less congested hospitals preferred (+0 to +20)
5. **Urgency Bonus:** Critical patients get bonus for nearby hospitals (<15 min)

**Fallback Logic:**
- If no ICU beds: Check oxygen beds
- If no oxygen beds: Check general beds with monitoring note
- Always provide 2 alternative options

---

## 📊 Data Model

### Hospital Schema
```typescript
{
  id: string,              // "H001"
  name: string,            // "Government General Hospital"
  location: {
    lat: number,           // 28.6139
    lng: number,           // 77.2090
    address: string        // "Central Delhi"
  },
  beds: {
    icu: {
      available: number,   // 5
      total: number        // 20
    },
    oxygen: { ... },
    general: { ... }
  },
  lastUpdated: string      // ISO timestamp
}
```

### Triage Response Schema
```typescript
{
  isConscious: boolean,
  hasSevereBleeding: boolean,
  breathingDifficulty: 'none' | 'mild' | 'severe',
  hasChestPain: boolean,
  hasHighFever: boolean,
  hasSevereTrauma: boolean,
  ageGroup: 'infant' | 'child' | 'adult' | 'elderly'
}
```

---

## 🎨 UI/UX Principles

### Design for Low-Literacy Users
- **Large touch targets:** Minimum 44x44px buttons
- **Clear visual hierarchy:** Primary actions stand out
- **Simple language:** No medical jargon
- **Color coding:** Red (critical), Yellow (urgent), Green (stable)
- **Icons + Text:** Visual reinforcement

### Progressive Disclosure
- One question at a time
- Progress indicator shows completion
- Can navigate back to change answers
- Optional location input (defaults provided)

### Calm Interface
- Minimal animations
- Clear feedback on actions
- No aggressive colors except for warnings
- Ample whitespace

### Mobile-First
- Responsive grid layout
- Touch-friendly controls
- Works on 320px screens and up
- Print-friendly results page

---

## 🔒 Security & Privacy Considerations

### Current Prototype
- No authentication (demo only)
- No patient data storage
- No encryption
- No audit logging

### Production Requirements
- **Authentication:** Role-based access (ambulance, hospital admin, system admin)
- **Authorization:** Granular permissions per hospital/region
- **Encryption:** TLS for transport, AES for data at rest
- **Audit Logging:** All bed updates and triage submissions logged
- **Data Privacy:** HIPAA/GDPR compliance, data retention policies
- **Rate Limiting:** Prevent abuse of API endpoints
- **Input Validation:** Sanitize all user inputs

---

## 📈 Scalability Considerations

### Current Limitations (Prototype)
- 15 hospitals (mock data)
- In-memory data (resets on restart)
- No caching
- Single server instance
- No real-time updates

### Production Architecture
```
Load Balancer (Nginx)
    ↓
API Gateway (Kong/AWS API Gateway)
    ↓
┌─────────────────────────────────────┐
│  Microservices (Kubernetes)         │
│  • Triage Service                   │
│  • Routing Service                  │
│  • Hospital Data Service            │
│  • Admin Service                    │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│  Data Layer                         │
│  • PostgreSQL (hospital data)       │
│  • Redis (caching, sessions)        │
│  • Elasticsearch (search, analytics)│
└─────────────────────────────────────┘
    ↓
WebSocket Server (real-time updates)
```

**Estimated Capacity:**
- 1000+ hospitals
- 10,000+ concurrent users
- <500ms response time
- 99.9% uptime SLA

---

## 🧪 Testing Strategy

### Unit Tests (Not Implemented)
- Triage scoring logic
- Routing algorithm
- Distance calculations
- API endpoint handlers

### Integration Tests (Not Implemented)
- Full triage flow
- Admin bed updates
- API error handling

### Manual Test Scenarios (Provided)
1. Critical patient → ICU recommendation
2. Stable patient → General ward
3. No capacity → Show alternatives
4. Low confidence → Flag for review
5. Admin update → Verify persistence

---

## 🚀 Deployment Strategy

### Development
- Local: `npm start` (backend) + `npm run dev` (frontend)
- Hot reload enabled
- Mock data in JSON file

### Staging (Recommended)
- Docker containers
- Environment variables for config
- Test database with realistic data
- CI/CD pipeline (GitHub Actions)

### Production (Suggested)
- Cloud platform (AWS/Azure/GCP)
- Container orchestration (Kubernetes)
- CDN for static assets (CloudFront)
- Database replication and backups
- Monitoring (Prometheus, Grafana)
- Logging (ELK stack)

---

## 💡 Future Enhancements

### Phase 2 (Next 3 Months)
- [ ] Real database integration (PostgreSQL)
- [ ] WebSocket for real-time bed updates
- [ ] SMS notifications to hospitals
- [ ] Multi-language support (Hindi, regional)
- [ ] Ambulance tracking integration

### Phase 3 (6-12 Months)
- [ ] Hospital Information System (HIS) integration
- [ ] Historical analytics dashboard
- [ ] Predictive capacity modeling
- [ ] Voice-based triage (for low-literacy)
- [ ] WhatsApp bot interface

### Phase 4 (Long-term)
- [ ] AI-powered severity prediction (ML model)
- [ ] Ambulance fleet optimization
- [ ] Patient outcome tracking
- [ ] Inter-state hospital network
- [ ] Integration with national health stack

---

## 📚 Technical Debt & Known Issues

### Current Limitations
1. **No data persistence:** Server restart loses bed updates
2. **No authentication:** Anyone can access admin panel
3. **No input validation:** Trust all user inputs
4. **No error boundaries:** React errors crash entire app
5. **No loading states:** Some actions feel unresponsive
6. **Hardcoded config:** Port numbers, URLs in code
7. **No tests:** Zero test coverage
8. **Mock distance:** Simple Haversine, no real routing

### Recommended Fixes (Priority Order)
1. Add environment variables for configuration
2. Implement basic authentication for admin panel
3. Add input validation and sanitization
4. Add React error boundaries
5. Implement proper loading states
6. Add unit tests for core logic
7. Integrate real map routing API (Google Maps/Mapbox)
8. Add database layer

---

## 🎓 Learning Outcomes

This project demonstrates:
- **Full-stack development:** React frontend + Node.js backend
- **Systems thinking:** Triage → Routing → Coordination
- **Real-world constraints:** Low literacy, limited connectivity
- **Clean architecture:** Separation of concerns, modular design
- **API design:** RESTful endpoints, proper error handling
- **UI/UX:** Accessibility, responsive design, user-centered
- **Problem-solving:** Coordination failure, not technical complexity

---

## 📞 Contact & Support

For questions about this project:
- Review inline code comments
- Check README.md for setup instructions
- See DEMO_SCRIPT.md for presentation guidance
- Refer to SETUP.md for troubleshooting

---

**Built as a demonstration of practical healthcare technology solutions for India.**

