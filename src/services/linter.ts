import { CodeDiagnostic, CodeObjective } from '../types';

// Void HTML elements that don't need a closing tag
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

// Known standard CSS properties to check for typos
const KNOWN_CSS_PROPERTIES = new Set([
  'align-content', 'align-items', 'align-self', 'animation', 'animation-delay',
  'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count',
  'animation-name', 'animation-timing-function', 'background', 'background-color',
  'background-image', 'background-position', 'background-repeat', 'background-size',
  'border', 'border-bottom', 'border-collapse', 'border-color', 'border-left',
  'border-radius', 'border-right', 'border-spacing', 'border-style', 'border-top',
  'border-width', 'bottom', 'box-shadow', 'box-sizing', 'clear', 'clip',
  'color', 'cursor', 'display', 'filter', 'flex', 'flex-basis', 'flex-direction',
  'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font',
  'font-family', 'font-size', 'font-style', 'font-weight', 'gap', 'grid',
  'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows',
  'grid-column', 'grid-row', 'grid-template-areas', 'grid-template-columns',
  'grid-template-rows', 'height', 'justify-content', 'justify-items', 'justify-self',
  'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-type',
  'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top',
  'max-height', 'max-width', 'min-height', 'min-width', 'opacity', 'order',
  'outline', 'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom',
  'padding-left', 'padding-right', 'padding-top', 'position', 'right',
  'text-align', 'text-decoration', 'text-indent', 'text-overflow', 'text-shadow',
  'text-transform', 'top', 'transform', 'transition', 'transition-delay',
  'transition-duration', 'transition-property', 'transition-timing-function',
  'user-select', 'visibility', 'white-space', 'width', 'word-break', 'z-index'
]);

const CSS_TYPO_MAP: Record<string, string> = {
  'colr': 'color',
  'colour': 'color',
  'pading': 'padding',
  'paddng': 'padding',
  'margn': 'margin',
  'displayy': 'display',
  'disply': 'display',
  'bacground': 'background',
  'backgroud': 'background',
  'bg': 'background',
  'heigth': 'height',
  'widht': 'width',
  'font-siz': 'font-size',
  'fontsize': 'font-size',
  'font-weigth': 'font-weight',
  'curser': 'cursor',
  'bordr': 'border',
  'borde-radius': 'border-radius',
  'border-radios': 'border-radius',
  'align-item': 'align-items',
  'justify-content': 'justify-content',
  'justfy-content': 'justify-content',
  'text-aligne': 'text-align'
};

/**
 * Validates HTML code line by line and overall DOM structure
 */
export function validateHtml(html: string): CodeDiagnostic[] {
  const diagnostics: CodeDiagnostic[] = [];
  const lines = html.split('\n');

  // Track unclosed open tags: { tag, line }
  const tagStack: { tag: string; line: number }[] = [];

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Check for unclosed attribute quotes like class="something
    const quotesMatch = line.match(/="[^"]*$/) || line.match(/='[^']*$/);
    if (quotesMatch && !line.includes('="') && line.includes('"')) {
      // safe check
    } else {
      const doubleQuotes = (line.match(/"/g) || []).length;
      if (doubleQuotes % 2 !== 0 && !line.includes('<!--')) {
        diagnostics.push({
          file: 'html',
          line: lineNum,
          message: 'Aspas não fechadas no atributo HTML nesta linha.',
          severity: 'error',
          fixSuggestion: 'Certifique-se de fechar as aspas duplas: ex: class="meu-estilo"',
        });
      }
    }

    // Check for < without > on the same line if simple tag
    if (trimmed.includes('<') && !trimmed.includes('>') && !trimmed.startsWith('<!--')) {
      diagnostics.push({
        file: 'html',
        line: lineNum,
        message: 'Tag HTML incompleta: falta o caractere de fechamento ">".',
        severity: 'error',
        fixSuggestion: 'Feche a tag adicionando ">" ao final.',
      });
    }

    // Tag opening & closing matching
    const tagRegex = /<\/?([a-zA-Z0-9]+)(\s+[^>]*)?>/g;
    let match;
    while ((match = tagRegex.exec(line)) !== null) {
      const fullTag = match[0];
      const tagName = match[1].toLowerCase();
      const isClosing = fullTag.startsWith('</');
      const isSelfClosing = fullTag.endsWith('/>') || VOID_ELEMENTS.has(tagName);

      if (isClosing) {
        if (tagStack.length === 0) {
          diagnostics.push({
            file: 'html',
            line: lineNum,
            message: `Tag de fechamento inesperada </${tagName}> sem tag de abertura correspondente.`,
            severity: 'error',
            fixSuggestion: `Remova a tag </${tagName}> ou adicione <${tagName}> antes.`,
          });
        } else {
          const lastTag = tagStack[tagStack.length - 1];
          if (lastTag.tag === tagName) {
            tagStack.pop();
          } else {
            diagnostics.push({
              file: 'html',
              line: lineNum,
              message: `Tag </${tagName}> fecha incorretamente a tag anterior <${lastTag.tag}> aberta na linha ${lastTag.line}.`,
              severity: 'error',
              fixSuggestion: `Feche primeiro </${lastTag.tag}> antes de fechar </${tagName}>.`,
            });
          }
        }
      } else if (!isSelfClosing) {
        tagStack.push({ tag: tagName, line: lineNum });
      }
    }
  });

  // Any remaining unclosed tags
  tagStack.forEach((unclosed) => {
    diagnostics.push({
      file: 'html',
      line: unclosed.line,
      message: `A tag <${unclosed.tag}> foi aberta mas não foi fechada com </${unclosed.tag}>.`,
      severity: 'error',
      fixSuggestion: `Adicione </${unclosed.tag}> antes do final do documento ou da tag pai.`,
    });
  });

  return diagnostics;
}

