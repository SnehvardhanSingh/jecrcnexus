import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_COURSES } from '../data/mockData';
import {
  Library,
  Search,
  BookOpen,
  HelpCircle,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CoursesSubjectsPage: React.FC = () => {
  const { currentUser, setCurrentPage, resources } = useApp();
  const [selectedSem, setSelectedSem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSem = selectedSem === 'All' || course.semester.toString() === selectedSem;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q) ||
      course.facultyLead.toLowerCase().includes(q);
    return matchesSem && matchesSearch;
  });

  const accentStyles = {
    teal: {
      badge: 'bg-brand-tealLight text-brand-tealDark',
      bar: 'bg-brand-teal',
      iconBox: 'bg-brand-teal text-white',
    },
    coral: {
      badge: 'bg-brand-coralLight text-brand-coral',
      bar: 'bg-brand-coral',
      iconBox: 'bg-brand-coral text-white',
    },
    amber: {
      badge: 'bg-brand-amberLight text-amber-800',
      bar: 'bg-brand-amber',
      iconBox: 'bg-brand-amber text-brand-dark',
    },
    violet: {
      badge: 'bg-brand-purpleLight text-brand-purple',
      bar: 'bg-brand-purple',
      iconBox: 'bg-brand-purple text-white',
    },
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-tealDark uppercase tracking-wider">
            <Library className="w-4 h-4" /> JECRC Curriculum Hub
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            Courses & Subjects
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Explore semester-wise subjects for {currentUser.branch}, track syllabus coverage, and jump directly to verified notes and PYQs.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('resources')}
          className="px-4 py-2.5 bg-brand-teal hover:bg-brand-tealDark text-white font-bold text-xs rounded-xl shadow-subtle transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Resource Library ({resources.length})</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject name, course code (BCS-501), or faculty..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs text-brand-dark outline-none focus:border-brand-teal shadow-subtle"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', '1', '3', '5'].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSem(sem)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSem === sem
                  ? 'bg-brand-teal text-white shadow-subtle'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
              }`}
            >
              {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const style = accentStyles[course.accentColor];
          return (
            <div
              key={course.id}
              className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl ${style.iconBox} flex items-center justify-center text-[11px] font-extrabold shadow-2xs`}
                    >
                      {course.code.split('-')[0]}
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                        {course.code} • Sem {course.semester}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{course.credits} Credits</p>
                    </div>
                  </div>

                  {course.progressPercent === 100 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Complete
                    </span>
                  )}
                </div>

                <h2 className="text-base font-extrabold text-brand-dark leading-snug">
                  {course.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{course.facultyLead}</span>
                </p>

                {/* Syllabus Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-semibold text-slate-600">Syllabus Coverage</span>
                    <span className="font-extrabold text-brand-dark">{course.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${style.bar}`}
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Modules */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {course.modules.map((mod) => (
                    <span
                      key={mod}
                      className="text-[10px] font-medium px-2 py-1 rounded-lg bg-brand-bg text-slate-600 border border-slate-100"
                    >
                      {mod}
                    </span>
                  ))}
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-brand-bg/80 border border-slate-100 text-[11px] text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-amber flex-shrink-0" />
                  <span className="truncate">Next: {course.nextTopic}</span>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentPage('resources')}
                  className="flex-1 py-2 px-3 rounded-xl bg-brand-tealLight hover:bg-brand-teal text-brand-tealDark hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{course.resourcesCount} Materials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage('doubts')}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-brand-coralLight text-slate-600 hover:text-brand-coral border border-slate-100 transition-colors"
                  title="Ask a Doubt in this Subject"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
