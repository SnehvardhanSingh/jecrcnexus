import { 
  UserProfile, 
  AcademicResource, 
  DoubtQuestion, 
  ProjectShowcase, 
  TeammateRecruitment, 
  DsaProblem, 
  StudyGroup, 
  InterviewExperience, 
  CareerOpportunity,
  NotificationItem
} from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'usr_sneh_01',
  name: 'Sneh',
  email: 'sneh.cse23@jecrc.ac.in',
  role: 'student',
  branch: 'Computer Science & Engineering',
  semester: 5,
  rollNumber: '23BCON452',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bio: 'Passionate about Full-Stack Web Development, Data Structures, and distributed systems. JECRC ACM Chapter member.',
  reputation: 435,
  streakDays: 14,
  skills: ['Python', 'C++', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'DSA'],
  interests: ['System Design', 'AI Applications', 'Open Source', 'Hackathons'],
  githubUrl: 'https://github.com/sneh-jecrc',
  linkedinUrl: 'https://linkedin.com/in/sneh-jecrc',
  solvedProblemsCount: 42,
  contributedAnswersCount: 18,
  bookmarkedResourceIds: ['res_01', 'res_04', 'res_07'],
  likedProjectIds: ['proj_01', 'proj_03'],
  upvotedDoubtIds: ['dbt_01', 'dbt_03'],
  badges: [
    {
      id: 'bdg_1',
      name: 'Consistent Coder',
      description: 'Maintained a 14-day daily DSA coding streak.',
      icon: '🔥',
      dateEarned: 'Nov 2026'
    },
    {
      id: 'bdg_2',
      name: 'Helpful Junior Mentor',
      description: 'Contributed 15+ upvoted solutions in the Doubt Community.',
      icon: '💡',
      dateEarned: 'Oct 2026'
    },
    {
      id: 'bdg_3',
      name: 'Resource Pioneer',
      description: 'Shared authorized handwritten notes with over 500 downloads.',
      icon: '📚',
      dateEarned: 'Sep 2026'
    },
    {
      id: 'bdg_4',
      name: 'Hackathon Finalist',
      description: 'Represented JECRC in National Smart India Hackathon Prelims.',
      icon: '🏆',
      dateEarned: 'Aug 2026'
    }
  ]
};

export const MOCK_STUDENTS: Partial<UserProfile>[] = [
  {
    id: 'usr_priya_02',
    name: 'Priya Patel',
    role: 'student',
    branch: 'AI & Data Science',
    semester: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    bio: 'Deep learning researcher & PyTorch enthusiast. Working on Indian Sign Language translation NLP models.',
    reputation: 680,
    skills: ['Python', 'PyTorch', 'Computer Vision', 'FastAPI'],
    solvedProblemsCount: 65,
    streakDays: 28,
  },
  {
    id: 'usr_harsh_03',
    name: 'Harshvardhan Singh',
    role: 'mentor',
    branch: 'Computer Science & Engineering',
    semester: 7,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Incoming SDE Intern at Amazon. LeetCode Knight (2040 rating). Mentoring 3rd & 5th sem students for placement drives.',
    reputation: 1420,
    skills: ['C++', 'Java', 'Distributed Systems', 'Dynamic Programming'],
    solvedProblemsCount: 280,
    streakDays: 62,
  },
  {
    id: 'usr_ananya_04',
    name: 'Ananya Verma',
    role: 'student',
    branch: 'Electronics & Communication',
    semester: 3,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    bio: 'Robotics club coordinator at JECRC. Building embedded IoT sensors and autonomous rover telemetry.',
    reputation: 390,
    skills: ['Embedded C', 'Arduino', 'Python', 'Circuit Design'],
    solvedProblemsCount: 22,
    streakDays: 9,
  },
  {
    id: 'usr_rohan_05',
    name: 'Rohan Meena',
    role: 'student',
    branch: 'Information Technology',
    semester: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    bio: 'DevOps & Cloud architecture learner. AWS Certified Cloud Practitioner. Linux advocate.',
    reputation: 510,
    skills: ['Docker', 'Kubernetes', 'Go', 'Linux', 'AWS'],
    solvedProblemsCount: 38,
    streakDays: 12,
  }
];

