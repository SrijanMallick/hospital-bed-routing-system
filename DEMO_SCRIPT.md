# 1-Minute Demo Script

## 🎬 Opening (10 seconds)

"This is a Hospital Bed Routing System for government hospitals in India. It solves a coordination problem: ambulances get rejected because they don't know which hospital has beds available."

## 🏥 The Problem (10 seconds)

"During COVID, we saw ambulances driving around for hours. The issue wasn't bed scarcity—it was coordination failure. This system fixes that."

## 💡 The Solution (40 seconds)

### Part 1: Triage Flow (20 seconds)
*[Click "Begin Triage"]*

"An ambulance driver answers 7 simple questions—no medical training needed. Is the patient conscious? Any severe bleeding? Breathing difficulty?"

*[Quickly answer questions]*

"The system assesses severity in under 3 minutes."

### Part 2: Smart Routing (20 seconds)
*[Show results screen]*

"Based on severity, it recommends the best hospital with available beds, considering:
- Required ward type (ICU, oxygen, or general)
- Distance and travel time
- Current hospital load
- Plus 2 fallback options"

*[Point to recommended hospital card]*

"Here's the closest hospital with ICU beds—12 minutes away. Direct link to Google Maps."

## 🔧 Admin View (Optional - if time permits)

*[Click Admin]*

"Hospital staff update bed availability in real-time. The system shows capacity alerts and load distribution."

## 🎯 Key Differentiators (10 seconds)

"Three things make this work:
1. **Not a diagnostic tool**—it's coordination support
2. **Human override preserved**—final decision with doctors
3. **Low-literacy friendly**—large buttons, simple language"

## 💼 Impact Statement (10 seconds)

"This reduces ambulance rejection rates, saves critical time, and works with existing infrastructure—no fancy tech needed."

---

## 🎤 Alternative 30-Second Pitch

"Hospital bed routing system for India. Ambulance drivers answer 7 simple questions, system assesses severity, recommends nearest hospital with available beds in under 3 minutes. Solves coordination failure, not medical scarcity. Human override preserved. Built with React, Node.js, and real-world constraints."

---

## 📋 Q&A Prep

**Q: How is this different from just calling hospitals?**
A: "Calling takes 20+ minutes, often outdated info. This aggregates real-time data and ranks by multiple factors—not just distance."

**Q: What about patient privacy?**
A: "This prototype has no patient identification. Production would need HIPAA-compliant architecture, encryption, and audit logs."

**Q: How do you ensure bed data is accurate?**
A: "Hospital staff update via admin panel. Production would integrate with Hospital Information Systems (HIS) for automatic updates."

**Q: What if all hospitals are full?**
A: "System explicitly shows 'No Confirmed Capacity' and suggests alternative ward types. Escalates to human decision—never hides the problem."

**Q: Why not use AI/ML for diagnosis?**
A: "Scope creep and liability. This is coordination support, not medical diagnosis. Rule-based severity scoring is transparent and auditable."

**Q: How does this scale?**
A: "Current: 15 hospitals, mock data. Production: PostgreSQL, Redis caching, WebSocket for real-time updates, microservices architecture."

**Q: What about rural areas without internet?**
A: "SMS-based fallback, offline-first PWA, or USSD codes. This prototype assumes connectivity, but production needs offline capability."

---

## 🎯 Interview-Specific Angles

### For Product Manager Role:
- Emphasize user research (ambulance drivers, ASHA workers)
- Discuss prioritization: Why triage before routing?
- Explain non-goals: No diagnosis, no payments, no EHR integration
- Show systems thinking: Coordination layer, not point solution

### For Full-Stack Developer Role:
- Walk through architecture: React → Express → Mock data
- Explain separation of concerns: Triage logic / Routing logic / API / UI
- Discuss trade-offs: Mock data vs. real DB, REST vs. WebSocket
- Show clean code: TypeScript types, modular components, error handling

### For Business Analyst Role:
- Present problem statement with data (COVID ambulance rejections)
- Show requirements gathering: 7 questions based on observable symptoms
- Discuss edge cases: No capacity, conflicting signals, low confidence
- Explain success metrics: Rejection rate, time to admission, user satisfaction

### For Consultant Role:
- Frame as government digital transformation
- Discuss implementation challenges: Hospital buy-in, data quality, training
- Show cost-benefit: Low-tech solution, high impact
- Present rollout strategy: Pilot → Scale → Integrate

---

## 🚀 Demo Tips

1. **Start with impact, not tech**: Lead with the problem
2. **Show, don't tell**: Click through the actual flow
3. **Highlight constraints**: "This is coordination support, not diagnosis"
4. **Acknowledge limitations**: "Prototype-grade, not production-ready"
5. **End with scalability**: "Here's how this grows to 1000+ hospitals"

---

**Remember:** This isn't about fancy AI. It's about solving a real coordination problem with appropriate technology.

