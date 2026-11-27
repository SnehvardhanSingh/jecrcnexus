import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { streamAiResponse } from '../utils/aiStream';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Plus,
  Paperclip,
  RotateCcw,
  HelpCircle,
  BrainCircuit,
  BookOpen,
  CheckCircle2,
  Code2,
  Calendar,
  Layers,
  ChevronRight,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// ── Markdown-lite renderer ───────────────────────────────────────────
function renderMarkdown(text: string) {
  // Split into lines, process headings, bold, code blocks, bullets
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';

  const processInline = (line: string): React.ReactNode => {
    // Bold
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

    // Code block toggle
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        elements.push(
          <pre key={`code-${i}`} className="bg-slate-900 text-green-300 text-xs p-3 rounded-lg overflow-x-auto my-2 font-mono">
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-sm font-bold text-slate-800 mt-3 mb-1">{processInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-base font-bold text-slate-800 mt-3 mb-1">{processInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-lg font-bold text-slate-800 mt-3 mb-1">{processInline(line.slice(2))}</h1>);
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      elements.push(<li key={i} className="ml-4 list-disc text-xs leading-relaxed">{processInline(line.slice(2))}</li>);
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(<li key={i} className="ml-4 list-decimal text-xs leading-relaxed">{processInline(line.replace(/^\d+\.\s/, ''))}</li>);
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      elements.push(<p key={i} className="text-xs leading-relaxed">{processInline(line)}</p>);
    }
  }

  return <div className="space-y-0.5">{elements}</div>;
}

// ── Parse structured data from AI response ───────────────────────────
function parseQuizFromResponse(text: string) {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[1]);
    if (Array.isArray(data) && data[0]?.question && data[0]?.options) return data;
  } catch { }
  return null;
}

function parseFlashcardsFromResponse(text: string) {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[1]);
    if (Array.isArray(data) && data[0]?.front && data[0]?.back) return data;
  } catch { }
  return null;
}

// ── Types ────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  flashcards?: {
    front: string;
    back: string;
  }[];
  isError?: boolean;
}

