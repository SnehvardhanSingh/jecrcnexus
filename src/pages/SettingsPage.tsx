import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Bell, 
  Shield, 
  RotateCcw, 
  CheckCircle2, 
  Moon, 
  Sun, 
  Mail, 
  Lock, 
  User,
  GraduationCap
} from 'lucide-react';
import { Branch, Semester } from '../types';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateCurrentUser, userRole, setUserRole, showToast } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [branch, setBranch] = useState<Branch>(currentUser.branch);
  const [semester, setSemester] = useState<Semester>(currentUser.semester);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [doubtAnswers, setDoubtAnswers] = useState(true);
  const [hackathonAlerts, setHackathonAlerts] = useState(true);

  const branchesList: Branch[] = [
    'Computer Science & Engineering',
    'AI & Data Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      branch,
      semester
    });
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore default mock data for JECRC Nexus?')) {
      localStorage.clear();
      showToast('Data Reset', 'Default campus data restored. Reloading...');
      setTimeout(() => window.location.reload(), 600);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Settings className="w-4 h-4" /> Preferences & Configuration
        </div>
        <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
          Account & Platform Settings
        </h1>
        <p className="text-xs text-brand-slate mt-1">
          Manage your personal university profile, notifications, and portal experience.
        </p>
      </div>

      {/* Account Info Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-blue" />
          <span>Student Account Information</span>
        </h2>

        <form onSubmit={handleSaveAccount} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official University Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Department</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value as Branch)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
              >
                {branchesList.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Current Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value) as Semester)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Save Account Settings
          </button>
        </form>
      </div>

      {/* Role Switcher Demo */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-600" />
          <span>Role Switcher (Evaluation & Demo Mode)</span>
        </h2>
        <p className="text-xs text-slate-500">
          Switch between regular student mode and Faculty/Admin mode to test the Moderation Dashboard and verification privileges.
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setUserRole('student');
              showToast('Switched to Student Role');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              userRole === 'student'
                ? 'bg-brand-blue text-white border-brand-blue shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Student Role
          </button>
          <button
            onClick={() => {
              setUserRole('admin');
              showToast('Switched to Faculty / Admin Role');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              userRole === 'admin'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Faculty / Admin Role
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-cyan" />
          <span>Campus Notification Preferences</span>
        </h2>

        <div className="space-y-3 pt-1">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Answers on My Doubts</p>
              <p className="text-[11px] text-slate-500">Notify me immediately when someone answers my academic questions.</p>
            </div>
            <input
              type="checkbox"
              checked={doubtAnswers}
              onChange={(e) => setDoubtAnswers(e.target.checked)}
              className="w-4 h-4 text-brand-blue rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Hackathon & Team Recruitment Alerts</p>
              <p className="text-[11px] text-slate-500">Get notified when new project teammate openings are posted for my branch.</p>
            </div>
            <input
              type="checkbox"
              checked={hackathonAlerts}
              onChange={(e) => setHackathonAlerts(e.target.checked)}
              className="w-4 h-4 text-brand-blue rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Weekly Academic Digest</p>
              <p className="text-[11px] text-slate-500">Receive top trending past year papers and coding questions in email.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-brand-blue rounded"
            />
          </label>
        </div>
      </div>

      {/* Reset State */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Restore Demonstration Data</h3>
          <p className="text-xs text-slate-500 mt-0.5">Reset all custom bookmarks, doubt questions, and code solutions to factory defaults.</p>
        </div>
        <button
          onClick={handleResetData}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Data
        </button>
      </div>
    </div>
  );
};
