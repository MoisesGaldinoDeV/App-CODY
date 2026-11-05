import React, { useState } from 'react';
import { CourseProject, CourseStep } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Trophy,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';

interface ObjectivesPanelProps {
  project: CourseProject;
  currentStep: CourseStep;
  objectiveResults: Record<string, boolean>;
  onNextStep: () => void;
  onOpenMentor: () => void;
  isAllPassed: boolean;
  stepIndex: number;
  totalSteps: number;
}

export const ObjectivesPanel: React.FC<ObjectivesPanelProps> = ({
  project,
  currentStep,
  objectiveResults,
  onNextStep,
  onOpenMentor,
  isAllPassed,
  stepIndex,
  totalSteps,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = currentStep.objectives.filter(
    (obj) => objectiveResults[obj.id]
  ).length;

  return (
    <div className="flex flex-col h-full bg-slate-900/95 border-r border-slate-800 text-slate-200 select-none overflow-y-auto">
      {/* Project & Step Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-semibold text-indigo-400 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="font-mono tabular-nums">
            Passo {stepIndex + 1} de {totalSteps}
          </span>
        </div>

        <h2 className="text-base font-bold text-white tracking-tight mb-1">
          {currentStep.title}
        </h2>
        <p className="text-xs text-slate-400">
          {currentStep.subtitle}
        </p>

        {/* Step Progress Bar */}
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${(completedCount / currentStep.objectives.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Instructions */}
      <div className="p-4 border-b border-slate-800/80 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wide">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Instruções Práticas</span>
        </div>

        <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc list-inside">
          {currentStep.instructions.map((inst, index) => (
            <li key={index} className="text-slate-300">
              <span className="text-slate-300">{inst}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Real-time Objectives Checklist */}
      <div className="p-4 flex-1 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 uppercase tracking-wide">
            Critérios de Validação em Tempo Real
          </span>
          <span className="text-slate-400 font-mono tabular-nums text-[11px]">
            {completedCount}/{currentStep.objectives.length}
          </span>
        </div>

        <div className="space-y-2">
          {currentStep.objectives.map((obj) => {
            const isPassed = Boolean(objectiveResults[obj.id]);
            const isHintOpen = Boolean(showHints[obj.id]);

            return (
              <div
                key={obj.id}
                className={`p-2.5 rounded-lg border transition-all duration-200 ${
                  isPassed
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-100'
                    : 'bg-slate-950/40 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce-once" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 text-xs">
                    <p className={`font-medium ${isPassed ? 'text-emerald-200 line-through opacity-90' : 'text-slate-200'}`}>
                      {obj.description}
                    </p>

                    {/* Hint toggle */}
                    {!isPassed && (
                      <button
                        onClick={() => toggleHint(obj.id)}
                        className="mt-1 flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>{isHintOpen ? 'Ocultar dica' : 'Ver dica'}</span>
                      </button>
                    )}

                    {isHintOpen && !isPassed && (
                      <div className="mt-1.5 p-2 bg-indigo-950/40 border border-indigo-900/60 rounded text-[11px] text-indigo-200">
                        {obj.hint}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Theoretical Explanation Expandable */}
        <div className="pt-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span className="font-medium">💡 Por que isso importa na prática?</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showExplanation && (
            <div className="mt-2 p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300 leading-relaxed">
              {currentStep.explanation}
            </div>
          )}
        </div>
      </div>

      {/* Step Actions Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
        {/* Next step button */}
        <button
          onClick={onNextStep}
          disabled={!isAllPassed}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs transition-all ${
            isAllPassed
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer animate-pulse'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isAllPassed ? (
            <>
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Concluir Passo (+{currentStep.xpReward} XP)</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </>
          ) : (
            <span>Complete os critérios acima para avançar</span>
          )}
        </button>

        {/* Ask AI Mentor button */}
        <button
          onClick={onOpenMentor}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-indigo-800/50 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/40 text-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ficou com dúvida? Chamar Mentor Dev AI</span>
        </button>
      </div>
    </div>
  );
};
