import React from 'react';
import { UserProfile } from '../../types';
import { ALL_BADGES, calculateLevel } from '../../data/badges';
import { 
  X, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Award,
  Zap,
  Code,
  Layout,
  Download,
  GitBranch
} from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  const { level, title, nextLevelXp, currentLevelXp } = calculateLevel(user.xp);
  const progressPercent = Math.min(
    100,
    Math.max(0, ((user.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  const getBadgeIcon = (name: string, isUnlocked: boolean) => {
    const props = { className: `w-5 h-5 ${isUnlocked ? 'text-amber-400' : 'text-slate-600'}` };
    switch (name) {
      case 'Code': return <Code {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Download': return <Download {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gamificação & Progressão</h3>
              <p className="text-xs text-slate-400">Níveis de maestria, conquistas e sequência de estudos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Level & Progress Hero Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Nível {level}
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">{title}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Pontuação Total</span>
                <span className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                  {user.xp} XP
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Progresso para o Nível {level + 1}</span>
                <span className="font-mono tabular-nums">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>{currentLevelXp} XP</span>
                <span>Faltam {Math.max(0, nextLevelXp - user.xp)} XP para o próximo nível</span>
                <span>{nextLevelXp} XP</span>
              </div>
            </div>

            {/* Streak Counter Pill */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Flame className="w-4 h-4" />
                <span>Sequência Ativa: {user.streakDays} {user.streakDays === 1 ? 'dia' : 'dias'} de código consecutivo</span>
              </div>
              <span className="text-slate-400 text-[11px]">Continue praticando amanhã para manter a chama! 🔥</span>
            </div>
          </div>

          {/* Badges Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Conquistas Desbloqueáveis ({user.badges.length}/{ALL_BADGES.length})
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_BADGES.map((badge) => {
                const isUnlocked = user.badges.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isUnlocked
                        ? 'bg-slate-950 border-amber-500/30 shadow-sm'
                        : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isUnlocked
                            ? 'bg-amber-500/10 border border-amber-500/20'
                            : 'bg-slate-900 border border-slate-800'
                        }`}
                      >
                        {isUnlocked ? getBadgeIcon(badge.iconName, true) : <Lock className="w-4 h-4 text-slate-600" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                            {badge.title}
                          </h5>
                          <span className="text-[10px] font-mono text-amber-400 font-semibold shrink-0">
                            +{badge.xpBonus} XP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {badge.description}
                        </p>
                        {isUnlocked && (
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Desbloqueada</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
