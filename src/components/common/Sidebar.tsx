import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  FolderGit2, 
  Code2, 
  Users2, 
  Sparkles, 
  Users, 
  Briefcase, 
  User, 
  ShieldCheck, 
  Settings,
  ChevronRight,
  Flame,
  Award,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentPage, setCurrentPage, currentUser, userRole } = useApp();

  const primaryNavItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Home Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'resources',
      label: 'Academic Resources',
      icon: <BookOpen className="w-4 h-4" />,
      badge: 'PYQs',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'doubts',
      label: 'Ask a Doubt',
      icon: <HelpCircle className="w-4 h-4" />,
      badge: 'Q&A',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'projects',
      label: 'Project Showcase',
      icon: <FolderGit2 className="w-4 h-4" />,
      badge: 'Team Up',
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'dsa',
      label: 'DSA Arena',
      icon: <Code2 className="w-4 h-4" />,
      badge: 'Practice',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'codetogether',
      label: 'Code Together',
      icon: <Users2 className="w-4 h-4" />,
      badge: 'Rooms',
      badgeColor: 'bg-cyan-100 text-cyan-800',
    },
    {
      id: 'ai-assistant',
      label: 'AI Study Assistant',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      highlight: true,
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'community',
      label: 'Campus Community',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'placements',
      label: 'Placement Prep',
      icon: <Briefcase className="w-4 h-4" />,
      badge: 'Careers',
      badgeColor: 'bg-rose-100 text-rose-700',
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      id: 'profile',
      label: 'Student Profile',
      icon: <User className="w-4 h-4" />,
    },
    ...(userRole === 'admin'
      ? [
          {
            id: 'admin' as PageId,
            label: 'Admin & Moderation',
            icon: <ShieldCheck className="w-4 h-4 text-amber-600" />,
            badge: 'Admin',
            badgeColor: 'bg-amber-100 text-amber-800',
          },
        ]
      : []),
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-2xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Navigation Links Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Academic & Coding Menu */}
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Academic & Coding Hub
            </p>
            <nav className="space-y-1">
              {primaryNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-brand-blue text-white shadow-xs shadow-blue-500/20'
                        : item.highlight
                        ? 'text-purple-700 bg-purple-50/50 hover:bg-purple-100/70 border border-purple-200/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {!isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Student Profile & Settings */}
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Account & Controls
            </p>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-blue text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Student Academic Status Widget */}
        <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50/50 border border-blue-100/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-brand-dark flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Current Streak
            </span>
            <span className="text-xs font-extrabold text-amber-600 flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> {currentUser.streakDays} Days
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-600">
            <div className="flex items-center justify-between">
              <span>Branch:</span>
              <span className="font-semibold text-slate-800">B.Tech CSE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Semester:</span>
              <span className="font-semibold text-slate-800">Sem {currentUser.semester}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Solved DSA:</span>
              <span className="font-semibold text-emerald-700">{currentUser.solvedProblemsCount} problems</span>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('dsa')}
            className="w-full mt-2.5 py-1.5 px-2 bg-white hover:bg-brand-blue hover:text-white border border-blue-200 rounded-xl text-center text-xs font-semibold text-brand-blue transition-colors shadow-2xs"
          >
            Continue Daily DSA
          </button>
        </div>
      </aside>
    </>
  );
};
