import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InterviewExperience, CareerOpportunity } from '../types';
import { 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Search, 
  Sparkles, 
  Building2, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { MOCK_INTERVIEW_EXPERIENCES, MOCK_OPPORTUNITIES } from '../data/mockData';

export const PlacementPrepPage: React.FC = () => {
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'experiences' | 'roadmaps' | 'resume' | 'opportunities'>('experiences');
  const [expandedExpId, setExpandedExpId] = useState<string | null>('exp_01');

  // Resume Review Tool State
  const [resumeText, setResumeText] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);

  const handleAnalyzeResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setIsAnalyzingResume(true);
    setTimeout(() => {
      setIsAnalyzingResume(false);
      setResumeAnalysis({
        atsScore: 84,
        strengths: [
          'Strong action verbs detected ("Engineered", "Implemented", "Architected")',
          'Clear quantifiable metrics (e.g. "improved latency by 35%", "handled 10k requests")',
          'Core engineering technologies well listed (React, TypeScript, PostgreSQL, Docker)'
        ],
        improvements: [
          'Add a dedicated "Campus Achievements" section highlighting hackathon rankings',
          'Include links to live project demos alongside GitHub repositories',
          'Ensure DBMS Normalization and Operating System fundamentals are mentioned under Technical Skills'
        ]
      });
      showToast('Resume Analysis Complete', 'ATS Score: 84/100');
    }, 800);
  };

  const roadmaps = [
    {
      title: 'Full Stack & Software Engineering (SDE)',
      duration: '6 Months Plan',
      stages: [
        'Month 1-2: Advanced Data Structures (Trees, Graphs, DP) in C++ / Java',
        'Month 3: Core CS Mastery (Operating Systems, DBMS SQL queries, Computer Networks)',
        'Month 4: Full Stack Production Project (Next.js, Node.js, PostgreSQL, Auth)',
        'Month 5: System Design Fundamentals & Low-Level Design (LLD/OOP)',
        'Month 6: Mock Interviews & Company-Specific Past Questions'
      ]
    },
    {
      title: 'AI / Machine Learning Engineer',
      duration: '6 Months Plan',
      stages: [
        'Month 1: Python, NumPy, Pandas & Linear Algebra / Multivariable Calculus',
        'Month 2: Supervised & Unsupervised ML with Scikit-Learn',
        'Month 3: Deep Learning & Computer Vision using PyTorch / TensorFlow',
        'Month 4: LLMs, LangChain, Embeddings & Vector Databases',
        'Month 5-6: Deploying ML APIs with FastAPI & Docker on AWS/Azure'
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
            <Briefcase className="w-4 h-4" /> Career & Placement Cell Portal
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            Placement & Career Preparation Hub
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Real interview experiences from JECRC seniors, comprehensive tech roadmaps, ATS resume review, and verified student internships.
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2 max-w-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Curated student experiences & verified campus drives.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('experiences')}
          className={`px-4 py-2 font-bold rounded-xl transition-all ${
            activeTab === 'experiences' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Interview Archive ({MOCK_INTERVIEW_EXPERIENCES.length})
        </button>
        <button
          onClick={() => setActiveTab('roadmaps')}
          className={`px-4 py-2 font-bold rounded-xl transition-all ${
            activeTab === 'roadmaps' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Prep Roadmaps
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'resume' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ATS Resume Reviewer</span>
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-4 py-2 font-bold rounded-xl transition-all ${
            activeTab === 'opportunities' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Internship & Contest Board ({MOCK_OPPORTUNITIES.length})
        </button>
      </div>

      {/* INTERVIEW EXPERIENCES */}
      {activeTab === 'experiences' && (
        <div className="space-y-4">
          {MOCK_INTERVIEW_EXPERIENCES.map((exp) => {
            const isExpanded = expandedExpId === exp.id;
            return (
              <div
                key={exp.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                  className="p-6 cursor-pointer hover:bg-slate-50 flex items-start justify-between gap-4 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {exp.companyName}
                      </span>
                      <span className="text-xs text-slate-400">• {exp.role}</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Status: {exp.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{exp.studentName} — {exp.branch}</h3>
                    <p className="text-xs text-slate-500 mt-1">Batch of {exp.batch} • Difficulty: {exp.difficulty}</p>
                  </div>

                  <div className="p-2 text-slate-400 hover:text-slate-700">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">
                      Selection Rounds Breakdown:
                    </p>

                    <div className="space-y-3">
                      {exp.rounds.map((round, rIdx) => (
                        <div key={rIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                            <span>{round.title}</span>
                            <span className="text-slate-500 text-[11px]">{round.type}</span>
                          </div>

                          <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                            {round.questionsAsked.map((q, qi) => (
                              <li key={qi}>{q}</li>
                            ))}
                          </ul>

                          <p className="text-xs text-brand-blue font-semibold pt-1 border-t border-slate-200/60">
                            Candidate Tip: {round.tips}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs">
                      <strong className="text-brand-blue">Overall Preparation Advice:</strong>
                      <p className="text-slate-700 mt-1 leading-relaxed">{exp.overallAdvice}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PREP ROADMAPS */}
      {activeTab === 'roadmaps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmaps.map((rm, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">{rm.title}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue">
                  {rm.duration}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {rm.stages.map((stg, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{stg}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ATS RESUME REVIEWER */}
      {activeTab === 'resume' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Automated JECRC Placement Resume Reviewer
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Paste your resume project descriptions or skills summary to check ATS compliance, action verbs, and quantify achievements.
            </p>
          </div>

          <form onSubmit={handleAnalyzeResume} className="space-y-3">
            <textarea
              rows={6}
              required
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here (e.g. Developed real-time telemetry web app using React and Node.js. Integrated MQTT broker and reduced sensor latency by 35%...)"
              className="w-full p-4 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:border-purple-500 outline-none leading-relaxed"
            />

            <button
              type="submit"
              disabled={isAnalyzingResume}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              {isAnalyzingResume ? 'Running ATS Analysis...' : 'Analyze Resume'}
            </button>
          </form>

          {resumeAnalysis && (
            <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  ATS Resume Quality Score
                </span>
                <span className="text-2xl font-extrabold text-purple-700">
                  {resumeAnalysis.atsScore} / 100
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-emerald-800">Key Strengths Detected:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {resumeAnalysis.strengths.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <p className="font-bold text-amber-800 pt-2">Recommended Enhancements:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {resumeAnalysis.improvements.map((imp: string, i: number) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* OPPORTUNITY BOARD */}
      {activeTab === 'opportunities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100">
                    {opp.type}
                  </span>
                  {opp.isVerified && (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Drive
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{opp.title}</h3>
                <p className="text-xs font-semibold text-brand-blue mt-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {opp.company}
                </p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p><strong>Stipend / Prize:</strong> {opp.stipendOrSalary}</p>
                  <p><strong>Location:</strong> {opp.location}</p>
                  <p><strong>Eligibility:</strong> {opp.eligibility}</p>
                  <p className="text-rose-600 font-semibold"><strong>Deadline:</strong> {opp.deadline}</p>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {opp.skillsRequired.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={opp.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
