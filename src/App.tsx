import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AcademicResourcesPage } from './pages/AcademicResourcesPage';
import { AskDoubtPage } from './pages/AskDoubtPage';
import { ProjectShowcasePage } from './pages/ProjectShowcasePage';
import { DsaArenaPage } from './pages/DsaArenaPage';
import { CodeTogetherPage } from './pages/CodeTogetherPage';
import { AiStudyAssistantPage } from './pages/AiStudyAssistantPage';
import { CampusCommunityPage } from './pages/CampusCommunityPage';
import { PlacementPrepPage } from './pages/PlacementPrepPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SettingsPage } from './pages/SettingsPage';

const MainLayout: React.FC = () => {
  const { currentPage } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If on landing page, display the public landing layout
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
        <Navbar 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen} 
        />
        <main className="flex-1">
          <LandingPage />
        </main>
        <GlobalSearchModal />
        <AuthModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Central Content Area */}
        <main className="flex-1 lg:pl-64 transition-all duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'resources' && <AcademicResourcesPage />}
            {currentPage === 'doubts' && <AskDoubtPage />}
            {currentPage === 'projects' && <ProjectShowcasePage />}
            {currentPage === 'dsa' && <DsaArenaPage />}
            {currentPage === 'codetogether' && <CodeTogetherPage />}
            {currentPage === 'ai-assistant' && <AiStudyAssistantPage />}
            {currentPage === 'community' && <CampusCommunityPage />}
            {currentPage === 'placements' && <PlacementPrepPage />}
            {currentPage === 'profile' && <StudentProfilePage />}
            {currentPage === 'admin' && <AdminDashboardPage />}
            {currentPage === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
