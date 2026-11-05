import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { CodeDiagnostic } from '../../types';

interface AiMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  stepTitle: string;
  codeHtml: string;
  codeCss: string;
  codeJs: string;
  diagnostics: CodeDiagnostic[];
  isOffline: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiMentorDrawer: React.FC<AiMentorDrawerProps> = ({
  isOpen,
  onClose,
  projectTitle,
  stepTitle,
  codeHtml,
  codeCss,
  codeJs,
  diagnostics,
  isOffline,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Olá! Sou o seu Mentor DevCraft. Estou acompanhando seu código em tempo real. Se tiver alguma dúvida ou encontrar um erro que não entendeu, me pergunte!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'O que está errado no meu código?',
    'Como alinhar elementos com Flexbox?',
    'Como selecionar um botão com JavaScript?',
    'Qual a diferença entre class e id?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const question = textToSend || inputText;
    if (!question.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: question.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      if (isOffline) {
        // Smart Local Heuristic Mentor for offline mode
        let localAdvice = 'Dica do Mentor DevCraft (Modo Offline):';
        if (diagnostics.length > 0) {
          const firstErr = diagnostics[0];
          localAdvice += ` Notei que na aba ${firstErr.file.toUpperCase()} (linha ${firstErr.line}) há o seguinte ponto de atenção: "${firstErr.message}". ${firstErr.fixSuggestion || 'Verifique se não esqueceu de fechar tags ou pontuações.'}`;
        } else {
          localAdvice += ' Seu código está com sintaxe limpa! Certifique-se de que os nomes de classes e IDs usados no CSS e no JavaScript correspondam exatamente aos do seu HTML.';
        }

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(7),
              sender: 'ai',
              text: localAdvice,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          setIsLoading(false);
        }, 500);
        return;
      }

      // Call server-side Gemini API
      const res = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeTitle: projectTitle,
          currentStep: stepTitle,
          codeHtml,
          codeCss,
          codeJs,
          errors: diagnostics,
          userQuestion: question,
        }),
      });

      const data = await res.json();
      const aiReply = data.feedback || data.fallbackFeedback || 'Continue firme! Verifique os critérios do passo para avançar.';

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Error querying AI mentor:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          sender: 'ai',
          text: 'Dica do Mentor: Verifique se todas as tags HTML foram fechadas e se cada declaração no CSS termina com ponto e vírgula (;)!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-200 animate-slide-left">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Mentor Dev AI</h3>
            <p className="text-[11px] text-slate-400">Tira-dúvidas pedagógico em tempo real</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Diagnostics summary alert if errors exist */}
      {diagnostics.length > 0 && (
        <div className="px-4 py-2.5 bg-rose-950/40 border-b border-rose-900/40 flex items-start gap-2 text-xs text-rose-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>
            Detectei <strong>{diagnostics.length}</strong> aviso(s) no seu código no momento. Pergunte-me como corrigir!
          </span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400 border border-slate-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[85%] space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] text-slate-400 block text-right">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Mentor está analisando seu código...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 flex flex-wrap gap-1.5">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[11px] py-1 px-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Pergunte sobre um erro ou conceito..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className={`p-2 rounded-lg text-white transition-colors ${
            inputText.trim() && !isLoading ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
