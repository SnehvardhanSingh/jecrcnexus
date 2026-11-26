import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, BookOpen, Library, GraduationCap, MessageSquare, User } from 'lucide-react';
import { PageId } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  const navItems = [
    { id: 'dashboard' as PageId, label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'resources' as PageId, label: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'courses' as PageId, label: 'Courses', icon: <Library className="w-5 h-5" /> },
    { id: 'mentors' as PageId, label: 'Mentors', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'doubts' as PageId, label: 'Groups', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'profile' as PageId, label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-card">
      {navItems.map((item) => {
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-brand-teal font-bold scale-105'
                : 'text-slate-500 hover:text-brand-dark'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
