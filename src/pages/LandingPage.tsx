import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import { 
  BookOpen, 
  HelpCircle, 
  Code2, 
  FolderGit2, 
  Users2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Award,
  Zap,
  Terminal,
  FileText,
  Briefcase
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, setIsAuthModalOpen, setAuthMode } = useApp();

  const features = [
    {
      title: 'Learn',
      subtitle: 'PYQs, Notes & Academic Hub',
      desc: 'Access verified mid-term & end-term question papers, handwritten formulas, and faculty-approved lab manuals for every semester.',
      icon: <BookOpen className="w-6 h-6 text-brand-blue" />,
      bg: 'bg-blue-50 border-blue-100',
      action: () => setCurrentPage('resources'),
    },
    {
      title: 'Ask',
      subtitle: 'Doubt-Solving & Peer Q&A',
      desc: 'Reddit and Stack Overflow style discussion boards. Ask engineering doubts with code snippets and earn campus reputation.',
      icon: <HelpCircle className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
      action: () => setCurrentPage('doubts'),
    },
    {
      title: 'Practise',
      subtitle: 'DSA Arena & Code Challenges',
      desc: 'Solve curated LeetCode-style algorithms in Python, C++, Java, or C. Test code in real time and maintain your streak.',
      icon: <Code2 className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
      action: () => setCurrentPage('dsa'),
    },
    {
      title: 'Build',
      subtitle: 'Project Showcase & Portfolios',
      desc: 'Publish web apps, AI models, and IoT prototypes. Get feedback from professors and showcase live GitHub deployments.',
      icon: <FolderGit2 className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100',
      action: () => setCurrentPage('projects'),
    },
    {
      title: 'Collaborate',
      subtitle: 'Find Teammates & Code Rooms',
      desc: 'Recruit partners for Smart India Hackathon (SIH), share real-time coding rooms, and manage task boards together.',
      icon: <Users2 className="w-6 h-6 text-cyan-700" />,
      bg: 'bg-cyan-50 border-cyan-100',
      action: () => setCurrentPage('codetogether'),
    },
    {
      title: 'Improve',
      subtitle: 'AI Study Assistant & Careers',
      desc: 'AI-guided PYQ topic trends, flashcards, concept simplification, and JECRC alumni interview experience archives.',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100',
      action: () => setCurrentPage('ai-assistant'),
    },
  ];

  const stats = [
    { label: 'JECRC Engineering Students', value: '5,000+' },
    { label: 'Past Exam Papers & Notes', value: '1,450+' },
    { label: 'Student Doubts Resolved', value: '3,200+' },
    { label: 'Campus Innovation Projects', value: '280+' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-blue/15">
      {/* Top Floating Announcement */}
      <div className="bg-brand-teal text-white py-2 px-4 text-center text-xs font-medium">
        <span className="font-bold bg-white/20 px-2 py-0.5 rounded mr-2">New</span>
        Smart India Hackathon (SIH 2026) internal team recruitment is now live on JECRC Nexus!
        <button 
          onClick={() => setCurrentPage('projects')}
          className="underline ml-2 font-bold hover:text-brand-amberLight"
        >
          View Listings →
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Official Logo Banner */}
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white rounded-3xl shadow-md border border-slate-200/80 mb-8 mx-auto hover:shadow-lg transition-all duration-300">
            <BrandLogo size="lg" showTagline={true} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-tealLight border border-brand-teal/25 text-brand-tealDark text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>AI-Powered Academic & Engineering Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-tight max-w-4xl mx-auto">
            Your Campus. <span className="text-brand-blue">Your Knowledge.</span> <span className="text-brand-cyan">Your Community.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-brand-slate max-w-2xl mx-auto font-normal leading-relaxed">
            Everything you need to learn, practise, collaborate, and build—all in one place, specifically designed for students of JECRC University, Jaipur.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>Explore JECRC Nexus</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-brand-dark font-bold text-sm rounded-xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Join the Community</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-slate font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-blue" /> Verified JECRC Curriculum
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-brand-cyan" /> Multi-Language Sandbox
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-purple" /> AI Study Assistant
            </span>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="bg-white border-y border-slate-200/80 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/60 border border-slate-100">
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-blue">{s.value}</p>
                <p className="text-xs font-semibold text-brand-slate mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Grid */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-blue">Integrated Student Platform</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-2">
            Engineered for Academic and Engineering Excellence
          </p>
          <p className="text-sm text-brand-slate mt-2">
            Combining the best elements of GitHub, LeetCode, Stack Overflow, and Google Drive for JECRC engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              onClick={f.action}
              className={`p-6 rounded-2xl border ${f.bg} hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">{f.title}</span>
                  <span className="text-xs text-slate-300">•</span>
                  <h3 className="text-sm font-bold text-brand-dark">{f.subtitle}</h3>
                </div>
                <p className="text-xs text-brand-slate mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-brand-blue group-hover:translate-x-1 transition-transform">
                <span>Explore {f.title}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Feature Demo Showcase */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="px-3 py-1 bg-brand-blue/30 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/20">
                DSA Arena & Coding Sandbox
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-4">
                Crack Coding Interviews with JECRC Specific Curricula
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                Practice 150+ standard algorithm questions in C, C++, Java, and Python. Execute code, run test cases, analyze time-space complexity, and follow curated placement paths for Celebal, Amazon, and TCS.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentPage('dsa')}
                  className="px-5 py-2.5 bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  Launch DSA Arena
                </button>
                <button
                  onClick={() => setCurrentPage('placements')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Interview Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-xl">
                <img src="/jecrc-nexus-logo.png" alt="JECRC Nexus" className="h-10 w-auto" />
              </div>
              <div>
                <p className="text-base font-bold text-white tracking-tight">JECRC NEXUS</p>
                <p className="text-xs text-slate-400">Your Campus. Your Knowledge. Your Community.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-300">
              <button onClick={() => setCurrentPage('resources')} className="hover:text-white">Academic Resources</button>
              <button onClick={() => setCurrentPage('doubts')} className="hover:text-white">Ask a Doubt</button>
              <button onClick={() => setCurrentPage('dsa')} className="hover:text-white">DSA Arena</button>
              <button onClick={() => setCurrentPage('projects')} className="hover:text-white">Project Showcase</button>
              <button onClick={() => setCurrentPage('placements')} className="hover:text-white">Placements</button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} JECRC Nexus • Dedicated Academic & Engineering Portal for JECRC University, Jaipur.</p>
            <p className="text-[11px]">Built by students, for students. Demonstrative academic prototype.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