export const MOCK_RESOURCES: AcademicResource[] = [
  {
    id: 'res_01',
    title: 'Data Structures & Algorithms — End-Term PYQ (2023-2025 Solved)',
    subject: 'Data Structures and Algorithms',
    branch: 'Computer Science & Engineering',
    semester: 3,
    category: 'End-Term Papers',
    year: '2025',
    examType: 'End-Term',
    fileFormat: 'PDF',
    fileSize: '4.8 MB',
    uploaderName: 'Harshvardhan Singh',
    uploaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    uploadDate: '12 Oct 2026',
    downloadsCount: 1240,
    upvotes: 215,
    rating: 4.9,
    isVerifiedByFaculty: true,
    description: 'Comprehensive compilation of past 3 years university end-semester questions with handwritten explanations for AVL Trees, Dijkstra Algorithm, and Dynamic Programming recurrence relations.',
    tags: ['PYQ', 'DSA', 'Trees', 'Graphs', 'Verified']
  },
  {
    id: 'res_02',
    title: 'Engineering Mathematics I — Complete Formula Sheet & PYQ Analysis',
    subject: 'Engineering Mathematics I',
    branch: 'Computer Science & Engineering',
    semester: 1,
    category: 'Revision Sheets',
    year: '2025',
    examType: 'Mid-Term',
    fileFormat: 'PDF',
    fileSize: '2.4 MB',
    uploaderName: 'Dr. S. K. Gupta (Faculty Contributor)',
    uploadDate: '02 Sep 2026',
    downloadsCount: 1890,
    upvotes: 340,
    rating: 5.0,
    isVerifiedByFaculty: true,
    description: 'High-yield formula cheat sheet covering Matrices, Cayley-Hamilton theorem, Differential Calculus, Beta-Gamma functions, and Vector spaces.',
    tags: ['Maths-1', 'Formulas', 'First Year', 'High Yield']
  },
  {
    id: 'res_03',
    title: 'Database Management Systems (DBMS) — Handwritten Lab Viva & SQL Guide',
    subject: 'Database Management Systems',
    branch: 'Information Technology',
    semester: 4,
    category: 'Handwritten Notes',
    year: '2026',
    examType: 'Lab Viva',
    fileFormat: 'PDF',
    fileSize: '6.1 MB',
    uploaderName: 'Sneh',
    uploaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    uploadDate: '18 Nov 2026',
    downloadsCount: 680,
    upvotes: 112,
    rating: 4.8,
    isVerifiedByFaculty: false,
    description: 'Neatly organized handwritten notes on Normalization (1NF through BCNF), Transaction ACID properties, Concurrency Control (2PL, Timestamping), and top 50 SQL queries.',
    tags: ['DBMS', 'SQL', 'Viva', 'Notes', 'Normalization']
  },
  {
    id: 'res_04',
    title: 'Operating Systems — Process Synchronization & Deadlocks Practice Problems',
    subject: 'Operating Systems',
    branch: 'Computer Science & Engineering',
    semester: 4,
    category: 'Practice Questions',
    year: '2025',
    examType: 'Mid-Term',
    fileFormat: 'PDF',
    fileSize: '3.2 MB',
    uploaderName: 'Priya Patel',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    uploadDate: '24 Oct 2026',
    downloadsCount: 920,
    upvotes: 164,
    rating: 4.7,
    isVerifiedByFaculty: true,
    description: 'Numerical practice set for Semaphores (Producer-Consumer, Readers-Writers), Banker\'s Algorithm state analysis, and Page Replacement Algorithms (FIFO, LRU, Optimal).',
    tags: ['OS', 'Semaphores', 'Deadlocks', 'Numericals']
  },
  {
    id: 'res_05',
    title: 'Engineering Physics — Quantum Mechanics & Lasers Lab Manual',
    subject: 'Engineering Physics',
    branch: 'Electronics & Communication',
    semester: 2,
    category: 'Lab Manuals',
    year: '2025',
    examType: 'Lab Viva',
    fileFormat: 'PDF',
    fileSize: '5.5 MB',
    uploaderName: 'Ananya Verma',
    uploadDate: '15 Aug 2026',
    downloadsCount: 740,
    upvotes: 98,
    rating: 4.6,
    isVerifiedByFaculty: true,
    description: 'Standard JECRC lab manual with apparatus setup, observation tables, calculation formulas, and graph plots for Michelson Interferometer, He-Ne Laser, and Hall Effect experiments.',
    tags: ['Physics', 'Lab', 'First Year', 'Lasers']
  },
  {
    id: 'res_06',
    title: 'Programming in C — 100 Important Exam Code Snippets & Dry Runs',
    subject: 'Programming in C',
    branch: 'Computer Science & Engineering',
    semester: 1,
    category: 'Subject-wise Notes',
    year: '2026',
    examType: 'End-Term',
    fileFormat: 'PDF',
    fileSize: '3.9 MB',
    uploaderName: 'Rohan Meena',
    uploadDate: '05 Nov 2026',
    downloadsCount: 1530,
    upvotes: 280,
    rating: 4.9,
    isVerifiedByFaculty: true,
    description: 'Pointer arithmetic, structure memory alignment, dynamic memory allocation (malloc/calloc), recursion stack traces, and bitwise tricks asked frequently in 1st year finals.',
    tags: ['C Programming', 'Pointers', 'First Year', 'Code Snippets']
  },
  {
    id: 'res_07',
    title: 'Computer Networks — Socket Programming & Subnetting Cheat Sheet',
    subject: 'Computer Networks',
    branch: 'Information Technology',
    semester: 5,
    category: 'Revision Sheets',
    year: '2026',
    examType: 'Mid-Term',
    fileFormat: 'PDF',
    fileSize: '1.8 MB',
    uploaderName: 'Sneh',
    uploadDate: '10 Nov 2026',
    downloadsCount: 450,
    upvotes: 88,
    rating: 4.7,
    isVerifiedByFaculty: false,
    description: 'Clear diagrams for OSI 7 layers vs TCP/IP, IP addressing CIDR subnet calculation shortcuts, TCP 3-way handshake sequence, and DNS resolution flow.',
    tags: ['Networks', 'Subnetting', 'TCP/IP', 'Cheat Sheet']
  },
  {
    id: 'res_08',
    title: 'Machine Learning — Supervised & Unsupervised Algorithms Revision Notes',
    subject: 'Machine Learning',
    branch: 'AI & Data Science',
    semester: 6,
    category: 'Subject-wise Notes',
    year: '2026',
    examType: 'End-Term',
    fileFormat: 'PDF',
    fileSize: '7.3 MB',
    uploaderName: 'Priya Patel',
    uploadDate: '01 Nov 2026',
    downloadsCount: 620,
    upvotes: 145,
    rating: 4.9,
    isVerifiedByFaculty: true,
    description: 'Mathematical intuition behind Gradient Descent, SVM margins, Decision Trees entropy/Gini index, K-Means clustering, and PCA dimensionality reduction.',
    tags: ['AI/ML', 'Data Science', 'Algorithms', 'Notes']
  }
];

