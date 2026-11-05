import JSZip from 'jszip';
import { UserProfile, CodeFile } from '../types';
import { calculateLevel } from '../data/badges';

const STORAGE_KEYS = {
  USER_PROFILE: 'devcraft_user_profile',
  ACTIVE_PROJECT: 'devcraft_active_project_id',
  ACTIVE_STEP: 'devcraft_active_step_id',
  PROJECT_CODE_PREFIX: 'devcraft_code_',
  CUSTOM_PROJECTS: 'devcraft_custom_projects',
  OFFLINE_CACHE_DATE: 'devcraft_offline_sync',
};

export const DEFAULT_USER: UserProfile = {
  id: 'usr_guest',
  name: 'Desenvolvedor(a) Convidado',
  email: 'dev@devcraft.local',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=DevCraft',
  provider: 'local',
  xp: 150,
  level: 1,
  levelTitle: 'Iniciante Web',
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: ['first_tag'],
  completedStepIds: [],
  completedProjectIds: [],
};

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) {
      const user = JSON.parse(raw) as UserProfile;
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      if (user.lastActiveDate !== today) {
        const lastDate = new Date(user.lastActiveDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          user.streakDays += 1;
        } else if (diffDays > 1) {
          user.streakDays = 1;
        }
        user.lastActiveDate = today;
        saveUserProfile(user);
      }
      return user;
    }
  } catch (e) {
    console.warn('Could not read user profile from storage', e);
  }
  return DEFAULT_USER;
}

export function saveUserProfile(user: UserProfile): void {
  try {
    const { level, title } = calculateLevel(user.xp);
    user.level = level;
    user.levelTitle = title;
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
}

export function saveProjectCode(projectId: string, stepId: string, files: Record<string, string>): void {
  try {
    const key = `${STORAGE_KEYS.PROJECT_CODE_PREFIX}${projectId}_${stepId}`;
    localStorage.setItem(key, JSON.stringify(files));
  } catch (e) {
    console.warn('Could not persist code to localStorage', e);
  }
}

export function loadProjectCode(projectId: string, stepId: string): Record<string, string> | null {
  try {
    const key = `${STORAGE_KEYS.PROJECT_CODE_PREFIX}${projectId}_${stepId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not load code from localStorage', e);
  }
  return null;
}

/**
 * Generates and triggers download of a standalone ZIP archive containing the website
 */
export async function downloadProjectZip(
  projectName: string,
  html: string,
  css: string,
  js: string
): Promise<void> {
  const zip = new JSZip();

  // Project files
  zip.file('index.html', html);
  zip.file('styles.css', css);
  zip.file('script.js', js);

  // Informative README.md
  const readmeContent = `# ${projectName}

Projeto desenvolvido com o **DevCraft Web IDE**!

## 🚀 Como Executar Localmente
1. Dê um duplo clique no arquivo \`index.html\` para abrir diretamente em qualquer navegador (Chrome, Edge, Firefox, Safari).
2. Não é necessário nenhum servidor nem instalação de dependências para rodar.

## 🌐 Como Hospedar Gratuitamente na Internet
- **Netlify Drop**: Acesse [app.netlify.com/drop](https://app.netlify.com/drop) e simplesmente arraste esta pasta descompactada. Seu site estará no ar em segundos!
- **Vercel**: Suba a pasta para o GitHub e importe no [vercel.com](https://vercel.com).
- **GitHub Pages**: Crie um repositório no GitHub, ative o Pages nas configurações e aponte para a branch \`main\`.

---
Criado com foco em código limpo, semântica e boas práticas web.
`;

  zip.file('README.md', readmeContent);

  // Generate blob and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  a.download = `${safeName || 'meu-site-devcraft'}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a bundled single self-contained HTML file
 */
export function downloadSingleHtml(
  projectName: string,
  html: string,
  css: string,
  js: string
): void {
  // Inject CSS inside <style> and JS inside <script>
  let bundled = html;
  
  if (bundled.includes('<link rel="stylesheet" href="styles.css">')) {
    bundled = bundled.replace(
      '<link rel="stylesheet" href="styles.css">',
      `<style>\n${css}\n</style>`
    );
  } else if (bundled.includes('</head>')) {
    bundled = bundled.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
  }

  if (bundled.includes('<script src="script.js"></script>')) {
    bundled = bundled.replace(
      '<script src="script.js"></script>',
      `<script>\n${js}\n</script>`
    );
  } else if (bundled.includes('</body>')) {
    bundled = bundled.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
  }

  const blob = new Blob([bundled], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  a.download = `${safeName || 'site'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
