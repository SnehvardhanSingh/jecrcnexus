import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  HelpCircle, 
  FolderGit2, 
  AlertTriangle, 
  Check, 
  X, 
  CheckCircle2, 
  Clock, 
  Filter,
  Eye
} from 'lucide-react';

interface PendingResource {
  id: string;
  title: string;
  uploader: string;
  branch: string;
  semester: number;
  date: string;
  category: string;
}

interface ReportedContent {
  id: string;
  type: 'Comment' | 'Doubt' | 'Resource';
  contentPreview: string;
  reportedBy: string;
  reason: string;
  date: string;
}

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useApp();

  const [pendingList, setPendingList] = useState<PendingResource[]>([
    {
      id: 'p1',
      title: 'Digital Electronics Lab Viva Practical File (2026 Batch)',
      uploader: 'Simran Kaur (ECE)',
      branch: 'Electronics & Communication',
      semester: 3,
      date: '2 hours ago',
      category: 'Practical Files'
    },
    {
      id: 'p2',
      title: 'Microprocessors 8085 Assembly Code Cheat Sheet',
      uploader: 'Rohan Meena (IT)',
      branch: 'Information Technology',
      semester: 4,
      date: '4 hours ago',
      category: 'Revision Sheets'
    }
  ]);

  const [reportedList, setReportedList] = useState<ReportedContent[]>([
    {
      id: 'rep1',
      type: 'Doubt',
      contentPreview: 'Can someone share leaked end-term question paper for Engineering Physics?',
      reportedBy: 'Sneh',
      reason: 'Violates academic integrity policy (Asking for leaked exam)',
      date: '1 hour ago'
    }
  ]);

  const handleApproveResource = (id: string) => {
    setPendingList(prev => prev.filter(item => item.id !== id));
    showToast('Resource Approved!', 'Study material verified and visible to all JECRC students.');
  };

  const handleRejectResource = (id: string) => {
    setPendingList(prev => prev.filter(item => item.id !== id));
    showToast('Resource Rejected', 'Uploader notified of rejection criteria.', 'warning');
  };

  const handleDismissReport = (id: string) => {
    setReportedList(prev => prev.filter(item => item.id !== id));
    showToast('Report Dismissed', 'Content verified as acceptable.');
  };

  const handleRemoveReported = (id: string) => {
    setReportedList(prev => prev.filter(item => item.id !== id));
    showToast('Content Removed', 'Inappropriate content purged from forum.', 'error');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-600" /> Administrative Moderation Portal
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            JECRC Nexus Admin & Faculty Dashboard
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Review uploaded question papers, grant faculty verified credentials, and maintain campus forum safety standards.
          </p>
        </div>

        <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
          Role: Campus Moderator / Faculty Admin
        </span>
      </div>

      {/* Metrics Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-blue" /> Registered Students
          </p>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">5,420</p>
          <span className="text-[10px] text-emerald-600 font-bold">+120 this week</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" /> Academic Resources
          </p>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">1,452</p>
          <span className="text-[10px] text-slate-400 font-medium">85% Faculty Verified</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" /> Doubt Discussions
          </p>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">3,280</p>
          <span className="text-[10px] text-emerald-600 font-bold">92% Resolved</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4 text-indigo-600" /> Student Projects
          </p>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">284</p>
          <span className="text-[10px] text-indigo-600 font-bold">42 SIH Finalists</span>
        </div>
      </div>

      {/* Pending Resource Approval Queue */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-bold text-slate-900">
              Pending Resource Approval Queue ({pendingList.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Requires faculty verification badge</span>
        </div>

        {pendingList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            All uploaded academic materials have been reviewed!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingList.map(item => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">• Sem {item.semester}</span>
                    <span className="text-xs text-slate-400">• {item.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Uploaded by {item.uploader} ({item.branch})</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApproveResource(item.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-2xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve & Verify
                  </button>
                  <button
                    onClick={() => handleRejectResource(item.id)}
                    className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reported Content & Community Moderation */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              Reported Forum Content ({reportedList.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Student flag queue</span>
        </div>

        {reportedList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            No reports active. Campus community guideline compliance is 100%.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reportedList.map(rep => (
              <div key={rep.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                      Reported {rep.type}
                    </span>
                    <span className="text-xs text-slate-400">• Flagged by {rep.reportedBy}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 bg-slate-50 p-2 rounded-lg border border-slate-200 italic">
                    "{rep.contentPreview}"
                  </p>
                  <p className="text-[11px] text-rose-600 font-medium mt-1">Reason: {rep.reason}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDismissReport(rep.id)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleRemoveReported(rep.id)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-2xs"
                  >
                    Remove Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
