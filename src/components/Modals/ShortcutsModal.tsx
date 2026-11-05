import React from 'react';
import { X, Keyboard, Command, Sparkles } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: 'Editor' | 'Navegação' | 'Ações';
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts: ShortcutItem[] = [
    {
      keys: [modKey, 'S'],
      description: 'Salvar código manualmente e atualizar persistência',
      category: 'Editor',
    },
    {
      keys: [modKey, 'Enter'],
      description: 'Concluir Passo / Testar e Avançar para a próxima lição',
      category: 'Ações',
    },
    {
      keys: ['Alt', '1'],
      description: 'Alternar para a aba index.html',
      category: 'Navegação',
    },
    {
      keys: ['Alt', '2'],
      description: 'Alternar para a aba styles.css',
      category: 'Navegação',
    },
    {
      keys: ['Alt', '3'],
      description: 'Alternar para a aba script.js',
      category: 'Navegação',
    },
    {
      keys: ['Alt', 'Shift', 'F'],
      description: 'Formatar e alinhar identação do código ativo',
      category: 'Editor',
    },
    {
      keys: ['Tab'],
      description: 'Inserir 2 espaços de identação no ponto do cursor',
      category: 'Editor',
    },
    {
      keys: [modKey, 'Shift', 'P'],
      description: 'Alternar modo de visualização da prévia (Desktop / Tablet / Mobile)',
      category: 'Navegação',
    },
    {
      keys: [modKey, 'M'],
      description: 'Abrir / Fechar o Mentor Dev AI',
      category: 'Ações',
    },
    {
      keys: [modKey, '/'],
      description: 'Exibir este painel de atalhos de teclado',
      category: 'Ações',
    },
  ];

  const categories = ['Editor', 'Navegação', 'Ações'] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Atalhos de Teclado</h3>
              <p className="text-xs text-slate-400">Produtividade de desenvolvedor no DevCraft Web IDE</p>
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
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {categories.map((cat) => {
            const catShortcuts = shortcuts.filter((s) => s.category === cat);
            if (catShortcuts.length === 0) return null;

            return (
              <div key={cat} className="space-y-2.5">
                <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  {cat}
                </h4>

                <div className="space-y-2">
                  {catShortcuts.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs hover:border-slate-700 transition-colors"
                    >
                      <span className="text-slate-300 font-medium">{item.description}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((key, kIdx) => (
                          <kbd
                            key={kIdx}
                            className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-md font-mono text-[11px] font-semibold text-indigo-200 shadow-sm"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dica: Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 font-mono text-[10px]">{modKey} + /</kbd> a qualquer momento no editor.</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
