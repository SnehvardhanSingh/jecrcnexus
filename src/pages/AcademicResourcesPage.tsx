import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicResource, Branch, ResourceCategory, Semester } from '../types';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Bookmark, 
  Star, 
  ShieldCheck, 
  FileText, 
  Eye, 
  Sparkles, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { PYQ_TOPIC_TRENDS } from '../data/mockData';

export const AcademicResourcesPage: React.FC = () => {
  const { 
    resources, 
    addResource, 
    toggleBookmarkResource, 
    upvoteResource, 
    downloadResource, 
    currentUser,
    showToast 
  } = useApp();

  // Active view tab: 'all-resources' | 'pyq-explorer' | 'bookmarked'
  const [activeTab, setActiveTab] = useState<'all-resources' | 'pyq-explorer' | 'bookmarked'>('all-resources');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedExamType, setSelectedExamType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'downloads' | 'rating'>('newest');

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Data Structures and Algorithms');
  const [uploadBranch, setUploadBranch] = useState<Branch>('Computer Science & Engineering');
  const [uploadSemester, setUploadSemester] = useState<Semester>(5);
  const [uploadCategory, setUploadCategory] = useState<ResourceCategory>('End-Term Papers');
  const [uploadYear, setUploadYear] = useState('2026');
  const [uploadExamType, setUploadExamType] = useState<'Mid-Term' | 'End-Term' | 'Class Test' | 'Lab Viva' | 'General'>('End-Term');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTags, setUploadTags] = useState('DSA, Notes, PYQ');
  const [mockFileName, setMockFileName] = useState<string | null>(null);

  // Preview Modal State
  const [previewResource, setPreviewResource] = useState<AcademicResource | null>(null);

  // Smart PYQ Explorer Selected Subject
  const [pyqSubject, setPyqSubject] = useState('Data Structures and Algorithms');

  // Filtered logic
  const filteredResources = resources.filter((res) => {
    // Tab filter
    if (activeTab === 'bookmarked' && !currentUser.bookmarkedResourceIds.includes(res.id)) {
      return false;
    }
    if (activeTab === 'pyq-explorer' && !res.category.includes('Paper')) {
      return false;
    }

    // Search query
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !q || 
      res.title.toLowerCase().includes(q) || 
      res.subject.toLowerCase().includes(q) ||
      res.tags.some(t => t.toLowerCase().includes(q));

    // Branch filter
    const matchesBranch = selectedBranch === 'All' || res.branch === selectedBranch;

    // Semester filter
    const matchesSemester = selectedSemester === 'All' || res.semester.toString() === selectedSemester;

    // Category filter
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;

    // Year filter
    const matchesYear = selectedYear === 'All' || res.year === selectedYear;

    // Exam Type filter
    const matchesExamType = selectedExamType === 'All' || res.examType === selectedExamType;

    return matchesSearch && matchesBranch && matchesSemester && matchesCategory && matchesYear && matchesExamType;
  }).sort((a, b) => {
    if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.id.localeCompare(a.id); // newest default
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      showToast('Title Required', 'Please enter a title for the resource.', 'error');
      return;
    }

    addResource({
      title: uploadTitle,
      subject: uploadSubject,
      branch: uploadBranch,
      semester: uploadSemester,
      category: uploadCategory,
      year: uploadYear,
      examType: uploadExamType,
      fileFormat: 'PDF',
      fileSize: '3.4 MB',
      uploaderName: currentUser.name,
      description: uploadDescription || 'Verified student notes contribution.',
      tags: uploadTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadDescription('');
    setMockFileName(null);
  };

  const categoriesList: ResourceCategory[] = [
    'Previous Year Papers',
    'Mid-Term Papers',
    'End-Term Papers',
    'Handwritten Notes',
    'Subject-wise Notes',
    'Revision Sheets',
    'Lab Manuals',
    'Practical Files',
    'Practice Questions'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Academic Resource Hub
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            JECRC Academic Resources & PYQ Archive
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Access past examination papers, faculty-recommended notes, handwritten derivations, and lab viva manuals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Resource</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('all-resources')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'all-resources'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Resources ({resources.length})
        </button>
        <button
          onClick={() => setActiveTab('pyq-explorer')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'pyq-explorer'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Smart PYQ Explorer</span>
        </button>
        <button
          onClick={() => setActiveTab('bookmarked')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'bookmarked'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          My Bookmarks ({currentUser.bookmarkedResourceIds.length})
        </button>
      </div>

      {/* SMART PYQ EXPLORER VIEW */}
      {activeTab === 'pyq-explorer' && (
        <div className="bg-gradient-to-br from-blue-50/60 to-cyan-50/40 p-6 rounded-3xl border border-blue-200/80 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> Topic Trend & Frequency Analysis
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">Smart PYQ Topic Insights</h2>
              <p className="text-xs text-slate-600 mt-1">
                Historical frequency of core examination questions compiled from the past 5 years of JECRC end-term papers.
              </p>
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Select Subject:</label>
              <select
                value={pyqSubject}
                onChange={(e) => setPyqSubject(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none"
              >
                <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
                <option value="Engineering Mathematics I">Engineering Mathematics I</option>
                <option value="Operating Systems">Operating Systems</option>
              </select>
            </div>
          </div>

          {/* Historical Trend Indicators Panel */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                High-Yield Topics for {pyqSubject}
              </h3>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold flex items-center gap-1">
                <Info className="w-3 h-3" /> Sample Analysis (Not predictive)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(PYQ_TOPIC_TRENDS[pyqSubject] || []).map((t, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{t.topic}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      t.trend === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {t.frequencyPercent}% Frequency
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${t.trend === 'critical' ? 'bg-rose-500' : 'bg-brand-blue'}`}
                      style={{ width: `${t.frequencyPercent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-brand-blue" />
                    Appeared in {Math.round(t.frequencyPercent / 20)} of the last 5 university exams.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title, subject, formula, or topic tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Top Rated (Stars)</option>
            </select>
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
            >
              <option value="All">All Branches</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="AI & Data Science">AI & DS</option>
              <option value="Information Technology">IT</option>
              <option value="Electronics & Communication">ECE</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
            >
              <option value="All">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s.toString()}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
            >
              <option value="All">All Categories</option>
              {categoriesList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Exam Type</label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
            >
              <option value="All">All Exam Types</option>
              <option value="Mid-Term">Mid-Term</option>
              <option value="End-Term">End-Term</option>
              <option value="Lab Viva">Lab Viva</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
            >
              <option value="All">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No resources found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No study material matched your current search filters. Try clearing filters or upload notes for your classmates.
            </p>
            <button
              onClick={() => {
                setSelectedBranch('All');
                setSelectedSemester('All');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredResources.map((res) => {
            const isBookmarked = currentUser.bookmarkedResourceIds.includes(res.id);
            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-subtle p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Category Pill & Verification */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue border border-blue-100">
                      {res.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {res.isVerifiedByFaculty && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                        </span>
                      )}
                      <button
                        onClick={() => toggleBookmarkResource(res.id)}
                        className="text-slate-400 hover:text-brand-blue p-1 rounded-md transition-colors"
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-brand-blue text-brand-blue' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    {res.subject} • Sem {res.semester}
                  </p>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {res.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Meta & Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                    <span className="truncate max-w-[130px]">By {res.uploaderName}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {res.rating}
                    </span>
                    <span>{res.fileSize} ({res.fileFormat})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewResource(res)}
                      className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => downloadResource(res.id)}
                      className="py-1.5 px-3 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* RESOURCE PREVIEW MODAL */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-brand-blue">
                  {previewResource.category} • {previewResource.examType}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{previewResource.title}</h3>
                <p className="text-xs text-slate-500">{previewResource.subject} • Contributed by {previewResource.uploaderName}</p>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Viewer Simulation */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-100/70 space-y-4">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px] text-slate-800 space-y-4 font-serif">
                <div className="border-b pb-4 text-center">
                  <h2 className="text-lg font-bold font-sans text-brand-dark uppercase">JECRC UNIVERSITY, JAIPUR</h2>
                  <p className="text-xs font-sans text-slate-500">Department of {previewResource.branch}</p>
                  <p className="text-sm font-sans font-bold text-brand-blue mt-1">{previewResource.subject} — Examination Document</p>
                </div>

                <div className="text-xs font-sans space-y-3 leading-relaxed text-slate-700">
                  <p><strong>Overview & Notes Summary:</strong></p>
                  <p>{previewResource.description}</p>
                  
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-slate-800 font-sans my-4">
                    <p className="font-bold text-xs text-brand-blue mb-1">Key Examination Topics Covered:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      <li>Topic 1: Recurrence relations and Master's Theorem proofs</li>
                      <li>Topic 2: Dijkstra's Algorithm with detailed non-negative edge constraints</li>
                      <li>Topic 3: Memory allocation and B-Tree indexing in practical file formats</li>
                    </ul>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Note: This is a verified student study preview document for JECRC Nexus. Download the full PDF for handwritten derivations and numerical solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 px-6 border-t border-slate-200 bg-white flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {previewResource.downloadsCount} downloads • {previewResource.fileSize}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    downloadResource(previewResource.id);
                    setPreviewResource(null);
                  }}
                  className="px-5 py-2 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Complete PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD RESOURCE MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand-blue" />
                <h3 className="text-base font-bold text-slate-900">Upload Academic Study Material</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems Mid-Term 2025 Solved Paper"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as ResourceCategory)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    {categoriesList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
                  <select
                    value={uploadSemester}
                    onChange={(e) => setUploadSemester(Number(e.target.value) as Semester)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Type</label>
                  <select
                    value={uploadExamType}
                    onChange={(e) => setUploadExamType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    <option value="End-Term">End-Term Paper</option>
                    <option value="Mid-Term">Mid-Term Paper</option>
                    <option value="Lab Viva">Lab Viva</option>
                    <option value="General">General Notes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Topics Covered</label>
                <textarea
                  rows={2}
                  placeholder="Summarize formulas, questions, or key theorems included..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
                />
              </div>

              {/* File Attachment Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Attach PDF Document (Max 25MB)</label>
                <div 
                  onClick={() => setMockFileName('JECRC_Exam_Prep_Notes_2026.pdf')}
                  className="border-2 border-dashed border-slate-300 hover:border-brand-blue rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50"
                >
                  <FileText className="w-6 h-6 text-brand-blue mx-auto mb-1" />
                  <p className="text-xs font-semibold text-slate-700">
                    {mockFileName ? mockFileName : 'Click to select or drag PDF study material'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF, DOCX, ZIP</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                Please upload only authorized notes and student study materials. Faculty verification ensures community quality.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Resource to JECRC Nexus
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
