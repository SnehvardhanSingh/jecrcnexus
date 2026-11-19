import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectShowcase, TeammateRecruitment } from '../types';
import { 
  FolderGit2, 
  Users2, 
  ExternalLink, 
  Heart, 
  PlusCircle, 
  Search, 
  X, 
  CheckCircle2, 
  Send,
  GitBranch
} from 'lucide-react';

export const ProjectShowcasePage: React.FC = () => {
  const { 
    projects, 
    addProject, 
    toggleLikeProject, 
    toggleBookmarkProject, 
    recruitments, 
    applyToRecruitment, 
    addRecruitment,
    currentUser,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'showcase' | 'find-team'>('showcase');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Project Details Modal
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);

  // Publish Project Modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [pTitle, setPTitle] = useState('');
  const [pTagline, setPTagline] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pCategory, setPCategory] = useState<any>('Web Development');
  const [pTech, setPTech] = useState('React, TypeScript, TailwindCSS');
  const [pGithub, setPGithub] = useState('https://github.com/jecrc-nexus/');
  const [pLiveDemo, setPLiveDemo] = useState('https://project-demo.vercel.app');
  const [pProblem, setPProblem] = useState('');
  const [pSolution, setPSolution] = useState('');

  // Create Recruitment Modal
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [rTitle, setRTitle] = useState('');
  const [rCategory, setRCategory] = useState('AI & Web Hackathon');
  const [rDesc, setRDesc] = useState('');
  const [rSkills, setRSkills] = useState('Python, React, FastAPI');
  const [rNeeded, setRNeeded] = useState(2);

  const categories = [
    'All',
    'AI & ML',
    'Web Development',
    'IoT & Hardware',
    'Cybersecurity',
    'Data Science',
    'Open Source'
  ];

  const filteredProjects = projects.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle.trim() || !pDescription.trim()) {
      showToast('Missing Info', 'Please enter a project title and description.', 'error');
      return;
    }

    addProject({
      title: pTitle,
      tagline: pTagline || pTitle,
      description: pDescription,
      category: pCategory,
      technologies: pTech.split(',').map(t => t.trim()).filter(Boolean),
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      githubUrl: pGithub,
      liveDemoUrl: pLiveDemo.trim() ? pLiveDemo : undefined,
      creatorName: currentUser.name,
      creatorBranch: currentUser.branch,
      creatorSemester: currentUser.semester,
      creatorAvatar: currentUser.avatar,
      problemStatement: pProblem || undefined,
      proposedSolution: pSolution || undefined,
    });

    setIsPublishModalOpen(false);
    setPTitle('');
    setPTagline('');
    setPDescription('');
  };

  const handleRecruitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rTitle.trim() || !rDesc.trim()) return;

    addRecruitment({
      projectTitle: rTitle,
      category: rCategory,
      description: rDesc,
      requiredSkills: rSkills.split(',').map(s => s.trim()).filter(Boolean),
      neededCount: rNeeded,
      currentCount: 1,
      status: 'Open',
    });

    setIsRecruitModalOpen(false);
    setRTitle('');
    setRDesc('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <FolderGit2 className="w-4 h-4" /> Student Innovation & Teammate Finder
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            Project Showcase & Collaboration Lab
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Discover student-built AI systems, robotics hardware, and web products. Find teammates for hackathons and academic capstones.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Project</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('find-team');
              setIsRecruitModalOpen(true);
            }}
            className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-brand-blue font-semibold text-xs rounded-xl border border-blue-200 transition-colors flex items-center gap-2"
          >
            <Users2 className="w-4 h-4" />
            <span>Find Teammates</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('showcase')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'showcase'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('find-team')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'find-team'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users2 className="w-3.5 h-3.5" />
          <span>Find Your Team ({recruitments.length} Listings)</span>
        </button>
      </div>

      {/* PROJECT SHOWCASE VIEW */}
      {activeTab === 'showcase' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search projects by name, keywords, or tech stack (e.g. Flutter, PyTorch, ESP32)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const isLiked = currentUser.likedProjectIds.includes(proj.id);
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-subtle overflow-hidden flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-indigo-700 shadow-2xs border border-white/50">
                        {proj.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 
                        onClick={() => setSelectedProject(proj)}
                        className="text-base font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1"
                      >
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {proj.tagline}
                      </p>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.technologies.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400">
                            +{proj.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <img
                          src={proj.creatorAvatar}
                          alt={proj.creatorName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="truncate max-w-[120px] font-medium text-slate-700">{proj.creatorName}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLikeProject(proj.id)}
                          className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                            isLiked ? 'text-rose-600' : 'text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{proj.likesCount}</span>
                        </button>

                        <button
                          onClick={() => setSelectedProject(proj)}
                          className="text-indigo-600 hover:text-indigo-800 font-bold text-xs"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FIND YOUR TEAM VIEW */}
      {activeTab === 'find-team' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                Hackathons & Research Capstones
              </span>
              <h2 className="text-xl font-extrabold mt-1">Hackathon Teammate Matching</h2>
              <p className="text-xs text-blue-100 mt-1 max-w-xl leading-relaxed">
                Need a frontend developer, AI researcher, or IoT engineer for Smart India Hackathon (SIH 2026)? Browse campus team listings or create your own.
              </p>
            </div>
            <button
              onClick={() => setIsRecruitModalOpen(true)}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-indigo-900 font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              Post Team Opening
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recruitments.map((rec) => (
              <div
                key={rec.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-200 shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {rec.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {rec.status}: {rec.neededCount} Needed
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {rec.projectTitle}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {rec.description}
                  </p>

                  <div className="mt-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Desired Technical Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.requiredSkills.map((sk) => (
                        <span key={sk} className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-brand-blue font-medium border border-blue-100">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rec.leadAvatar}
                      alt={rec.leadName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{rec.leadName}</p>
                      <p className="text-[10px] text-slate-400">{rec.leadBranch}</p>
                    </div>
                  </div>

                  {rec.hasApplied ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Application Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => applyToRecruitment(rec.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Apply to Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                {selectedProject.category}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4">
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full h-56 object-cover rounded-2xl"
              />

              <h2 className="text-xl font-extrabold text-slate-900">{selectedProject.title}</h2>
              <p className="text-xs text-slate-600 font-medium">{selectedProject.tagline}</p>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProject.creatorAvatar}
                    alt={selectedProject.creatorName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{selectedProject.creatorName}</p>
                    <p className="text-[11px] text-slate-500">{selectedProject.creatorBranch} • Sem {selectedProject.creatorSemester}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-800"
                  >
                    <GitBranch className="w-3.5 h-3.5" /> Repository
                  </a>
                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-brand-blue text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-brand-blueHover"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {selectedProject.problemStatement && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
                  <p className="font-bold text-amber-900 mb-1">Problem Statement:</p>
                  <p className="text-slate-700 leading-relaxed">{selectedProject.problemStatement}</p>
                </div>
              )}

              {selectedProject.proposedSolution && (
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs">
                  <p className="font-bold text-blue-900 mb-1">Proposed Architecture & Solution:</p>
                  <p className="text-slate-700 leading-relaxed">{selectedProject.proposedSolution}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-bold text-slate-900 mb-2">Technologies Used:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PUBLISH PROJECT MODAL */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Publish Project to JECRC Nexus</h3>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CampusPulse Transit Tracker"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catchy Tagline *</label>
                <input
                  type="text"
                  required
                  placeholder="One sentence explaining what your project does..."
                  value={pTagline}
                  onChange={(e) => setPTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, Python, OpenCV"
                    value={pTech}
                    onChange={(e) => setPTech(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={pGithub}
                    onChange={(e) => setPGithub(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Live Demo Link</label>
                  <input
                    type="url"
                    value={pLiveDemo}
                    onChange={(e) => setPLiveDemo(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Problem Statement</label>
                <textarea
                  rows={2}
                  placeholder="What campus or real-world problem is your project solving?"
                  value={pProblem}
                  onChange={(e) => setPProblem(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Solution & Features</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your implementation, sensors used, machine learning model, or system architecture..."
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Publish Project to Campus Showcase
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE RECRUITMENT MODAL */}
      {isRecruitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Post Teammate Recruitment</h3>
              </div>
              <button
                onClick={() => setIsRecruitModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecruitSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project or Hackathon Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart India Hackathon 2026 - Soil Blight Drone"
                  value={rTitle}
                  onChange={(e) => setRTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={rCategory}
                    onChange={(e) => setRCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teammates Needed</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={rNeeded}
                    onChange={(e) => setRNeeded(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Python, OpenCV, Arduino"
                  value={rSkills}
                  onChange={(e) => setRSkills(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description & Problem</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what the team will build and what role the new member will play..."
                  value={rDesc}
                  onChange={(e) => setRDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                Post Teammate Opening
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