export const MOCK_DOUBTS: DoubtQuestion[] = [
  {
    id: 'dbt_01',
    title: 'How does Dijkstra\'s Algorithm handle negative weight cycles, and why does it fail?',
    description: 'I was practicing shortest path algorithms for our 3rd semester DSA exam. I understand why Bellman-Ford works with negative edges, but I cannot intuitively grasp why Dijkstra fails when a negative edge or cycle is introduced. Can someone explain with a concrete 3-node diagram?',
    authorName: 'Siddharth Jain',
    authorBranch: 'Computer Science & Engineering',
    authorSemester: 3,
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    subject: 'Data Structures and Algorithms',
    semester: 3,
    tags: ['DSA', 'Graphs', 'Dijkstra', 'Algorithms'],
    createdAt: '3 hours ago',
    upvotes: 24,
    downvotes: 1,
    isResolved: true,
    acceptedAnswerId: 'ans_01',
    views: 310,
    answers: [
      {
        id: 'ans_01',
        doubtId: 'dbt_01',
        authorName: 'Harshvardhan Singh',
        authorBranch: 'Computer Science & Engineering',
        authorSemester: 7,
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        authorReputation: 1420,
        content: `Great question Siddharth! Dijkstra's core greedy assumption is that once a node is extracted from the Priority Queue (visited / finalized), its shortest distance has already been discovered and will never decrease further.

Consider 3 nodes: A, B, C:
- A -> B with weight 5
- A -> C with weight 2
- C -> B with weight -4

1. Dijkstra starts at A (dist[A] = 0).
2. Explores neighbors: dist[C]=2, dist[B]=5.
3. C is smaller (2), so C is popped and marked visited.
4. Next B (5) is popped and marked visited.
5. But through C -> B: dist[B] would become 2 + (-4) = -2!
Since Dijkstra has already marked B as finalized, it never updates it again. Thus it returns suboptimal dist[B]=5 instead of -2.

If there is a negative cycle, distance keeps decreasing infinitely, which Dijkstra cannot detect. That is why Bellman-Ford (O(V*E)) or Floyd-Warshall is required for negative weights!`,
        createdAt: '2 hours ago',
        upvotes: 38,
        isAccepted: true
      },
      {
        id: 'ans_02',
        doubtId: 'dbt_01',
        authorName: 'Sneh',
        authorBranch: 'Computer Science & Engineering',
        authorSemester: 5,
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        authorReputation: 435,
        content: 'Adding a quick practical note for JECRC exams: Professor always asks the difference table between Dijkstra and Bellman-Ford in 5-mark questions! Be sure to mention Greedy vs DP and time complexity: O((V+E) log V) vs O(V*E).',
        createdAt: '1 hour ago',
        upvotes: 12,
        isAccepted: false
      }
    ]
  },
  {
    id: 'dbt_02',
    title: 'Segmentation fault with pointer arithmetic in C string reverse function',
    description: 'I am getting a Segfault when trying to reverse a string in-place using two pointers. Here is my code. What am I doing wrong?',
    codeSnippet: `#include <stdio.h>
#include <string.h>

void reverse(char *str) {
    char *end = str + strlen(str) - 1;
    while (str < end) {
        char temp = *str;
        *str = *end;
        *end = temp;
        str++;
        end--;
    }
}

int main() {
    char *msg = "Hello JECRC"; // <-- Line causing crash
    reverse(msg);
    printf("%s\\n", msg);
    return 0;
}`,
    codeLanguage: 'c',
    authorName: 'Kunal Joshi',
    authorBranch: 'Computer Science & Engineering',
    authorSemester: 1,
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    subject: 'Programming in C',
    semester: 1,
    tags: ['C Programming', 'Pointers', 'Memory', 'SegFault'],
    createdAt: '6 hours ago',
    upvotes: 19,
    downvotes: 0,
    isResolved: true,
    acceptedAnswerId: 'ans_03',
    views: 245,
    answers: [
      {
        id: 'ans_03',
        doubtId: 'dbt_02',
        authorName: 'Priya Patel',
        authorBranch: 'AI & Data Science',
        authorSemester: 5,
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        authorReputation: 680,
        content: `Your logic in the \`reverse\` function is completely correct! The problem is in \`main()\`:

\`char *msg = "Hello JECRC";\` creates a string literal stored in read-only memory (.rodata segment). When \`*str = *end\` attempts to write to read-only memory, the OS triggers a Segmentation Fault.

Fix: Declare it as an array on the stack:
\`\`\`c
char msg[] = "Hello JECRC"; // Now mutable on stack memory
reverse(msg);
\`\`\`
Try this and it will work immediately!`,
        createdAt: '5 hours ago',
        upvotes: 29,
        isAccepted: true
      }
    ]
  },
  {
    id: 'dbt_03',
    title: 'Explain Banker\'s Algorithm Safe State verification for mid-term numericals',
    description: 'Can someone provide a clear step-by-step method to solve the 5-process allocation and max matrix problem? When can we definitively declare a deadlock vs unsafe state?',
    authorName: 'Simran Kaur',
    authorBranch: 'Information Technology',
    authorSemester: 4,
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    subject: 'Operating Systems',
    semester: 4,
    tags: ['OS', 'BankersAlgorithm', 'Deadlock', 'MidTerm'],
    createdAt: '1 day ago',
    upvotes: 31,
    downvotes: 0,
    isResolved: false,
    views: 480,
    answers: [
      {
        id: 'ans_04',
        doubtId: 'dbt_03',
        authorName: 'Rohan Meena',
        authorBranch: 'Information Technology',
        authorSemester: 5,
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        authorReputation: 510,
        content: `Here is the foolproof 3-step checklist for JECRC exam numericals:
1. First calculate the Need Matrix: Need[i][j] = Max[i][j] - Allocation[i][j]
2. Initialize Work = Available vector, and Finish[i] = False for all processes.
3. Find an index i such that Finish[i] == False and Need[i] <= Work.
   If found: Work = Work + Allocation[i], Finish[i] = True. Add i to safe sequence.
   Repeat until all are true.

Important: An unsafe state is NOT necessarily a deadlock! An unsafe state only means we cannot guarantee avoiding a deadlock if all processes simultaneously demand their max resources.`,
        createdAt: '18 hours ago',
        upvotes: 17,
        isAccepted: false
      }
    ]
  }
];

