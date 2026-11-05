import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CodeDiagnostic } from '../../types';
import { ShortcutsModal } from '../Modals/ShortcutsModal';
import { 
  FileCode2, 
  RotateCcw, 
  Copy, 
  Check, 
  Wand2, 
  AlertCircle, 
  AlertTriangle,
  Lightbulb,
  Keyboard,
  Save,
  Play,
  Sparkles
} from 'lucide-react';

interface CodeEditorProps {
  activeFile: 'html' | 'css' | 'js';
  setActiveFile: (file: 'html' | 'css' | 'js') => void;
  codeHtml: string;
  codeCss: string;
  codeJs: string;
  onChangeHtml: (val: string) => void;
  onChangeCss: (val: string) => void;
  onChangeJs: (val: string) => void;
  diagnostics: CodeDiagnostic[];
  onResetCode: () => void;
  onApplyFix?: (diagnostic: CodeDiagnostic) => void;
  onNextStep?: () => void;
  onToggleMentor?: () => void;
  onToggleViewport?: () => void;
  onManualSave?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  activeFile,
  setActiveFile,
  codeHtml,
  codeCss,
  codeJs,
  onChangeHtml,
  onChangeCss,
  onChangeJs,
  diagnostics,
  onResetCode,
  onApplyFix,
  onNextStep,
  onToggleMentor,
  onToggleViewport,
  onManualSave,
}) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const currentCode = activeFile === 'html' ? codeHtml : activeFile === 'css' ? codeCss : codeJs;
  const currentSetter = activeFile === 'html' ? onChangeHtml : activeFile === 'css' ? onChangeCss : onChangeJs;

  // Detect OS for Mac (⌘) vs Windows/Linux (Ctrl)
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  // Helper for displaying temporary notification toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  }, []);

  // Filter diagnostics for the active file
  const activeDiagnostics = diagnostics.filter((d) => d.file === activeFile);
  const errors = activeDiagnostics.filter((d) => d.severity === 'error');
  const warnings = activeDiagnostics.filter((d) => d.severity === 'warning');

  const lineCount = Math.max(1, currentCode.split('\n').length);
  const linesArray = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Sync scroll between textarea and line numbers gutter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Simple clean indentation formatter
  const handleFormat = useCallback(() => {
    const lines = currentCode.split('\n');
    let indentLevel = 0;
    const formatted = lines.map((line) => {
      let trimmed = line.trim();
      if (!trimmed) return '';

      // Decrease indent for closing tags/braces
      if (
        trimmed.startsWith('</') ||
        trimmed.startsWith('}') ||
        trimmed.startsWith(']') ||
        trimmed.startsWith(');')
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indented = '  '.repeat(indentLevel) + trimmed;

      // Increase indent for opening tags/braces
      if (
        (trimmed.endsWith('{') ||
         trimmed.endsWith('(') ||
         (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.startsWith('<!--') && !trimmed.startsWith('<!'))) &&
        !trimmed.includes('</')
      ) {
        indentLevel++;
      }

      return indented;
    }).join('\n');

    currentSetter(formatted);
    showToast('Código formatado com sucesso! ✨');
  }, [currentCode, currentSetter, showToast]);

  const handleManualSaveAction = useCallback(() => {
    if (onManualSave) {
      onManualSave();
    }
    showToast('💾 Código salvo com sucesso!');
  }, [onManualSave, showToast]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Comprehensive keyboard shortcut listener
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isMod = isMac ? e.metaKey : e.ctrlKey;

    // 1. Tab key: insert 2 spaces
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const updated = currentCode.substring(0, start) + '  ' + currentCode.substring(end);
      currentSetter(updated);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
      return;
    }

    // 2. Ctrl+S / Cmd+S: Save code
    if (isMod && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      handleManualSaveAction();
      return;
    }

    // 3. Ctrl+Enter / Cmd+Enter: Run code or Advance step
    if (isMod && e.key === 'Enter') {
      e.preventDefault();
      if (onNextStep) {
        onNextStep();
      } else {
        showToast('🚀 Código atualizado na prévia!');
      }
      return;
    }

    // 4. Alt+1, Alt+2, Alt+3 or Ctrl+1, Ctrl+2, Ctrl+3: Switch files
    if (e.altKey || isMod) {
      if (e.key === '1') {
        e.preventDefault();
        setActiveFile('html');
        showToast('Aba index.html (Alt+1)');
        return;
      }
      if (e.key === '2') {
        e.preventDefault();
        setActiveFile('css');
        showToast('Aba styles.css (Alt+2)');
        return;
      }
      if (e.key === '3') {
        e.preventDefault();
        setActiveFile('js');
        showToast('Aba script.js (Alt+3)');
        return;
      }
    }

    // 5. Alt+Shift+F or Ctrl+Shift+F: Format code
    if ((e.altKey && e.shiftKey && (e.key === 'f' || e.key === 'F')) || (isMod && e.shiftKey && (e.key === 'f' || e.key === 'F'))) {
      e.preventDefault();
      handleFormat();
      return;
    }

    // 6. Ctrl+/ or Cmd+/: Open Shortcuts Cheat Sheet
    if (isMod && (e.key === '/' || e.key === '?')) {
      e.preventDefault();
      setIsShortcutsModalOpen(true);
      return;
    }

    // 7. Ctrl+M or Cmd+M: Toggle Mentor
    if (isMod && (e.key === 'm' || e.key === 'M')) {
      e.preventDefault();
      if (onToggleMentor) {
        onToggleMentor();
      }
      return;
    }

    // 8. Ctrl+Shift+P or Cmd+Shift+P: Toggle Viewport Mode
    if (isMod && e.shiftKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      if (onToggleViewport) {
        onToggleViewport();
      }
      return;
    }
  };

  // Global window listener for shortcuts when focus might be outside textarea
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isMod = isMac ? e.metaKey : e.ctrlKey;

      if (isMod && (e.key === '/' || e.key === '?')) {
        // Don't override if user is typing in standard inputs unless Ctrl+/
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isMac]);

  // Auto-focus textarea on tab switch
  useEffect(() => {
    textareaRef.current?.focus();
  }, [activeFile]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 select-none relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 bg-indigo-600 text-white font-medium text-xs rounded-full shadow-lg border border-indigo-400/30 animate-fade-in flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Editor Header / File Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-2 py-1">
        <div className="flex items-center gap-1">
          {/* HTML Tab */}
          <button
            onClick={() => setActiveFile('html')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-t-md transition-colors ${
              activeFile === 'html'
                ? 'bg-slate-900 text-orange-400 border-b-2 border-orange-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
            title="Aba HTML (Alt+1)"
          >
            <FileCode2 className="w-3.5 h-3.5 text-orange-500" />
            <span>index.html</span>
            {diagnostics.some((d) => d.file === 'html' && d.severity === 'error') && (
              <span className="w-2 h-2 rounded-full bg-rose-500" title="Erros no HTML" />
            )}
          </button>

          {/* CSS Tab */}
          <button
            onClick={() => setActiveFile('css')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-t-md transition-colors ${
              activeFile === 'css'
                ? 'bg-slate-900 text-cyan-400 border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
            title="Aba CSS (Alt+2)"
          >
            <FileCode2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>styles.css</span>
            {diagnostics.some((d) => d.file === 'css' && d.severity === 'error') && (
              <span className="w-2 h-2 rounded-full bg-rose-500" title="Erros no CSS" />
            )}
          </button>

          {/* JS Tab */}
          <button
            onClick={() => setActiveFile('js')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-t-md transition-colors ${
              activeFile === 'js'
                ? 'bg-slate-900 text-yellow-400 border-b-2 border-yellow-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
            title="Aba JS (Alt+3)"
          >
            <FileCode2 className="w-3.5 h-3.5 text-yellow-500" />
            <span>script.js</span>
            {diagnostics.some((d) => d.file === 'js' && d.severity === 'error') && (
              <span className="w-2 h-2 rounded-full bg-rose-500" title="Erros no JS" />
            )}
          </button>
        </div>

        {/* Action buttons: Save, Format, Shortcuts, Copy, Reset */}
        <div className="flex items-center gap-1 text-xs">
          {/* Quick Save button */}
          <button
            onClick={handleManualSaveAction}
            className="flex items-center gap-1 px-2 py-1 text-indigo-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title={`Salvar código (${modKey}+S)`}
          >
            <Save className="w-3 h-3 text-indigo-400" />
            <span className="hidden xl:inline">Salvar</span>
            <kbd className="hidden 2xl:inline text-[10px] text-indigo-400 bg-slate-900 border border-slate-800 px-1 rounded">{modKey}+S</kbd>
          </button>

          {/* Format button */}
          <button
            onClick={handleFormat}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Formatar código (Alt+Shift+F)"
          >
            <Wand2 className="w-3 h-3" />
            <span className="hidden sm:inline">Formatar</span>
          </button>

          {/* Shortcuts Cheat Sheet Button */}
          <button
            onClick={() => setIsShortcutsModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-950/40 rounded border border-indigo-900/40 transition-colors"
            title={`Ver atalhos de teclado (${modKey}+/)`}
          >
            <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Atalhos</span>
            <kbd className="hidden lg:inline text-[10px] text-slate-400 font-mono">{modKey}+/</kbd>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Copiar código"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={onResetCode}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded transition-colors"
            title="Restaurar código inicial deste passo"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Resetar</span>
          </button>
        </div>
      </div>

      {/* Code Text Area with Line Gutter */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-sm leading-6">
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          className="editor-gutter w-12 shrink-0 py-3 bg-slate-950/70 border-r border-slate-800/80 text-right pr-2 text-slate-600 select-none overflow-hidden"
          style={{ height: '100%' }}
        >
          {linesArray.map((num) => {
            const hasError = activeDiagnostics.some((d) => d.line === num && d.severity === 'error');
            const hasWarning = activeDiagnostics.some((d) => d.line === num && d.severity === 'warning');

            return (
              <div
                key={num}
                className="relative h-6 flex items-center justify-end group cursor-pointer"
                title={
                  hasError
                    ? `Linha ${num}: ${activeDiagnostics.find((d) => d.line === num)?.message}`
                    : undefined
                }
              >
                {hasError ? (
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-1 animate-pulse" />
                ) : hasWarning ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1" />
                ) : null}
                <span className={hasError ? 'text-rose-400 font-bold' : hasWarning ? 'text-amber-400' : 'text-slate-600'}>
                  {num}
                </span>
              </div>
            );
          })}
        </div>

        {/* Textarea Code Input */}
        <textarea
          ref={textareaRef}
          value={currentCode}
          onChange={(e) => currentSetter(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="code-textarea flex-1 h-full py-3 px-4 bg-slate-900 text-slate-200 outline-none resize-none selection:bg-indigo-600 selection:text-white"
          placeholder={`Digite seu código ${activeFile.toUpperCase()} aqui...`}
        />
      </div>

      {/* Diagnostics / Real-time Feedback & Shortcuts Bar */}
      <div className="border-t border-slate-800 bg-slate-950/90 px-4 py-2 text-xs">
        {activeDiagnostics.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-300">Feedback em tempo real:</span>
                {errors.length > 0 && (
                  <span className="flex items-center gap-1 text-rose-400 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.length} {errors.length === 1 ? 'erro de sintaxe' : 'erros de sintaxe'}
                  </span>
                )}
                {warnings.length > 0 && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {warnings.length} {warnings.length === 1 ? 'aviso' : 'avisos'}
                  </span>
                )}
              </div>
            </div>

            {/* List top diagnostics */}
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
              {activeDiagnostics.slice(0, 3).map((diag, i) => (
                <div
                  key={i}
                  className={`flex items-start justify-between gap-2 p-1.5 rounded border text-[11px] ${
                    diag.severity === 'error'
                      ? 'bg-rose-950/30 border-rose-900/50 text-rose-200'
                      : 'bg-amber-950/30 border-amber-900/50 text-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-1.5 flex-1">
                    <span className="font-mono font-bold bg-slate-900/80 px-1 py-0.5 rounded text-[10px] text-slate-300 shrink-0">
                      Linha {diag.line}
                    </span>
                    <div>
                      <span>{diag.message}</span>
                      {diag.fixSuggestion && (
                        <div className="text-slate-400 mt-0.5 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{diag.fixSuggestion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Sintaxe limpa e sem erros detectados nesta aba.</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <span>{lineCount} linhas</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[10px]">{modKey}+S</kbd> salvar
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[10px]">{modKey}+Enter</kbd> avançar
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
};
