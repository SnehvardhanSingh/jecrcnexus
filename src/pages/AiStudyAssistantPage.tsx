import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  RefreshCw
} from 'lucide-react';

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
}

export const AiStudyAssistantPage: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [activeSessionId, setActiveSessionId] = useState<string>('session_1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello ${currentUser.name}! I am your JECRC Nexus AI Study Assistant. I am tuned for your B.Tech ${currentUser.branch} curriculum.\n\nHow can I help you today? You can choose a quick action below or ask me about algorithms, PYQ analysis, or exam revision.`,
      timestamp: '10:00 AM'
    }
  ]);

  const quickPrompts = [
    { label: 'Explain Simply', prompt: 'Explain the difference between TCP and UDP with a real-life campus analogy.', icon: <HelpCircle className="w-3.5 h-3.5 text-blue-500" /> },
    { label: 'Generate a Quiz', prompt: 'Generate a 3-question quiz on Binary Search Trees and AVL balance factors.', icon: <BrainCircuit className="w-3.5 h-3.5 text-purple-500" /> },
    { label: 'Create Flashcards', prompt: 'Create revision flashcards for Operating System Page Replacement algorithms.', icon: <Layers className="w-3.5 h-3.5 text-indigo-500" /> },
    { label: 'Solve Step-by-Step', prompt: 'Guide me step-by-step through solving a recurrence relation: T(n) = 2T(n/2) + O(n).', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: 'Analyse PYQs', prompt: 'What are the top recurring topics in Engineering Mathematics I end-term exams?', icon: <BookOpen className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Create a Study Plan', prompt: 'Create a 7-day revision timetable for Semester 5 mid-terms studying 3 hours daily.', icon: <Calendar className="w-3.5 h-3.5 text-cyan-500" /> },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Contextual Response Simulation
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';
      let quizData = undefined;
      let flashcardData = undefined;

      const lower = text.toLowerCase();

      if (lower.includes('quiz')) {
        responseText = 'Here is your interactive revision quiz on Binary Search Trees (BST) & AVL Balance Factors:';
        quizData = [
          {
            question: 'What is the balance factor condition for a node to be AVL balanced?',
            options: ['Balance factor must be 0 only', 'Balance factor must be in {-1, 0, +1}', 'Balance factor cannot exceed +2', 'Depth of left subtree equals depth of right'],
            correctIndex: 1,
            explanation: 'AVL property requires height(left) - height(right) to be strictly -1, 0, or +1.'
          },
          {
            question: 'What rotation is required if a node is inserted into the left subtree of the left child?',
            options: ['Right-Left (RL) Double Rotation', 'Single Left (LL) Rotation', 'Single Right (LL) Rotation', 'Left-Right (LR) Double Rotation'],
            correctIndex: 2,
            explanation: 'An insertion in the left child of a left node causes an LL imbalance, resolved with a single Right Rotation.'
          },
          {
            question: 'What is the worst-case search time complexity in a standard unbalanced BST with N keys?',
            options: ['O(log N)', 'O(1)', 'O(N)', 'O(N log N)'],
            correctIndex: 2,
            explanation: 'When keys are inserted in sorted order, an unbalanced BST degenerates into a linear linked list with O(N) search.'
          }
        ];
      } else if (lower.includes('flashcard')) {
        responseText = 'Here are your interactive study flashcards for OS Page Replacement algorithms. Click any card to flip!';
        flashcardData = [
          {
            front: 'What is Belady\'s Anomaly?',
            back: 'A phenomenon in FIFO page replacement where increasing the number of page frames actually increases the number of page faults!'
          },
          {
            front: 'Optimal Page Replacement (OPT)',
            back: 'Replaces the page that will not be used for the longest period in the future. Has the lowest fault rate but is impossible to implement practically.'
          },
          {
            front: 'LRU (Least Recently Used) Implementation',
            back: 'Replaces the page that has not been accessed for the longest time. Implemented with counters or a stack with doubly linked lists.'
          }
        ];
      } else if (lower.includes('tcp and udp') || lower.includes('analogy')) {
        responseText = `### TCP vs. UDP: The Campus Analogy 🏫\n\nImagine you are sending exam notes to a classmate across the JECRC hostel:\n\n**1. TCP (Transmission Control Protocol) — The Registered Courier / Speed Post:**\n- **Handshake:** Before sending, you call them: *"Are you awake?"* -> *"Yes"* -> *"I'm sending notes now."* (3-Way Handshake SYN, SYN-ACK, ACK).\n- **Guaranteed Delivery:** If an envelope is dropped, you resend it (Packet Retransmission).\n- **Ordered:** Pages are numbered 1 to 50 so they read in exact sequence.\n- **Use case:** Downloading notes PDFs, web browsing (HTTP/HTTPS), email.\n\n**2. UDP (User Datagram Protocol) — Shouting Across the Lawn with a Megaphone:**\n- **No Handshake:** You just shout announcements quickly without waiting for confirmation.\n- **Speed Over Perfection:** If someone misses a word because of wind, you do not repeat it; the stream keeps flowing.\n- **Use case:** Live video streaming in seminars, online gaming, VoIP calls.\n\n*Key takeaway for JECRC exams:* Mention **Connection-oriented vs Connectionless** and **Reliable vs Best-effort** in your 5-mark comparison table!`;
      } else if (lower.includes('pyq') || lower.includes('mathematics')) {
        responseText = `### High-Yield PYQ Analysis for Engineering Mathematics I 📊\n\nBased on the analysis of JECRC University past semester papers (2022-2026):\n\n1. **Cayley-Hamilton Theorem (100% Frequency):** State and prove statement + find matrix inverse $A^{-1}$ for a given $3 \\times 3$ matrix. This question has appeared in 4 out of 5 end-term papers.\n2. **Eigenvalues & Eigenvectors:** Characteristic equations of symmetric matrices with orthogonal vectors.\n3. **Differential Calculus:** Taylor series expansion around $x = 0$ or $(x - a)$.\n4. **Beta & Gamma Functions:** Proving $\\Gamma(1/2) = \\sqrt{\\pi}$ and evaluating standard reduction integrals.\n\n*Tip:* Solve the 2025 solved paper available in the **Academic Resources** section under "Engineering Mathematics I"!`;
      } else {
        responseText = `Great question! Here is a structured breakdown tailored for your semester:\n\n1. **Core Concept:** When approaching this problem, first establish the invariant and constraints.\n2. **Algorithmic Approach:** Break down the solution into smaller sub-problems. If overlapping sub-problems exist, memoization or dynamic programming provides optimal time complexity.\n3. **Practical Campus Tip:** In JECRC laboratory viva, professors prioritize explaining edge cases (null inputs, single elements, cycle detection).\n\nFeel free to ask me to generate a quiz, write starter code, or analyze past year examination questions!`;
      }

      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quiz: quizData,
        flashcards: flashcardData
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Copied to Clipboard!', 'Text saved to clipboard.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600" /> AI Study Assistant • Academic Copilot
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark mt-1">
            JECRC Nexus AI Study Companion
          </h1>
          <p className="text-xs text-brand-slate mt-1 max-w-xl">
            Ask complex engineering questions, analyze past exam questions, generate interactive quizzes, or produce instant revision flashcards.
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `m_${Date.now()}`,
                sender: 'assistant',
                text: `New conversation started! Ask me any doubt from your B.Tech ${currentUser.branch} subjects.`,
                timestamp: 'Just now'
              }
            ]);
            showToast('New Chat Started');
          }}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
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
            className="p-3 bg-white hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 rounded-2xl text-left transition-all shadow-2xs flex flex-col justify-between group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              {p.icon}
              <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700">{p.label}</span>
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
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white'
                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-brand-blue text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {msg.text}

                  {/* Interactive Quiz Renderer */}
                  {msg.quiz && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-4">
                      <p className="font-bold text-purple-900 text-xs uppercase tracking-wider">
                        Practice Quiz (Instant Grading)
                      </p>
                      {msg.quiz.map((q, qIdx) => {
                        const selectedOption = userAnswers[qIdx];
                        const isAnswered = selectedOption !== undefined;
                        const isCorrect = selectedOption === q.correctIndex;

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
                                    onClick={() => {
                                      setUserAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                                    }}
                                    className={`w-full p-2 text-left text-xs rounded-lg border transition-colors flex items-center justify-between ${
                                      isThisSelected
                                        ? oIdx === q.correctIndex
                                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                                          : 'bg-rose-50 border-rose-400 text-rose-800'
                                        : 'bg-slate-50/50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {isThisSelected && (
                                      <span>{oIdx === q.correctIndex ? '✓ Correct' : '✗ Incorrect'}</span>
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
                          const isFlipped = flippedCards[fIdx];
                          return (
                            <div
                              key={fIdx}
                              onClick={() => setFlippedCards(prev => ({ ...prev, [fIdx]: !prev[fIdx] }))}
                              className={`p-4 rounded-xl border cursor-pointer min-h-[140px] flex flex-col justify-between transition-all duration-300 shadow-2xs ${
                                isFlipped
                                  ? 'bg-indigo-600 text-white border-indigo-700'
                                  : 'bg-white hover:border-indigo-300 text-slate-800 border-slate-200'
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
                  {msg.sender === 'assistant' && (
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
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5 animate-pulse">
                <span>Nexus AI is thinking...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
              </div>
            </div>
          )}
        </div>

        {/* Message Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-white p-2 pl-3 rounded-2xl border border-slate-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/10 transition-all shadow-2xs"
          >
            <input
              type="text"
              placeholder="Ask anything about JECRC curriculum, formulas, doubts, or coding..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={() => showToast('Attach Notes', 'Simulated document context loading enabled.')}
              className="p-2 text-slate-400 hover:text-purple-600 rounded-xl hover:bg-slate-100 transition-colors"
              title="Attach document or note"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            JECRC Nexus AI Assistant is trained on verified academic syllabi. Demonstrative educational responses.
          </div>
        </div>
      </div>
    </div>
  );
};
