import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { X, Mail, Lock, User, GraduationCap, Code, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Branch, Semester } from '../../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    currentUser, 
    updateCurrentUser,
    setCurrentPage,
    showToast 
  } = useApp();

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('••••••••••');
  const [branch, setBranch] = useState<Branch>(currentUser.branch);
  const [semester, setSemester] = useState<Semester>(currentUser.semester);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'C++', 'React']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Web Development', 'AI/ML', 'Competitive Coding']);

  if (!isAuthModalOpen) return null;

  const branchesList: Branch[] = [
    'Computer Science & Engineering',
    'AI & Data Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const availableSkills = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker'];
  const availableInterests = ['Web Development', 'AI/ML', 'Competitive Coding', 'Mobile Apps', 'Cybersecurity', 'Cloud & DevOps', 'Robotics', 'Hackathons'];

  const toggleSkill = (s: string) => {
    setSelectedSkills(prev => 
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  const toggleInterest = (i: string) => {
    setSelectedInterests(prev => 
      prev.includes(i) ? prev.filter(item => item !== i) : [...prev, i]
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed In Successfully!', `Welcome back to JECRC Nexus, ${currentUser.name}!`);
    setIsAuthModalOpen(false);
    setCurrentPage('dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMode('onboarding');
  };

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      branch,
      semester,
      skills: selectedSkills,
      interests: selectedInterests,
    });
    showToast('Welcome to JECRC Nexus!', 'Your student profile and personalized feed are ready.');
    setIsAuthModalOpen(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Brand */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <BrandLogo size="md" showTagline={false} />
          <h2 className="text-xl font-bold text-brand-dark mt-3">
            {authMode === 'login' && 'Sign in to JECRC Nexus'}
            {authMode === 'signup' && 'Create your JECRC Student Account'}
            {authMode === 'forgot' && 'Reset your password'}
            {authMode === 'onboarding' && 'Personalize your JECRC Profile'}
          </h2>
          <p className="text-xs text-brand-slate mt-1 max-w-xs">
            {authMode === 'login' && 'Access past papers, doubt discussions, code arena, and campus groups.'}
            {authMode === 'signup' && 'Join thousands of JECRC University engineers and scholars.'}
            {authMode === 'forgot' && 'Enter your official @jecrc.ac.in email for password recovery.'}
            {authMode === 'onboarding' && 'Select your branch, current semester, and tech skills to tailor your feed.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Quick Demo Switch Banner */}
          <div className="mb-5 p-3 rounded-xl bg-brand-tealLight/70 border border-brand-teal/20 text-xs text-brand-dark flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-blue">Demonstration Student Profile</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Ready with verified student demo profile: <strong>Sneh (B.Tech CSE, 5th Sem)</strong>. You can sign in instantly or test custom credentials.
              </p>
            </div>
          </div>

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Official Student Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none"
                    placeholder="student.name.cse23@jecrc.ac.in"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-xs text-brand-blue hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none"
                    placeholder="••••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Sign In to Nexus <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">Don't have an account yet? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-xs font-semibold text-brand-blue hover:underline"
                >
                  Create one now
                </button>
              </div>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                    placeholder="e.g. Priya Patel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">JECRC Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                    placeholder="rollnumber@jecrc.ac.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Continue to Academic Profile <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">Already registered? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-semibold text-brand-blue hover:underline"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registered Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                    placeholder="your.email@jecrc.ac.in"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast('Password Reset Link Sent', 'Check your student inbox for password recovery instructions.');
                  setAuthMode('login');
                }}
                className="w-full py-2.5 px-4 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
              >
                Send Recovery Link
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full text-xs font-semibold text-slate-600 hover:text-slate-900 text-center"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* ONBOARDING FLOW */}
          {authMode === 'onboarding' && (
            <form onSubmit={handleCompleteOnboarding} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-brand-blue" /> Branch / Dept
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as Branch)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-brand-blue outline-none"
                  >
                    {branchesList.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value) as Semester)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-brand-blue outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skills Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-brand-cyan" /> Programming Skills
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableSkills.map((sk) => {
                    const active = selectedSkills.includes(sk);
                    return (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => toggleSkill(sk)}
                        className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 border-brand-blue text-brand-blue'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {sk} {active && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interests Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> Areas of Interest
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableInterests.map((interest) => {
                    const active = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                          active
                            ? 'bg-purple-50 border-brand-purple text-brand-purple'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {interest} {active && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Complete Onboarding & Enter Nexus <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