export const AiStudyAssistantPage: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chat history for context (sent to API)
  const [conversationHistory, setConversationHistory] = useState<{ role: string; text: string }[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello ${currentUser.name}! 👋 I am your **JECRC Nexus AI Study Assistant**, powered by Google Gemini.\n\nI am tuned for your B.Tech **${currentUser.branch}** curriculum.\n\nHow can I help you today? You can choose a quick action below or ask me about algorithms, PYQ analysis, exam revision, coding problems, and more!`,
      timestamp: '—',
    },
  ]);

  const isBusy = isTyping || isStreaming;

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: 'Explain Simply', prompt: 'Explain the difference between TCP and UDP with a real-life campus analogy.', icon: <HelpCircle className="w-3.5 h-3.5 text-teal-500" /> },
    { label: 'Generate a Quiz', prompt: 'Generate a 3-question quiz on Binary Search Trees and AVL balance factors.', icon: <BrainCircuit className="w-3.5 h-3.5 text-purple-500" /> },
    { label: 'Create Flashcards', prompt: 'Create revision flashcards for Operating System Page Replacement algorithms.', icon: <Layers className="w-3.5 h-3.5 text-indigo-500" /> },
    { label: 'Solve Step-by-Step', prompt: 'Guide me step-by-step through solving a recurrence relation: T(n) = 2T(n/2) + O(n).', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: 'Analyse PYQs', prompt: 'What are the top recurring topics in Engineering Mathematics I end-term exams at JECRC?', icon: <BookOpen className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Create a Study Plan', prompt: 'Create a 7-day revision timetable for Semester 5 mid-terms studying 3 hours daily.', icon: <Calendar className="w-3.5 h-3.5 text-cyan-500" /> },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isBusy) return;

    const trimmed = text.trim();
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const botMsgId = `b_${Date.now() + 1}`;
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setIsStreaming(true);

    const newHistory = [...conversationHistory, { role: 'user', text: trimmed }];
    let hasReceivedFirstChunk = false;

    try {
      const replyText = await streamAiResponse({
        endpoint: '/api/ai-study-assistant',
        message: trimmed,
        history: conversationHistory,
        onChunk: (fullSoFar) => {
          // Hide raw JSON block while streaming interactive quiz/flashcards
          const visibleText = fullSoFar.includes('```json')
            ? fullSoFar.split('```json')[0].trim() || 'Preparing interactive study material...'
            : fullSoFar;

          if (!hasReceivedFirstChunk) {
            hasReceivedFirstChunk = true;
            setIsTyping(false);
            setMessages(prev => [
              ...prev,
              {
                id: botMsgId,
                sender: 'assistant',
                text: visibleText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          } else {
            setMessages(prev =>
              prev.map(m => (m.id === botMsgId ? { ...m, text: visibleText } : m))
            );
          }
        },
      });

      // Parse quiz or flashcards once streaming finishes
      const lower = trimmed.toLowerCase();
      const quizData = lower.includes('quiz') ? parseQuizFromResponse(replyText) : undefined;
      const flashcardData = lower.includes('flashcard') ? parseFlashcardsFromResponse(replyText) : undefined;

      const finalText =
        quizData || flashcardData
          ? replyText.replace(/```json\s*[\s\S]*?```/g, '').trim()
          : replyText;

      setMessages(prev =>
        prev.map(m =>
          m.id === botMsgId
            ? {
              ...m,
              text: finalText,
              quiz: quizData ?? undefined,
              flashcards: flashcardData ?? undefined,
            }
            : m
        )
      );
      setConversationHistory([...newHistory, { role: 'assistant', text: replyText }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== botMsgId);
        return [
          ...filtered,
          {
            id: `e_${Date.now()}`,
            sender: 'assistant',
            text: `⚠️ **Error:** ${errorMessage}\n\nPlease try again in a moment.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
          },
        ];
      });
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Copied to Clipboard!', 'Text saved to clipboard.');
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: `m_${Date.now()}`,
        sender: 'assistant',
        text: `New conversation started! 🚀 Ask me any doubt from your B.Tech **${currentUser.branch}** subjects.`,
        timestamp: 'Just now',
      },
    ]);
    setConversationHistory([]);
    setUserAnswers({});
    setFlippedCards({});
    showToast('New Chat Started');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-teal uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-teal" /> AI Study Assistant • Powered by Gemini
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            JECRC Nexus AI Study Companion
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Ask complex engineering questions, analyze past exam questions, generate interactive quizzes, or produce instant revision flashcards — all powered by Google Gemini AI.
          </p>
        </div>

        <button
          onClick={handleNewConversation}
          className="px-4 py-2.5 bg-brand-teal hover:bg-teal-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Quick Actions Carousel Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.prompt)}
            disabled={isBusy}
            className="p-3 bg-white hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 rounded-2xl text-left transition-all shadow-2xs flex flex-col justify-between group disabled:opacity-50"
          >
            <div className="flex items-center gap-1.5 mb-1">
              {p.icon}
              <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700">{p.label}</span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">{p.prompt}</p>
          </button>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col h-[650px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs ${msg.sender === 'user'
                  ? 'bg-brand-teal text-white'
                  : msg.isError
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-teal-100 text-teal-700 border border-teal-200'
                  }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : msg.isError ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-brand-teal text-white rounded-tr-xs shadow-xs'
                    : msg.isError
                      ? 'bg-rose-50 border border-rose-200 text-rose-800 rounded-tl-xs'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-xs'
                    }`}
                >
                  {msg.sender === 'assistant' ? renderMarkdown(msg.text) : msg.text}

                  {/* Interactive Quiz Renderer */}
                  {msg.quiz && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-4">
                      <p className="font-bold text-teal-900 text-xs uppercase tracking-wider">
                        Practice Quiz (Instant Grading)
                      </p>
                      {msg.quiz.map((q, qIdx) => {
                        const key = `${msg.id}_${qIdx}`;
                        const selectedOption = userAnswers[key];
                        const isAnswered = selectedOption !== undefined;

                        return (
                          <div key={qIdx} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                            <p className="font-bold text-slate-900 text-xs">
                              {qIdx + 1}. {q.question}
                            </p>
                            <div className="space-y-1.5">
                              {q.options.map((opt, oIdx) => {
                                const isThisSelected = selectedOption === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => setUserAnswers(prev => ({ ...prev, [key]: oIdx }))}
                                    disabled={isAnswered}
                                    className={`w-full p-2 text-left text-xs rounded-lg border transition-colors flex items-center justify-between ${isThisSelected
                                      ? oIdx === q.correctIndex
                                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                                        : 'bg-rose-50 border-rose-400 text-rose-800'
                                      : isAnswered && oIdx === q.correctIndex
                                        ? 'bg-emerald-50/50 border-emerald-300 text-emerald-700'
                                        : 'bg-slate-50/50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                      }`}
                                  >
                                    <span>{opt}</span>
                                    {isThisSelected && (
                                      <span>{oIdx === q.correctIndex ? '✓ Correct' : '✗ Incorrect'}</span>
                                    )}
                                    {!isThisSelected && isAnswered && oIdx === q.correctIndex && (
                                      <span className="text-emerald-600">✓ Correct answer</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            {isAnswered && (
                              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                                <strong>Explanation:</strong> {q.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Interactive Flashcards Renderer */}
                  {msg.flashcards && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
                      <p className="font-bold text-indigo-900 text-xs uppercase tracking-wider">
                        Flip Revision Cards (Click Card to Flip)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {msg.flashcards.map((fc, fIdx) => {
                          const key = `${msg.id}_${fIdx}`;
                          const isFlipped = flippedCards[key];
                          return (
                            <div
                              key={fIdx}
                              onClick={() => setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }))}
                              className={`p-4 rounded-xl border cursor-pointer min-h-[140px] flex flex-col justify-between transition-all duration-300 shadow-2xs ${isFlipped
                                ? 'bg-teal-600 text-white border-teal-700'
                                : 'bg-white hover:border-teal-300 text-slate-800 border-slate-200'
                                }`}
                            >
                              <div className="flex items-center justify-between text-[10px] uppercase font-bold opacity-75">
                                <span>{isFlipped ? 'Answer / Solution' : 'Card Prompt'}</span>
                                <RefreshCw className="w-3 h-3" />
                              </div>
                              <p className="text-xs font-semibold my-2">
                                {isFlipped ? fc.back : fc.front}
                              </p>
                              <span className="text-[10px] opacity-70">
                                {isFlipped ? 'Click to flip back' : 'Click to reveal'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && !msg.isError && (
                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="hover:text-slate-700 p-0.5"
                      title="Copy response"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-teal" />
                <span>Nexus AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Message Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-white p-2 pl-3 rounded-2xl border border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all shadow-2xs"
          >
            <input
              type="text"
              placeholder="Ask anything about JECRC curriculum, formulas, doubts, or coding..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isBusy}
              className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => showToast('Attach Notes', 'Simulated document context loading enabled.')}
              className="p-2 text-slate-400 hover:text-teal-600 rounded-xl hover:bg-slate-100 transition-colors"
              title="Attach document or note"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim() || isBusy}
              className="p-2.5 bg-brand-teal hover:bg-teal-600 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            Powered by Google Gemini AI • Responses are AI-generated and may not always be accurate.
          </div>
        </div>
      </div>
    </div>
  );
};