export const MOCK_PROJECTS: ProjectShowcase[] = [
  {
    id: 'proj_01',
    title: 'NexusAI — Real-Time Indian Sign Language Interpreter',
    tagline: 'Deep learning web app converting ISL hand gestures into bilingual English and Hindi speech in real time.',
    description: 'NexusAI uses MediaPipe for hand landmark extraction and an LSTM neural network trained on over 10,000 gesture samples to enable seamless communication between deaf/mute individuals and hearing peers during campus lectures.',
    category: 'AI & ML',
    technologies: ['Python', 'TensorFlow', 'MediaPipe', 'FastAPI', 'React', 'WebSockets', 'WebRTC'],
    creatorName: 'Priya Patel',
    creatorBranch: 'AI & Data Science',
    creatorSemester: 5,
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/jecrc-nexus/isl-nexus-ai',
    liveDemoUrl: 'https://isl-nexus-demo.vercel.app',
    likesCount: 184,
    bookmarksCount: 62,
    createdAt: '2 weeks ago',
    problemStatement: 'Over 18 million speech and hearing-impaired people in India struggle in higher education classrooms where real-time translators are unavailable.',
    proposedSolution: 'A zero-hardware camera-based browser solution running 60fps gesture classification with dual language audio feedback.',
    features: [
      '60 FPS gesture tracking using MediaPipe landmarking',
      'Continuous sentence formation and grammar correction via NLP',
      'Hindi & English text-to-speech integration',
      'Works offline with ONNX runtime in the browser'
    ]
  },
  {
    id: 'proj_02',
    title: 'CampusPulse — JECRC Smart Transit & Shuttle Bus Tracker',
    tagline: 'IoT & GPS telemetry app tracking JECRC University buses with arrival time predictions and crowd density meters.',
    description: 'A hardware-software platform combining ESP32 GPS modules installed in college transit buses with an ultra-fast Flutter and Node.js backend. Predicts arrival times using traffic historical data and campus geofencing.',
    category: 'IoT & Hardware',
    technologies: ['ESP32', 'C++', 'Node.js', 'Flutter', 'MQTT', 'Google Maps API', 'Redis'],
    creatorName: 'Ananya Verma',
    creatorBranch: 'Electronics & Communication',
    creatorSemester: 3,
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/jecrc-nexus/campuspulse-transit',
    liveDemoUrl: 'https://campuspulse.jecrc.ac.in',
    likesCount: 142,
    bookmarksCount: 45,
    createdAt: '1 month ago',
    problemStatement: 'Hundreds of day-scholars waste 30-45 minutes waiting at bus stops across Jaipur without knowing delay status.',
    proposedSolution: 'Sub-second real-time GPS telemetry with estimated arrival times and push notifications when the bus is within 1 km.'
  },
  {
    id: 'proj_03',
    title: 'CodeReviewer AI — Peer Code Analyzer for First Year Labs',
    tagline: 'Automated syntax, memory leak, and algorithmic time complexity reviewer for student assignments.',
    description: 'Empowers lab assistants by scanning C/C++ student code submissions for buffer overflows, memory leaks, uninitialized variables, and style infractions before viva grading.',
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Docker', 'Clang-Tidy', 'TailwindCSS', 'Supabase'],
    creatorName: 'Sneh',
    creatorBranch: 'Computer Science & Engineering',
    creatorSemester: 5,
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/sneh-jecrc/codereviewer-ai',
    liveDemoUrl: 'https://codereviewer-jecrc.vercel.app',
    likesCount: 96,
    bookmarksCount: 38,
    createdAt: '3 weeks ago'
  },
  {
    id: 'proj_04',
    title: 'VeriDoc — Tamper-Proof Student Degree & Certificate Locker',
    tagline: 'Cryptographically secured academic credential verification system for JECRC placement verification.',
    description: 'Built for the Smart India Hackathon internal round. Allows students and recruiters to verify genuine JECRC marksheets and provisional certificates using cryptographic digital signatures and QR hashes.',
    category: 'Cybersecurity',
    technologies: ['Solidity', 'Ethereum/Polygon', 'Web3.js', 'React', 'IPFS', 'Node.js'],
    creatorName: 'Rohan Meena',
    creatorBranch: 'Information Technology',
    creatorSemester: 5,
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rohan-m/veridoc-chain',
    likesCount: 88,
    bookmarksCount: 29,
    createdAt: '2 months ago'
  }
];

