import React from 'react';
import { CourseProject, UserProfile } from '../../types';
import { COURSES } from '../../data/courses';
import { 
  CheckCircle, 
  Clock, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Code2, 
  Compass,
  Play
} from 'lucide-react';

interface CourseCatalogProps {
  currentProjectId: string;
  onSelectProject: (projectId: string) => void;
  user: UserProfile;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  currentProjectId,
  onSelectProject,
  user,
}) => {
  return (
    <div className="flex-1 bg-slate-950 p-6 md:p-10 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
              Trilhas de Aprendizado Prático
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              Projetos Web Reais: do Zero à Publicação
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Aqui você não aprende apenas teoria abstrata. Cada exercício é o desenvolvimento de um site real, responsivo e interativo, com feedback em tempo real e correção linha por linha.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Projetos da Formação Dev</span>
            </h2>
            <span className="text-xs text-slate-400">
              {user.completedProjectIds.length} de {COURSES.length} projetos concluídos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES.map((course) => {
              const isSelected = course.id === currentProjectId;
              const isCompleted = user.completedProjectIds.includes(course.id);

              return (
                <div
                  key={course.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900/90 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    {/* Top badges & category */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-900/50 px-2 py-0.5 rounded-md text-[11px]">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.estimatedMinutes} min</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono text-amber-400 font-semibold">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>+{course.totalXp} XP</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Steps counter */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      <span>{course.steps.length} passos práticos interativos</span>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Concluído</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {course.difficulty} · Nível {course.levelRequired}
                      </span>
                    )}

                    <button
                      onClick={() => onSelectProject(course.id)}
                      className={`flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Continuar no Editor</span>
                        </>
                      ) : (
                        <>
                          <span>Iniciar Projeto</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
