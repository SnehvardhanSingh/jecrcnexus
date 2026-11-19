import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { NotificationDropdown } from './NotificationDropdown';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck, 
  GraduationCap, 
  ChevronDown,
  LogOut,
  Settings,
  User,
  Home
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { 
    currentUser, 
    setCurrentPage, 
    currentPage, 
    setIsSearchOpen, 
    setIsAuthModalOpen,
    setAuthMode,
    userRole,
    setUserRole,
    unreadCount,
    showToast
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <BrandLogo 
            size="md" 
            showTagline={true} 
            onClick={() => setCurrentPage('dashboard')} 
          />
        </div>

        {/* Center: Global Search Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-xl text-xs text-slate-500 transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors" />
              <span>Search PYQs, doubt discussions, DSA questions...</span>
            </div>
            <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-slate-600 hover:text-brand-blue rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* AI Study Assistant Quick Action */}
          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              currentPage === 'ai-assistant'
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-brand-blue rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Campus Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
            />
          </div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 sm:pl-2 sm:pr-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200"
              />
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                  {currentUser.name}
                  {userRole === 'admin' && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1 rounded">Admin</span>
                  )}
                </p>
                <p className="text-[10px] text-slate-500 truncate max-w-[110px]">
                  Sem {currentUser.semester} • CSE
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div 
                className="absolute right-0 top-12 z-50 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-600">Reputation</span>
                    <span className="font-bold text-brand-blue">{currentUser.reputation} pts</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Student Profile
                  </button>
                  <button
                    onClick={() => setCurrentPage('settings')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </button>
                  
                  {/* Role Switcher Demo */}
                  <div className="px-3 py-1.5 my-1 border-t border-b border-slate-100 bg-slate-50/60">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Role Preview Mode
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole('student');
                          showToast('Switched to Student Role', 'Viewing standard student experience.');
                        }}
                        className={`flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${
                          userRole === 'student' ? 'bg-white border-brand-blue text-brand-blue shadow-2xs' : 'text-slate-600 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        Student
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole('admin');
                          setCurrentPage('admin');
                          showToast('Switched to Faculty / Admin Role', 'Access granted to Moderation Dashboard.');
                        }}
                        className={`flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${
                          userRole === 'admin' ? 'bg-white border-amber-600 text-amber-700 shadow-2xs' : 'text-slate-600 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    Switch / Demo Account
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPage('landing');
                      showToast('Viewing Public Portal', 'Public overview and welcome page.');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Home className="w-4 h-4 text-slate-400" />
                    Nexus Landing Page
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
