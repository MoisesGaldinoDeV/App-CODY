import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Archive, 
  FileCode, 
  ExternalLink, 
  Check, 
  Globe, 
  Sparkles,
  Layers
} from 'lucide-react';
import { downloadProjectZip, downloadSingleHtml } from '../../services/storage';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  codeHtml: string;
  codeCss: string;
  codeJs: string;
  onDownloaded: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  projectName,
  codeHtml,
  codeCss,
  codeJs,
  onDownloaded,
}) => {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      await downloadProjectZip(projectName, codeHtml, codeCss, codeJs);
      setDownloadSuccess(true);
      onDownloaded();
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to download ZIP:', err);
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadHtml = () => {
    try {
      setDownloadingHtml(true);
      downloadSingleHtml(projectName, codeHtml, codeCss, codeJs);
      setDownloadSuccess(true);
      onDownloaded();
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to download HTML:', err);
    } finally {
      setDownloadingHtml(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Baixar Seu Site Completo</h3>
              <p className="text-xs text-slate-400">Arquivos limpos prontos para rodar em qualquer lugar</p>
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
          {downloadSuccess && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-bounce-once">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Download concluído! Você desbloqueou a conquista <strong>Criador Independente</strong> (+120 XP)!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* ZIP download card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <Archive className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">Pacote Completo (.ZIP)</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Inclui <code>index.html</code>, <code>styles.css</code>, <code>script.js</code> e manual <code>README.md</code>.
                </p>
              </div>

              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingZip ? 'Gerando...' : 'Baixar ZIP'}</span>
              </button>
            </div>

            {/* Single HTML card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <FileCode className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">Arquivo Único (.HTML)</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Todo o CSS e JavaScript embutidos em 1 só arquivo. Dê duplo clique e abra direto.
                </p>
              </div>

              <button
                onClick={handleDownloadHtml}
                disabled={downloadingHtml}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingHtml ? 'Gerando...' : 'Baixar .HTML'}</span>
              </button>
            </div>
          </div>

          {/* Hosting Guide */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Onde e Como Colocar Seu Site no Ar Gratuitamente:</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">1.</span>
                <span>
                  <strong>Netlify Drop:</strong> Acesse <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">app.netlify.com/drop</a> e basta arrastar a pasta descompactada para o navegador. Seu site ganha link público instantâneo!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">2.</span>
                <span>
                  <strong>GitHub Pages:</strong> Suba para o seu repositório no GitHub, ative o Pages nas configurações e pronto!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">3.</span>
                <span>
                  <strong>Vercel:</strong> Importe seu repositório ou pasta no Vercel para deploy automático com HTTPS gratuito.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
