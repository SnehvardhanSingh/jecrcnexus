import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageId, 
  UserProfile, 
  AcademicResource, 
  DoubtQuestion, 
  ProjectShowcase, 
  TeammateRecruitment, 
  DsaProblem, 
  StudyGroup, 
  NotificationItem 
} from '../types';
import { 
  CURRENT_USER, 
  MOCK_RESOURCES, 
  MOCK_DOUBTS, 
  MOCK_PROJECTS, 
  MOCK_RECRUITMENTS, 
  MOCK_DSA_PROBLEMS, 
  MOCK_STUDY_GROUPS, 
  MOCK_NOTIFICATIONS 
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message?: string;
}

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  currentUser: UserProfile;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  userRole: 'student' | 'mentor' | 'admin';
  setUserRole: (role: 'student' | 'mentor' | 'admin') => void;
  
  // Resources
  resources: AcademicResource[];
  addResource: (resource: Omit<AcademicResource, 'id' | 'uploadDate' | 'downloadsCount' | 'upvotes' | 'rating'>) => void;
  toggleBookmarkResource: (id: string) => void;
  upvoteResource: (id: string) => void;
  downloadResource: (id: string) => void;
  
  // Doubts
  doubts: DoubtQuestion[];
  addDoubt: (doubt: { title: string; description: string; subject: string; semester: number; tags: string[]; codeSnippet?: string; codeLanguage?: string }) => void;
  upvoteDoubt: (id: string) => void;
  addAnswer: (doubtId: string, content: string, codeSnippet?: string) => void;
  markAnswerAccepted: (doubtId: string, answerId: string) => void;
  
  // Projects & Teams
  projects: ProjectShowcase[];
  addProject: (project: Omit<ProjectShowcase, 'id' | 'likesCount' | 'bookmarksCount' | 'createdAt'>) => void;
  toggleLikeProject: (id: string) => void;
  toggleBookmarkProject: (id: string) => void;
  
  recruitments: TeammateRecruitment[];
  applyToRecruitment: (id: string) => void;
  addRecruitment: (rec: Omit<TeammateRecruitment, 'id' | 'leadName' | 'leadBranch' | 'leadAvatar' | 'applicantsCount' | 'hasApplied'>) => void;
  
  // DSA Arena
  dsaProblems: DsaProblem[];
  markProblemComplete: (id: string) => void;
  activeDsaId: string | null;
  setActiveDsaId: (id: string | null) => void;
  
  // Study Groups
  studyGroups: StudyGroup[];
  toggleJoinGroup: (id: string) => void;
  createGroup: (group: Omit<StudyGroup, 'id' | 'memberCount' | 'isMember' | 'leadName'>) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;
  
  // Global Modals & Dialogs
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot' | 'onboarding';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot' | 'onboarding') => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    return (localStorage.getItem('jn_currentPage') as PageId) || 'dashboard';
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('jn_currentUser');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Aarav Sharma' || parsed.name === 'Aarav') {
          parsed.name = 'Sneh';
          parsed.email = 'sneh.cse23@jecrc.ac.in';
          parsed.githubUrl = 'https://github.com/sneh-jecrc';
          parsed.linkedinUrl = 'https://linkedin.com/in/sneh-jecrc';
          localStorage.setItem('jn_currentUser', JSON.stringify(parsed));
          return parsed;
        }
        return parsed;
      } catch (e) {
        return CURRENT_USER;
      }
    }
    return CURRENT_USER;
  });

  const [userRole, setUserRole] = useState<'student' | 'mentor' | 'admin'>(currentUser.role);

  // Entities with persistence
  const [resources, setResources] = useState<AcademicResource[]>(() => {
    const saved = localStorage.getItem('jn_resources');
    return saved ? JSON.parse(saved) : MOCK_RESOURCES;
  });

  const [doubts, setDoubts] = useState<DoubtQuestion[]>(() => {
    const saved = localStorage.getItem('jn_doubts');
    return saved ? JSON.parse(saved) : MOCK_DOUBTS;
  });

  const [projects, setProjects] = useState<ProjectShowcase[]>(() => {
    const saved = localStorage.getItem('jn_projects');
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });

  const [recruitments, setRecruitments] = useState<TeammateRecruitment[]>(() => {
    const saved = localStorage.getItem('jn_recruitments');
    return saved ? JSON.parse(saved) : MOCK_RECRUITMENTS;
  });

  const [dsaProblems, setDsaProblems] = useState<DsaProblem[]>(() => {
    const saved = localStorage.getItem('jn_dsa');
    return saved ? JSON.parse(saved) : MOCK_DSA_PROBLEMS;
  });

  const [activeDsaId, setActiveDsaId] = useState<string | null>(null);

  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(() => {
    const saved = localStorage.getItem('jn_groups');
    return saved ? JSON.parse(saved) : MOCK_STUDY_GROUPS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('jn_notifs');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  // Modals & UI
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'onboarding'>('login');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize state changes to localStorage
  useEffect(() => {
    localStorage.setItem('jn_currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('jn_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('jn_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('jn_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('jn_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('jn_recruitments', JSON.stringify(recruitments));
  }, [recruitments]);

  useEffect(() => {
    localStorage.setItem('jn_dsa', JSON.stringify(dsaProblems));
  }, [dsaProblems]);

  useEffect(() => {
    localStorage.setItem('jn_groups', JSON.stringify(studyGroups));
  }, [studyGroups]);

  useEffect(() => {
    localStorage.setItem('jn_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helpers
  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'error' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile Updated', 'Your student details have been saved.');
  };

  // Resources Actions
  const addResource = (resData: Omit<AcademicResource, 'id' | 'uploadDate' | 'downloadsCount' | 'upvotes' | 'rating'>) => {
    const newRes: AcademicResource = {
      ...resData,
      id: `res_${Date.now()}`,
      uploadDate: 'Just now',
      downloadsCount: 0,
      upvotes: 0,
      rating: 5.0,
      uploaderName: currentUser.name,
      uploaderAvatar: currentUser.avatar,
      isVerifiedByFaculty: false,
    };
    setResources((prev) => [newRes, ...prev]);
    showToast('Resource Uploaded!', 'Your study material is published for JECRC peers.');
  };

  const toggleBookmarkResource = (id: string) => {
    const isBookmarked = currentUser.bookmarkedResourceIds.includes(id);
    const updatedIds = isBookmarked
      ? currentUser.bookmarkedResourceIds.filter((bId) => bId !== id)
      : [...currentUser.bookmarkedResourceIds, id];

    setCurrentUser((prev) => ({ ...prev, bookmarkedResourceIds: updatedIds }));
    showToast(isBookmarked ? 'Bookmark Removed' : 'Resource Bookmarked', isBookmarked ? '' : 'Saved to your library.');
  };

  const upvoteResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
    showToast('Upvoted!', 'Thank you for giving helpful feedback.');
  };

  const downloadResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r))
    );
    showToast('Download Started', 'Preparing PDF document preview & download...');
  };

  // Doubts Actions
  const addDoubt = (doubtData: { title: string; description: string; subject: string; semester: number; tags: string[]; codeSnippet?: string; codeLanguage?: string }) => {
    const newDoubt: DoubtQuestion = {
      id: `dbt_${Date.now()}`,
      title: doubtData.title,
      description: doubtData.description,
      subject: doubtData.subject,
      semester: doubtData.semester as any,
      tags: doubtData.tags,
      codeSnippet: doubtData.codeSnippet,
      codeLanguage: doubtData.codeLanguage || 'cpp',
      authorName: currentUser.name,
      authorBranch: currentUser.branch,
      authorSemester: currentUser.semester,
      authorAvatar: currentUser.avatar,
      createdAt: 'Just now',
      upvotes: 1,
      downvotes: 0,
      answers: [],
      isResolved: false,
      views: 1,
    };
    setDoubts((prev) => [newDoubt, ...prev]);
    showToast('Doubt Posted!', 'Your question is live in the JECRC campus forum.');
  };

  const upvoteDoubt = (id: string) => {
    const hasUpvoted = currentUser.upvotedDoubtIds.includes(id);
    const updatedUpvotes = hasUpvoted
      ? currentUser.upvotedDoubtIds.filter((dId) => dId !== id)
      : [...currentUser.upvotedDoubtIds, id];

    setCurrentUser((prev) => ({ ...prev, upvotedDoubtIds: updatedUpvotes }));
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, upvotes: hasUpvoted ? d.upvotes - 1 : d.upvotes + 1 } : d
      )
    );
  };

  const addAnswer = (doubtId: string, content: string, codeSnippet?: string) => {
    const newAnswer = {
      id: `ans_${Date.now()}`,
      doubtId,
      authorName: currentUser.name,
      authorBranch: currentUser.branch,
      authorSemester: currentUser.semester,
      authorAvatar: currentUser.avatar,
      authorReputation: currentUser.reputation,
      content,
      codeSnippet,
      createdAt: 'Just now',
      upvotes: 0,
      isAccepted: false,
    };

    setDoubts((prev) =>
      prev.map((d) =>
        d.id === doubtId ? { ...d, answers: [...d.answers, newAnswer] } : d
      )
    );
    // Award 5 reputation points
    setCurrentUser((prev) => ({
      ...prev,
      reputation: prev.reputation + 5,
      contributedAnswersCount: prev.contributedAnswersCount + 1,
    }));
    showToast('Answer Submitted!', '+5 Reputation points awarded for helping a peer.');
  };

  const markAnswerAccepted = (doubtId: string, answerId: string) => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          isResolved: true,
          acceptedAnswerId: answerId,
          answers: d.answers.map((a) => ({
            ...a,
            isAccepted: a.id === answerId,
          })),
        };
      })
    );
    showToast('Answer Accepted!', '+10 Reputation points given to author.');
  };

  // Projects Actions
  const addProject = (proj: Omit<ProjectShowcase, 'id' | 'likesCount' | 'bookmarksCount' | 'createdAt'>) => {
    const newProject: ProjectShowcase = {
      ...proj,
      id: `proj_${Date.now()}`,
      creatorName: currentUser.name,
      creatorBranch: currentUser.branch,
      creatorSemester: currentUser.semester,
      creatorAvatar: currentUser.avatar,
      likesCount: 1,
      bookmarksCount: 0,
      createdAt: 'Just now',
    };
    setProjects((prev) => [newProject, ...prev]);
    showToast('Project Published!', 'Showcased to the JECRC Innovation Community.');
  };

  const toggleLikeProject = (id: string) => {
    const isLiked = currentUser.likedProjectIds.includes(id);
    const updatedIds = isLiked
      ? currentUser.likedProjectIds.filter((pId) => pId !== id)
      : [...currentUser.likedProjectIds, id];

    setCurrentUser((prev) => ({ ...prev, likedProjectIds: updatedIds }));
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likesCount: isLiked ? p.likesCount - 1 : p.likesCount + 1 } : p
      )
    );
  };

  const toggleBookmarkProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, bookmarksCount: p.bookmarksCount + 1 } : p
      )
    );
    showToast('Project Bookmarked', 'Saved to your inspiration folder.');
  };

  // Recruitment
  const applyToRecruitment = (id: string) => {
    setRecruitments((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, hasApplied: true, applicantsCount: r.applicantsCount + 1 } : r
      )
    );
    showToast('Application Sent!', 'The project lead will review your profile & GitHub.');
  };

  const addRecruitment = (rec: Omit<TeammateRecruitment, 'id' | 'leadName' | 'leadBranch' | 'leadAvatar' | 'applicantsCount' | 'hasApplied'>) => {
    const newRec: TeammateRecruitment = {
      ...rec,
      id: `rec_${Date.now()}`,
      leadName: currentUser.name,
      leadBranch: `${currentUser.branch} (${currentUser.semester}th Sem)`,
      leadAvatar: currentUser.avatar,
      applicantsCount: 0,
      hasApplied: false,
    };
    setRecruitments((prev) => [newRec, ...prev]);
    showToast('Team Search Live!', 'JECRC students can now apply to join your project.');
  };

  // DSA Arena
  const markProblemComplete = (id: string) => {
    setDsaProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isCompleted: true } : p))
    );
    setCurrentUser((prev) => ({
      ...prev,
      solvedProblemsCount: prev.solvedProblemsCount + 1,
      reputation: prev.reputation + 15,
    }));
    showToast('Problem Solved! 🎉', 'All test cases passed. +15 Reputation earned!');
  };

  // Study Groups
  const toggleJoinGroup = (id: string) => {
    setStudyGroups((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const newIsMember = !g.isMember;
        return {
          ...g,
          isMember: newIsMember,
          memberCount: newIsMember ? g.memberCount + 1 : g.memberCount - 1,
        };
      })
    );
    showToast('Study Group Updated', 'Your group schedule and materials are synchronized.');
  };

  const createGroup = (group: Omit<StudyGroup, 'id' | 'memberCount' | 'isMember' | 'leadName'>) => {
    const newGroup: StudyGroup = {
      ...group,
      id: `grp_${Date.now()}`,
      leadName: currentUser.name,
      memberCount: 1,
      isMember: true,
    };
    setStudyGroups((prev) => [newGroup, ...prev]);
    showToast('Study Group Created!', 'Invite classmates and collaborate together.');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All Marked as Read');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentUser,
        updateCurrentUser,
        userRole,
        setUserRole,
        resources,
        addResource,
        toggleBookmarkResource,
        upvoteResource,
        downloadResource,
        doubts,
        addDoubt,
        upvoteDoubt,
        addAnswer,
        markAnswerAccepted,
        projects,
        addProject,
        toggleLikeProject,
        toggleBookmarkProject,
        recruitments,
        applyToRecruitment,
        addRecruitment,
        dsaProblems,
        markProblemComplete,
        activeDsaId,
        setActiveDsaId,
        studyGroups,
        toggleJoinGroup,
        createGroup,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
