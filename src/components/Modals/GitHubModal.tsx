import React, { useState } from 'react';
import { 
  X, 
  FolderGit2, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  ShieldAlert, 
  Sparkles,
  GitCommit,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  codeHtml: string;
  codeCss: string;
  codeJs: string;
  onGitHubPushed: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({
  isOpen,
  onClose,
  projectName,
  codeHtml,
  codeCss,
  codeJs,
  onGitHubPushed,
}) => {
  const [repoName, setRepoName] = useState(
    projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-') || 'meu-site-devcraft'
  );
  const [githubToken, setGithubToken] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ success?: boolean; message?: string; repoUrl?: string } | null>(null);
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  if (!isOpen) return null;

  const terminalCommands = `# 1. Abra o terminal na pasta onde você descompactou o site:
git init
git add .
git commit -m "feat: meu projeto interativo construído no DevCraft"
git branch -M main

# 2. Crie um repositório vazio no GitHub e conecte o remote:
git remote add origin https://github.com/SEU_USUARIO/${repoName}.git

# 3. Envie para o GitHub:
git push -u origin main`;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(terminalCommands);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2500);
  };

  // Direct GitHub API push
  const handlePushToGitHub = async () => {
    if (!githubToken.trim() || !repoName.trim()) return;

    try {
      setIsPushing(true);
      setPushStatus(null);

      // 1. Create Repository on user's GitHub
      const createRepoRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName.trim(),
          description: `Projeto ${projectName} criado no DevCraft Web IDE`,
          private: false,
          auto_init: true,
        }),
      });

      if (!createRepoRes.ok) {
        const errorData = await createRepoRes.json();
        // If already exists, that's okay, we can commit to existing
        if (!errorData.message?.includes('already exists')) {
          throw new Error(errorData.message || 'Erro ao criar repositório no GitHub');
        }
      }

      const repoData = await createRepoRes.json();
      const owner = repoData.owner?.login;
      const htmlUrl = repoData.html_url || `https://github.com/${repoName}`;

      // Helper to commit a file to GitHub
      const commitFile = async (path: string, content: string, message: string) => {
        if (!owner) return;
        const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${path}`;
        
        // Check if file exists to get SHA
        let sha: string | undefined;
        try {
          const getRes = await fetch(url, {
            headers: {
              Authorization: `Bearer ${githubToken.trim()}`,
              Accept: 'application/vnd.github.v3+json',
            },
          });
          if (getRes.ok) {
            const fileInfo = await getRes.json();
            sha = fileInfo.sha;
          }
        } catch (_) {}

        // UTF-8 base64 encoding
        const base64Content = btoa(unescape(encodeURIComponent(content)));

        await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${githubToken.trim()}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            content: base64Content,
            sha,
          }),
        });
      };

      if (owner) {
        await commitFile('index.html', codeHtml, 'feat: adicione index.html');
        await commitFile('styles.css', codeCss, 'feat: adicione styles.css');
        await commitFile('script.js', codeJs, 'feat: adicione script.js');
        await commitFile(
          'README.md',
          `# ${projectName}\n\nDesenvolvido no **DevCraft Web IDE**.\n\nAbra index.html no navegador ou ative o GitHub Pages!`,
          'docs: adicione README.md'
        );
      }

      setPushStatus({
        success: true,
        message: 'Repositório criado e arquivos commitados com sucesso!',
        repoUrl: htmlUrl,
      });

      onGitHubPushed();
    } catch (err: any) {
      console.error('Error pushing to GitHub:', err);
      setPushStatus({
        success: false,
        message: err.message || 'Falha ao conectar com o GitHub. Verifique o seu token.',
      });
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Conexão com o GitHub</h3>
              <p className="text-xs text-slate-400">Exporte seu código direto para o seu perfil do GitHub</p>
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
          {pushStatus && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                pushStatus.success
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-900/60 text-rose-200'
              }`}
            >
              {pushStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold">{pushStatus.message}</p>
                {pushStatus.repoUrl && (
                  <a
                    href={pushStatus.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-emerald-400 underline hover:text-emerald-300 font-medium"
                  >
                    <span>Ver Repositório no GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Option A: Direct Push via GitHub Token */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                <GitCommit className="w-4 h-4 text-indigo-400" />
                <span>Opção 1: Enviar Direto pelo Navegador (API do GitHub)</span>
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Nome do Repositório</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="meu-site-interativo"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-medium">Token de Acesso Pessoal (PAT)</label>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo&description=DevCraft%20Web%20IDE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Gerar Token com escopo repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={handlePushToGitHub}
                disabled={isPushing || !githubToken.trim()}
                className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors ${
                  isPushing || !githubToken.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>{isPushing ? 'Criando e enviando arquivos...' : 'Criar Repositório e Fazer Commit'}</span>
              </button>
            </div>
          </div>

          {/* Option B: Terminal Git Commands */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Opção 2: Linha de Comando (Git CLI)</span>
              </h4>
              <button
                onClick={handleCopyCommands}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800"
              >
                {copiedTerminal ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTerminal ? 'Copiado!' : 'Copiar Comandos'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto selection:bg-indigo-600">
              {terminalCommands}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
