import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users2, 
  Terminal, 
  MessageSquare, 
  CheckSquare, 
  Copy, 
  Play, 
  Plus, 
  Send, 
  Sparkles, 
  Code2, 
  Circle, 
  FileCode, 
  Layers, 
  CheckCircle2,
  Trash2,
  Share2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
}

interface WorkspaceTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  assignee: string;
}

export const CodeTogetherPage: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [roomName, setRoomName] = useState('SIH 2026 - Smart Campus Sprint');
  const [roomCode, setRoomCode] = useState('JECRC-8842');
  const [activeTab, setActiveTab] = useState<'editor' | 'tasks' | 'whiteboard'>('editor');
  
  // Editor
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(`# Collaborative Workspace: ${roomName}
# Room Code: ${roomCode}
# Teammates: Sneh, Priya Patel, Harshvardhan Singh

import time

def process_iot_sensor_data(payload):
    print("Received telemetry from JECRC Innovation Lab sensor...")
    cleaned = [x for x in payload if x > 0]
    return sum(cleaned) / max(len(cleaned), 1)

# Test run:
sample_data = [24.5, 25.1, 23.9, -1, 26.2]
avg_temp = process_iot_sensor_data(sample_data)
print(f"Optimal Average Temperature: {avg_temp:.2f}°C")
`);

  // Console output
  const [consoleLog, setConsoleLog] = useState<string | null>(null);

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'I pushed the FastAPI endpoints for sensor telemetry. Let me know if you can test them!',
      time: '10:14 AM'
    },
    {
      id: 'm2',
      sender: 'Harshvardhan Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Looking good! Make sure we handle negative values from the calibration loop.',
      time: '10:16 AM'
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Kanban Tasks
  const [tasks, setTasks] = useState<WorkspaceTask[]>([
    { id: 't1', title: 'Connect MQTT broker with Raspberry Pi', status: 'done', assignee: 'Priya' },
    { id: 't2', title: 'Implement real-time outlier filtration', status: 'in_progress', assignee: 'Sneh' },
    { id: 't3', title: 'Prepare SIH PPT slides for Faculty review', status: 'todo', assignee: 'Harsh' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const teammates = [
    { name: currentUser.name, role: 'Lead', avatar: currentUser.avatar, online: true },
    { name: 'Priya Patel', role: 'AI / Backend', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', online: true },
    { name: 'Harshvardhan Singh', role: 'Advisor / Senior', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', online: true },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: currentUser.name,
      avatar: currentUser.avatar,
      text: newChatText.trim(),
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setNewChatText('');
  };

  const handleRunCode = () => {
    setConsoleLog('Compiling and executing in shared workspace...');
    setTimeout(() => {
      setConsoleLog(`[Workspace Runner: Python 3.11]\nReceived telemetry from JECRC Innovation Lab sensor...\nOptimal Average Temperature: 24.93°C\n\nExecution finished with code 0.`);
    }, 600);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setTasks(prev => [
      ...prev,
      {
        id: `t_${Date.now()}`,
        title: newTaskTitle.trim(),
        status: 'todo',
        assignee: currentUser.name.split(' ')[0]
      }
    ]);
    setNewTaskTitle('');
    showToast('Task Created', 'Added to shared Kanban sprint board.');
  };

  const cycleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextStatus = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo';
      return { ...t, status: nextStatus };
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Room Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
            <Users2 className="w-4 h-4" /> Code Together • Collaborative Space
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1 flex items-center gap-3">
            <span>{roomName}</span>
          </h1>
          <p className="text-xs text-brand-slate mt-1">
            Real-time coding room for JECRC group assignments, hackathon projects, and pair programming.
          </p>
        </div>

        {/* Room Code Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800">
            <span>Room Code: {roomCode}</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(roomCode);
                showToast('Copied Room Code!', 'Share with your classmates.');
              }}
              className="p-1 hover:text-brand-blue"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              const newName = prompt('Enter new room name:', roomName);
              if (newName) setRoomName(newName);
            }}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            Rename Room
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'editor' ? 'bg-cyan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Shared Code Editor</span>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'tasks' ? 'bg-cyan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Shared Task Board ({tasks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('whiteboard')}
          className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'whiteboard' ? 'bg-cyan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Architecture & Diagram</span>
        </button>
      </div>

      {/* Main Workspace Grid (Left: Content, Right: Teammates & Chat) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left 3 Cols: Editor / Tasks / Whiteboard */}
        <div className="lg:col-span-3 space-y-4">
          
          {activeTab === 'editor' && (
            <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[650px]">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/90 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-400 font-bold">main.{selectedLang === 'python' ? 'py' : 'cpp'}</span>
                  <span className="text-slate-500">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
                    <span>3 Teammates Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 outline-none"
                  >
                    <option value="python">Python 3</option>
                    <option value="cpp">C++ 20</option>
                    <option value="javascript">JavaScript / Node</option>
                  </select>

                  <button
                    onClick={handleRunCode}
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" /> Run
                  </button>
                </div>
              </div>

              {/* Code TextArea */}
              <div className="flex-1 p-4 overflow-y-auto">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent text-slate-200 font-mono text-xs sm:text-sm leading-relaxed resize-none outline-none selection:bg-slate-800"
                  spellCheck={false}
                />
              </div>

              {/* Console output */}
              <div className="p-3 px-5 border-t border-slate-800 bg-slate-900 font-mono text-xs max-h-40 overflow-y-auto">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Room Console:</p>
                {consoleLog ? (
                  <pre className="text-emerald-300 whitespace-pre-wrap">{consoleLog}</pre>
                ) : (
                  <p className="text-slate-500 italic">Press Run to execute code in shared team environment.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Sprint Kanban Tasks</h3>
                  <p className="text-xs text-slate-500">Click any card to advance status (To Do → In Progress → Done).</p>
                </div>
              </div>

              {/* Add Task Input */}
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new deliverable (e.g. Test OpenCV boundary boxes)..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-cyan-600 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </form>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* To Do */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase">
                    <span>To Do</span>
                    <span className="px-2 py-0.5 bg-slate-200 rounded-full text-[10px]">
                      {tasks.filter(t => t.status === 'todo').length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tasks.filter(t => t.status === 'todo').map(task => (
                      <div
                        key={task.id}
                        onClick={() => cycleTaskStatus(task.id)}
                        className="bg-white p-3 rounded-xl border border-slate-200 hover:border-cyan-400 cursor-pointer shadow-2xs text-xs space-y-1.5 transition-colors"
                      >
                        <p className="font-semibold text-slate-800">{task.title}</p>
                        <span className="text-[10px] text-slate-400">Assigned: {task.assignee}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In Progress */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200/70 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-blue uppercase">
                    <span>In Progress</span>
                    <span className="px-2 py-0.5 bg-blue-200 text-blue-900 rounded-full text-[10px]">
                      {tasks.filter(t => t.status === 'in_progress').length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tasks.filter(t => t.status === 'in_progress').map(task => (
                      <div
                        key={task.id}
                        onClick={() => cycleTaskStatus(task.id)}
                        className="bg-white p-3 rounded-xl border border-blue-200 hover:border-brand-blue cursor-pointer shadow-2xs text-xs space-y-1.5 transition-colors"
                      >
                        <p className="font-semibold text-slate-800">{task.title}</p>
                        <span className="text-[10px] text-brand-blue font-bold">Assigned: {task.assignee}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Done */}
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/70 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase">
                    <span>Done</span>
                    <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full text-[10px]">
                      {tasks.filter(t => t.status === 'done').length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tasks.filter(t => t.status === 'done').map(task => (
                      <div
                        key={task.id}
                        onClick={() => cycleTaskStatus(task.id)}
                        className="bg-white p-3 rounded-xl border border-emerald-200 hover:border-emerald-400 cursor-pointer shadow-2xs text-xs space-y-1.5 transition-colors line-through text-slate-500"
                      >
                        <p className="font-semibold">{task.title}</p>
                        <span className="text-[10px] text-emerald-600 no-underline font-bold">Completed by {task.assignee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'whiteboard' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">System Architecture Flowchart</h3>
                  <p className="text-xs text-slate-500">Live diagram representation for project presentation.</p>
                </div>
              </div>

              {/* Visual Flow Representation */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center space-y-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="p-4 bg-blue-100 border border-blue-300 rounded-2xl text-xs font-bold text-brand-blue shadow-2xs">
                    ESP32 Hardware Telemetry
                  </div>
                  <span className="text-slate-400 font-bold">→</span>
                  <div className="p-4 bg-cyan-100 border border-cyan-300 rounded-2xl text-xs font-bold text-cyan-800 shadow-2xs">
                    MQTT Broker / WebSocket
                  </div>
                  <span className="text-slate-400 font-bold">→</span>
                  <div className="p-4 bg-purple-100 border border-purple-300 rounded-2xl text-xs font-bold text-purple-800 shadow-2xs">
                    FastAPI ML Classifier
                  </div>
                  <span className="text-slate-400 font-bold">→</span>
                  <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-800 shadow-2xs">
                    Next.js Real-time Dashboard
                  </div>
                </div>

                <p className="text-xs text-slate-500 max-w-md">
                  Diagram synchronized among team members in room <strong>{roomCode}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Team Roster & Team Live Chat */}
        <div className="space-y-4">
          
          {/* Active Teammates Card */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Room Members ({teammates.length})</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>

            <div className="space-y-2.5">
              {teammates.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.role}</p>
                    </div>
                  </div>
                  <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Team Live Chat */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col h-[480px] overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-700" />
              <span className="text-xs font-bold text-slate-800">Team Room Chat</span>
            </div>

            {/* Messages list */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-700">{msg.sender}</span>
                    <span className="text-slate-400">{msg.time}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-2.5 border-t border-slate-100 bg-slate-50 flex gap-2">
              <input
                type="text"
                placeholder="Type a team message..."
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:border-cyan-600 outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
