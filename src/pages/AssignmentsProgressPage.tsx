import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ASSIGNMENTS, AssignmentTask } from '../data/mockData';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  Code2,
  Flame,
  Award,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const AssignmentsProgressPage: React.FC = () => {
  const { currentUser, setCurrentPage, showToast } = useApp();
  const [tasks, setTasks] = useState<AssignmentTask[]>(MOCK_ASSIGNMENTS);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Due Soon' | 'In Progress' | 'Completed'>('All');

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const becomingCompleted = task.status !== 'Completed';
        showToast(
          becomingCompleted ? 'Assignment Marked Complete!' : 'Assignment Reopened',
          task.title
        );
        return {
          ...task,
          status: becomingCompleted ? 'Completed' : 'In Progress',
          progress: becomingCompleted ? 100 : 60,
        };
      })
    );
  };

  const filteredTasks = tasks.filter(
    (t) => statusFilter === 'All' || t.status === statusFilter
  );

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const overallProgress = Math.round(
    tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Overview */}
      <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-tealDark uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" /> Semester {currentUser.semester} Tracker
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            Assignments & Academic Progress
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay ahead of JECRC lab submissions, semester assignments, and your daily coding goals.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('dsa')}
          className="px-4 py-2.5 bg-brand-teal hover:bg-brand-tealDark text-white font-bold text-xs rounded-xl shadow-subtle transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <Code2 className="w-4 h-4" />
          <span>Practice in DSA Arena</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-brand-teal text-white p-5 rounded-[22px] shadow-subtle">
          <p className="text-xs font-semibold text-teal-50">Overall Completion</p>
          <p className="text-3xl font-extrabold mt-1">{overallProgress}%</p>
          <div className="w-full h-1.5 bg-white/25 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>

        <div className="bg-[#F8C423] text-brand-dark p-5 rounded-[22px] shadow-subtle">
          <p className="text-xs font-bold text-amber-950/80">Assignments Done</p>
          <p className="text-3xl font-extrabold mt-1">
            {completedCount}/{tasks.length}
          </p>
          <p className="text-[11px] font-semibold mt-2">Current Semester</p>
        </div>

        <div className="bg-[#F56A53] text-white p-5 rounded-[22px] shadow-subtle">
          <p className="text-xs font-semibold text-white/90">DSA Problems Solved</p>
          <p className="text-3xl font-extrabold mt-1">{currentUser.solvedProblemsCount}</p>
          <p className="text-[11px] font-medium mt-2 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> {currentUser.reputation} Karma pts
          </p>
        </div>

        <div className="bg-white p-5 rounded-[22px] border border-slate-100 shadow-subtle">
          <p className="text-xs font-bold text-slate-500">Study Streak</p>
          <p className="text-3xl font-extrabold text-brand-dark mt-1 flex items-center gap-1.5">
            <Flame className="w-6 h-6 text-brand-coral fill-brand-coral" />
            {currentUser.streakDays}d
          </p>
          <p className="text-[11px] text-slate-400 mt-2">Consistent daily activity</p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['All', 'Due Soon', 'In Progress', 'Completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === status
                ? 'bg-brand-teal text-white shadow-subtle'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'Completed';
          return (
            <div
              key={task.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-subtle hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isDone
                      ? 'bg-brand-teal border-brand-teal text-white'
                      : 'border-slate-300 hover:border-brand-teal'
                  }`}
                  aria-label="Toggle completion"
                >
                  {isDone && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        task.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : task.status === 'Due Soon'
                          ? 'bg-brand-coralLight text-brand-coral'
                          : 'bg-brand-amberLight text-amber-800'
                      }`}
                    >
                      {task.status}
                    </span>
                    <span className="text-[11px] font-semibold text-brand-tealDark">
                      {task.subject}
                    </span>
                    <span className="text-[11px] text-slate-400">• {task.type}</span>
                  </div>

                  <h3
                    className={`text-sm font-bold ${
                      isDone ? 'line-through text-slate-400' : 'text-brand-dark'
                    }`}
                  >
                    {task.title}
                  </h3>

                  <div className="mt-2.5 flex items-center gap-3 max-w-md">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isDone ? 'bg-emerald-500' : 'bg-brand-teal'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{task.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {task.dueDate}
                </span>
                <button
                  onClick={() => setCurrentPage('resources')}
                  className="px-3 py-1.5 rounded-xl bg-brand-bg hover:bg-brand-tealLight text-slate-700 hover:text-brand-tealDark text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
