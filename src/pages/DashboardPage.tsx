import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroBannerIllustration } from '../components/common/AcademicIllustrations';
import {
  BookOpen,
  Users,
  GraduationCap,
  ArrowRight,
  Bookmark,
  Sparkles,
  Code2,
  HelpCircle,
  Users2,
  Library,
  Calendar,
  Clock,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  ChevronDown,
  MoreVertical,
  Play,
  FileText,
  TrendingUp,
} from 'lucide-react';
import {
  MOCK_ASSIGNMENTS,
  MOCK_FACULTY_MENTORS,
  MONTHLY_ACTIVITY_SERIES,
  UPCOMING_CAMPUS_EVENTS,
} from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    setCurrentPage,
    resources,
    doubts,
    toggleBookmarkResource,
    downloadResource,
    showToast,
  } = useApp();

  const [resourceFilter, setResourceFilter] = useState<'All' | 'PYQs' | 'Notes' | 'Labs'>('All');
  const [hoveredResourceId, setHoveredResourceId] = useState<string | null>(null);
  const [hoveredMentorId, setHoveredMentorId] = useState<string | null>(null);
  const [activeChartIdx, setActiveChartIdx] = useState<number>(MONTHLY_ACTIVITY_SERIES.length - 1);

  // Filter popular resources cleanly
  const filteredPopularResources = resources
    .filter((res) => {
      if (resourceFilter === 'PYQs') return res.category.includes('Paper');
      if (resourceFilter === 'Notes') return res.category.includes('Notes') || res.category.includes('Sheet');
      if (resourceFilter === 'Labs') return res.category.includes('Lab') || res.category.includes('Practical');
      return true;
    })
    .slice(0, 4);

  const badgeColors = [
    { bg: 'bg-[#F8C423]', text: 'text-white', code: 'PYQ' },
    { bg: 'bg-[#F56A53]', text: 'text-white', code: 'NOTE' },
    { bg: 'bg-[#39B2A3]', text: 'text-white', code: 'LAB' },
    { bg: 'bg-[#E9B3D6]', text: 'text-brand-dark', code: 'REF' },
  ];

  const featuredMentors = MOCK_FACULTY_MENTORS.slice(0, 4);
  const recentDoubts = doubts.slice(0, 3);
  const upcomingDeadlines = MOCK_ASSIGNMENTS.filter((a) => a.status !== 'Completed').slice(0, 3);
  const completedTasksCount =
    currentUser.solvedProblemsCount +
    MOCK_ASSIGNMENTS.filter((a) => a.status === 'Completed').length;

  // Build smooth SVG path for Academic Progress sparkline
  const chartWidth = 260;
  const chartHeight = 96;
  const maxVal = 100;
  const points = MONTHLY_ACTIVITY_SERIES.map((item, i) => {
    const x = 14 + (i * (chartWidth - 28)) / (MONTHLY_ACTIVITY_SERIES.length - 1);
    const y = chartHeight - 14 - (item.value / maxVal) * (chartHeight - 28);
    return { x, y, ...item };
  });

  const linePath = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className="space-y-7 pb-10">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
            Academic Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back, {currentUser.name} • B.Tech {currentUser.branch} (Sem {currentUser.semester})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/70 text-xs font-semibold text-slate-700 shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <span>{currentUser.streakDays} Day Study Streak</span>
          </span>
        </div>
      </div>

      {/* Central Welcome Hero Banner (Teal Reference Aesthetic) */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#45B5A7] via-[#3AA89B] to-[#2E988B] text-white px-6 py-7 sm:px-9 sm:py-8 shadow-card">
        {/* Subtle decorative circles */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-1/3 -top-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
              <span>JECRC University • Connected Academic Workspace</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight leading-tight">
              Your Academic Journey, Connected with JECRC Nexus!
            </h2>

            <p className="text-xs sm:text-sm text-teal-50/95 max-w-xl leading-relaxed">
              Simplifying academic challenges through peer collaboration, accessible campus resources, and smart academic support tailored for JECRC students.
            </p>

            {/* Metric Badges (Coral & Yellow circular icons matching reference) */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center shadow-subtle ring-4 ring-white/20">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-teal-50/90 font-medium">Students</p>
                  <p className="text-base font-extrabold leading-tight">5,000+</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-amber flex items-center justify-center shadow-subtle ring-4 ring-white/20">
                  <Users className="w-5 h-5 text-brand-dark" />
                </div>
                <div>
                  <p className="text-[11px] text-teal-50/90 font-medium">Faculty & Mentors</p>
                  <p className="text-base font-extrabold leading-tight">250+</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('resources')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-brand-dark hover:bg-brand-amberLight font-bold text-xs rounded-xl shadow-subtle transition-all hover:-translate-y-0.5"
              >
                <span>Explore Resources</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-tealDark" />
              </button>
            </div>
          </div>

          {/* Right Vector Academic Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroBannerIllustration className="w-full max-w-[330px] h-auto drop-shadow-sm" />
          </div>
        </div>
      </section>

      {/* Main 3-Column Balanced Dashboard Grid (Matches Reference Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Popular Resources */}
        <section className="lg:col-span-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-brand-dark">Popular Resources</h3>

            <div className="relative">
              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value as any)}
                aria-label="Filter popular resources"
                className="appearance-none bg-white border border-slate-200/80 text-slate-600 text-xs font-semibold rounded-xl pl-3 pr-7 py-1.5 shadow-subtle cursor-pointer outline-none focus:border-brand-teal"
              >
                <option value="All">All Resources</option>
                <option value="PYQs">PYQ Papers</option>
                <option value="Notes">Notes & Sheets</option>
                <option value="Labs">Lab Manuals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredPopularResources.map((res, idx) => {
              const badge = badgeColors[idx % badgeColors.length];
              const isHighlighted =
                hoveredResourceId === res.id || (hoveredResourceId === null && idx === 1);
              const isBookmarked = currentUser.bookmarkedResourceIds.includes(res.id);

              return (
                <div
                  key={res.id}
                  onMouseEnter={() => setHoveredResourceId(res.id)}
                  onMouseLeave={() => setHoveredResourceId(null)}
                  className={`bg-white p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isHighlighted
                      ? 'border-slate-100 shadow-card -translate-y-0.5'
                      : 'border-slate-100/90 shadow-subtle hover:shadow-card'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-11 h-11 rounded-xl ${badge.bg} ${badge.text} flex items-center justify-center font-extrabold text-[11px] flex-shrink-0 shadow-2xs`}
                    >
                      {badge.code}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-brand-dark truncate">{res.subject}</h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {res.downloadsCount}+ Downloads • Sem {res.semester}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        downloadResource(res.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        isHighlighted
                          ? 'bg-brand-coral text-white shadow-subtle hover:bg-brand-coralHover'
                          : 'bg-slate-50 text-slate-600 hover:bg-brand-tealLight hover:text-brand-tealDark'
                      }`}
                    >
                      View Notes
                    </button>
                    <button
                      onClick={() => toggleBookmarkResource(res.id)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Resource'}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-teal hover:bg-slate-50 transition-colors"
                    >
                      {isBookmarked ? (
                        <Bookmark className="w-3.5 h-3.5 text-brand-teal fill-brand-teal" />
                      ) : (
                        <MoreVertical className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage('resources')}
            className="w-full py-2.5 rounded-2xl bg-white hover:bg-brand-tealLight border border-slate-200/70 text-xs font-bold text-brand-tealDark transition-colors flex items-center justify-center gap-1.5 shadow-subtle"
          >
            <span>Browse All PYQs & Study Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Column 2: Academic Progress & Current Activity */}
        <section className="lg:col-span-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-brand-dark">Academic Progress</h3>
            <button
              onClick={() => setCurrentPage('assignments')}
              className="text-xs font-semibold text-brand-tealDark hover:underline"
            >
              Details
            </button>
          </div>

          {/* Teal Progress Area Chart Card */}
          <div className="rounded-[24px] bg-gradient-to-br from-[#47B5A7] to-[#2F9B8E] text-white p-5 shadow-card relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-extrabold">Monthly Learning Activity</h4>
                <p className="text-[11px] text-teal-50/90 mt-0.5">
                  {MONTHLY_ACTIVITY_SERIES[activeChartIdx].label}: {MONTHLY_ACTIVITY_SERIES[activeChartIdx].hours} hrs • {MONTHLY_ACTIVITY_SERIES[activeChartIdx].value}% goal
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('assignments')}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                title="View Academic Analytics"
              >
                <TrendingUp className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Smooth SVG Area Sparkline */}
            <div className="mt-4">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="nexusProgressFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                {[22, 48, 74].map((yPos) => (
                  <line
                    key={yPos}
                    x1="10"
                    y1={yPos}
                    x2={chartWidth - 10}
                    y2={yPos}
                    stroke="#FFFFFF"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Area & Line */}
                <path d={areaPath} fill="url(#nexusProgressFill)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Data Points */}
                {points.map((pt, idx) => (
                  <g
                    key={pt.label}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveChartIdx(idx)}
                    onClick={() => setActiveChartIdx(idx)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={activeChartIdx === idx ? 5 : 3}
                      fill={activeChartIdx === idx ? '#F8C423' : '#FFFFFF'}
                      stroke="#FFFFFF"
                      strokeWidth={activeChartIdx === idx ? 2 : 1.5}
                    />
                  </g>
                ))}
              </svg>

              <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-teal-50/85 mt-1">
                {MONTHLY_ACTIVITY_SERIES.map((m, idx) => (
                  <button
                    key={m.label}
                    onClick={() => setActiveChartIdx(idx)}
                    className={`px-1.5 py-0.5 rounded transition-colors ${
                      activeChartIdx === idx ? 'bg-white/25 text-white font-bold' : ''
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Two Accent Stat Cards (Yellow & Coral matching reference) */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Yellow Card */}
            <div
              onClick={() => setCurrentPage('assignments')}
              className="rounded-[22px] bg-[#F8C423] text-brand-dark p-4 shadow-subtle hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between min-h-[126px]"
            >
              <div>
                <p className="text-2xl font-extrabold tracking-tight">{completedTasksCount}+</p>
                <p className="text-[11px] font-bold text-amber-950/80 mt-0.5">
                  Completed Tasks & DSA
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="space-y-1.5 flex-1 mr-3">
                  <div className="h-1.5 rounded-full bg-white/70 w-full" />
                  <div className="h-1.5 rounded-full bg-white/45 w-3/4" />
                </div>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-2xs flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-dark" />
                </span>
              </div>
            </div>

            {/* Coral Card */}
            <div
              onClick={() => setCurrentPage('resources')}
              className="rounded-[22px] bg-[#F56A53] text-white p-4 shadow-subtle hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between min-h-[126px]"
            >
              <div>
                <p className="text-2xl font-extrabold tracking-tight">{resources.length * 10}+</p>
                <p className="text-[11px] font-semibold text-white/90 mt-0.5">
                  Verified Study Materials
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="space-y-1.5 flex-1 mr-3">
                  <div className="h-1.5 rounded-full bg-white/60 w-full" />
                  <div className="h-1.5 rounded-full bg-white/35 w-2/3" />
                </div>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-2xs flex-shrink-0">
                  <Play className="w-3 h-3 text-brand-coral fill-brand-coral ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Column 3: Faculty & Mentors */}
        <section className="lg:col-span-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-brand-dark">Faculty & Mentors</h3>
            <button
              onClick={() => setCurrentPage('mentors')}
              className="text-xs font-semibold text-slate-500 hover:text-brand-tealDark underline underline-offset-4 transition-colors"
            >
              See All
            </button>
          </div>

          <div className="space-y-3">
            {featuredMentors.map((mentor, idx) => {
              const isHighlighted =
                hoveredMentorId === mentor.id || (hoveredMentorId === null && idx === 1);

              return (
                <div
                  key={mentor.id}
                  onMouseEnter={() => setHoveredMentorId(mentor.id)}
                  onMouseLeave={() => setHoveredMentorId(null)}
                  className={`bg-white p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isHighlighted
                      ? 'border-slate-100 shadow-card -translate-y-0.5'
                      : 'border-slate-100/90 shadow-subtle hover:shadow-card'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-brand-tealLight flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-brand-dark truncate">{mentor.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {mentor.department}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(
                        `Guidance Request Ready`,
                        `Opening ${mentor.name}'s mentorship profile & office hours.`
                      );
                      setCurrentPage('mentors');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex-shrink-0 ${
                      isHighlighted
                        ? 'bg-brand-coral text-white shadow-subtle hover:bg-brand-coralHover'
                        : 'bg-slate-50 text-slate-600 hover:bg-brand-tealLight hover:text-brand-tealDark border border-slate-100'
                    }`}
                  >
                    Connect
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage('community')}
            className="w-full py-2.5 rounded-2xl bg-white hover:bg-brand-tealLight border border-slate-200/70 text-xs font-bold text-slate-700 hover:text-brand-tealDark transition-colors flex items-center justify-center gap-1.5 shadow-subtle"
          >
            <span>Explore Peer Study Circles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      </div>

      {/* Quick Access Strip */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-brand-dark">Quick Access</h3>
          <span className="text-xs text-slate-400 font-medium">
            Frequently used academic tools & labs
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            {
              label: 'Academic Resources',
              sub: 'PYQs & Notes',
              icon: <BookOpen className="w-5 h-5 text-brand-tealDark" />,
              iconBg: 'bg-brand-tealLight',
              page: 'resources',
            },
            {
              label: 'Courses & Subjects',
              sub: 'Sem 1-8 Syllabus',
              icon: <Library className="w-5 h-5 text-amber-600" />,
              iconBg: 'bg-brand-amberLight',
              page: 'courses',
            },
            {
              label: 'Discussion Groups',
              sub: 'Ask & Solve Doubts',
              icon: <HelpCircle className="w-5 h-5 text-brand-coral" />,
              iconBg: 'bg-brand-coralLight',
              page: 'doubts',
            },
            {
              label: 'AI Study Assistant',
              sub: 'Quizzes & Flashcards',
              icon: <Sparkles className="w-5 h-5 text-brand-purple" />,
              iconBg: 'bg-brand-purpleLight',
              page: 'ai-assistant',
            },
            {
              label: 'DSA Arena',
              sub: 'Code & Test Cases',
              icon: <Code2 className="w-5 h-5 text-emerald-600" />,
              iconBg: 'bg-emerald-50',
              page: 'dsa',
            },
            {
              label: 'Code Together',
              sub: 'Live Team Rooms',
              icon: <Users2 className="w-5 h-5 text-sky-600" />,
              iconBg: 'bg-sky-50',
              page: 'codetogether',
            },
          ].map((tool) => (
            <button
              key={tool.label}
              onClick={() => setCurrentPage(tool.page as any)}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-subtle hover:shadow-card hover:-translate-y-0.5 transition-all text-left group"
            >
              <div
                className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
              >
                {tool.icon}
              </div>
              <p className="text-xs font-bold text-brand-dark leading-snug">{tool.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{tool.sub}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom 2-Column Section: Current Activity & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Student Activity & Discussions */}
        <section className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-[24px] border border-slate-100 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-tealLight flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-brand-tealDark" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-brand-dark">
                  Current Activity & Peer Discussions
                </h3>
                <p className="text-[11px] text-slate-400">
                  Latest questions and peer collaborations across campus
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('doubts')}
              className="text-xs font-bold text-brand-tealDark hover:underline flex items-center gap-1"
            >
              <span>View Forum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentDoubts.map((doubt) => (
              <div
                key={doubt.id}
                onClick={() => setCurrentPage('doubts')}
                className="p-3.5 rounded-2xl bg-brand-bg/70 hover:bg-brand-tealLight/40 border border-slate-100 hover:border-brand-teal/25 transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-700">{doubt.authorName}</span>
                    <span>• Sem {doubt.semester}</span>
                    <span>• {doubt.createdAt}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-dark line-clamp-1">
                    {doubt.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white border border-slate-200/70 font-semibold text-slate-600">
                      {doubt.subject}
                    </span>
                    {doubt.isResolved && (
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Resolved
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center px-2.5 py-2 rounded-xl bg-white border border-slate-100 shadow-2xs flex-shrink-0">
                  <ThumbsUp className="w-3.5 h-3.5 text-brand-teal" />
                  <span className="text-xs font-extrabold text-brand-dark mt-0.5">
                    {doubt.upvotes}
                  </span>
                  <span className="text-[10px] text-slate-400">{doubt.answers.length} ans</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines & Campus Events */}
        <section className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-[24px] border border-slate-100 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-coralLight flex items-center justify-center">
                <Calendar className="w-4 h-4 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-brand-dark">
                  Upcoming Deadlines & Events
                </h3>
                <p className="text-[11px] text-slate-400">Submissions & JECRC campus alerts</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('assignments')}
              className="text-xs font-bold text-brand-coral hover:underline"
            >
              All Tasks
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingDeadlines.map((task) => (
              <div
                key={task.id}
                onClick={() => setCurrentPage('assignments')}
                className="p-3 rounded-2xl bg-brand-bg/70 hover:bg-brand-amberLight/50 border border-slate-100 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      task.status === 'Due Soon'
                        ? 'bg-brand-coralLight text-brand-coral'
                        : 'bg-brand-tealLight text-brand-tealDark'
                    }`}
                  >
                    {task.status} • {task.type}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {task.dueDate}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-brand-dark mt-1.5 line-clamp-1">
                  {task.title}
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-teal rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{task.progress}%</span>
                </div>
              </div>
            ))}

            {UPCOMING_CAMPUS_EVENTS.slice(0, 1).map((ev) => (
              <div
                key={ev.id}
                onClick={() => setCurrentPage('community')}
                className="p-3 rounded-2xl bg-brand-tealLight/60 border border-brand-teal/20 hover:border-brand-teal/40 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-teal text-white">
                    {ev.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-tealDark">
                    {ev.registeredCount} attending
                  </span>
                </div>
                <h4 className="text-xs font-bold text-brand-dark mt-1.5">{ev.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-brand-teal" /> {ev.date} • {ev.venue}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