/**
 * Validates CSS code line by line
 */
export function validateCss(css: string): CodeDiagnostic[] {
  const diagnostics: CodeDiagnostic[] = [];
  const lines = css.split('\n');

  let openBraces = 0;
  let lastOpenBraceLine = 1;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Skip empty lines and comment lines
    if (!trimmed || trimmed.startsWith('/*') || trimmed.endsWith('*/')) {
      return;
    }

    // Count braces
    for (const char of trimmed) {
      if (char === '{') {
        openBraces++;
        lastOpenBraceLine = lineNum;
      } else if (char === '}') {
        openBraces--;
        if (openBraces < 0) {
          diagnostics.push({
            file: 'css',
            line: lineNum,
            message: 'Chave de fechamento "}" inesperada sem seletor correspondente.',
            severity: 'error',
            fixSuggestion: 'Remova a chave extra "}" ou verifique se faltou abrir "{" acima.',
          });
          openBraces = 0;
        }
      }
    }

    // Inside a CSS rule block
    if (openBraces > 0 && trimmed.includes(':') && !trimmed.endsWith('{') && !trimmed.startsWith('@')) {
      // Check for property typo
      const colonIndex = trimmed.indexOf(':');
      const propPart = trimmed.substring(0, colonIndex).trim();

      // Check known typo map
      if (CSS_TYPO_MAP[propPart]) {
        diagnostics.push({
          file: 'css',
          line: lineNum,
          message: `Propriedade CSS desconhecida "${propPart}". Você quis dizer "${CSS_TYPO_MAP[propPart]}"?`,
          severity: 'warning',
          fixSuggestion: `Substitua "${propPart}" por "${CSS_TYPO_MAP[propPart]}".`,
        });
      }

      // Check missing semicolon at end of line (unless line ends with { or })
      if (!trimmed.endsWith(';') && !trimmed.endsWith('}') && !trimmed.endsWith('{')) {
        diagnostics.push({
          file: 'css',
          line: lineNum,
          message: 'Falta o ponto e vírgula ";" ao final da propriedade CSS.',
          severity: 'error',
          fixSuggestion: 'Adicione ";" no final desta declaração.',
        });
      }
    }
  });

  if (openBraces > 0) {
    diagnostics.push({
      file: 'css',
      line: lastOpenBraceLine,
      message: 'Bloco de regras CSS não foi fechado com "}".',
      severity: 'error',
      fixSuggestion: 'Adicione "}" para fechar as propriedades do seletor.',
    });
  }

  return diagnostics;
}

/**
 * Validates JavaScript code for syntax errors and common DOM API issues
 */
