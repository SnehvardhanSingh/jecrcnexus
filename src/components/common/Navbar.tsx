import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { NotificationDropdown } from './NotificationDropdown';
import {
  Search,
  Bell,
  Mail,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  Settings,
  User,
  Home,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  isPublicLanding?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  isPublicLanding = false,
}) => {
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
    showToast,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const userHandle = `@${currentUser.name.toLowerCase().replace(/\s+/g, '_')}_ju`;

  return (
    <header
      className={`sticky top-0 z-30 transition-all ${
        isPublicLanding
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/70'
          : 'bg-brand-bg/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Brand Logo (or Search on Desktop Dashboard) */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {!isPublicLanding && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2.5 bg-white text-slate-600 hover:text-brand-dark rounded-xl border border-slate-200/80 shadow-subtle transition-colors"
              aria-label="Toggle Navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {isPublicLanding ? (
            <BrandLogo
              size="md"
              showTagline={true}
              onClick={() => setCurrentPage('dashboard')}
            />
          ) : (
            <div className="lg:hidden">
              <BrandLogo
                size="sm"
                compact={true}
                onClick={() => setCurrentPage('dashboard')}
              />
            </div>
          )}

          {/* Reference-Style Pill Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-white/90 border border-slate-200/70 rounded-2xl text-xs text-slate-400 transition-all group shadow-subtle"
            >
              <span className="truncate group-hover:text-slate-600 transition-colors">
                Search for PYQs, subjects, mentors, or doubts...
              </span>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-md">
                  Ctrl K
                </kbd>
                <Search className="w-4 h-4 text-slate-500 group-hover:text-brand-teal transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Actions: Messages, Notifications, & Floating Student Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2.5 bg-white text-slate-600 hover:text-brand-teal rounded-xl border border-slate-200/70 shadow-subtle transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI Tutor Shortcut Pill on Landing / Desktop */}
          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              currentPage === 'ai-assistant'
                ? 'bg-brand-teal text-white border-brand-teal shadow-subtle'
                : 'bg-white hover:bg-brand-tealLight text-slate-700 hover:text-brand-tealDark border-slate-200/80 shadow-subtle'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>AI Tutor</span>
          </button>

          {/* Discussion / Messages Shortcut */}
          <button
            onClick={() => setCurrentPage('doubts')}
            className="p-2.5 bg-white text-slate-600 hover:text-brand-teal rounded-xl border border-slate-200/70 shadow-subtle transition-colors relative"
            aria-label="Discussion Groups"
            title="Discussion Groups & Doubts"
          >
            <Mail className="w-[18px] h-[18px]" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2.5 bg-white text-slate-600 hover:text-brand-teal rounded-xl border border-slate-200/70 shadow-subtle transition-colors"
              aria-label="Campus Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-coral text-[10px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
            />
          </div>

          {/* Floating Student Profile Pill (Matches reference top-right card) */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 sm:pr-4 bg-white rounded-2xl border border-slate-100 shadow-pill hover:shadow-card transition-all text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover border border-slate-200/70"
              />
              <div className="hidden sm:block min-w-0">
                <p className="text-xs font-bold text-brand-dark leading-tight flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  {userRole === 'admin' && (
                    <span className="text-[9px] bg-brand-amberLight text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-slate-400 truncate max-w-[115px]">
                  {userHandle}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                className="absolute right-0 top-14 z-50 w-64 bg-white rounded-2xl shadow-card-hover border border-slate-100 py-2 overflow-hidden"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-brand-dark">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-brand-tealLight/60 p-2 rounded-xl border border-brand-teal/15">
                    <span className="text-slate-600 font-medium">Sem {currentUser.semester} • Reputation</span>
                    <span className="font-bold text-brand-tealDark">{currentUser.reputation} pts</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-brand-teal" />
                    Student Profile
                  </button>
                  <button
                    onClick={() => setCurrentPage('settings')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </button>

                  {/* Role Switcher */}
                  <div className="px-3 py-2 my-1 border-t border-b border-slate-100 bg-slate-50/70">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Role Preview Mode
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole('student');
                          showToast('Switched to Student Role', 'Viewing standard student experience.');
                        }}
                        className={`flex-1 py-1 text-[11px] font-semibold rounded-lg border text-center transition-colors ${
                          userRole === 'student'
                            ? 'bg-white border-brand-teal text-brand-tealDark shadow-2xs'
                            : 'text-slate-600 border-transparent hover:bg-slate-100'
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
                        className={`flex-1 py-1 text-[11px] font-semibold rounded-lg border text-center transition-colors ${
                          userRole === 'admin'
                            ? 'bg-white border-brand-coral text-brand-coral shadow-2xs'
                            : 'text-slate-600 border-transparent hover:bg-slate-100'
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
