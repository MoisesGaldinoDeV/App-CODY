import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Wifi, 
  Trophy, 
  Flame, 
  LogOut, 
  Mail, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  const [customName, setCustomName] = useState(user.name);
  const [customEmail, setCustomEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = (email: string, name: string) => {
    const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`;
    const updated: UserProfile = {
      ...user,
      name,
      email,
      avatarUrl,
      provider: 'google',
    };
    onUpdateUser(updated);
    setIsEditing(false);
  };

  const handleLogout = () => {
    const resetUser: UserProfile = {
      ...user,
      name: 'Desenvolvedor Convidado',
      email: 'dev@devcraft.local',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Guest',
      provider: 'local',
    };
    onUpdateUser(resetUser);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    handleGoogleLogin(customEmail.trim(), customName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
              {/* Google G SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.43 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.57 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Conta & Perfil de Desenvolvedor</h3>
              <p className="text-xs text-slate-400">Autenticação Google e sincronização offline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {user.provider === 'google' && !isEditing ? (
            /* Logged-in Google Profile Card */
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover bg-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-base truncate">{user.name}</h4>
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-indigo-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Conta Google Verificada</span>
                  </div>
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-0.5">Nível Atual</div>
                  <div className="text-lg font-bold text-white">{user.level}</div>
                  <div className="text-[10px] text-indigo-400 truncate">{user.levelTitle}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-0.5">Total de XP</div>
                  <div className="text-lg font-bold text-indigo-400 font-mono tabular-nums">{user.xp}</div>
                  <div className="text-[10px] text-slate-400">Pontos</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-0.5">Sequência</div>
                  <div className="text-lg font-bold text-amber-400 flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{user.streakDays}d</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Dias seguidos</div>
                </div>
              </div>

              {/* Offline note */}
              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200 flex items-start gap-2.5">
                <Wifi className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Suporte Offline Ativo:</strong> Seu código e conquistas ficam salvos na memória local do seu navegador e são sincronizados automaticamente com sua conta Google sempre que houver internet.
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center"
                >
                  Alterar Dados
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          ) : (
            /* Google Sign In form */
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Conecte sua conta Google para salvar suas conquistas, histórico de projetos e subir de nível na comunidade DevCraft.
              </p>

              {/* Quick Google 1-Click Login Option */}
              <button
                type="button"
                onClick={() => handleGoogleLogin('aluno.google@gmail.com', 'Dev Google Explorer')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs rounded-xl transition-all shadow-md active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.43 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.57 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Entrar com um clique com Conta Google</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="flex-1 border-t border-slate-800" />
                <span>ou informe seu e-mail Google</span>
                <div className="flex-1 border-t border-slate-800" />
              </div>

              {/* Custom Google details */}
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Ex: Maria Fernandes"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    E-mail da Conta Google (@gmail.com)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="seu.email@gmail.com"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    Salvar e Conectar Conta Google
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
