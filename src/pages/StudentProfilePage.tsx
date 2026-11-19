import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  GraduationCap, 
  GitBranch, 
  Globe, 
  Award, 
  Flame, 
  Code2, 
  BookOpen, 
  Edit3, 
  CheckCircle2, 
  X, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUser, resources, projects, setCurrentPage, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [githubUrl, setGithubUrl] = useState(currentUser.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(currentUser.linkedinUrl || '');
  const [skillsStr, setSkillsStr] = useState(currentUser.skills.join(', '));
  const [interestsStr, setInterestsStr] = useState(currentUser.interests.join(', '));

  const userBookmarks = resources.filter(r => currentUser.bookmarkedResourceIds.includes(r.id));
  const userProjects = projects.filter(p => p.creatorName === currentUser.name || p.creatorName === 'Sneh');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      bio,
      githubUrl,
      linkedinUrl,
      skills: skillsStr.split(',').map(s => s.trim()).filter(Boolean),
      interests: interestsStr.split(',').map(i => i.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Banner Graphic */}
        <div className="h-32 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {currentUser.name}
                </h1>
                <p className="text-xs font-semibold text-brand-blue flex items-center gap-1 mt-0.5">
                  <GraduationCap className="w-4 h-4" /> B.Tech {currentUser.branch} • Sem {currentUser.semester}
                </p>
                <p className="text-[11px] text-slate-400">Roll: {currentUser.rollNumber} • {currentUser.email}</p>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div className="px-2 text-center">
                <span className="block text-base font-extrabold text-brand-blue">{currentUser.reputation}</span>
                <span className="text-[10px] text-slate-500 font-medium">Reputation</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="px-2 text-center">
                <span className="block text-base font-extrabold text-amber-600 flex items-center justify-center gap-0.5">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> {currentUser.streakDays}d
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Daily Streak</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="px-2 text-center">
                <span className="block text-base font-extrabold text-emerald-700">{currentUser.solvedProblemsCount}</span>
                <span className="text-[10px] text-slate-500 font-medium">Problems</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Form vs View Bio */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">About / Student Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Programming Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={skillsStr}
                    onChange={(e) => setSkillsStr(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Interests (comma-separated)</label>
                  <input
                    type="text"
                    value={interestsStr}
                    onChange={(e) => setInterestsStr(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Profile Details
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
                {currentUser.bio}
              </p>

              {/* Skills & Interests Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Skills:</span>
                {currentUser.skills.map(sk => (
                  <span key={sk} className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-brand-blue font-semibold border border-blue-100">
                    {sk}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Interests:</span>
                {currentUser.interests.map(intr => (
                  <span key={intr} className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 text-brand-purple font-semibold border border-purple-100">
                    {intr}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Earned Campus Badges & Achievements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentUser.badges.map(b => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">{b.icon}</span>
              <div>
                <p className="text-xs font-bold text-slate-900">{b.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{b.description}</p>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Earned {b.dateEarned}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Published Projects & Saved Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Your Projects */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Your Published Projects</h3>
            <button
              onClick={() => setCurrentPage('projects')}
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              Showcase →
            </button>
          </div>

          <div className="space-y-3">
            {userProjects.map(p => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</p>
                </div>
                <span className="text-xs font-bold text-rose-600 flex-shrink-0">♥ {p.likesCount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarked Materials */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Saved Study Resources</h3>
            <button
              onClick={() => setCurrentPage('resources')}
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              Browse Library →
            </button>
          </div>

          <div className="space-y-3">
            {userBookmarks.map(res => (
              <div key={res.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{res.title}</h4>
                  <p className="text-[11px] text-slate-500">{res.subject} • {res.category}</p>
                </div>
                <span className="text-xs font-bold text-amber-500 flex-shrink-0">★ {res.rating}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
