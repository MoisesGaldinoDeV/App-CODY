import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK on server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for AI Dev Mentor
app.post('/api/ai-mentor', async (req, res) => {
  try {
    const { codeHtml, codeCss, codeJs, challengeTitle, currentStep, userQuestion, errors } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        offline: true,
        feedback: "Dica pedagógica: Verifique se todas as suas tags HTML foram fechadas corretamente e se as propriedades CSS terminam com ponto e vírgula (;). No JavaScript, confira se os nomes dos elementos e classes correspondem exatamente ao HTML!",
      });
    }

    const systemInstruction = `Você é o Mentor DevCraft, um professor amigável, encorajador e didático de desenvolvimento Web (HTML, CSS e JavaScript).
Seu objetivo é guiar o aluno a descobrir e corrigir erros em seu próprio código sem apenas entregar a resposta pronta.
Explique com clareza em português do Brasil:
1. O que está acontecendo no código.
2. Onde está a falha ou o que está faltando.
3. Um pequeno exemplo ilustrativo da sintaxe correta.
Seja conciso (máximo 3 parágrafos curtos) e encorajador.`;

    const prompt = `Desafio atual: ${challengeTitle || 'Projeto Livre'}
Passo atual: ${currentStep || 'Desenvolvimento'}
Erros detectados pelo linter: ${JSON.stringify(errors || [])}
Dúvida do aluno: ${userQuestion || 'Por que meu código não está funcionando ou como posso melhorar?'}

Código HTML do aluno:
\`\`\`html
${(codeHtml || '').slice(0, 3000)}
\`\`\`

Código CSS do aluno:
\`\`\`css
${(codeCss || '').slice(0, 3000)}
\`\`\`

Código JavaScript do aluno:
\`\`\`javascript
${(codeJs || '').slice(0, 3000)}
\`\`\`

Dê seu feedback instrutivo e motivador agora:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    const feedback = response.text || 'Continue praticando! Revise as instruções do desafio para avançar.';

    res.json({
      success: true,
      feedback,
    });
  } catch (err: any) {
    console.error('Error in /api/ai-mentor:', err);
    res.status(500).json({
      success: false,
      error: 'Não foi possível contatar o Mentor AI no momento.',
      fallbackFeedback: 'Dica do sistema: Revise o fechamento das tags HTML e certifique-se de que cada regra CSS tenha chaves { } bem posicionadas.',
    });
  }
});

// Health / status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DevCraft IDE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
