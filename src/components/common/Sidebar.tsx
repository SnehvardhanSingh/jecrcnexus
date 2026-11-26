import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { BrandLogo } from './BrandLogo';
import { SidebarStudyIllustration } from './AcademicIllustrations';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  GraduationCap,
  Users,
  MessageSquare,
  CheckSquare,
  Code2,
  Users2,
  Sparkles,
  FolderGit2,
  Briefcase,
  User,
  ShieldCheck,
  Settings,
  X,
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
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentPage, setCurrentPage, userRole } = useApp();

  const primaryNavItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-[18px] h-[18px]" />,
    },
    {
      id: 'resources',
      label: 'Academic Resources',
      icon: <BookOpen className="w-[18px] h-[18px]" />,
    },
    {
      id: 'courses',
      label: 'Courses & Subjects',
      icon: <Library className="w-[18px] h-[18px]" />,
    },
    {
      id: 'mentors',
      label: 'Faculty & Mentors',
      icon: <GraduationCap className="w-[18px] h-[18px]" />,
    },
    {
      id: 'community',
      label: 'Student Community',
      icon: <Users className="w-[18px] h-[18px]" />,
    },
    {
      id: 'doubts',
      label: 'Discussion Groups',
      icon: <MessageSquare className="w-[18px] h-[18px]" />,
    },
    {
      id: 'assignments',
      label: 'Assignments & Progress',
      icon: <CheckSquare className="w-[18px] h-[18px]" />,
    },
  ];

  const workspaceItems: NavItem[] = [
    {
      id: 'dsa',
      label: 'DSA Arena',
      icon: <Code2 className="w-[17px] h-[17px]" />,
    },
    {
      id: 'codetogether',
      label: 'Code Together',
      icon: <Users2 className="w-[17px] h-[17px]" />,
    },
    {
      id: 'ai-assistant',
      label: 'AI Study Assistant',
      icon: <Sparkles className="w-[17px] h-[17px]" />,
      badge: 'AI',
    },
    {
      id: 'projects',
      label: 'Project Showcase',
      icon: <FolderGit2 className="w-[17px] h-[17px]" />,
    },
    {
      id: 'placements',
      label: 'Placement Prep',
      icon: <Briefcase className="w-[17px] h-[17px]" />,
    },
  ];

  const accountItems: NavItem[] = [
    {
      id: 'profile',
      label: 'Student Profile',
      icon: <User className="w-[17px] h-[17px]" />,
    },
    ...(userRole === 'admin'
      ? [
          {
            id: 'admin' as PageId,
            label: 'Admin & Moderation',
            icon: <ShieldCheck className="w-[17px] h-[17px]" />,
            badge: 'Admin',
          },
        ]
      : []),
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-[17px] h-[17px]" />,
    },
  ];

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = currentPage === item.id;
    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.id)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-[13px] transition-all duration-200 group ${
          isActive
            ? 'bg-white text-brand-dark font-bold shadow-pill border border-slate-100'
            : 'text-slate-500 font-medium hover:text-brand-dark hover:bg-slate-50/90'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`flex-shrink-0 transition-colors ${
              isActive ? 'text-brand-teal' : 'text-slate-600 group-hover:text-brand-teal'
            }`}
          >
            {item.icon}
          </span>
          <span className="truncate">{item.label}</span>
        </div>

        {item.badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
              isActive
                ? 'bg-brand-tealLight text-brand-tealDark'
                : 'bg-brand-coralLight text-brand-coral'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed Left Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:z-30 w-64 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <BrandLogo
            size="md"
            compact={true}
            showTagline={false}
            onClick={() => handleNavClick('dashboard')}
          />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-5">
          <nav className="space-y-1">{primaryNavItems.map(renderNavItem)}</nav>

          <div>
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Learning Labs & Tools
            </p>
            <nav className="space-y-0.5">{workspaceItems.map(renderNavItem)}</nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Account
            </p>
            <nav className="space-y-0.5">{accountItems.map(renderNavItem)}</nav>
          </div>
        </div>

        {/* Coral Academic Illustration Card (Reference Footer Widget) */}
        <div className="p-4 pt-2">
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#F7755E] to-[#F25D45] px-4 pt-3 pb-4 text-center shadow-card">
            <SidebarStudyIllustration className="w-full h-24 mx-auto" />
            <p className="text-[11px] font-semibold text-white/95 mt-1 mb-2.5">
              Need instant study help?
            </p>
            <button
              onClick={() => handleNavClick('ai-assistant')}
              className="w-full py-2 px-4 bg-white hover:bg-brand-tealLight text-brand-dark font-bold text-xs rounded-xl shadow-subtle transition-all hover:-translate-y-0.5"
            >
              Ask AI Study Tutor
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
