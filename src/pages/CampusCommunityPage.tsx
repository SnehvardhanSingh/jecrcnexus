import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudyGroup } from '../types';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  PlusCircle, 
  Search, 
  Award, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  X, 
  GraduationCap, 
  UserCheck, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { MOCK_STUDENTS } from '../data/mockData';

export const CampusCommunityPage: React.FC = () => {
  const { 
    studyGroups, 
    toggleJoinGroup, 
    createGroup, 
    currentUser, 
    setCurrentPage, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'groups' | 'mentors' | 'peers' | 'exchange'>('groups');
  const [searchQuery, setSearchQuery] = useState('');

  // Create Group Modal
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [gName, setGName] = useState('');
  const [gSubject, setGSubject] = useState('Data Structures and Algorithms');
  const [gDesc, setGDesc] = useState('');
  const [gTime, setGTime] = useState('Every Tuesday & Thursday, 5:00 PM');
  const [gMaxMembers, setGMaxMembers] = useState(40);
  const [gTags, setGTags] = useState('LeetCode, Exam Prep');

  const filteredGroups = studyGroups.filter(g => 
    !searchQuery || g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gName.trim()) return;

    createGroup({
      name: gName,
      subject: gSubject,
      branch: currentUser.branch,
      semester: currentUser.semester,
      description: gDesc || 'Peer study circle for problem solving and concept discussion.',
      maxMembers: gMaxMembers,
      nextMeetingTime: gTime,
      tags: gTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsCreateGroupModalOpen(false);
    setGName('');
    setGDesc('');
  };

  const mentorsList = [
    {
      name: 'Harshvardhan Singh',
      role: 'Senior Peer Mentor',
      branch: 'Computer Science (7th Sem)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      achievement: 'Incoming Amazon SDE Intern • LeetCode 2040',
      topics: ['DSA Interview Prep', 'System Design Basics', 'FAANG OA Strategies'],
      rating: 4.9,
      studentsMentored: 45
    },
    {
      name: 'Priya Patel',
      role: 'Research & ML Mentor',
      branch: 'AI & Data Science (5th Sem)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      achievement: 'Smart India Hackathon Finalist • NLP Researcher',
      topics: ['PyTorch / Computer Vision', 'FastAPI Deployment', 'Research Paper Writing'],
      rating: 5.0,
      studentsMentored: 32
    },
    {
      name: 'Dr. S. K. Gupta',
      role: 'Faculty Advisor',
      branch: 'Department of Mathematics',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
      achievement: 'Associate Professor • 14 Years Teaching at JECRC',
      topics: ['Matrix Diagonalization', 'Differential Calculus', 'Engineering Maths I & II'],
      rating: 4.8,
      studentsMentored: 310
    }
  ];

  const skillExchanges = [
    {
      student: 'Rohan Meena (5th Sem IT)',
      teaches: 'Docker, AWS Cloud & Linux Shell',
      wants: 'React & TailwindCSS frontend polish',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    {
      student: 'Ananya Verma (3rd Sem ECE)',
      teaches: 'Arduino, Embedded C & Circuit Design',
      wants: 'Python Data Structures & LeetCode help',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <Users className="w-4 h-4" /> Campus Community Hub
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            JECRC University Student Community
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Collaborate in branch study circles, connect with senior peer mentors, and exchange technical skills across departments.
          </p>
        </div>

        <button
          onClick={() => setIsCreateGroupModalOpen(true)}
          className="px-4 py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Study Group</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 font-bold rounded-xl transition-all ${
            activeTab === 'groups' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Study Groups ({studyGroups.length})
        </button>
        <button
          onClick={() => setActiveTab('mentors')}
          className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'mentors' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Peer Mentorship</span>
        </button>
        <button
          onClick={() => setActiveTab('exchange')}
          className={`px-4 py-2 font-bold rounded-xl transition-all ${
            activeTab === 'exchange' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Skill Exchange Board
        </button>
      </div>

      {/* STUDY GROUPS TAB */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100">
                      Sem {group.semester} • {group.subject}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {group.memberCount} / {group.maxMembers} Members
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {group.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span>Next Meeting: <strong>{group.nextMeetingTime}</strong></span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {group.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Lead: {group.leadName}</span>

                  <button
                    onClick={() => toggleJoinGroup(group.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      group.isMember
                        ? 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 border border-slate-200'
                        : 'bg-brand-blue hover:bg-brand-blueHover text-white shadow-xs'
                    }`}
                  >
                    {group.isMember ? 'Leave Group' : 'Join Study Circle'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PEER MENTORSHIP TAB */}
      {activeTab === 'mentors' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#45B5A7] to-[#2E988B] text-white p-6 rounded-3xl shadow-card">
            <h2 className="text-xl font-extrabold">Connect with Senior JECRC Mentors</h2>
            <p className="text-xs text-teal-50 mt-1 max-w-xl leading-relaxed">
              Volunteer seniors and faculty advisors offering 1:1 guidance on DSA, placements, hackathons, and research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentorsList.map((mentor, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-2xl object-cover shadow-2xs" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{mentor.name}</h3>
                      <p className="text-[11px] text-brand-blue font-semibold">{mentor.role}</p>
                      <p className="text-[10px] text-slate-400">{mentor.branch}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-tealLight/60 rounded-2xl border border-brand-teal/20 mb-4 text-xs font-semibold text-brand-tealDark">
                    {mentor.achievement}
                  </div>

                  <p className="text-xs font-bold text-slate-700 mb-2">Mentoring Focus:</p>
                  <ul className="text-xs space-y-1 text-slate-600">
                    {mentor.topics.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-amber-500 font-bold">★ {mentor.rating} ({mentor.studentsMentored} sessions)</span>
                  <button
                    onClick={() => showToast('Session Requested', `Request sent to ${mentor.name}. They will reach out via student email.`)}
                    className="px-3.5 py-1.5 bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Book 1:1
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILL EXCHANGE TAB */}
      {activeTab === 'exchange' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillExchanges.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <img src={item.avatar} alt={item.student} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.student}</h4>
                      <span className="text-[10px] text-slate-400">JECRC Peer Exchange</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                      <strong className="text-emerald-800">Can Teach:</strong>
                      <p className="text-slate-700 mt-0.5">{item.teaches}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                      <strong className="text-brand-blue">Wants to Learn:</strong>
                      <p className="text-slate-700 mt-0.5">{item.wants}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => showToast('Skill Swap Request Sent!', 'Peer has been notified.')}
                    className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-2xs"
                  >
                    Propose Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE GROUP MODAL */}
      {isCreateGroupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Create Campus Study Circle</h3>
              <button
                onClick={() => setIsCreateGroupModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroupSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Group Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GATE 2027 Mathematics Circle"
                  value={gName}
                  onChange={(e) => setGName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Focus</label>
                <input
                  type="text"
                  required
                  value={gSubject}
                  onChange={(e) => setGSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weekly Meeting Schedule</label>
                <input
                  type="text"
                  value={gTime}
                  onChange={(e) => setGTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Group Goals & Syllabus</label>
                <textarea
                  rows={3}
                  placeholder="Explain discussion topics or problem solving schedule..."
                  value={gDesc}
                  onChange={(e) => setGDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Launch Study Circle
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
