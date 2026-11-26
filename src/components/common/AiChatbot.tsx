import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Minimize2,
  Maximize2,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isError?: boolean;
}

// ── Markdown-lite renderer ───────────────────────────────────────────
function renderBotMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const processInline = (line: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex));
    return parts.length > 0 ? parts : line;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (!inCodeBlock) { inCodeBlock = true; codeBuffer = []; }
      else {
        inCodeBlock = false;
        elements.push(
          <pre key={`code-${i}`} className="bg-slate-800 text-green-300 text-[10px] p-2 rounded-lg overflow-x-auto my-1 font-mono">
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
      }
      continue;
    }
    if (inCodeBlock) { codeBuffer.push(line); continue; }
    if (line.startsWith('### ')) elements.push(<h3 key={i} className="text-xs font-bold mt-1.5">{processInline(line.slice(4))}</h3>);
    else if (line.startsWith('## ')) elements.push(<h2 key={i} className="text-xs font-bold mt-1.5">{processInline(line.slice(3))}</h2>);
    else if (line.startsWith('- ') || line.startsWith('• ')) elements.push(<li key={i} className="ml-3 list-disc text-[11px] leading-relaxed">{processInline(line.slice(2))}</li>);
    else if (/^\d+\.\s/.test(line)) elements.push(<li key={i} className="ml-3 list-decimal text-[11px] leading-relaxed">{processInline(line.replace(/^\d+\.\s/, ''))}</li>);
    else if (line.trim() === '') elements.push(<br key={i} />);
    else elements.push(<p key={i} className="text-[11px] leading-relaxed">{processInline(line)}</p>);
  }
  return <>{elements}</>;
}

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{ role: string; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 Hi there! I'm **NexBot**, your JECRC Nexus assistant.\n\nI can help you with:\n- **Website navigation** — finding features and pages\n- **College info** — JECRC campus, departments, clubs\n- **Academics** — syllabus, exams, CGPA\n- **Student support** — scholarships, mentorship\n\nAsk me anything!",
      timestamp: '',
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    'How do I upload notes?',
    'Where is the DSA Arena?',
    'Tell me about JECRC clubs',
    'How to join a study group?',
  ];

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const newHistory = [...conversationHistory, { role: 'user', text: text.trim() }];

    try {
      const response = await fetch('/api/ai-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: conversationHistory }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            (response.status >= 500
              ? 'Unable to reach the AI server. Please make sure the backend server is running and try again.'
              : 'Failed to get a response from NexBot.')
        );
      }

      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setConversationHistory([...newHistory, { role: 'assistant', text: data.reply }]);
    } catch (error) {
      const errText = error instanceof Error ? error.message : 'An unexpected error occurred';
      setMessages(prev => [...prev, {
        id: `e_${Date.now()}`,
        sender: 'bot',
        text: `⚠️ ${errText}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: `w_${Date.now()}`,
      sender: 'bot',
      text: "Chat cleared! 🧹 How can I help you?",
      timestamp: '',
    }]);
    setConversationHistory([]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-teal hover:bg-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        title="Chat with NexBot"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        {/* Pulse ring */}
        <span className="absolute w-full h-full rounded-full bg-brand-teal/30 animate-ping" />
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${
        isExpanded
          ? 'bottom-4 right-4 left-4 top-4 sm:left-auto sm:top-auto sm:bottom-6 sm:right-6 sm:w-[480px] sm:h-[700px]'
          : 'bottom-6 right-6 w-[360px] h-[520px]'
      }`}
    >
      {/* Header */}
      <div className="bg-brand-teal text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-tight">NexBot</h3>
            <p className="text-[10px] text-teal-100">JECRC Nexus AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={clearChat} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Clear chat">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors hidden sm:flex" title={isExpanded ? 'Minimize' : 'Expand'}>
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
              msg.sender === 'user' ? 'bg-brand-teal text-white' : msg.isError ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-600'
            }`}>
              {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
            </div>
            <div className={`max-w-[80%] p-2.5 rounded-xl text-[11px] leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-brand-teal text-white rounded-tr-sm'
                : msg.isError
                  ? 'bg-rose-50 border border-rose-200 text-rose-700 rounded-tl-sm'
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
            }`}>
              {msg.sender === 'bot' ? renderBotMarkdown(msg.text) : msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              <Bot className="w-3 h-3" />
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin text-brand-teal" />
              <span className="text-[10px] text-slate-400">NexBot is typing...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick questions (shown when few messages) */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-slate-50/50">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50 rounded-full text-[10px] text-slate-600 hover:text-teal-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-2.5 border-t border-slate-200 bg-white">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask NexBot anything..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all disabled:opacity-50 border border-transparent focus:border-teal-300"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2 bg-brand-teal hover:bg-teal-600 disabled:opacity-40 text-white rounded-xl transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