export function validateJs(js: string): CodeDiagnostic[] {
  const diagnostics: CodeDiagnostic[] = [];
  const lines = js.split('\n');

  // Check for common typos in DOM methods line by line
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    if (trimmed.includes('getElementByid')) {
      diagnostics.push({
        file: 'js',
        line: lineNum,
        message: 'Método com grafia incorreta: "getElementByid". Em JavaScript é sensível a maiúsculas.',
        severity: 'error',
        fixSuggestion: 'Corrija para "getElementById" com "Id" maiúsculo.',
      });
    }

    if (trimmed.includes('queryselector(') || trimmed.includes('queryselectorall(')) {
      diagnostics.push({
        file: 'js',
        line: lineNum,
        message: 'Método com grafia incorreta. Use camelCase.',
        severity: 'error',
        fixSuggestion: 'Use "querySelector" ou "querySelectorAll".',
      });
    }

    if (trimmed.includes('addEventlistener')) {
      diagnostics.push({
        file: 'js',
        line: lineNum,
        message: 'Grafia incorreta: "addEventlistener". O "L" deve ser maiúsculo.',
        severity: 'error',
        fixSuggestion: 'Corrija para "addEventListener".',
      });
    }
  });

  // Try parsing with new Function to catch real JavaScript SyntaxErrors
  try {
    // Safe parse-only test
    new Function(js);
  } catch (err: any) {
    if (err instanceof SyntaxError) {
      let errorLine = 1;

      // Extract line number if present in error message or stack
      const lineMatch = err.message.match(/line (\d+)/i) || (err.stack && err.stack.match(/<anonymous>:(\d+):(\d+)/));
      if (lineMatch && lineMatch[1]) {
        errorLine = Math.min(lines.length, Math.max(1, parseInt(lineMatch[1], 10)));
      } else {
        // Fallback: estimate line by unclosed tokens
        let parentheses = 0;
        let brackets = 0;
        let braces = 0;
        for (let i = 0; i < lines.length; i++) {
          const l = lines[i];
          for (const char of l) {
            if (char === '(') parentheses++;
            if (char === ')') parentheses--;
            if (char === '[') brackets++;
            if (char === ']') brackets--;
            if (char === '{') braces++;
            if (char === '}') braces--;
          }
          if (parentheses < 0 || brackets < 0 || braces < 0) {
            errorLine = i + 1;
            break;
          }
        }
      }

      diagnostics.push({
        file: 'js',
        line: errorLine,
        message: `Erro de sintaxe JavaScript: ${err.message}`,
        severity: 'error',
        fixSuggestion: 'Revise parênteses (), chaves {}, aspas ou operadores nesta linha.',
      });
    }
  }

  return diagnostics;
}

/**
 * Checks if current code fulfills the objectives of the current step
 */
