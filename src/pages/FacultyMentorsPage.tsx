import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_FACULTY_MENTORS, FacultyMentorProfile } from '../data/mockData';
import {
  GraduationCap,
  Search,
  Star,
  Clock,
  MapPin,
  MessageSquare,
  CheckCircle2,
  X,
  Calendar,
} from 'lucide-react';

export const FacultyMentorsPage: React.FC = () => {
  const { showToast, setCurrentPage } = useApp();
  const [roleFilter, setRoleFilter] = useState<'All' | 'Faculty Advisor' | 'Senior Peer Mentor'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<FacultyMentorProfile | null>(null);
  const [topicNote, setTopicNote] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Tomorrow • 4:00 PM');

  const filteredMentors = MOCK_FACULTY_MENTORS.filter((m) => {
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q) ||
      m.topics.some((t) => t.toLowerCase().includes(q));
    return matchesRole && matchesSearch;
  });

  const handleBookGuidance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;
    showToast(
      'Guidance Request Sent!',
      `Scheduled request with ${selectedMentor.name} (${preferredSlot}).`
    );
    setSelectedMentor(null);
    setTopicNote('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#45B5A7] to-[#2E988B] text-white p-6 sm:p-8 rounded-[28px] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-brand-amber" />
            <span>JECRC Academic & Career Mentorship</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Faculty Advisors & Senior Mentors
          </h1>
          <p className="text-xs sm:text-sm text-teal-50/95 mt-1 max-w-xl">
            Connect directly with JECRC professors and high-achieving senior mentors for subject guidance, project reviews, and placement preparation.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('community')}
          className="px-4 py-2.5 bg-white hover:bg-brand-amberLight text-brand-dark font-bold text-xs rounded-xl shadow-subtle transition-colors self-start md:self-auto"
        >
          Join Study Circles →
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
            placeholder="Search faculty, department, or topic (DSA, Maths, AI)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs text-brand-dark outline-none focus:border-brand-teal shadow-subtle"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Faculty Advisor', 'Senior Peer Mentor'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                roleFilter === role
                  ? 'bg-brand-teal text-white shadow-subtle'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
              }`}
            >
              {role === 'All' ? 'All Mentors' : role + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-tealLight"
                  />
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        mentor.role === 'Faculty Advisor'
                          ? 'bg-brand-tealLight text-brand-tealDark'
                          : 'bg-brand-coralLight text-brand-coral'
                      }`}
                    >
                      {mentor.role}
                    </span>
                    <h2 className="text-base font-extrabold text-brand-dark mt-1">
                      {mentor.name}
                    </h2>
                    <p className="text-xs text-slate-500">{mentor.department}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-600 bg-brand-amberLight px-2 py-1 rounded-xl">
                  <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
                  {mentor.rating}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{mentor.bio}</p>

              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {mentor.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-brand-bg text-slate-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-brand-bg/80 space-y-1.5 text-[11px] text-slate-600">
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                  <span>{mentor.availability}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-coral flex-shrink-0" />
                  <span>{mentor.officeOrChannel}</span>
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-slate-400">
                {mentor.guidanceCount}+ students guided
              </span>
              <button
                onClick={() => setSelectedMentor(mentor)}
                className="px-4 py-2 bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs rounded-xl shadow-subtle transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Request Guidance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Guidance Modal */}
      {selectedMentor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setSelectedMentor(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-[24px] shadow-card-hover border border-slate-100 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedMentor.avatar}
                alt={selectedMentor.name}
                className="w-12 h-12 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-base font-extrabold text-brand-dark">
                  Connect with {selectedMentor.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedMentor.department}</p>
              </div>
            </div>

            <form onSubmit={handleBookGuidance} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Slot
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-brand-teal absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-teal"
                  >
                    <option>Tomorrow • 4:00 PM</option>
                    <option>{selectedMentor.availability}</option>
                    <option>Weekend Doubt Session • 6:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic or Academic Question
                </label>
                <textarea
                  rows={3}
                  required
                  value={topicNote}
                  onChange={(e) => setTopicNote(e.target.value)}
                  placeholder="Describe what you'd like guidance on (e.g., Operating Systems lab viva, SIH project architecture)..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-brand-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-teal hover:bg-brand-tealDark text-white font-bold text-xs rounded-xl shadow-subtle transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Guidance Request</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
