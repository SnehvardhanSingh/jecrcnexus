export type Branch = 
  | 'Computer Science & Engineering'
  | 'AI & Data Science'
  | 'Information Technology'
  | 'Electronics & Communication'
  | 'Electrical Engineering'
  | 'Mechanical Engineering'
  | 'Civil Engineering';

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PageId = 
  | 'landing'
  | 'dashboard'
  | 'resources'
  | 'doubts'
  | 'projects'
  | 'dsa'
  | 'codetogether'
  | 'ai-assistant'
  | 'community'
  | 'placements'
  | 'profile'
  | 'admin'
  | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  branch: Branch;
  semester: Semester;
  rollNumber: string;
  avatar: string;
  bio: string;
  reputation: number;
  streakDays: number;
  skills: string[];
  interests: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  solvedProblemsCount: number;
  contributedAnswersCount: number;
  bookmarkedResourceIds: string[];
  likedProjectIds: string[];
  upvotedDoubtIds: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export type ResourceCategory = 
  | 'Previous Year Papers'
  | 'Mid-Term Papers'
  | 'End-Term Papers'
  | 'Handwritten Notes'
  | 'Subject-wise Notes'
  | 'Revision Sheets'
  | 'Lab Manuals'
  | 'Practical Files'
  | 'Practice Questions';

export interface AcademicResource {
  id: string;
  title: string;
  subject: string;
  branch: Branch;
  semester: Semester;
  category: ResourceCategory;
  year: string;
  examType: 'Mid-Term' | 'End-Term' | 'Class Test' | 'Lab Viva' | 'General';
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  uploaderName: string;
  uploaderAvatar?: string;
  uploadDate: string;
  downloadsCount: number;
  upvotes: number;
  rating: number; // 1-5
  isVerifiedByFaculty?: boolean;
  downloadUrl?: string;
  description: string;
  tags: string[];
}

export interface DoubtAnswer {
  id: string;
  doubtId: string;
  authorName: string;
  authorBranch: string;
  authorSemester: number;
  authorAvatar: string;
  authorReputation: number;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  createdAt: string;
  upvotes: number;
  isAccepted: boolean;
}

export interface DoubtQuestion {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorBranch: string;
  authorSemester: number;
  authorAvatar: string;
  subject: string;
  semester: Semester;
  tags: string[];
  createdAt: string;
  upvotes: number;
  downvotes: number;
  answers: DoubtAnswer[];
  isResolved: boolean;
  acceptedAnswerId?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  views: number;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI & ML' | 'Web Development' | 'Mobile Apps' | 'Data Science' | 'Cybersecurity' | 'IoT & Hardware' | 'Open Source';
  technologies: string[];
  creatorName: string;
  creatorBranch: string;
  creatorSemester: number;
  creatorAvatar: string;
  thumbnail: string;
  githubUrl: string;
  liveDemoUrl?: string;
  likesCount: number;
  bookmarksCount: number;
  createdAt: string;
  teamMembers?: string[];
  problemStatement?: string;
  proposedSolution?: string;
  features?: string[];
}

export interface TeammateRecruitment {
  id: string;
  projectTitle: string;
  category: string;
  description: string;
  requiredSkills: string[];
  neededCount: number;
  currentCount: number;
  leadName: string;
  leadBranch: string;
  leadAvatar: string;
  status: 'Open' | 'Interviewing' | 'Closed';
  applicantsCount: number;
  hasApplied?: boolean;
}

export interface DsaProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: 'Arrays & Strings' | 'Searching & Sorting' | 'Linked Lists' | 'Stacks & Queues' | 'Trees & Graphs' | 'Dynamic Programming' | 'Greedy Algorithms' | 'Recursion';
  acceptanceRate: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleCases: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    python: string;
    cpp: string;
    java: string;
    c: string;
  };
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  isCompleted?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  branch: Branch;
  semester: Semester;
  description: string;
  memberCount: number;
  maxMembers: number;
  leadName: string;
  nextMeetingTime: string;
  isMember: boolean;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  type: 'doubt_answer' | 'upvote' | 'project_like' | 'team_application' | 'event' | 'resource_verified';
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface InterviewExperience {
  id: string;
  companyName: string;
  role: string;
  studentName: string;
  batch: string;
  branch: string;
  status: 'Selected' | 'Offered' | 'Final Round';
  difficulty: 'Moderate' | 'Challenging' | 'Standard';
  rounds: {
    title: string;
    type: string;
    questionsAsked: string[];
    tips: string;
  }[];
  overallAdvice: string;
  postedDate: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  company: string;
  type: 'Internship' | 'Full-Time' | 'Hackathon' | 'Fellowship';
  location: string;
  stipendOrSalary: string;
  eligibility: string;
  deadline: string;
  skillsRequired: string[];
  applyUrl: string;
  isVerified: boolean;
}
