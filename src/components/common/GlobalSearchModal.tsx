import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Code2, 
  Users, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { PageId } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setCurrentPage, 
    resources, 
    doubts, 
    projects, 
    dsaProblems, 
    studyGroups, 
    setActiveDsaId 
  } = useApp();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'resources' | 'doubts' | 'projects' | 'dsa' | 'groups'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search through all entities
  const filteredResources = resources.filter(
    (r) => r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q))
  ).slice(0, 4);

  const filteredDoubts = doubts.filter(
    (d) => d.title.toLowerCase().includes(q) || d.subject.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q))
  ).slice(0, 4);

  const filteredProjects = projects.filter(
    (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q))
  ).slice(0, 4);

  const filteredDsa = dsaProblems.filter(
    (p) => p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q)
  ).slice(0, 4);

  const filteredGroups = studyGroups.filter(
    (g) => g.name.toLowerCase().includes(q) || g.subject.toLowerCase().includes(q)
  ).slice(0, 3);

  const handleSelect = (page: PageId, extraId?: string) => {
    setIsSearchOpen(false);
    if (page === 'dsa' && extraId) {
      setActiveDsaId(extraId);
    }
    setCurrentPage(page);
  };

  const totalResults = 
    (filterType === 'all' || filterType === 'resources' ? filteredResources.length : 0) +
    (filterType === 'all' || filterType === 'doubts' ? filteredDoubts.length : 0) +
    (filterType === 'all' || filterType === 'projects' ? filteredProjects.length : 0) +
    (filterType === 'all' || filterType === 'dsa' ? filteredDsa.length : 0) +
    (filterType === 'all' || filterType === 'groups' ? filteredGroups.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-brand-slate" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search PYQs, doubts, code problems, projects, or study circles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-brand-dark text-base placeholder:text-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 bg-white overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'resources', label: 'Academic Resources' },
            { id: 'doubts', label: 'Doubts & Q&A' },
            { id: 'dsa', label: 'DSA Arena' },
            { id: 'projects', label: 'Projects' },
            { id: 'groups', label: 'Study Groups' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id as any)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                filterType === cat.id
                  ? 'bg-brand-blue text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results / Suggestions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" /> Popular Campus Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Engineering Mathematics PYQ', 'Two Sum LeetCode', 'Dijkstra Algorithm', 'SIH 2026 Team', 'DBMS Normalization', 'Celebal Interview'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-2.5 py-1 text-xs bg-slate-50 hover:bg-brand-tealLight hover:text-brand-tealDark border border-slate-200 rounded-lg text-slate-600 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> Quick Shortcuts
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSelect('resources')}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 hover:border-brand-teal/30 hover:bg-brand-tealLight/40 transition-all text-left text-xs font-medium text-slate-700"
                  >
                    <BookOpen className="w-4 h-4 text-brand-teal" />
                    Browse PYQ Papers
                  </button>
                  <button
                    onClick={() => handleSelect('courses')}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 hover:border-brand-teal/30 hover:bg-brand-tealLight/40 transition-all text-left text-xs font-medium text-slate-700"
                  >
                    <Code2 className="w-4 h-4 text-emerald-600" />
                    Courses & Subjects
                  </button>
                  <button
                    onClick={() => handleSelect('mentors')}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 hover:border-brand-coral/30 hover:bg-brand-coralLight/40 transition-all text-left text-xs font-medium text-slate-700"
                  >
                    <Users className="w-4 h-4 text-brand-coral" />
                    Faculty & Mentors
                  </button>
                </div>
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-10">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for general terms like "Maths", "C programming", "Array", or "SIH".
              </p>
            </div>
          )}

          {/* Academic Resources Results */}
          {(filterType === 'all' || filterType === 'resources') && filteredResources.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Academic Resources ({filteredResources.length})
              </p>
              <div className="space-y-1.5">
                {filteredResources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleSelect('resources')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-xs font-semibold text-slate-900 truncate">{res.title}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{res.subject}</span>
                        <span>•</span>
                        <span>Sem {res.semester}</span>
                        <span>•</span>
                        <span className="font-medium text-brand-cyan">{res.category}</span>
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doubt Community Results */}
          {(filterType === 'all' || filterType === 'doubts') && filteredDoubts.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Doubt Community ({filteredDoubts.length})
              </p>
              <div className="space-y-1.5">
                {filteredDoubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    onClick={() => handleSelect('doubts')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/50 border border-slate-100 hover:border-amber-200 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-xs font-semibold text-slate-900 truncate">{doubt.title}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{doubt.subject}</span>
                        <span>•</span>
                        <span>{doubt.answers.length} answers</span>
                        <span>•</span>
                        <span>{doubt.upvotes} upvotes</span>
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DSA Arena Problems */}
          {(filterType === 'all' || filterType === 'dsa') && filteredDsa.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> DSA Problems ({filteredDsa.length})
              </p>
              <div className="space-y-1.5">
                {filteredDsa.map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => handleSelect('dsa', prob.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-slate-900 truncate">{prob.title}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          prob.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                          prob.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{prob.topic}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {(filterType === 'all' || filterType === 'projects') && filteredProjects.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Student Projects ({filteredProjects.length})
              </p>
              <div className="space-y-1.5">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleSelect('projects')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-xs font-semibold text-slate-900 truncate">{proj.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{proj.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with Tab / Enter</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