export const MOCK_RECRUITMENTS: TeammateRecruitment[] = [
  {
    id: 'rec_01',
    projectTitle: 'Smart India Hackathon (SIH 2026) — Automated Crop Disease Detection Drone',
    category: 'AI/ML & Robotics',
    description: 'We have cleared Round 1 of the SIH JECRC internal selection. We are building an aerial imaging system for mustard crops in Rajasthan to detect blight. Looking for an enthusiastic frontend dev and embedded engineer!',
    requiredSkills: ['React/Next.js', 'FastAPI', 'Raspberry Pi / Jetson Nano', 'OpenCV'],
    neededCount: 2,
    currentCount: 4,
    leadName: 'Priya Patel',
    leadBranch: 'AI & Data Science (5th Sem)',
    leadAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Open',
    applicantsCount: 7,
    hasApplied: false
  },
  {
    id: 'rec_02',
    projectTitle: 'JECRC Alumni Placement Mentorship Portal',
    category: 'Full-Stack Web',
    description: 'Building an interactive web platform to connect 300+ JECRC alumni in MAANG and Tier-1 tech firms with final year students for mock interviews and referral requests.',
    requiredSkills: ['Node.js', 'PostgreSQL', 'Tailwind CSS', 'UI/UX Design'],
    neededCount: 1,
    currentCount: 3,
    leadName: 'Harshvardhan Singh',
    leadBranch: 'Computer Science (7th Sem)',
    leadAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'Open',
    applicantsCount: 12,
    hasApplied: false
  },
  {
    id: 'rec_03',
    projectTitle: 'Autonomous Campus Security Rover (Formula Student / Robotics Club)',
    category: 'Hardware & Embedded',
    description: 'Developing a 4-wheel rover with LiDAR obstacle avoidance and nighttime perimeter patrolling around academic blocks.',
    requiredSkills: ['ROS (Robot Operating System)', 'C++', 'SLAM', 'LiDAR'],
    neededCount: 2,
    currentCount: 2,
    leadName: 'Ananya Verma',
    leadBranch: 'ECE (3rd Sem)',
    leadAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    status: 'Open',
    applicantsCount: 4,
    hasApplied: true
  }
];

export const MOCK_DSA_PROBLEMS: DsaProblem[] = [
  {
    id: 'dsa_01',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topic: 'Arrays & Strings',
    acceptanceRate: '49.8%',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputFormat: 'nums = [2, 7, 11, 15], target = 9',
    outputFormat: '[0, 1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    sampleCases: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Use a hash map to achieve O(N) time complexity
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test execution:
print(twoSum([2, 7, 11, 15], 9))
`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.find(complement) != mp.end()) {
            return {mp[complement], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = twoSum(nums, 9);
    cout << "[" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(res));
    }
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int returnSize;
    int* res = twoSum(nums, 4, 9, &returnSize);
    printf("[%d, %d]\\n", res[0], res[1]);
    free(res);
    return 0;
}`
    },
    hints: [
      'A brute force approach scans all pairs in O(N^2) time. Can we do better with auxiliary space?',
      'Can you check if the complement (target - current) has been seen before using a hash table in O(1) time?'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    isCompleted: true
  },
  {
    id: 'dsa_02',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topic: 'Stacks & Queues',
    acceptanceRate: '41.2%',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    inputFormat: 's = "()[]{}"',
    outputFormat: 'true',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\''
    ],
    sampleCases: [
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack

print(isValid("()[]{}"))
`,
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    cout << (isValid("()[]{}") ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.Stack;

public class Solution {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
    public static void main(String[] args) {
        System.out.println(isValid("()[]{}"));
    }
}`,
      c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool isValid(char * s) {
    int len = strlen(s);
    char stack[len + 1];
    int top = -1;
    for (int i = 0; i < len; i++) {
        if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
            stack[++top] = s[i];
        } else {
            if (top == -1) return false;
            char t = stack[top--];
            if ((s[i] == ')' && t != '(') ||
                (s[i] == '}' && t != '{') ||
                (s[i] == ']' && t != '[')) return false;
        }
    }
    return top == -1;
}

int main() {
    printf("%s\\n", isValid("()[]{}") ? "true" : "false");
    return 0;
}`
    },
    hints: [
      'Use a Last-In First-Out (LIFO) data structure: a stack.',
      'Push opening brackets onto the stack. When encountering a closing bracket, check if it matches the top element.'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    isCompleted: true
  },
  {
    id: 'dsa_03',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    topic: 'Arrays & Strings',
    acceptanceRate: '34.5%',
    description: 'Given a string `s`, find the length of the longest substring without duplicate characters.',
    inputFormat: 's = "abcabcbb"',
    outputFormat: '3',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    sampleCases: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len

print(lengthOfLongestSubstring("abcabcbb"))
`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<int> lastIndex(256, -1);
    int maxLen = 0, start = -1;
    for (int i = 0; i < s.length(); i++) {
        if (lastIndex[s[i]] > start) start = lastIndex[s[i]];
        lastIndex[s[i]] = i;
        maxLen = max(maxLen, i - start);
    }
    return maxLen;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)), i);
            }
            ans = Math.max(ans, j - i + 1);
            map.put(s.charAt(j), j + 1);
        }
        return ans;
    }
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb"));
    }
}`,
      c: `#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int maxLen = 0, start = -1;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (last[(unsigned char)s[i]] > start) start = last[(unsigned char)s[i]];
        last[(unsigned char)s[i]] = i;
        int len = i - start;
        if (len > maxLen) maxLen = len;
    }
    return maxLen;
}

