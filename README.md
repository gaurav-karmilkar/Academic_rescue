# 🎓 AcademicRescue
**AI-Powered Student Drop-Risk & Academic Rescue System**

AcademicRescue is an AI-powered platform designed primarily for engineering colleges to identify at-risk students through early detection and provide personalized intervention strategies to prevent academic failure.

[Live Demo : Academic Rescue](https://academicrescue.netlify.app/)

---

## 🚀 Overview
Many students in Tier-3 engineering colleges face academic challenges that go unnoticed until it's too late. AcademicRescue leverages **Google Gemini AI** to analyze attendance, marks, backlogs, and stress indicators. The system provides instant risk assessments and generates customized "Rescue Plans" to help students get back on track.

### Key Stats
* **85%** Improvement Rate
* **Quick** AI Analysis
* **24/7** AI-Driven Support

---

## ✨ Features
* **AI-Powered Risk Analysis:** Uses advanced LLMs to predict academic risk levels (Low, Medium, High).
* **Personalized Rescue Plans:** Provides daily targets, subject-wise strategies (e.g., Math vs. Programming), and actionable milestones.
* **Comprehensive Assessment:** Multi-step form capturing academics, attendance, study habits, and sleep patterns.
* **Mentor Dashboard:** Faculty can track student progress in real-time for timely human intervention.

---

## 🛠️ How It Works
1. **Data Entry:** Students input attendance, marks, backlogs, and self-assessment details.
2. **AI Analysis:** Google Gemini AI identifies specific areas of concern with high accuracy.
3. **Rescue Generation:** The system creates a personalized plan with daily schedules and mentor recommendations.
4. **Progress Tracking:** Mentors and students monitor improvement metrics through historical data.

---

## 💻 Tech Stack
* **Frontend:** React.js / Next.js (Tailwind CSS)
* **AI Engine:** Google Gemini API
* **Backend:** Node.js / Firebase
* **Deployment:** Netlify

---

## 📦 UI Highlight: Dropdown Component
The following component is used in the navigation for Mentor and Profile menus:

```jsx
const Dropdown = ({ label, items }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setOpen(!open)} 
        className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition"
      >
        {label} <span className="ml-1">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl z-50">
          {items.map((item) => (
            <a key={item} href="#" className="block px-4 py-2 text-sm hover:bg-indigo-50 text-gray-700">
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
