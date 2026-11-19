# JECRC Nexus — AI-Powered Academic & Engineering Community

**Your Campus. Your Knowledge. Your Community.**

JECRC Nexus is an integrated educational web platform designed specifically for students and faculty of **JECRC University, Jaipur**. It unites previous year papers (PYQs), academic doubts, coding practice (DSA Arena), project collaboration, AI study assistance, and placement prep into one cohesive student ecosystem.

---

## 🚀 Key Modules & Capabilities

1. **Home Dashboard:** Personalized student greetings, academic progress trackers (DSA solved, streak counter, karma points), quick shortcuts, and upcoming campus events.
2. **Academic Resources Hub:** Filter past papers by branch, semester (1–8), subject, and exam type (Mid-term, End-term, Viva). Includes a **Smart PYQ Explorer** with topic frequency insights.
3. **Ask a Doubt Community:** Reddit & Stack Overflow style Q&A forum with code syntax highlighting, upvotes, subject channels, and accepted answer reputation points.
4. **Project Showcase & Teammate Finder:** Student innovation directory across AI/ML, IoT, Web, and Cybersecurity. Includes a dedicated **Find Your Team** board for Smart India Hackathon (SIH 2026) and capstone recruitment.
5. **DSA Arena:** LeetCode-style algorithms platform with multi-language code editor (Python, C++, Java, C), sample test case execution, and celebration feedback.
6. **Code Together:** Real-time collaborative workspace with unique room codes, shared code editor, live team chat, and a Kanban sprint task board.
7. **AI Study Assistant:** Interactive study companion with concept simplification, interactive 3-question quiz generator with scoring, and 3D flip revision flashcards.
8. **Campus Community & Study Circles:** Join branch study groups, connect with senior peer mentors, and propose skill swaps.
9. **Placement & Career Preparation:** Verified alumni interview experiences (Celebal Technologies, Amazon SDE), preparation roadmaps, and an automated **ATS Resume Reviewer**.
10. **Student Profile:** Complete editable profile with streak metrics, earned campus badges, and bookmarked notes.
11. **Admin & Moderation Portal:** Faculty review queue to verify academic study materials and moderate flagged content.
12. **Global Search:** Instant `Ctrl + K` command palette searching across doubts, notes, problems, and projects.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti
- **Build Tool:** Vite

---

## 💻 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/SnehvardhanSingh/jecrcnexus.git
cd jecrcnexus
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Architecture

```
junexus/
├── public/                     # Static assets (Official JECRC Nexus Logo)
│   ├── jecrc-nexus-logo.png
│   └── jecrc-nexus-logo.jpg
├── src/
│   ├── components/             # Reusable UI components
│   │   └── common/             # Navbar, Sidebar, BrandLogo, Modals, Toasts
│   ├── context/                # AppContext & persistent state
│   ├── data/                   # Realistic JECRC student & academic mock data
│   ├── pages/                  # 12 Core feature pages & views
│   ├── types/                  # TypeScript interfaces and entity types
│   ├── App.tsx                 # Routing & root layout
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind & font directives
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License & Academic Attribution
Developed as an educational platform prototype for students of JECRC University, Jaipur.