export function checkObjectives(
  objectives: CodeObjective[],
  html: string,
  css: string,
  js: string
): Record<string, boolean> {
  const results: Record<string, boolean> = {};

  // Create mock DOM for checking HTML structure in memory
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  objectives.forEach((obj) => {
    let passed = false;

    switch (obj.checkKey) {
      // Project 1
      case 'p1_s1_h1': {
        const h1 = doc.querySelector('.card h1') || doc.querySelector('h1');
        passed = Boolean(h1 && h1.textContent && h1.textContent.trim().length > 0);
        break;
      }
      case 'p1_s1_role': {
        const role = doc.querySelector('.role') || doc.querySelector('p.role');
        passed = Boolean(role && role.textContent && role.textContent.trim().length > 0);
        break;
      }
      case 'p1_s1_list': {
        const listItems = doc.querySelectorAll('ul li');
        passed = listItems.length >= 2;
        break;
      }
      case 'p1_s2_h1_css': {
        passed = css.includes('h1') && (css.includes('font-size') || css.includes('margin'));
        break;
      }
      case 'p1_s2_role_css': {
        passed = css.includes('.role') && (css.includes('color') || css.includes('font-size'));
        break;
      }
      case 'p1_s2_ul_css': {
        passed = (css.includes('ul') || css.includes('list-style')) &&
                 (css.includes('list-style: none') || css.includes('list-style:none') || css.includes('display: flex') || css.includes('display:flex'));
        break;
      }
      case 'p1_s3_btn': {
        const btn = doc.querySelector('#like-btn') || doc.querySelector('button#like-btn');
        passed = Boolean(btn);
        break;
      }
      case 'p1_s3_btn_css': {
        passed = (css.includes('.btn') || css.includes('#like-btn') || css.includes('button')) &&
                 (css.includes('cursor: pointer') || css.includes('cursor:pointer') || css.includes('background'));
        break;
      }
      case 'p1_s3_event': {
        passed = js.includes('addEventListener') && (js.includes('click') || js.includes('"click"') || js.includes("'click'"));
        break;
      }

      // Project 2
      case 'p2_s1_nav': {
        const nav = doc.querySelector('nav') || doc.querySelector('.navbar');
        const logo = doc.querySelector('.logo');
        passed = Boolean(nav && logo);
        break;
      }
      case 'p2_s1_hero': {
        const hero = doc.querySelector('.hero') || doc.querySelector('header.hero');
        const h1 = hero ? hero.querySelector('h1') : null;
        const btn = hero ? hero.querySelector('button') : null;
        passed = Boolean(hero && (h1 || btn));
        break;
      }
      case 'p2_s1_nav_flex': {
        passed = (css.includes('.navbar') || css.includes('nav')) &&
                 (css.includes('display: flex') || css.includes('display:flex'));
        break;
      }
      case 'p2_s2_cards': {
        const cards = doc.querySelectorAll('.feature-card');
        passed = cards.length >= 3;
        break;
      }
      case 'p2_s2_features_css': {
        passed = (css.includes('.features') || css.includes('.feature-card')) &&
                 (css.includes('gap') || css.includes('grid') || css.includes('flex'));
        break;
      }
      case 'p2_s2_media_query': {
        passed = css.includes('@media') && css.includes('max-width');
        break;
      }
      case 'p2_s3_theme_btn': {
        const btn = doc.querySelector('#theme-toggle');
        passed = Boolean(btn);
        break;
      }
      case 'p2_s3_light_css': {
        passed = css.includes('light-theme') || css.includes('.light-mode');
        break;
      }
      case 'p2_s3_toggle_js': {
        passed = js.includes('toggle') && (js.includes('classList') || js.includes('theme'));
        break;
      }

      // Project 3
      case 'p3_s1_input': {
        const input = doc.querySelector('#task-input');
        passed = Boolean(input);
        break;
      }
      case 'p3_s1_list': {
        const list = doc.querySelector('#task-list');
        passed = Boolean(list);
        break;
      }
      case 'p3_s1_selectors': {
        passed = (js.includes('getElementById') || js.includes('querySelector')) &&
                 (js.includes('task-input') || js.includes('taskInput') || js.includes('task-list'));
        break;
      }
      case 'p3_s2_create_element': {
        passed = js.includes('createElement') && (js.includes("'li'") || js.includes('"li"'));
        break;
      }
      case 'p3_s2_append': {
        passed = js.includes('appendChild') || js.includes('.append(');
        break;
      }
      case 'p3_s2_listener': {
        passed = js.includes('addEventListener') && js.includes('click');
        break;
      }
      case 'p3_s3_remove': {
        passed = js.includes('.remove()');
        break;
      }
      case 'p3_s3_enter': {
        passed = (js.includes('keydown') || js.includes('keypress') || js.includes('keyup')) &&
                 (js.includes('Enter') || js.includes('13'));
        break;
      }

      // Project 4
      case 'p4_s1_valor': {
        const input = doc.querySelector('#valor-base');
        passed = Boolean(input);
        break;
      }
      case 'p4_s1_desc': {
        const input = doc.querySelector('#desconto');
        passed = Boolean(input);
        break;
      }
      case 'p4_s1_result': {
        const res = doc.querySelector('#resultado-total');
        passed = Boolean(res);
        break;
      }
      case 'p4_s2_math': {
        passed = (js.includes('parseFloat') || js.includes('Number') || js.includes('+')) &&
                 (js.includes('*') || js.includes('-') || js.includes('/'));
        break;
      }
      case 'p4_s2_update': {
        passed = js.includes('textContent') || js.includes('innerText') || js.includes('innerHTML');
        break;
      }

      // Project 5
      case 'p5_s1_sections': {
        const proj = doc.querySelector('#projetos') || doc.querySelector('.projects');
        const contato = doc.querySelector('#contato') || doc.querySelector('.contact');
        passed = Boolean(proj || contato);
        break;
      }
      case 'p5_s1_form': {
        const form = doc.querySelector('#contact-form') || doc.querySelector('form');
        passed = Boolean(form);
        break;
      }
      case 'p5_s2_prevent': {
        passed = js.includes('preventDefault()');
        break;
      }
      case 'p5_s2_validation': {
        passed = (js.includes('value') || js.includes('trim()')) &&
                 (js.includes('success') || js.includes('enviad') || js.includes('alert') || js.includes('status'));
        break;
      }

      default:
        passed = true;
    }

    results[obj.id] = passed;
  });

  return results;
}
