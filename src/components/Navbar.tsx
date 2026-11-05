import React from 'react';
import { UserProfile, ViewportMode } from '../types';
import { 
  Code2, 
  Flame, 
  Trophy, 
  Download, 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone,
  FolderGit2,
  CheckCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  currentProjectTitle: string;
  activeView: 'editor' | 'courses' | 'achievements';
  setActiveView: (view: 'editor' | 'courses' | 'achievements') => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  onOpenGoogleAuth: () => void;
  onOpenDownload: () => void;
  onOpenGitHub: () => void;
  onOpenMentor: () => void;
  isOffline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentProjectTitle,
  activeView,
  setActiveView,
  viewportMode,
  setViewportMode,
  onOpenGoogleAuth,
  onOpenDownload,
  onOpenGitHub,
  onOpenMentor,
  isOffline,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3 border-b border-slate-800 bg-slate-950/95 sticky top-0 z-40 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark with clean project kicker */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#home"
          onClick={(e) => { e.preventDefault(); setActiveView('editor'); }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-indigo-400 transition-colors"
        >
          <Code2 className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>DevCraft Web IDE</span>
        </a>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 border-l border-slate-800 pl-3">
          <span className="text-slate-300 font-medium truncate max-w-[200px]" title={currentProjectTitle}>
            {currentProjectTitle}
          </span>
          <span aria-hidden="true">·</span>
          <span>Nível {user.level}</span>
        </div>
      </div>

      {/* Zone 2: Clean single-line text navigation links and viewport switchers */}
      <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveView('editor')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeView === 'editor' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
          }`}
        >
          Editor & Prática
        </button>

        <button
          onClick={() => setActiveView('courses')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeView === 'courses' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
          }`}
        >
          Trilhas de Projetos
        </button>

        <button
          onClick={() => setActiveView('achievements')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeView === 'achievements' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
          }`}
        >
          Níveis & Conquistas
        </button>

        {/* Viewport responsive mode toggles inside editor view */}
        {activeView === 'editor' && (
          <div className="hidden xl:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewportMode('desktop')}
              title="Visualização Computador (100%)"
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                viewportMode === 'desktop' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              title="Visualização Tablet (768px)"
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                viewportMode === 'tablet' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              title="Visualização Mobile (375px)"
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                viewportMode === 'mobile' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </nav>

      {/* Zone 3: 1 primary action / user controls cluster */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Offline indicator */}
        <div 
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-400"
          title={isOffline ? 'Você está operando offline. Seu código e progresso são salvos no navegador.' : 'Conexão ativa'}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400">Offline</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Online</span>
            </>
          )}
        </div>

        {/* Gamification stats: Streak & XP */}
        <div 
          onClick={() => setActiveView('achievements')}
          className="cursor-pointer flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          title="Ver progresso de XP e conquistas"
        >
          <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>{user.streakDays}d</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-indigo-300 text-xs font-medium font-mono tabular-nums">
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span>{user.xp} XP</span>
          </div>
        </div>

        {/* AI Mentor Assistant Trigger */}
        <button
          onClick={onOpenMentor}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-200 bg-indigo-950/80 border border-indigo-800/80 rounded-lg hover:bg-indigo-900/80 transition-colors whitespace-nowrap"
          title="Abrir Mentor Dev AI para tirar dúvidas e corrigir erros"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Mentor AI</span>
        </button>

        {/* GitHub Export Action */}
        <button
          onClick={onOpenGitHub}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
          title="Conectar ou exportar para o GitHub"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">GitHub</span>
        </button>

        {/* Download Project ZIP */}
        <button
          onClick={onOpenDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors whitespace-nowrap shadow-sm shadow-emerald-500/20"
          title="Baixar site completo em ZIP ou HTML autônomo"
        >
          <Download className="w-3.5 h-3.5 text-slate-950" />
          <span>Baixar Site</span>
        </button>

        {/* Google Account Profile Button */}
        <button
          onClick={onOpenGoogleAuth}
          className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          title={user.provider === 'google' ? `Logado como ${user.name} (${user.email})` : 'Entrar com Conta Google'}
        >
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            referrerPolicy="no-referrer"
            className="w-6 h-6 rounded-full bg-slate-800 object-cover border border-slate-700" 
          />
          <span className="hidden lg:inline text-xs font-medium text-slate-200 max-w-[90px] truncate">
            {user.provider === 'google' ? user.name.split(' ')[0] : 'Entrar Google'}
          </span>
          {user.provider === 'google' && (
            <CheckCircle className="w-3 h-3 text-emerald-400" />
          )}
        </button>
      </div>
    </header>
  );
};
