import React, { useState, useEffect, useRef } from 'react';
import { ViewportMode, ConsoleEntry } from '../../types';
import { 
  RotateCw, 
  Terminal, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface LivePreviewProps {
  html: string;
  css: string;
  js: string;
  viewportMode: ViewportMode;
  onRuntimeError?: (message: string) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  html,
  css,
  js,
  viewportMode,
  onRuntimeError,
}) => {
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen to messages posted from the preview iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'devcraft_preview') {
        const { type, message, timestamp } = event.data;
        const entry: ConsoleEntry = {
          id: Math.random().toString(36).substring(7),
          type,
          message,
          timestamp: timestamp || new Date().toLocaleTimeString(),
        };

        setConsoleLogs((prev) => [...prev.slice(-99), entry]);

        if (type === 'error' && onRuntimeError) {
          onRuntimeError(message);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onRuntimeError]);

  // Construct iframe document injecting CSS, JS and a Console bridge script
  const buildIframeDoc = () => {
    // Console interceptor script injected before any user script
    const consoleBridge = `
      <script>
        (function() {
          function sendToHost(type, args) {
            try {
              var formatted = Array.from(args).map(function(item) {
                if (typeof item === 'object') {
                  try { return JSON.stringify(item); } catch(e) { return String(item); }
                }
                return String(item);
              }).join(' ');

              window.parent.postMessage({
                source: 'devcraft_preview',
                type: type,
                message: formatted,
                timestamp: new Date().toLocaleTimeString()
              }, '*');
            } catch(e) {}
          }

          var originalLog = console.log;
          var originalWarn = console.warn;
          var originalError = console.error;
          var originalInfo = console.info;

          console.log = function() { sendToHost('log', arguments); originalLog.apply(console, arguments); };
          console.warn = function() { sendToHost('warn', arguments); originalWarn.apply(console, arguments); };
          console.error = function() { sendToHost('error', arguments); originalError.apply(console, arguments); };
          console.info = function() { sendToHost('info', arguments); originalInfo.apply(console, arguments); };

          window.onerror = function(msg, url, lineNo, columnNo, error) {
            sendToHost('error', ['[Erro em Execução Linha ' + lineNo + ']: ' + msg]);
            return false;
          };
        })();
      </script>
    `;

    // Inject CSS
    let processedHtml = html;
    const styleTag = `<style>\n${css}\n</style>`;

    if (processedHtml.includes('<link rel="stylesheet" href="styles.css">')) {
      processedHtml = processedHtml.replace('<link rel="stylesheet" href="styles.css">', styleTag);
    } else if (processedHtml.includes('</head>')) {
      processedHtml = processedHtml.replace('</head>', `${styleTag}\n</head>`);
    } else {
      processedHtml = `${styleTag}\n${processedHtml}`;
    }

    // Inject console bridge and user JS
    const scriptTag = `<script>\ntry {\n${js}\n} catch(err) { console.error(err.message); }\n</script>`;

    if (processedHtml.includes('<script src="script.js"></script>')) {
      processedHtml = processedHtml.replace('<script src="script.js"></script>', `${consoleBridge}\n${scriptTag}`);
    } else if (processedHtml.includes('</body>')) {
      processedHtml = processedHtml.replace('</body>', `${consoleBridge}\n${scriptTag}\n</body>`);
    } else {
      processedHtml = `${processedHtml}\n${consoleBridge}\n${scriptTag}`;
    }

    return processedHtml;
  };

  const handleClearLogs = () => {
    setConsoleLogs([]);
  };

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  const openInNewTab = () => {
    const doc = buildIframeDoc();
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Viewport container width constraints
  const getViewportWidthClass = () => {
    if (viewportMode === 'mobile') return 'w-[375px] h-[667px] shadow-2xl rounded-2xl border-4 border-slate-700';
    if (viewportMode === 'tablet') return 'w-[768px] h-full shadow-xl rounded-xl border border-slate-700';
    return 'w-full h-full';
  };

  const errorCount = consoleLogs.filter((l) => l.type === 'error').length;

  return (
    <div className={`flex flex-col h-full bg-slate-950 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}>
      {/* Top Preview Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Navegador Integrado</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 capitalize">
            {viewportMode === 'desktop' ? 'Tela Cheia (100%)' : viewportMode === 'tablet' ? 'Tablet (768px)' : 'Mobile (375px)'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReload}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Recarregar Prévia"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              showConsole
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Alternar Console de Desenvolvedor"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
            {errorCount > 0 && (
              <span className="px-1 py-0.2 text-[10px] bg-rose-500/20 text-rose-400 font-bold rounded">
                {errorCount}
              </span>
            )}
          </button>

          <button
            onClick={openInNewTab}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Abrir em Nova Aba"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title={isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Preview Frame Viewport */}
      <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 overflow-auto">
        <div className={`transition-all duration-300 bg-white overflow-hidden ${getViewportWidthClass()}`}>
          <iframe
            key={reloadKey}
            ref={iframeRef}
            srcDoc={buildIframeDoc()}
            title="DevCraft Live Preview"
            sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
            className="w-full h-full border-0 block"
          />
        </div>
      </div>

      {/* Expandable Developer Console */}
      {showConsole && (
        <div className="h-44 border-t border-slate-800 bg-slate-900 flex flex-col text-xs font-mono">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-300">Console da Aplicação</span>
              <span className="text-[11px] text-slate-500">({consoleLogs.length} eventos)</span>
            </div>
            <button
              onClick={handleClearLogs}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              title="Limpar logs"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-1">
            {consoleLogs.length === 0 ? (
              <div className="text-slate-500 italic py-2 px-1">
                Nenhum log registrado. Execute console.log() no script.js para inspecionar valores aqui!
              </div>
            ) : (
              consoleLogs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start gap-2 py-0.5 px-1.5 rounded text-[11px] ${
                    log.type === 'error'
                      ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500'
                      : log.type === 'warn'
                      ? 'bg-amber-950/40 text-amber-300 border-l-2 border-amber-500'
                      : 'text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="text-slate-500 text-[10px] select-none">{log.timestamp}</span>
                  {log.type === 'error' && <AlertCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />}
                  <span className="break-all whitespace-pre-wrap">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
