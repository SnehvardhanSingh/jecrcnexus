import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  HelpCircle, 
  Code2, 
  Sparkles, 
  FolderGit2, 
  Users, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  TrendingUp, 
  Calendar, 
  Award, 
  Clock, 
  ExternalLink,
  ChevronRight,
  PlusCircle,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { UPCOMING_CAMPUS_EVENTS } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    setCurrentPage, 
    resources, 
    doubts, 
    projects, 
    dsaProblems, 
    setActiveDsaId,
    toggleBookmarkResource,
    downloadResource
  } = useApp();

  // Bookmarked / Recently accessed resources
  const bookmarkedResources = resources.filter(r => currentUser.bookmarkedResourceIds.includes(r.id)).slice(0, 3);
  
  // Recommended for user based on CSE & Sem 5
  const recommendedResources = resources.filter(r => 
    r.semester === currentUser.semester || r.branch === currentUser.branch
  ).slice(0, 3);

  // Recent Doubts
  const recentDoubts = doubts.slice(0, 3);

  // Trending projects
  const topProjects = [...projects].sort((a, b) => b.likesCount - a.likesCount).slice(0, 2);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-card">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-medium text-white mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>JECRC University • B.Tech {currentUser.branch}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="mt-1 text-sm sm:text-base text-blue-100 font-normal">
            Your campus. Your knowledge. Your community.
          </p>

          {/* Quick stats on banner */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
              <Flame className="w-4 h-4 text-amber-300" />
              <span>{currentUser.streakDays} Day Practice Streak</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
              <Award className="w-4 h-4 text-emerald-300" />
              <span>{currentUser.reputation} Reputation Karma</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
              <Code2 className="w-4 h-4 text-cyan-300" />
              <span>{currentUser.solvedProblemsCount} DSA Solved</span>
            </div>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Quick Access Shortcuts */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Access</h2>
          <span className="text-xs text-brand-slate">Jump to essential tools</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Previous Year Papers', icon: <BookOpen className="w-5 h-5 text-brand-blue" />, page: 'resources', bg: 'hover:bg-blue-50/50 hover:border-blue-200' },
            { label: 'Ask a Doubt', icon: <HelpCircle className="w-5 h-5 text-amber-600" />, page: 'doubts', bg: 'hover:bg-amber-50/50 hover:border-amber-200' },
            { label: 'Coding Practice', icon: <Code2 className="w-5 h-5 text-emerald-600" />, page: 'dsa', bg: 'hover:bg-emerald-50/50 hover:border-emerald-200' },
            { label: 'AI Study Assistant', icon: <Sparkles className="w-5 h-5 text-purple-600" />, page: 'ai-assistant', bg: 'hover:bg-purple-50/50 hover:border-purple-200' },
            { label: 'Project Showcase', icon: <FolderGit2 className="w-5 h-5 text-indigo-600" />, page: 'projects', bg: 'hover:bg-indigo-50/50 hover:border-indigo-200' },
            { label: 'Study Groups', icon: <Users className="w-5 h-5 text-cyan-600" />, page: 'community', bg: 'hover:bg-cyan-50/50 hover:border-cyan-200' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(item.page as any)}
              className={`p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-left transition-all flex flex-col justify-between group ${item.bg}`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <p className="text-xs font-bold text-slate-800 leading-snug">{item.label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Learning Feed, Doubts, Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Your Progress Cards */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-blue" /> Your Academic & Coding Progress
              </h3>
              <button 
                onClick={() => setCurrentPage('profile')}
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                View Full Profile
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">DSA Solved</p>
                <p className="text-xl font-bold text-emerald-700 mt-1">{currentUser.solvedProblemsCount}</p>
                <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Helpful Answers</p>
                <p className="text-xl font-bold text-brand-blue mt-1">{currentUser.contributedAnswersCount}</p>
                <p className="text-[10px] text-slate-400 mt-1">+5 pts each</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Bookmarked Notes</p>
                <p className="text-xl font-bold text-purple-700 mt-1">{currentUser.bookmarkedResourceIds.length}</p>
                <p className="text-[10px] text-slate-400 mt-1">Ready offline</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Current Streak</p>
                <p className="text-xl font-bold text-amber-600 mt-1 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> {currentUser.streakDays}d
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Keep it up!</p>
              </div>
            </div>
          </section>

          {/* Continue Learning / Recently Bookmarked */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-blue" /> Continue Learning & Bookmarks
              </h3>
              <button
                onClick={() => setCurrentPage('resources')}
                className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
              >
                <span>All Resources</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {bookmarkedResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-200 shadow-2xs hover:shadow-subtle transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100">
                        {res.category}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-600 font-medium">{res.subject}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 truncate">{res.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                      <span>By {res.uploaderName}</span>
                      <span>•</span>
                      <span>{res.downloadsCount} downloads</span>
                      <span>•</span>
                      <span className="text-amber-500 font-bold">★ {res.rating}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => downloadResource(res.id)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-brand-blue hover:text-white text-brand-blue text-xs font-semibold rounded-xl transition-colors"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => toggleBookmarkResource(res.id)}
                      className="p-1.5 text-brand-blue hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Bookmark className="w-4 h-4 fill-brand-blue" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Campus Community Feed (Questions & Projects) */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" /> Active Doubt Discussions
              </h3>
              <button
                onClick={() => setCurrentPage('doubts')}
                className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
              >
                <span>Ask a Doubt</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  onClick={() => setCurrentPage('doubts')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-amber-200 shadow-2xs hover:shadow-subtle transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-700">{doubt.authorName}</span>
                        <span className="text-[11px] text-slate-400">• Sem {doubt.semester}</span>
                        <span className="text-[11px] text-slate-400">• {doubt.createdAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors line-clamp-1">
                        {doubt.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {doubt.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-600">
                          {doubt.subject}
                        </span>
                        {doubt.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0">
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs font-bold text-slate-700 mt-0.5">{doubt.upvotes}</span>
                      <span className="text-[10px] text-slate-400 mt-1">{doubt.answers.length} ans</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Daily Coding Challenge Widget */}
          <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Daily Coding Challenge</span>
              </div>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                +15 Points
              </span>
            </div>

            <h4 className="text-base font-bold text-white">Longest Substring Without Repeating Characters</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Find the length of the longest substring without duplicate characters using two pointers & sliding window.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Medium</span>
                <span>Acceptance: 34.5%</span>
              </div>
              <button
                onClick={() => {
                  setActiveDsaId('dsa_03');
                  setCurrentPage('dsa');
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Solve in Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        </div>

        {/* Right 1 Col: Contextual Right Panels */}
        <div className="space-y-6">
          
          {/* Upcoming Campus Events */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-blue" /> Upcoming Campus Events
              </h3>
            </div>

            <div className="space-y-3.5">
              {UPCOMING_CAMPUS_EVENTS.map((ev) => (
                <div key={ev.id} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 transition-colors">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-brand-blue">
                    {ev.badge}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">{ev.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {ev.date}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{ev.venue}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{ev.registeredCount} students attending</span>
                    <button 
                      onClick={() => setCurrentPage('community')}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For You */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Recommended for Semester {currentUser.semester}
              </h3>
            </div>

            <div className="space-y-2.5">
              {recommendedResources.map((res) => (
                <div
                  key={res.id}
                  onClick={() => setCurrentPage('resources')}
                  className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 cursor-pointer transition-all"
                >
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{res.title}</p>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                    <span className="text-brand-blue font-semibold">{res.category}</span>
                    <span className="text-amber-500 font-bold">★ {res.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Projects on Campus */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600" /> Trending Projects
              </h3>
              <button
                onClick={() => setCurrentPage('projects')}
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                All
              </button>
            </div>

            <div className="space-y-3">
              {topProjects.map((proj) => (
                <div 
                  key={proj.id}
                  onClick={() => setCurrentPage('projects')}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-slate-100 hover:border-indigo-200 transition-colors"
                >
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-3 bg-white">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{proj.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{proj.tagline}</p>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                      <span>By {proj.creatorName}</span>
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        ♥ {proj.likesCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
