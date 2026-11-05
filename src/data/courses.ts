import { CourseProject } from '../types';

export const COURSES: CourseProject[] = [
  {
    id: 'proj-1-profile-card',
    title: '1. Cartão de Perfil Dev Interativo',
    description: 'Aprenda os alicerces fundamentais da web construindo um cartão de desenvolvedor moderno com HTML semântico, estilos CSS elegantes e efeitos de foco e hover.',
    levelRequired: 1,
    levelBadge: 'Nível 1',
    difficulty: 'Iniciante',
    category: 'HTML & CSS',
    estimatedMinutes: 20,
    totalXp: 300,
    steps: [
      {
        id: 'p1-s1',
        stepNumber: 1,
        title: 'Estruturando o HTML Semântico',
        subtitle: 'Crie a base com tags semânticas da HTML5',
        instructions: [
          'Dentro da tag `<main class="card">`, adicione um elemento `<header class="card-header">`.',
          'Insira uma tag `<h1>` com o seu nome profissional.',
          'Adicione uma tag `<p class="role">` descrevendo sua área (ex: "Desenvolvedor Frontend").',
          'Adicione uma lista `<ul>` com pelo menos duas habilidades usando `<li>` (ex: "HTML5" e "CSS3").',
        ],
        objectives: [
          {
            id: 'obj-h1',
            description: 'Existe um cabeçalho <h1> com o seu nome dentro do cartão',
            hint: 'Use <h1>Seu Nome</h1> dentro da classe .card',
            type: 'html',
            checkKey: 'p1_s1_h1',
          },
          {
            id: 'obj-role',
            description: 'Existe um parágrafo com a classe "role"',
            hint: 'Adicione <p class="role">Desenvolvedor Frontend</p>',
            type: 'html',
            checkKey: 'p1_s1_role',
          },
          {
            id: 'obj-list',
            description: 'Existe uma lista <ul> com pelo menos 2 itens <li>',
            hint: 'Crie <ul><li>HTML5</li><li>CSS3</li></ul>',
            type: 'html',
            checkKey: 'p1_s1_list',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu Cartão Dev</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="card">
    <!-- Adicione o header, h1, p.role e a lista ul de habilidades aqui -->
    
  </main>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `/* Estilos Básicos */
body {
  margin: 0;
  padding: 40px 20px;
  background-color: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  max-width: 380px;
  width: 100%;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  text-align: center;
}`,
        initialJs: `// O JavaScript será adicionado no Passo 3!
console.log("Cartão carregado com sucesso!");`,
        explanation: 'HTML Semântico é essencial para acessibilidade (leitores de tela) e SEO (Google). O uso de <main>, <header> e <ul> ajuda o navegador e os robôs de busca a compreender a estrutura do documento.',
        xpReward: 100,
      },
      {
        id: 'p1-s2',
        stepNumber: 2,
        title: 'Estilizando com CSS Moderno',
        subtitle: 'Aplique cores, tipografia, bordas e sombras',
        instructions: [
          'No arquivo `styles.css`, estilize o seletor `h1` definindo `font-size: 24px;` e `margin-bottom: 8px;`.',
          'Estilize a classe `.role` com a cor `#94a3b8` e `font-size: 14px;`.',
          'Remova as bolinhas padrão da lista com `.card ul { list-style: none; padding: 0; display: flex; gap: 8px; justify-content: center; }`.',
        ],
        objectives: [
          {
            id: 'obj-h1-css',
            description: 'Seletor h1 configurado no CSS com font-size',
            hint: 'Adicione no CSS: h1 { font-size: 24px; margin-bottom: 8px; }',
            type: 'css',
            checkKey: 'p1_s2_h1_css',
          },
          {
            id: 'obj-role-css',
            description: 'Classe .role estilizada com cor e tamanho de fonte',
            hint: 'Adicione: .role { color: #94a3b8; font-size: 14px; }',
            type: 'css',
            checkKey: 'p1_s2_role_css',
          },
          {
            id: 'obj-ul-css',
            description: 'Lista sem marcadores (list-style: none) e com flexbox',
            hint: 'Defina list-style: none e display: flex para a lista',
            type: 'css',
            checkKey: 'p1_s2_ul_css',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu Cartão Dev</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="card">
    <header class="card-header">
      <div class="avatar-badge">💻</div>
      <h1>Alexandre Silva</h1>
      <p class="role">Desenvolvedor Frontend & UI</p>
    </header>

    <div class="skills-section">
      <p class="section-title">Habilidades:</p>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </ul>
    </div>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  margin: 0;
  padding: 40px 20px;
  background-color: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  max-width: 380px;
  width: 100%;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.avatar-badge {
  font-size: 40px;
  margin-bottom: 12px;
}

/* Adicione as regras para h1, .role e ul abaixo: */
`,
        initialJs: `console.log("Cartão pronto para estilização.");`,
        explanation: 'CSS permite transformar uma estrutura plana em uma experiência visual polida. Combinar Flexbox com espaçamento `gap` deixa as tags de habilidades fluidas e organizadas.',
        xpReward: 100,
      },
      {
        id: 'p1-s3',
        stepNumber: 3,
        title: 'Interatividade com JavaScript',
        subtitle: 'Adicione um botão interativo com contador de curtidas',
        instructions: [
          'No arquivo `index.html`, adicione um botão `<button id="like-btn" class="btn">Curtir Perfil ❤️ (<span id="likes-count">0</span>)</button>`.',
          'No arquivo `styles.css`, estilize `.btn` com fundo `#3b82f6`, `cursor: pointer;`, `border: none;` e transição suave.',
          'No arquivo `script.js`, use `document.getElementById` e `addEventListener("click", ...)` para incrementar o número de curtidas a cada clique!',
        ],
        objectives: [
          {
            id: 'obj-btn-html',
            description: 'Botão com id="like-btn" presente no HTML',
            hint: 'Adicione <button id="like-btn" class="btn">Curtir (<span id="likes-count">0</span>)</button>',
            type: 'html',
            checkKey: 'p1_s3_btn',
          },
          {
            id: 'obj-btn-css',
            description: 'Botão estilizado com cursor: pointer e background',
            hint: 'No CSS adicione .btn { cursor: pointer; background: ...; }',
            type: 'css',
            checkKey: 'p1_s3_btn_css',
          },
          {
            id: 'obj-click-listener',
            description: 'Evento de clique addEventListener registrado no botão',
            hint: 'No script.js, use likeBtn.addEventListener("click", () => { ... })',
            type: 'js',
            checkKey: 'p1_s3_event',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu Cartão Dev</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="card">
    <header class="card-header">
      <div class="avatar-badge">💻</div>
      <h1>Alexandre Silva</h1>
      <p class="role">Desenvolvedor Frontend & UI</p>
    </header>

    <div class="skills-section">
      <p class="section-title">Habilidades:</p>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </ul>
    </div>

    <!-- Adicione o botão de curtir com id="like-btn" aqui: -->
    
  </main>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  margin: 0;
  padding: 40px 20px;
  background-color: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  max-width: 380px;
  width: 100%;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.avatar-badge {
  font-size: 40px;
  margin-bottom: 12px;
}

h1 {
  font-size: 24px;
  margin: 0 0 8px 0;
}

.role {
  color: #94a3b8;
  font-size: 14px;
  margin: 0 0 20px 0;
}

.section-title {
  font-size: 13px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 24px 0;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.card ul li {
  background: #334155;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
}

/* Estilize o botão .btn aqui */
`,
        initialJs: `// Selecione o botão e o elemento contador:
// const likeBtn = document.getElementById('like-btn');
// const countSpan = document.getElementById('likes-count');

// Crie a variável de contagem e adicione o listener de 'click':
`,
        explanation: 'Parabéns! O método `addEventListener` é a espinha dorsal de qualquer site interativo moderno. Ele escuta as ações do usuário (clique, teclado, scroll) e executa sua lógica de forma reativa.',
        xpReward: 100,
      },
    ],
  },
  {
    id: 'proj-2-responsive-landing',
    title: '2. Landing Page Responsiva com Flexbox & Tema Escuro',
    description: 'Construa uma página de vendas completa com cabeçalho fixo, grid de destaques responsivo que se adapta perfeitamente a celulares, tablets e computadores, e alternador de tema com CSS Variables.',
    levelRequired: 2,
    levelBadge: 'Nível 2',
    difficulty: 'Intermediário',
    category: 'CSS Flexbox',
    estimatedMinutes: 25,
    totalXp: 400,
    steps: [
      {
        id: 'p2-s1',
        stepNumber: 1,
        title: 'Barra de Navegação e Hero Section Responsiva',
        subtitle: 'Estruture a landing page para telas de todos os tamanhos',
        instructions: [
          'No arquivo `index.html`, crie a tag `<nav class="navbar">` com uma logo `<div class="logo">` e uma lista de links de navegação.',
          'Crie uma seção `<section class="hero">` com título impactante `<h1>` e um botão de ação com a classe `.cta-button`.',
          'No `styles.css`, use `display: flex; justify-content: space-between; align-items: center;` para alinhar a barra.',
        ],
        objectives: [
          {
            id: 'obj-nav-html',
            description: 'Barra de navegação <nav class="navbar"> criada com .logo',
            hint: 'Use <nav class="navbar"><div class="logo">MeuSite</div>...</nav>',
            type: 'html',
            checkKey: 'p2_s1_nav',
          },
          {
            id: 'obj-hero-cta',
            description: 'Seção .hero com título h1 e botão .cta-button',
            hint: 'Crie <section class="hero"><h1>...</h1><button class="cta-button">Começar</button></section>',
            type: 'html',
            checkKey: 'p2_s1_hero',
          },
          {
            id: 'obj-nav-flex',
            description: 'Classe .navbar estilizada com display: flex no CSS',
            hint: 'Adicione .navbar { display: flex; justify-content: space-between; }',
            type: 'css',
            checkKey: 'p2_s1_nav_flex',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page Responsiva</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Crie o <nav class="navbar"> e o <section class="hero"> aqui -->

  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `/* Variáveis de Tema */
:root {
  --bg-color: #0b1120;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #6366f1;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
}

/* Estilize a .navbar e a .hero aqui: */
`,
        initialJs: `console.log("Landing page inicializada!");`,
        explanation: 'O meta tag viewport `<meta name="viewport" content="width=device-width, initial-scale=1.0">` é obrigatório para que a página se adapte dinamicamente à largura física dos smartphones!',
        xpReward: 120,
      },
      {
        id: 'p2-s2',
        stepNumber: 2,
        title: 'Grid de Recursos e Media Queries',
        subtitle: 'Adapte o layout em 3 colunas no desktop e 1 coluna no celular',
        instructions: [
          'No `index.html`, crie uma seção `<section class="features">` contendo 3 cards com a classe `.feature-card`.',
          'No `styles.css`, configure `.features` com `display: flex; flex-wrap: wrap; gap: 24px;` ou `display: grid; grid-template-columns: repeat(3, 1fr);`.',
          'Adicione uma regra de Media Query `@media (max-width: 768px)` para transformar a grade em 1 única coluna (`grid-template-columns: 1fr;` ou `flex-direction: column;`).',
        ],
        objectives: [
          {
            id: 'obj-features-html',
            description: 'Seção .features com 3 elementos .feature-card',
            hint: 'Adicione <div class="features"><div class="feature-card">...</div>...</div>',
            type: 'html',
            checkKey: 'p2_s2_cards',
          },
          {
            id: 'obj-features-css',
            description: 'Estilo .features com flex ou grid e espaçamento gap',
            hint: 'Use display: grid ou display: flex com gap',
            type: 'css',
            checkKey: 'p2_s2_features_css',
          },
          {
            id: 'obj-media-query',
            description: 'Media query @media (max-width: ...) presente no CSS',
            hint: 'Adicione @media (max-width: 768px) { ... } para adaptar telas menores',
            type: 'css',
            checkKey: 'p2_s2_media_query',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page Responsiva</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo">⚡ CodeLaunch</div>
    <div class="nav-links">
      <a href="#features">Recursos</a>
      <a href="#pricing">Planos</a>
    </div>
  </nav>

  <header class="hero">
    <h1>Construa Sites Incríveis do Zero</h1>
    <p>Aprenda a programar interfaces responsivas com feedback em tempo real.</p>
    <button class="cta-button">Começar Agora</button>
  </header>

  <!-- Adicione a seção .features com 3 cards aqui: -->
  
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `:root {
  --bg-color: #0b1120;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #6366f1;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid #334155;
}

.logo {
  font-weight: 700;
  font-size: 18px;
  color: var(--accent);
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  margin-left: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 40px;
  margin-bottom: 16px;
}

.cta-button {
  background-color: var(--accent);
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

/* Adicione a estilização de .features, .feature-card e o @media query aqui: */
`,
        initialJs: `console.log("Seção de features carregada.");`,
        explanation: 'Design Responsivo permite que um único código sirva smartphones, tablets e monitores ultra-wide com performance e legibilidade impecáveis.',
        xpReward: 140,
      },
      {
        id: 'p2-s3',
        stepNumber: 3,
        title: 'Alternador de Modo Claro / Escuro com JavaScript',
        subtitle: 'Alterne classes e variáveis CSS dinamicamente',
        instructions: [
          'No `index.html`, adicione um botão `<button id="theme-toggle" class="theme-btn">☀️ Tema</button>` na barra de navegação.',
          'No `styles.css`, crie as regras para o tema claro com a classe `body.light-theme { --bg-color: #f8fafc; --card-bg: #ffffff; --text-main: #0f172a; --text-muted: #64748b; }`.',
          'No `script.js`, escute o clique em `#theme-toggle` e use `document.body.classList.toggle("light-theme")`.',
        ],
        objectives: [
          {
            id: 'obj-theme-btn',
            description: 'Botão com id="theme-toggle" presente no HTML',
            hint: 'Insira <button id="theme-toggle">Alternar Tema</button> na navbar',
            type: 'html',
            checkKey: 'p2_s3_theme_btn',
          },
          {
            id: 'obj-light-theme-css',
            description: 'Classe .light-theme definida no CSS atualizando variáveis',
            hint: 'Adicione body.light-theme { --bg-color: #ffffff; --text-main: #111; }',
            type: 'css',
            checkKey: 'p2_s3_light_css',
          },
          {
            id: 'obj-theme-toggle-js',
            description: 'JavaScript manipulando classList.toggle no clique do botão',
            hint: 'Use document.body.classList.toggle("light-theme") no listener',
            type: 'js',
            checkKey: 'p2_s3_toggle_js',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page Responsiva</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo">⚡ CodeLaunch</div>
    <div class="nav-actions">
      <!-- Adicione o botão com id="theme-toggle" aqui -->
      
    </div>
  </nav>

  <header class="hero">
    <h1>Construa Sites Incríveis do Zero</h1>
    <p>Aprenda a programar interfaces responsivas com feedback em tempo real.</p>
    <button class="cta-button">Começar Agora</button>
  </header>

  <section class="features">
    <div class="feature-card">
      <h3>🚀 Rápido</h3>
      <p>Desenvolvimento ágil com código limpo e componentes reutilizáveis.</p>
    </div>
    <div class="feature-card">
      <h3>📱 100% Responsivo</h3>
      <p>Layouts fluidos que se encaixam em qualquer tamanho de tela.</p>
    </div>
    <div class="feature-card">
      <h3>🎨 Modo Escuro</h3>
      <p>Conforto visual automático com suporte completo a variáveis CSS.</p>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `:root {
  --bg-color: #0b1120;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #6366f1;
}

/* Defina as propriedades para body.light-theme aqui */

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: var(--card-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-weight: 700;
  font-size: 18px;
  color: var(--accent);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.feature-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
}
`,
        initialJs: `// Selecione o botão #theme-toggle e adicione o ouvinte de clique:
`,
        explanation: 'As variáveis CSS (Custom Properties) são reativas! Ao alternar uma classe no elemento body ou html, todas as propriedades subordinadas mudam instantaneamente sem precisar recarregar o estilo.',
        xpReward: 140,
      },
    ],
  },
  {
    id: 'proj-3-todo-dom',
    title: '3. Mini App de Tarefas Interativo (DOM Master)',
    description: 'Domine a manipulação do DOM em JavaScript! Construa um aplicativo de lista de tarefas completo com inclusão dinâmica de itens, remoção com um clique, validação de campo vazio e contador reativo.',
    levelRequired: 3,
    levelBadge: 'Nível 3',
    difficulty: 'Intermediário',
    category: 'JavaScript DOM',
    estimatedMinutes: 25,
    totalXp: 450,
    steps: [
      {
        id: 'p3-s1',
        stepNumber: 1,
        title: 'Criando a Interface e Selecionando Elementos',
        subtitle: 'Estruture o formulário e capture elementos com document.querySelector',
        instructions: [
          'No HTML, crie um campo `<input id="task-input" placeholder="Nova tarefa...">`.',
          'Adicione um botão `<button id="add-btn">Adicionar</button>` e uma lista vazia `<ul id="task-list"></ul>`.',
          'No JavaScript, selecione cada um dos três elementos usando `document.getElementById` ou `document.querySelector`.',
        ],
        objectives: [
          {
            id: 'obj-input-html',
            description: 'Campo de texto input com id="task-input"',
            hint: 'Insira <input id="task-input" type="text" />',
            type: 'html',
            checkKey: 'p3_s1_input',
          },
          {
            id: 'obj-list-html',
            description: 'Lista com id="task-list" presente',
            hint: 'Insira <ul id="task-list"></ul> no HTML',
            type: 'html',
            checkKey: 'p3_s1_list',
          },
          {
            id: 'obj-selectors-js',
            description: 'Seleção de elementos em variáveis no script.js',
            hint: 'Use const taskInput = document.getElementById("task-input");',
            type: 'js',
            checkKey: 'p3_s1_selectors',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>App de Tarefas</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="todo-app">
    <h1>Minhas Metas Dev</h1>
    
    <!-- Adicione o formulário de entrada (input + botão) e a lista ul aqui -->

  </div>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.todo-app {
  background: #1e293b;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  border: 1px solid #334155;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

h1 {
  font-size: 22px;
  margin-top: 0;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 14px;
  outline: none;
}

input:focus {
  border-color: #3b82f6;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
`,
        initialJs: `// Selecione os elementos da interface aqui:
`,
        explanation: 'O DOM (Document Object Model) é a representação em árvore da sua página na memória do navegador. Com o JS, você pode inspecionar, alterar ou criar qualquer nó dinamicamente.',
        xpReward: 150,
      },
      {
        id: 'p3-s2',
        stepNumber: 2,
        title: 'Criando Elementos Dinamicamente com createElement',
        subtitle: 'Gere novas tags <li> quando o usuário clicar no botão',
        instructions: [
          'No JavaScript, crie uma função `addTask()` que leia `taskInput.value.trim()`.',
          'Se o texto não for vazio, use `const li = document.createElement("li");` para gerar o item.',
          'Defina o conteúdo de `li.textContent` com o texto digitado e anexe com `taskList.appendChild(li)`.',
          'Limpe o campo com `taskInput.value = "";` e foque novamente nele com `taskInput.focus()`.',
        ],
        objectives: [
          {
            id: 'obj-create-element',
            description: 'Uso de document.createElement("li") no código JS',
            hint: 'Crie novos itens com document.createElement("li")',
            type: 'js',
            checkKey: 'p3_s2_create_element',
          },
          {
            id: 'obj-append-child',
            description: 'Uso de appendChild ou append para anexar o item à lista',
            hint: 'Anexe o novo li com taskList.appendChild(li)',
            type: 'js',
            checkKey: 'p3_s2_append',
          },
          {
            id: 'obj-click-handler',
            description: 'Botão configurado com addEventListener("click", ...)',
            hint: 'Adicione addEventListener no botão de adicionar',
            type: 'js',
            checkKey: 'p3_s2_listener',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>App de Tarefas</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="todo-app">
    <h1>Minhas Metas Dev</h1>
    
    <div class="input-group">
      <input id="task-input" type="text" placeholder="Ex: Estudar Flexbox..." />
      <button id="add-btn">Adicionar</button>
    </div>

    <ul id="task-list"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.todo-app {
  background: #1e293b;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  border: 1px solid #334155;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

h1 {
  font-size: 22px;
  margin-top: 0;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 14px;
  outline: none;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #0f172a;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`,
        initialJs: `const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Crie a função para adicionar tarefas e conecte ao botão:
`,
        explanation: 'Usar `document.createElement` e `appendChild` é a forma mais segura e performática de injetar nós no DOM sem os riscos de segurança (XSS) causados por `innerHTML` puro!',
        xpReward: 150,
      },
      {
        id: 'p3-s3',
        stepNumber: 3,
        title: 'Remoção com 1 Clique e Suporte à Tecla Enter',
        subtitle: 'Adicione botão de exclusão e atalho de teclado',
        instructions: [
          'Dentro de cada `li`, crie um botão de excluir `<button class="delete-btn">✕</button>`.',
          'Adicione um evento de clique no botão de excluir para remover o item com `li.remove()`.',
          'Adicione um ouvinte de tecla no `taskInput`: se `event.key === "Enter"`, chame a função de adicionar!',
        ],
        objectives: [
          {
            id: 'obj-remove-call',
            description: 'Uso do método .remove() para deletar a tarefa',
            hint: 'Use li.remove() dentro do evento de exclusão',
            type: 'js',
            checkKey: 'p3_s3_remove',
          },
          {
            id: 'obj-enter-key',
            description: 'Atalho de teclado escutando keydown e checando "Enter"',
            hint: 'Adicione taskInput.addEventListener("keydown", (e) => { if (e.key === "Enter") ... })',
            type: 'js',
            checkKey: 'p3_s3_enter',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>App de Tarefas</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="todo-app">
    <h1>Minhas Metas Dev</h1>
    
    <div class="input-group">
      <input id="task-input" type="text" placeholder="Ex: Estudar Flexbox..." />
      <button id="add-btn">Adicionar</button>
    </div>

    <ul id="task-list"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.todo-app {
  background: #1e293b;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  border: 1px solid #334155;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

h1 {
  font-size: 22px;
  margin-top: 0;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 14px;
  outline: none;
}

#add-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #0f172a;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
`,
        initialJs: `const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  
  const span = document.createElement('span');
  span.textContent = text;

  // Crie o deleteBtn, configure o evento .remove() e anexe ao li:

  li.appendChild(span);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);

// Adicione o listener de 'keydown' no taskInput para disparar com Enter:
`,
        explanation: 'Atalhos de teclado como Enter elevam a experiência do usuário de amadora para profissional. Agora seu app é intuitivo e veloz!',
        xpReward: 150,
      },
    ],
  },
  {
    id: 'proj-4-calculator',
    title: '4. Calculadora Moderna de Orçamento Web',
    description: 'Crie uma ferramenta prática de cálculo de valores com campos numéricos interativos, seletor de porcentagem de desconto, cálculo instantâneo e formatação de moeda brasileira (R$).',
    levelRequired: 4,
    levelBadge: 'Nível 4',
    difficulty: 'Intermediário',
    category: 'Lógica & Interatividade',
    estimatedMinutes: 30,
    totalXp: 500,
    steps: [
      {
        id: 'p4-s1',
        stepNumber: 1,
        title: 'Formulário Financeiro com Grid e Inputs Numéricos',
        subtitle: 'Estruturando a calculadora com campos de valor e desconto',
        instructions: [
          'No `index.html`, crie campos com `<input id="valor-base" type="number">` e `<input id="desconto" type="number">`.',
          'Adicione um elemento `<div id="resultado-total" class="result-box">R$ 0,00</div>`.',
          'Adicione um botão `<button id="btn-calcular">Calcular Total</button>`.',
        ],
        objectives: [
          {
            id: 'obj-val-input',
            description: 'Input numérico #valor-base presente',
            hint: 'Use <input id="valor-base" type="number" />',
            type: 'html',
            checkKey: 'p4_s1_valor',
          },
          {
            id: 'obj-desc-input',
            description: 'Input numérico #desconto presente',
            hint: 'Use <input id="desconto" type="number" />',
            type: 'html',
            checkKey: 'p4_s1_desc',
          },
          {
            id: 'obj-res-box',
            description: 'Elemento com id="resultado-total" para exibir o valor',
            hint: 'Insira <div id="resultado-total">R$ 0,00</div>',
            type: 'html',
            checkKey: 'p4_s1_result',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Calculadora de Orçamento</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="calc-card">
    <h2>Simulador de Orçamento Dev</h2>
    <!-- Adicione os inputs #valor-base, #desconto, botão #btn-calcular e a div #resultado-total -->
    
  </main>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  background: #090d16;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.calc-card {
  background: #131b2e;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
}

.field {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 6px;
}

input {
  width: 100%;
  box-sizing: border-box;
  background: #090d16;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 16px;
}

button {
  width: 100%;
  background: #10b981;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

.result-box {
  margin-top: 24px;
  background: #090d16;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #34d399;
}
`,
        initialJs: `console.log("Calculadora pronta!");`,
        explanation: 'Campos do tipo `number` garantem que teclados numéricos apareçam em dispositivos móveis e ajudam a prevenir inserções inválidas.',
        xpReward: 200,
      },
      {
        id: 'p4-s2',
        stepNumber: 2,
        title: 'Lógica de Cálculo e Formatação com Intl.NumberFormat',
        subtitle: 'Programe os cálculos de desconto e moeda',
        instructions: [
          'No JavaScript, crie uma função para calcular o valor final: `valor - (valor * desconto / 100)`.',
          'Use `parseFloat` para converter os valores dos inputs em números seguros.',
          'Atualize o texto de `#resultado-total` formatado como moeda brasileira `R$ ...`.',
          'Adicione o ouvinte de evento no botão `#btn-calcular` e também ouvintes no evento `input` para atualizar em tempo real!',
        ],
        objectives: [
          {
            id: 'obj-calc-math',
            description: 'Cálculo matemático com parseFloat e porcentagem',
            hint: 'Use parseFloat(valorInput.value) para calcular o total',
            type: 'js',
            checkKey: 'p4_s2_math',
          },
          {
            id: 'obj-calc-update',
            description: 'Atualização do resultado na tela com textContent',
            hint: 'resultadoTotal.textContent = `R$ ${total.toFixed(2)}`',
            type: 'js',
            checkKey: 'p4_s2_update',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Calculadora de Orçamento</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="calc-card">
    <h2>Simulador de Orçamento Dev</h2>
    
    <div class="field">
      <label for="valor-base">Valor do Projeto (R$)</label>
      <input id="valor-base" type="number" placeholder="Ex: 2500" value="2500">
    </div>

    <div class="field">
      <label for="desconto">Desconto para Pagamento à Vista (%)</label>
      <input id="desconto" type="number" placeholder="Ex: 10" value="10">
    </div>

    <button id="btn-calcular">Calcular Total com Desconto</button>

    <div class="result-box">
      <div class="label-result">Valor Final:</div>
      <div id="resultado-total">R$ 0,00</div>
    </div>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  background: #090d16;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.calc-card {
  background: #131b2e;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
}

.field {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 6px;
}

input {
  width: 100%;
  box-sizing: border-box;
  background: #090d16;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 16px;
}

button {
  width: 100%;
  background: #10b981;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #059669;
}

.result-box {
  margin-top: 24px;
  background: #090d16;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.label-result {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 6px;
}

#resultado-total {
  font-size: 28px;
  font-weight: 700;
  color: #34d399;
}
`,
        initialJs: `const valorInput = document.getElementById('valor-base');
const descontoInput = document.getElementById('desconto');
const btnCalcular = document.getElementById('btn-calcular');
const resultadoTotal = document.getElementById('resultado-total');

// Escreva a função que calcula o desconto e atualiza o texto:
`,
        explanation: 'A manipulação de valores numéricos e formatação de moedas são habilidades diárias de desenvolvedores frontend em e-commerces e dashboards SaaS.',
        xpReward: 300,
      },
    ],
  },
  {
    id: 'proj-5-portfolio',
    title: '5. Portfólio de Desenvolvedor Completo & Pronto para Hospedar',
    description: 'O projeto final supremo: construa um portfólio profissional para chamar de seu, com galeria de projetos, seletor de filtros, formulário de contato com validação e animações CSS suaves.',
    levelRequired: 5,
    levelBadge: 'Nível 5',
    difficulty: 'Avançado',
    category: 'Portfólio Full',
    estimatedMinutes: 35,
    totalXp: 600,
    steps: [
      {
        id: 'p5-s1',
        stepNumber: 1,
        title: 'Arquitetura Completa de Portfólio',
        subtitle: 'Monte as seções semânticas: Hero, Projetos e Contato',
        instructions: [
          'No `index.html`, crie a estrutura semântica: `<header>`, `<section id="sobre">`, `<section id="projetos">` e `<section id="contato">`.',
          'Na seção de projetos, adicione uma lista ou grid com cards com a classe `.project-card`.',
          'Na seção de contato, crie um formulário `<form id="contact-form">` com input de nome, email e botão de envio.',
        ],
        objectives: [
          {
            id: 'obj-port-sections',
            description: 'Seções semânticas com id="projetos" e id="contato"',
            hint: 'Crie <section id="projetos"> e <section id="contato">',
            type: 'html',
            checkKey: 'p5_s1_sections',
          },
          {
            id: 'obj-port-form',
            description: 'Formulário com id="contact-form" presente',
            hint: 'Crie <form id="contact-form">...</form>',
            type: 'html',
            checkKey: 'p5_s1_form',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfólio Profissional</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="logo">DevPortfolio</div>
    <nav>
      <a href="#sobre">Sobre</a>
      <a href="#projetos">Projetos</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>

  <!-- Adicione as seções #sobre, #projetos e #contato aqui -->

  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #030712;
  color: #f9fafb;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(17, 24, 39, 0.8);
  border-bottom: 1px solid #1f2937;
  position: sticky;
  top: 0;
}

.logo {
  font-weight: 800;
  font-size: 20px;
  color: #38bdf8;
}

nav a {
  color: #9ca3af;
  text-decoration: none;
  margin-left: 24px;
  font-weight: 500;
}

nav a:hover {
  color: #fff;
}
`,
        initialJs: `console.log("Portfólio iniciado!");`,
        explanation: 'Um portfólio bem estruturado com HTML semântico garante que recrutadores e robôs de busca encontrem seus trabalhos com máxima relevância!',
        xpReward: 300,
      },
      {
        id: 'p5-s2',
        stepNumber: 2,
        title: 'Validação de Formulário e Feedback Interativo',
        subtitle: 'Intercepta o envio do formulário, valida os campos e exibe mensagem de sucesso',
        instructions: [
          'No JavaScript, capture o formulário `#contact-form` com `addEventListener("submit", (e) => { e.preventDefault(); ... })`.',
          'Valide se o campo de nome e o campo de email não estão vazios.',
          'Exiba uma mensagem de sucesso dinâmica `<div class="success-alert">Mensagem enviada com sucesso!</div>`.',
        ],
        objectives: [
          {
            id: 'obj-submit-prevent',
            description: 'Uso de event.preventDefault() no submit do formulário',
            hint: 'Use form.addEventListener("submit", (e) => { e.preventDefault(); })',
            type: 'js',
            checkKey: 'p5_s2_prevent',
          },
          {
            id: 'obj-validation-alert',
            description: 'Validação dos campos e feedback visual no formulário',
            hint: 'Verifique os valores e mostre um alerta ou mensagem de sucesso',
            type: 'js',
            checkKey: 'p5_s2_validation',
          },
        ],
        initialHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfólio Profissional</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="logo">DevPortfolio</div>
    <nav>
      <a href="#sobre">Sobre</a>
      <a href="#projetos">Projetos</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>

  <section id="sobre" class="hero">
    <h1>Olá! Sou Desenvolvedor Web</h1>
    <p>Criando experiências modernas, interativas e responsivas.</p>
  </section>

  <section id="projetos" class="section">
    <h2>Meus Projetos Recentes</h2>
    <div class="projects-grid">
      <div class="project-card">
        <h3>App de Tarefas Reativo</h3>
        <p>Construído com HTML5, CSS3 Flexbox e JavaScript puro.</p>
      </div>
      <div class="project-card">
        <h3>Simulador de Orçamento</h3>
        <p>Cálculo em tempo real com validações dinâmicas.</p>
      </div>
    </div>
  </section>

  <section id="contato" class="section">
    <h2>Vamos Conversar?</h2>
    <form id="contact-form">
      <input id="user-name" type="text" placeholder="Seu nome" required />
      <input id="user-email" type="email" placeholder="Seu e-mail" required />
      <textarea id="user-message" placeholder="Sua mensagem" rows="4"></textarea>
      <button type="submit" id="send-btn">Enviar Mensagem</button>
      <div id="status-message"></div>
    </form>
  </section>

  <script src="script.js"></script>
</body>
</html>`,
        initialCss: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #030712;
  color: #f9fafb;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(17, 24, 39, 0.8);
  border-bottom: 1px solid #1f2937;
  position: sticky;
  top: 0;
}

.logo {
  font-weight: 800;
  font-size: 20px;
  color: #38bdf8;
}

nav a {
  color: #9ca3af;
  text-decoration: none;
  margin-left: 24px;
}

.hero {
  text-align: center;
  padding: 80px 20px 40px 20px;
}

.section {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.2s, border-color 0.2s;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: #38bdf8;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
}

input, textarea {
  background: #111827;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 14px;
}

button {
  background: #38bdf8;
  color: #030712;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.success-message {
  color: #34d399;
  font-weight: 600;
  margin-top: 8px;
}
`,
        initialJs: `const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');

// Adicione o listener de 'submit' com e.preventDefault() e valide os campos:
`,
        explanation: 'Incrível! Você concluiu a formação completa de Desenvolvedor Web! Seu site está 100% pronto para download e publicação!',
        xpReward: 300,
      },
    ],
  },
];
