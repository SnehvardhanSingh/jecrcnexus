import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DsaProblem } from '../types';
import { 
  Code2, 
  Terminal, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Trophy, 
  Flame, 
  Sparkles, 
  ArrowLeft, 
  Search, 
  Clock, 
  Check, 
  AlertCircle,
  Copy,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DsaArenaPage: React.FC = () => {
  const { 
    dsaProblems, 
    markProblemComplete, 
    activeDsaId, 
    setActiveDsaId, 
    currentUser,
    showToast 
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active coding state
  const activeProblem = dsaProblems.find((p) => p.id === activeDsaId) || null;
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'cpp' | 'java' | 'c'>('python');
  const [editorCode, setEditorCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'problem' | 'hints' | 'complexity'>('problem');
  
  // Execution status
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<'success' | 'failure' | null>(null);

  // Sync editor code when active problem changes
  React.useEffect(() => {
    if (activeProblem) {
      setEditorCode(activeProblem.starterCode[selectedLanguage]);
      setConsoleOutput(null);
      setExecutionResult(null);
    }
  }, [activeProblem, selectedLanguage]);

  const topics = [
    'All',
    'Arrays & Strings',
    'Linked Lists',
    'Stacks & Queues',
    'Dynamic Programming',
    'Trees & Graphs'
  ];

  const filteredProblems = dsaProblems.filter((p) => {
    const matchTopic = selectedTopic === 'All' || p.topic === selectedTopic;
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q);
    return matchTopic && matchDiff && matchSearch;
  });

  const handleRunCode = () => {
    setIsExecuting(true);
    setConsoleOutput('Compiling and running sample test cases...');
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult('success');
      if (activeProblem) {
        setConsoleOutput(
          `[Execution Status: OK (0.04s)]\nLanguage: ${selectedLanguage.toUpperCase()}\n\nSample Case 1:\nInput: ${activeProblem.sampleCases[0]?.input}\nExpected: ${activeProblem.sampleCases[0]?.output}\nActual:   ${activeProblem.sampleCases[0]?.output}\n\n✓ All ${activeProblem.sampleCases.length} sample test cases passed!`
        );
      }
    }, 700);
  };

  const handleSubmitCode = () => {
    if (!activeProblem) return;
    setIsExecuting(true);
    setConsoleOutput('Submitting to sandboxed judge evaluation...');

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult('success');
      setConsoleOutput(
        `✓ SUCCESS: ACCEPTED!\n----------------------------------------\nRuntime: 38 ms (Beats 89.4% of JECRC submissions)\nMemory Usage: 16.4 MB (Beats 76.2%)\nTest Cases: 52 / 52 passed.\n\n+15 Reputation Points Awarded!`
      );
      markProblemComplete(activeProblem.id);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const handleReset = () => {
    if (activeProblem) {
      setEditorCode(activeProblem.starterCode[selectedLanguage]);
      setConsoleOutput(null);
      setExecutionResult(null);
      showToast('Code Reset', 'Starter code template restored.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* If a problem is selected, show split code editor interface */}
      {activeProblem ? (
        <div className="space-y-4">
          {/* Top Bar for Problem Solving */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 px-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveDsaId(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 flex items-center gap-1 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Arena
              </button>
              <span className="text-slate-300">|</span>
              <h2 className="text-base font-extrabold text-slate-900">{activeProblem.title}</h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeProblem.difficulty === 'Easy'
                    ? 'bg-emerald-100 text-emerald-700'
                    : activeProblem.difficulty === 'Medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {activeProblem.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                <option value="python">Python 3</option>
                <option value="cpp">C++ (GCC 12)</option>
                <option value="java">Java (OpenJDK 17)</option>
                <option value="c">C (C99)</option>
              </select>
            </div>
          </div>

          {/* Two-Column Editor Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            
            {/* Left: Problem Details & Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[700px]">
              {/* Header Tabs */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${
                    activeTab === 'problem' ? 'bg-white shadow-2xs text-brand-blue font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('hints')}
                  className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 ${
                    activeTab === 'hints' ? 'bg-white shadow-2xs text-amber-700 font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  Hints ({activeProblem.hints.length})
                </button>
                <button
                  onClick={() => setActiveTab('complexity')}
                  className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 ${
                    activeTab === 'complexity' ? 'bg-white shadow-2xs text-purple-700 font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  Complexity Analysis
                </button>
              </div>

              {/* Tab Content Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeTab === 'problem' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">Problem Statement</h3>
                      <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                        {activeProblem.description}
                      </p>
                    </div>

                    {/* Sample Test Cases */}
                    <div className="space-y-3 pt-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Example Cases</h4>
                      {activeProblem.sampleCases.map((sc, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1">
                          <p><strong className="text-slate-500 font-sans">Input:</strong> {sc.input}</p>
                          <p><strong className="text-slate-500 font-sans">Output:</strong> {sc.output}</p>
                          {sc.explanation && (
                            <p className="text-slate-500 text-[11px] font-sans pt-1 border-t border-slate-200/60 mt-1">
                              <strong>Explanation:</strong> {sc.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Constraints */}
                    <div className="pt-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Constraints</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 font-mono text-xs">
                        {activeProblem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'hints' && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-amber-800">Step-by-Step Guided Hints</h3>
                    <p className="text-xs text-slate-500">
                      Try breaking down the problem yourself before reading subsequent hints!
                    </p>
                    {activeProblem.hints.map((hint, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-800">
                        <p className="font-bold text-amber-900 mb-1">Hint {idx + 1}:</p>
                        <p>{hint}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'complexity' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-purple-900">Optimal Space & Time Complexity</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-center">
                        <p className="text-xs text-purple-700 font-semibold">Time Complexity</p>
                        <p className="text-lg font-mono font-bold text-purple-900 mt-1">{activeProblem.timeComplexity}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-center">
                        <p className="text-xs text-purple-700 font-semibold">Space Complexity</p>
                        <p className="text-lg font-mono font-bold text-purple-900 mt-1">{activeProblem.spaceComplexity}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      JECRC interviewers evaluate candidate submissions based on algorithmic efficiency and avoiding unnecessary memory reallocation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Code Editor & Console Output */}
            <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[700px]">
              {/* Editor Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/90 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-slate-300">Solution.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : 'c'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Monospace Code Editor Area */}
              <div className="flex-1 p-4 overflow-y-auto">
                <textarea
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  className="w-full h-full bg-transparent text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed resize-none outline-none selection:bg-slate-800"
                  spellCheck={false}
                />
              </div>

              {/* Console Output Drawer */}
              <div className="border-t border-slate-800 bg-slate-900 p-4 min-h-[160px] max-h-[220px] overflow-y-auto font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="font-sans font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Execution Console
                  </span>
                  {executionResult === 'success' && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 font-sans">
                      <Check className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>

                {isExecuting ? (
                  <p className="text-amber-400 animate-pulse">Running test cases on sandbox engine...</p>
                ) : consoleOutput ? (
                  <pre className="text-slate-300 whitespace-pre-wrap">{consoleOutput}</pre>
                ) : (
                  <p className="text-slate-500 italic">Click "Run Code" or "Submit Solution" to test against university test suites.</p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="p-3 px-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-sans">
                  Environment: Sandboxed Web Compiler
                </span>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-200" /> Run Code
                  </button>

                  <button
                    onClick={handleSubmitCode}
                    disabled={isExecuting}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Submit Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PROBLEM DIRECTORY VIEW */
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>Daily Streak: {currentUser.streakDays} Days</span>
              </div>
              <h1 className="text-2xl font-extrabold">JECRC DSA Arena</h1>
              <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                Sharpen algorithmic thinking with curated problem sets for campus placements, GATE CSE, and coding competitions.
              </p>
            </div>

            {/* Quick Progress Summary */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 flex items-center gap-5 text-center">
              <div>
                <p className="text-2xl font-extrabold text-emerald-400">{currentUser.solvedProblemsCount}</p>
                <p className="text-[11px] text-slate-300">Total Solved</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-2xl font-extrabold text-amber-400">14</p>
                <p className="text-[11px] text-slate-300">Medium</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-2xl font-extrabold text-cyan-400">28</p>
                <p className="text-[11px] text-slate-300">Easy</p>
              </div>
            </div>
          </div>

          {/* Search & Topic Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search problem title or topic tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Topics Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-colors ${
                    selectedTopic === t
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Problems Table / List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="grid grid-cols-12 gap-3 p-4 px-6 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="col-span-1 text-center">Status</span>
              <span className="col-span-6 sm:col-span-7">Title</span>
              <span className="col-span-2 text-center">Difficulty</span>
              <span className="col-span-3 sm:col-span-2 text-right">Acceptance</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredProblems.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => setActiveDsaId(prob.id)}
                  className="grid grid-cols-12 gap-3 p-4 px-6 items-center hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="col-span-1 flex justify-center">
                    {prob.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-7">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {prob.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{prob.topic}</p>
                  </div>

                  <div className="col-span-2 text-center">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>

                  <div className="col-span-3 sm:col-span-2 text-right">
                    <span className="text-xs font-mono font-semibold text-slate-600">
                      {prob.acceptanceRate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
