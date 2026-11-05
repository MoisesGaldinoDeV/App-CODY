import { Badge } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_tag',
    title: 'Primeira Tag',
    description: 'Criou sua primeira tag semântica em HTML válida.',
    iconName: 'Code',
    xpBonus: 50,
  },
  {
    id: 'clean_code',
    title: 'Código Limpo',
    description: 'Escreveu 5 linhas seguidas sem nenhum erro de sintaxe.',
    iconName: 'CheckCircle2',
    xpBonus: 100,
  },
  {
    id: 'flexbox_master',
    title: 'Mestre da Flexbox',
    description: 'Alinhou e centralizou elementos com maestria em CSS.',
    iconName: 'Layout',
    xpBonus: 150,
  },
  {
    id: 'dom_wizard',
    title: 'Mago do DOM',
    description: 'Adicionou interatividade viva usando eventos JavaScript.',
    iconName: 'Zap',
    xpBonus: 200,
  },
  {
    id: 'site_exported',
    title: 'Criador Independente',
    description: 'Baixou seu primeiro projeto em ZIP pronto para a web.',
    iconName: 'Download',
    xpBonus: 120,
  },
  {
    id: 'github_connected',
    title: 'Git Explorer',
    description: 'Conectou o projeto ao GitHub e preparou o repositório.',
    iconName: 'GitBranch',
    xpBonus: 180,
  },
  {
    id: 'streak_3',
    title: 'Foco Total',
    description: 'Manteve 3 dias consecutivos praticando código.',
    iconName: 'Flame',
    xpBonus: 250,
  },
  {
    id: 'fullstack_junior',
    title: 'Arquiteto Web',
    description: 'Completou todos os 5 projetos do curso de formação.',
    iconName: 'Trophy',
    xpBonus: 500,
  },
];

export function calculateLevel(xp: number): { level: number; title: string; nextLevelXp: number; currentLevelXp: number } {
  if (xp < 200) {
    return { level: 1, title: 'Iniciante Web', currentLevelXp: 0, nextLevelXp: 200 };
  } else if (xp < 500) {
    return { level: 2, title: 'Desenvolvedor HTML5', currentLevelXp: 200, nextLevelXp: 500 };
  } else if (xp < 1000) {
    return { level: 3, title: 'Estilista CSS3 & Flexbox', currentLevelXp: 500, nextLevelXp: 1000 };
  } else if (xp < 1800) {
    return { level: 4, title: 'Ninja do JavaScript DOM', currentLevelXp: 1000, nextLevelXp: 1800 };
  } else if (xp < 3000) {
    return { level: 5, title: 'Desenvolvedor Frontend Pro', currentLevelXp: 1800, nextLevelXp: 3000 };
  } else {
    return { level: 6, title: 'Mestre da Web', currentLevelXp: 3000, nextLevelXp: 5000 };
  }
}
