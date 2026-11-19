import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DoubtQuestion } from '../types';
import { 
  HelpCircle, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  Code2, 
  Send, 
  Sparkles, 
  X, 
  ChevronRight, 
  Tag,
  Award,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const AskDoubtPage: React.FC = () => {
  const { 
    doubts, 
    addDoubt, 
    upvoteDoubt, 
    addAnswer, 
    markAnswerAccepted, 
    currentUser,
    showToast 
  } = useApp();

  const [filterType, setFilterType] = useState<'latest' | 'popular' | 'unanswered' | 'upvoted'>('latest');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active question being viewed in detail
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  // Ask Doubt Modal State
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSubject, setNewSubject] = useState('Data Structures and Algorithms');
  const [newSemester, setNewSemester] = useState(currentUser.semester);
  const [newTags, setNewTags] = useState('DSA, Graphs, Pointers');
  const [newCodeSnippet, setNewCodeSnippet] = useState('');
  const [newCodeLanguage, setNewCodeLanguage] = useState('cpp');

  // New Answer State
  const [answerContent, setAnswerContent] = useState('');
  const [answerCodeSnippet, setAnswerCodeSnippet] = useState('');
  const [showAnswerCodeInput, setShowAnswerCodeInput] = useState(false);

  const subjectCommunities = [
    'All',
    'Data Structures and Algorithms',
    'Engineering Mathematics',
    'Programming in C',
    'Operating Systems',
    'AI and Machine Learning',
    'Electronics and Electrical Engineering',
    'Web Development',
    'Placement Preparation'
  ];

  // Filtering questions
  const filteredDoubts = doubts.filter((d) => {
    // Community filter
    if (selectedCommunity !== 'All' && !d.subject.toLowerCase().includes(selectedCommunity.toLowerCase())) {
      return false;
    }
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = d.title.toLowerCase().includes(q) || 
                    d.description.toLowerCase().includes(q) || 
                    d.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    // Filter type
    if (filterType === 'unanswered') {
      return d.answers.length === 0;
    }
    return true;
  }).sort((a, b) => {
    if (filterType === 'popular' || filterType === 'upvoted') {
      return b.upvotes - a.upvotes;
    }
    return b.id.localeCompare(a.id); // latest
  });

  const activeQuestion = doubts.find((d) => d.id === activeQuestionId);

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast('Missing Fields', 'Please provide a question title and explanation.', 'error');
      return;
    }

    addDoubt({
      title: newTitle,
      description: newDescription,
      subject: newSubject,
      semester: newSemester,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      codeSnippet: newCodeSnippet.trim() ? newCodeSnippet : undefined,
      codeLanguage: newCodeLanguage,
    });

    setIsAskModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewCodeSnippet('');
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestionId || !answerContent.trim()) return;

    addAnswer(activeQuestionId, answerContent, answerCodeSnippet.trim() ? answerCodeSnippet : undefined);
    setAnswerContent('');
    setAnswerCodeSnippet('');
    setShowAnswerCodeInput(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> Ask a Doubt • Campus Q&A
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            Student Academic Doubt Community
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Ask homework, lab questions, code bugs, and conceptual doubts. Earn reputation points by providing accepted answers.
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask a Question</span>
        </button>
      </div>

      {/* Community Badges Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {subjectCommunities.map((comm) => (
          <button
            key={comm}
            onClick={() => setSelectedCommunity(comm)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedCommunity === comm
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {comm}
          </button>
        ))}
      </div>

      {/* QUESTION DETAIL VIEW OR LIST VIEW */}
      {activeQuestion ? (
        /* DETAIL VIEW */
        <div className="space-y-6">
          <button
            onClick={() => setActiveQuestionId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Doubt Community
          </button>

          {/* Question Full Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {activeQuestion.subject}
                  </span>
                  <span className="text-xs text-slate-400">• Sem {activeQuestion.semester}</span>
                  <span className="text-xs text-slate-400">• {activeQuestion.createdAt}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {activeQuestion.title}
                </h2>
              </div>

              {/* Upvote Pill */}
              <button
                onClick={() => upvoteDoubt(activeQuestion.id)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl border transition-colors ${
                  currentUser.upvotedDoubtIds.includes(activeQuestion.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs mt-1">{activeQuestion.upvotes}</span>
              </button>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={activeQuestion.authorAvatar}
                alt={activeQuestion.authorName}
                className="w-9 h-9 rounded-xl object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{activeQuestion.authorName}</p>
                <p className="text-[11px] text-slate-500">{activeQuestion.authorBranch} • Sem {activeQuestion.authorSemester}</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {activeQuestion.description}
            </p>

            {/* Code Snippet if present */}
            {activeQuestion.codeSnippet && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800 mb-2">
                  <span>Code Snippet ({activeQuestion.codeLanguage || 'C++'})</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre leading-relaxed">
                  <code>{activeQuestion.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeQuestion.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Answers Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <span>{activeQuestion.answers.length} Answers</span>
            </h3>

            {activeQuestion.answers.map((ans) => {
              const isAccepted = ans.isAccepted;
              return (
                <div
                  key={ans.id}
                  className={`bg-white p-5 rounded-2xl border transition-all ${
                    isAccepted
                      ? 'border-emerald-300 ring-2 ring-emerald-100'
                      : 'border-slate-200'
                  }`}
                >
                  {isAccepted && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-3 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 w-fit">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Accepted by Question Author (+10 Reputation)</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={ans.authorAvatar}
                        alt={ans.authorName}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          {ans.authorName}
                          <span className="text-[10px] text-brand-blue font-normal">
                            ★ {ans.authorReputation} rep
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400">{ans.authorBranch} • {ans.createdAt}</p>
                      </div>
                    </div>

                    {!isAccepted && (
                      <button
                        onClick={() => markAnswerAccepted(activeQuestion.id, ans.id)}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"
                      >
                        Accept as Solution
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {ans.content}
                  </p>

                  {ans.codeSnippet && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200">
                      <pre className="overflow-x-auto whitespace-pre">
                        <code>{ans.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Answer Submission Form */}
            <form onSubmit={handleAnswerSubmit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Contribute your Answer</h4>
              <p className="text-xs text-slate-500">
                Provide clean, step-by-step guidance. Helpful answers earn +5 reputation points.
              </p>

              <textarea
                rows={4}
                required
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="Explain the solution clearly, cite theory, or explain why edge cases occur..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
              />

              {showAnswerCodeInput && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Code Snippet (Optional)</label>
                  <textarea
                    rows={4}
                    value={answerCodeSnippet}
                    onChange={(e) => setAnswerCodeSnippet(e.target.value)}
                    placeholder="Paste code or fix here..."
                    className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 bg-slate-900 text-slate-100 outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnswerCodeInput(!showAnswerCodeInput)}
                  className="text-xs text-brand-blue hover:underline font-semibold flex items-center gap-1"
                >
                  <Code2 className="w-4 h-4" />
                  {showAnswerCodeInput ? 'Hide Code Snippet' : 'Attach Code Snippet'}
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Post Answer
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* QUESTION FEED LIST VIEW */
        <div className="space-y-4">
          {/* Search & Sort Row */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search doubt topics, error messages, algorithms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-blue outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
              {[
                { id: 'latest', label: 'Latest' },
                { id: 'popular', label: 'Most Upvoted' },
                { id: 'unanswered', label: 'Unanswered' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                    filterType === tab.id
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Doubts List */}
          <div className="space-y-3">
            {filteredDoubts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No doubts found matching this query</p>
                <p className="text-xs text-slate-500 mt-1">Be the first student to ask a question in this subject!</p>
                <button
                  onClick={() => setIsAskModalOpen(true)}
                  className="mt-3 px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Ask a Doubt Now
                </button>
              </div>
            ) : (
              filteredDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  onClick={() => setActiveQuestionId(doubt.id)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-subtle transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100">
                          {doubt.subject}
                        </span>
                        <span className="text-xs text-slate-400">• Sem {doubt.semester}</span>
                        <span className="text-xs text-slate-400">• {doubt.createdAt}</span>
                        {doubt.isResolved && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resolved
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {doubt.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {doubt.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <img
                            src={doubt.authorAvatar}
                            alt={doubt.authorName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span>{doubt.authorName}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        {doubt.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats Widget */}
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0 text-center">
                      <ThumbsUp className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-bold text-slate-800 mt-1">{doubt.upvotes}</span>
                      <span className="text-[10px] text-slate-400 mt-1 font-semibold">{doubt.answers.length} answers</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ASK DOUBT MODAL */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Ask a Doubt on JECRC Nexus</h3>
              </div>
              <button
                onClick={() => setIsAskModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostDoubt} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Question Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Why does quicksort worst case run in O(N^2) time?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    {subjectCommunities.filter(c => c !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
                  <select
                    value={newSemester}
                    onChange={(e) => setNewSemester(Number(e.target.value) as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe what you tried, the error message, or specific theory concept you want explained..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Code Snippet (Optional)</label>
                  <select
                    value={newCodeLanguage}
                    onChange={(e) => setNewCodeLanguage(e.target.value)}
                    className="text-[11px] px-2 py-0.5 border border-slate-200 rounded-md outline-none bg-slate-50"
                  >
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="sql">SQL</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  placeholder="// Paste your code snippet here"
                  value={newCodeSnippet}
                  onChange={(e) => setNewCodeSnippet(e.target.value)}
                  className="w-full p-2.5 text-xs font-mono rounded-xl border border-slate-800 bg-slate-950 text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Topic Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Graphs, Dijkstra, Exam2026"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                Publish Doubt to Forum
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
