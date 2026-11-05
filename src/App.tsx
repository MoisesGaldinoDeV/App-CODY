import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserProfile, 
  CourseProject, 
  CourseStep, 
  ViewportMode, 
  CodeDiagnostic 
} from './types';
import { COURSES } from './data/courses';
import { ALL_BADGES } from './data/badges';
import { 
  loadUserProfile, 
  saveUserProfile, 
  loadProjectCode, 
  saveProjectCode 
} from './services/storage';
import { 
  validateHtml, 
  validateCss, 
  validateJs, 
  checkObjectives 
} from './services/linter';
import { Navbar } from './components/Navbar';
import { CodeEditor } from './components/Editor/CodeEditor';
import { LivePreview } from './components/Preview/LivePreview';
import { ObjectivesPanel } from './components/Sidebar/ObjectivesPanel';
import { CourseCatalog } from './components/CourseSelector/CourseCatalog';
import { GoogleAuthModal } from './components/Modals/GoogleAuthModal';
import { DownloadModal } from './components/Modals/DownloadModal';
import { GitHubModal } from './components/Modals/GitHubModal';
import { AchievementsModal } from './components/Modals/AchievementsModal';
import { AiMentorDrawer } from './components/Mentor/AiMentorDrawer';

export default function App() {
  // User profile state
  const [user, setUser] = useState<UserProfile>(loadUserProfile);

  // Navigation & View state
  const [activeView, setActiveView] = useState<'editor' | 'courses' | 'achievements'>('editor');
  const [activeProjectId, setActiveProjectId] = useState<string>(COURSES[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Editor active file
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js'>('html');

  // Modals state
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isMentorDrawerOpen, setIsMentorDrawerOpen] = useState(false);

  // Active Course Project & Step
  const currentProject: CourseProject = useMemo(() => {
    return COURSES.find((c) => c.id === activeProjectId) || COURSES[0];
  }, [activeProjectId]);

  const currentStep: CourseStep = useMemo(() => {
    return currentProject.steps[activeStepIndex] || currentProject.steps[0];
  }, [currentProject, activeStepIndex]);

  // Code state for current step
  const [codeHtml, setCodeHtml] = useState<string>(currentStep.initialHtml);
  const [codeCss, setCodeCss] = useState<string>(currentStep.initialCss);
  const [codeJs, setCodeJs] = useState<string>(currentStep.initialJs);

  // Load saved code when switching project or step
  useEffect(() => {
    const saved = loadProjectCode(currentProject.id, currentStep.id);
    if (saved) {
      setCodeHtml(saved.html ?? currentStep.initialHtml);
      setCodeCss(saved.css ?? currentStep.initialCss);
      setCodeJs(saved.js ?? currentStep.initialJs);
    } else {
      setCodeHtml(currentStep.initialHtml);
      setCodeCss(currentStep.initialCss);
      setCodeJs(currentStep.initialJs);
    }
  }, [currentProject.id, currentStep.id, currentStep.initialHtml, currentStep.initialCss, currentStep.initialJs]);

  // Auto-save code on change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveProjectCode(currentProject.id, currentStep.id, {
        html: codeHtml,
        css: codeCss,
        js: codeJs,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [codeHtml, codeCss, codeJs, currentProject.id, currentStep.id]);

  // Online / Offline monitor
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Real-time Lint Diagnostics for all files
  const htmlDiagnostics = useMemo(() => validateHtml(codeHtml), [codeHtml]);
  const cssDiagnostics = useMemo(() => validateCss(codeCss), [codeCss]);
  const jsDiagnostics = useMemo(() => validateJs(codeJs), [codeJs]);

  const allDiagnostics: CodeDiagnostic[] = useMemo(() => {
    return [...htmlDiagnostics, ...cssDiagnostics, ...jsDiagnostics];
  }, [htmlDiagnostics, cssDiagnostics, jsDiagnostics]);

  // Real-time Objective Checking
  const objectiveResults = useMemo(() => {
    return checkObjectives(currentStep.objectives, codeHtml, codeCss, codeJs);
  }, [currentStep.objectives, codeHtml, codeCss, codeJs]);

  // Check if all objectives for current step are passed
  const isAllObjectivesPassed = useMemo(() => {
    if (currentStep.objectives.length === 0) return true;
    return currentStep.objectives.every((obj) => Boolean(objectiveResults[obj.id]));
  }, [currentStep.objectives, objectiveResults]);

  // Award XP and check badges helper
  const awardXpAndBadges = useCallback((xpGain: number, badgeIdToUnlock?: string) => {
    setUser((prev) => {
      const newBadges = [...prev.badges];
      if (badgeIdToUnlock && !newBadges.includes(badgeIdToUnlock)) {
        newBadges.push(badgeIdToUnlock);
      }

      const updatedUser: UserProfile = {
        ...prev,
        xp: prev.xp + xpGain,
        badges: newBadges,
      };

      saveUserProfile(updatedUser);
      return updatedUser;
    });
  }, []);

  // Handle Advancing to Next Step
  const handleNextStep = () => {
    // 1. Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#38bdf8'],
      });
    } catch (_) {}

    // 2. Award XP
    const isCleanCode = allDiagnostics.length === 0;
    const badgeBonus = isCleanCode && !user.badges.includes('clean_code') ? 'clean_code' : undefined;
    awardXpAndBadges(currentStep.xpReward, badgeBonus);

    // 3. Update completed steps
    setUser((prev) => {
      const completedSteps = prev.completedStepIds.includes(currentStep.id)
        ? prev.completedStepIds
        : [...prev.completedStepIds, currentStep.id];

      const isLastStep = activeStepIndex >= currentProject.steps.length - 1;
      const completedProjects = isLastStep && !prev.completedProjectIds.includes(currentProject.id)
        ? [...prev.completedProjectIds, currentProject.id]
        : prev.completedProjectIds;

      const updated = {
        ...prev,
        completedStepIds: completedSteps,
        completedProjectIds: completedProjects,
      };
      saveUserProfile(updated);
      return updated;
    });

    // 4. Advance step or show completion
    if (activeStepIndex < currentProject.steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      // Finished all steps of this project! Check full course badge
      if (currentProject.id === COURSES[COURSES.length - 1].id) {
        awardXpAndBadges(200, 'fullstack_junior');
      }
      setIsAchievementsModalOpen(true);
    }
  };

  // Reset current step starter code
  const handleResetCode = () => {
    setCodeHtml(currentStep.initialHtml);
    setCodeCss(currentStep.initialCss);
    setCodeJs(currentStep.initialJs);
  };

  // Select project from catalog
  const handleSelectProject = (projectId: string) => {
    setActiveProjectId(projectId);
    setActiveStepIndex(0);
    setActiveView('editor');
  };

  // Download callback for badge
  const handleDownloaded = () => {
    awardXpAndBadges(120, 'site_exported');
  };

  // GitHub pushed callback for badge
  const handleGitHubPushed = () => {
    awardXpAndBadges(180, 'github_connected');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Bar Contract compliant Navigation */}
      <Navbar
        user={user}
        currentProjectTitle={currentProject.title}
        activeView={activeView}
        setActiveView={setActiveView}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        onOpenGoogleAuth={() => setIsGoogleModalOpen(true)}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onOpenGitHub={() => setIsGitHubModalOpen(true)}
        onOpenMentor={() => setIsMentorDrawerOpen(true)}
        isOffline={isOffline}
      />

      {/* Main Viewport Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {activeView === 'courses' ? (
          <CourseCatalog
            currentProjectId={activeProjectId}
            onSelectProject={handleSelectProject}
            user={user}
          />
        ) : activeView === 'achievements' ? (
          <div className="flex-1 bg-slate-950 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Quadro de Conquistas & Níveis</h2>
              <p className="text-xs text-slate-400">
                Acompanhe o ganho de XP e a progressão dos seus títulos de desenvolvedor.
              </p>
              <button
                onClick={() => setIsAchievementsModalOpen(true)}
                className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold text-white shadow-lg"
              >
                Abrir Painel Completo de Conquistas
              </button>
            </div>
          </div>
        ) : (
          /* IDE Workspace: 3-column Layout (Step Objectives | Code Editor | Live Preview) */
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Column: Objectives & Step Guide (3 cols on desktop) */}
            <div className="hidden lg:block lg:col-span-3 h-full overflow-hidden">
              <ObjectivesPanel
                project={currentProject}
                currentStep={currentStep}
                objectiveResults={objectiveResults}
                onNextStep={handleNextStep}
                onOpenMentor={() => setIsMentorDrawerOpen(true)}
                isAllPassed={isAllObjectivesPassed}
                stepIndex={activeStepIndex}
                totalSteps={currentProject.steps.length}
              />
            </div>

            {/* Center Column: Professional Code Editor (5 cols on desktop) */}
            <div className="col-span-12 lg:col-span-5 h-full overflow-hidden">
              <CodeEditor
                activeFile={activeFile}
                setActiveFile={setActiveFile}
                codeHtml={codeHtml}
                codeCss={codeCss}
                codeJs={codeJs}
                onChangeHtml={setCodeHtml}
                onChangeCss={setCodeCss}
                onChangeJs={setCodeJs}
                diagnostics={allDiagnostics}
                onResetCode={handleResetCode}
                onNextStep={handleNextStep}
                onToggleMentor={() => setIsMentorDrawerOpen((prev) => !prev)}
                onToggleViewport={() => setViewportMode((prev) => (prev === 'desktop' ? 'tablet' : prev === 'tablet' ? 'mobile' : 'desktop'))}
                onManualSave={() => saveProjectCode(currentProject.id, currentStep.id, { html: codeHtml, css: codeCss, js: codeJs })}
              />
            </div>

            {/* Right Column: Live Interactive Browser Preview with Console (4 cols on desktop) */}
            <div className="col-span-12 lg:col-span-4 h-full overflow-hidden border-l border-slate-800">
              <LivePreview
                html={codeHtml}
                css={codeCss}
                js={codeJs}
                viewportMode={viewportMode}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modals & AI Drawer */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        user={user}
        onUpdateUser={setUser}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        projectName={currentProject.title}
        codeHtml={codeHtml}
        codeCss={codeCss}
        codeJs={codeJs}
        onDownloaded={handleDownloaded}
      />

      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        projectName={currentProject.title}
        codeHtml={codeHtml}
        codeCss={codeCss}
        codeJs={codeJs}
        onGitHubPushed={handleGitHubPushed}
      />

      <AchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        user={user}
      />

      <AiMentorDrawer
        isOpen={isMentorDrawerOpen}
        onClose={() => setIsMentorDrawerOpen(false)}
        projectTitle={currentProject.title}
        stepTitle={currentStep.title}
        codeHtml={codeHtml}
        codeCss={codeCss}
        codeJs={codeJs}
        diagnostics={allDiagnostics}
        isOffline={isOffline}
      />
    </div>
  );
}