int main() {
    printf("%d\\n", lengthOfLongestSubstring("abcabcbb"));
    return 0;
}`
    },
    hints: [
      'Use a sliding window approach with two pointers (left and right).',
      'Keep track of the last occurrence of each character to jump the left pointer efficiently.'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M)) where M is character set size',
    isCompleted: false
  },
  {
    id: 'dsa_04',
    title: 'Reverse a Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    acceptanceRate: '75.1%',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    inputFormat: 'head = [1, 2, 3, 4, 5]',
    outputFormat: '[5, 4, 3, 2, 1]',
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    sampleCases: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]'
      }
    ],
    starterCode: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
`,
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode *nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
      c: `struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode *prev = NULL, *curr = head;
    while (curr != NULL) {
        struct ListNode *nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}`
    },
    hints: [
      'Maintain three pointers: prev, curr, and next.',
      'Reverse the pointer direction at each step: curr->next = prev.'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    isCompleted: true
  },
  {
    id: 'dsa_05',
    title: '0/1 Knapsack Problem',
    slug: '0-1-knapsack',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    acceptanceRate: '46.7%',
    description: 'Given weights and values of `N` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. Note that we have only one quantity of each item (0 or 1 choice).',
    inputFormat: 'values = [60, 100, 120], weights = [10, 20, 30], W = 50',
    outputFormat: '220',
    constraints: [
      '1 <= N <= 1000',
      '1 <= W <= 1000'
    ],
    sampleCases: [
      {
        input: 'values = [60, 100, 120], weights = [10, 20, 30], W = 50',
        output: '220',
        explanation: 'Pick items 2 and 3 (weights 20 + 30 = 50, value 100 + 120 = 220).'
      }
    ],
    starterCode: {
      python: `def knapsack(values, weights, W):
    n = len(values)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]

print(knapsack([60, 100, 120], [10, 20, 30], 50))
`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(vector<int>& val, vector<int>& wt, int W) {
    int n = val.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    cout << knapsack(val, wt, 50) << endl;
    return 0;
}`,
      java: `public class Knapsack {
    public static int solve(int[] val, int[] wt, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < val.length; i++) {
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
            }
        }
        return dp[W];
    }
    public static void main(String[] args) {
        System.out.println(solve(new int[]{60, 100, 120}, new int[]{10, 20, 30}, 50));
    }
}`,
      c: `#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int knapsack(int val[], int wt[], int n, int W) {
    int dp[W + 1];
    for (int i = 0; i <= W; i++) dp[i] = 0;
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = MAX(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    printf("%d\\n", knapsack(val, wt, 3, 50));
    return 0;
}`
    },
    hints: [
      'At each item, you have two choices: include it (if capacity permits) or exclude it.',
      'Optimize space to 1D array by iterating the weight from capacity W down to wt[i].'
    ],
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(W)',
    isCompleted: false
  }
];

export const MOCK_STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'grp_01',
    name: 'JECRC DSA Cracking Cohort — 5th Sem',
    subject: 'Data Structures and Algorithms',
    branch: 'Computer Science & Engineering',
    semester: 5,
    description: 'Daily morning problem solving group. We tackle 2 LeetCode Mediums daily and discuss optimal space-time trade-offs.',
    memberCount: 34,
    maxMembers: 50,
    leadName: 'Harshvardhan Singh',
    nextMeetingTime: 'Today, 6:00 PM (Google Meet / Central Lawn)',
    isMember: true,
    tags: ['LeetCode', 'Interview Prep', 'Daily Practice']
  },
  {
    id: 'grp_02',
    name: 'Engineering Mathematics I — Mid-Term Prep Circle',
    subject: 'Engineering Mathematics I',
    branch: 'Computer Science & Engineering',
    semester: 1,
    description: 'Peer study circle for 1st year students working through Cayley-Hamilton proofs, matrix diagonalization, and Taylor series numericals.',
    memberCount: 28,
    maxMembers: 40,
    leadName: 'Sneh (Mentor)',
    nextMeetingTime: 'Tomorrow, 4:30 PM (Library Discussion Room B)',
    isMember: false,
    tags: ['First Year', 'Maths-1', 'PYQ Solving']
  },
  {
    id: 'grp_03',
    name: 'AI & Deep Learning Paper Reading Group',
    subject: 'Machine Learning',
    branch: 'AI & Data Science',
    semester: 5,
    description: 'Reading foundational papers on Transformers, Diffusion models, and fine-tuning open-weights LLMs for edge devices.',
    memberCount: 19,
    maxMembers: 30,
    leadName: 'Priya Patel',
    nextMeetingTime: 'Saturday, 11:00 AM (AI Lab / Discord)',
    isMember: true,
    tags: ['AI/ML', 'Research', 'PyTorch']
  },
  {
    id: 'grp_04',
    name: 'Web3 & Cloud DevOps Enthusiasts',
    subject: 'Cloud Computing & DevOps',
    branch: 'Information Technology',
    semester: 5,
    description: 'Hands-on practice with Dockerizing microservices, setting up CI/CD pipelines with GitHub Actions, and hosting on AWS.',
    memberCount: 22,
    maxMembers: 35,
    leadName: 'Rohan Meena',
    nextMeetingTime: 'Sunday, 5:00 PM (Online)',
    isMember: false,
    tags: ['Docker', 'AWS', 'DevOps']
  }
];

export const MOCK_INTERVIEW_EXPERIENCES: InterviewExperience[] = [
  {
    id: 'exp_01',
    companyName: 'Celebal Technologies',
    role: 'Associate Software Engineer (Cloud & AI)',
    studentName: 'Kartik Mathur',
    batch: '2025 Passout',
    branch: 'B.Tech CSE',
    status: 'Selected',
    difficulty: 'Moderate',
    rounds: [
      {
        title: 'Round 1: Online Technical Assessment',
        type: 'MCQs & Coding',
        questionsAsked: [
          '30 MCQs on Core CS (OOPs in C++, DBMS SQL queries, OS Paging)',
          'Coding Q1: Find minimum steps to reach target in an infinite grid',
          'Coding Q2: Reverse words in a given string without extra space'
        ],
        tips: 'Time management is key. Do not get stuck on SQL joins; attempt coding questions first.'
      },
      {
        title: 'Round 2: Technical Interview (45 mins)',
        type: 'Live Coding & System Basics',
        questionsAsked: [
          'Difference between Process and Thread; explain Race Condition with code',
          'Explain BCNF normalization and why 3NF is sometimes preferred in production',
          'Live coding: Implement LRU Cache using Doubly Linked List and Hash Map'
        ],
        tips: 'Always write clean variable names and discuss edge cases before coding.'
      },
      {
        title: 'Round 3: Techno-HR & Leadership',
        type: 'HR & Cultural fit',
        questionsAsked: [
          'Tell me about your final year project and your individual role in the team',
          'Why Celebal Technologies? Where do you see yourself in 3 years?'
        ],
        tips: 'Be genuine about what you learned from project failures.'
      }
    ],
    overallAdvice: 'Brush up on your DBMS SQL queries and Operating System memory management. JECRC students who explain concepts with practical code examples stand out easily.',
    postedDate: 'Oct 2026'
  },
  {
    id: 'exp_02',
    companyName: 'Amazon',
    role: 'Software Development Engineer (SDE-1)',
    studentName: 'Harshvardhan Singh',
    batch: '2026 Passout',
    branch: 'B.Tech CSE',
    status: 'Offered',
    difficulty: 'Challenging',
    rounds: [
      {
        title: 'Round 1: Online Assessment (OA)',
        type: 'Coding & Work Simulation',
        questionsAsked: [
          'Variation of Subtree with Maximum Average',
          'Dynamic Programming on Grid with obstacles and fuel constraints',
          'Amazon Leadership Principles behavioral simulation'
        ],
        tips: 'Do not underestimate the Amazon Leadership Principles; answer using the STAR method.'
      },
      {
        title: 'Round 2: Technical 1 (Data Structures)',
        type: 'DSA Deep Dive',
        questionsAsked: [
          'Design an in-memory file system with mkdir, ls, and write operations',
          'Trie implementation and space complexity derivation'
        ],
        tips: 'Communicate your thought process out loud. The interviewer helps if you speak clearly.'
      },
      {
        title: 'Round 3: Technical 2 (Algorithms & System Design)',
        type: 'Algorithms',
        questionsAsked: [
          'Course Schedule II (Topological Sort using Kahn\'s Algorithm)',
          'Handling cycle detection in directed vs undirected graphs'
        ],
        tips: 'Always derive exact Big-O space and time complexity.'
      }
    ],
    overallAdvice: 'Solve at least 250+ LeetCode problems focusing on Trees, Graphs, and DP. Practice explaining your code in English without pausing.',
    postedDate: 'Nov 2026'
  }
];

export const MOCK_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'opp_01',
    title: 'Software Engineering Intern — Summer 2027',
    company: 'Metacube Software',
    type: 'Internship',
    location: 'Jaipur (On-site / Hybrid)',
    stipendOrSalary: '₹25,000 / month',
    eligibility: 'B.Tech CSE/IT/ECE (5th & 6th Sem), Min 7.0 CGPA',
    deadline: '15 Dec 2026',
    skillsRequired: ['Java / C++', 'Data Structures', 'SQL', 'Git'],
    applyUrl: 'https://careers.metacube.com/jecrc-oncampus',
    isVerified: true
  },
  {
    id: 'opp_02',
    title: 'Junior Machine Learning Engineer Intern',
    company: 'Celebal Technologies',
    type: 'Internship',
    location: 'Jaipur (Mansarovar Campus)',
    stipendOrSalary: '₹22,000 / month',
    eligibility: 'B.Tech AI/DS & CSE, Knowledge of Python & Azure/Cloud',
    deadline: '28 Nov 2026',
    skillsRequired: ['Python', 'Azure AI', 'Pandas', 'FastAPI'],
    applyUrl: 'https://celebaltech.com/careers/interns',
    isVerified: true
  },
  {
    id: 'opp_03',
    title: 'Smart India Hackathon (SIH 2026) — National Finals',
    company: 'Ministry of Education & AICTE',
    type: 'Hackathon',
    location: 'Pan-India Grand Nodal Centers',
    stipendOrSalary: '₹1,00,000 Cash Prize per problem statement',
    eligibility: 'Open to all regular JECRC University B.Tech students',
    deadline: '10 Dec 2026',
    skillsRequired: ['Problem Solving', 'Full Stack / IoT / AI', 'Teamwork'],
    applyUrl: 'https://sih.gov.in',
    isVerified: true
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    type: 'doubt_answer',
    title: 'New answer on your doubt',
    message: 'Harshvardhan Singh answered your question on Dijkstra\'s negative edge cycles.',
    timeAgo: '2h ago',
    isRead: false
  },
  {
    id: 'notif_02',
    type: 'resource_verified',
    title: 'Resource Verified by Faculty',
    message: 'Your upload "Data Structures End-Term PYQ compilation" was verified by Dr. S. K. Gupta.',
    timeAgo: '5h ago',
    isRead: false
  },
  {
    id: 'notif_03',
    type: 'team_application',
    title: 'New Teammate Application',
    message: 'Ananya Verma applied to join your SIH Crop Disease Drone project.',
    timeAgo: '1d ago',
    isRead: true
  },
  {
    id: 'notif_04',
    type: 'event',
    title: 'Campus Hackathon Alert',
    message: 'JECRC Hack-A-Thon 2026 registrations close in 48 hours.',
    timeAgo: '2d ago',
    isRead: true
  }
];

export const UPCOMING_CAMPUS_EVENTS = [
  {
    id: 'ev_01',
    title: 'JECRC Hack-A-Thon 2026 — 36-Hour National Sprint',
    date: 'Dec 12-14, 2026',
    venue: 'JECRC Innovation Hub, Central Auditorium',
    badge: 'National Contest',
    registeredCount: 320,
    tags: ['Hackathon', 'Cash Prize', 'Hardware & Software']
  },
  {
    id: 'ev_02',
    title: 'Tech Talk: Breaking into Tier-1 SDE Roles from Tier-2/3',
    date: 'Nov 25, 2026 • 5:00 PM',
    venue: 'Online / Seminar Hall 3',
    badge: 'Alumni Workshop',
    speaker: 'Alok Sharma (JECRC Alumni, SDE-2 @ Microsoft)',
    registeredCount: 185,
    tags: ['Placements', 'System Design', 'Guidance']
  },
  {
    id: 'ev_03',
    title: 'Renaissance 2027 — Annual Techno-Cultural Flagship Fest',
    date: 'Feb 18-20, 2027',
    venue: 'JECRC University Main Grounds',
    badge: 'Campus Flagship',
    registeredCount: 1400,
    tags: ['Cultural', 'Robotics', 'Coding Sprint', 'Concerts']
  }
];

export const PYQ_TOPIC_TRENDS: Record<string, { topic: string; frequencyPercent: number; trend: 'rising' | 'constant' | 'critical' }[]> = {
  'Data Structures and Algorithms': [
    { topic: 'Binary Search Trees & AVL Rotations', frequencyPercent: 92, trend: 'critical' },
    { topic: 'Dijkstra & Minimum Spanning Tree (Prim/Kruskal)', frequencyPercent: 88, trend: 'critical' },
    { topic: 'Dynamic Programming: Longest Common Subsequence', frequencyPercent: 78, trend: 'rising' },
    { topic: 'Hashing & Collision Resolution (Separate Chaining)', frequencyPercent: 70, trend: 'constant' },
    { topic: 'Quick Sort & Merge Sort Recurrence Trees', frequencyPercent: 85, trend: 'critical' }
  ],
  'Engineering Mathematics I': [
    { topic: 'Cayley-Hamilton Theorem & Inverse Matrix', frequencyPercent: 95, trend: 'critical' },
    { topic: 'Eigenvalues & Eigenvectors of 3x3 Matrices', frequencyPercent: 92, trend: 'critical' },
    { topic: 'Taylor & Maclaurin Series Expansions', frequencyPercent: 82, trend: 'constant' },
    { topic: 'Beta & Gamma Function Integrals', frequencyPercent: 76, trend: 'rising' }
  ],
  'Operating Systems': [
    { topic: 'Banker\'s Algorithm Safe State Numericals', frequencyPercent: 96, trend: 'critical' },
    { topic: 'Producer-Consumer Semaphore Implementations', frequencyPercent: 88, trend: 'critical' },
    { topic: 'Page Replacement (LRU, Optimal vs FIFO)', frequencyPercent: 85, trend: 'constant' },
    { topic: 'CPU Scheduling Gantt Charts (FCFS, SJF, Round Robin)', frequencyPercent: 90, trend: 'critical' }
  ]
};
