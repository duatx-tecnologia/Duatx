// TypeScript entry point for the Express server
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// API endpoint for contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, message } = req.body;
  
  // Log the contact form submission
  console.log('Contact form submission:', {
    name,
    email,
    phone,
    company,
    message,
    timestamp: new Date().toISOString()
  });
  
  res.json({ 
    success: true, 
    message: 'Mensagem recebida com sucesso! Entraremos em contato em breve.' 
  });
});

// API endpoint for chatbot/agent interactions
app.post('/api/chat', (req, res) => {
  const { message, context } = req.body;
  
  // Log the chat interaction
  console.log('Chat interaction:', {
    message,
    context,
    timestamp: new Date().toISOString()
  });
  
  // Portuguese-only responses for the agent
  const responses = {
    greeting: "Olá! Sou o assistente virtual da DUATX. Como posso ajudá-lo hoje? Posso falar sobre nossos serviços de IA, automação, dashboards e casos de sucesso.",
    services: "A DUATX oferece soluções em: 1) Inteligência Artificial e Machine Learning, 2) Automação de Processos, 3) Dashboards e Análise de Dados, 4) Software sob Medida. Sobre qual serviço gostaria de saber mais?",
    sectors: "Atuamos em diversos setores: Indústria, Saúde, Logística, Jurídico, Varejo e Serviços. Cada setor tem suas particularidades e desenvolvemos soluções específicas para maximizar os resultados.",
    contact: "Para agendar um diagnóstico gratuito, você pode: 1) Usar o WhatsApp: (11) 91290-6767, 2) Preencher o formulário de contato no site, 3) Enviar email para contato@duatx.com.br",
    default: "Entendo sua pergunta. Para melhor atendê-lo, posso explicar sobre nossos serviços, setores de atuação, casos de sucesso ou como agendar um diagnóstico gratuito. O que seria mais útil para você?"
  };
  
  // Simple keyword-based response logic (em português)
  const messageText = message.toLowerCase();
  let response = responses.default;
  
  if (messageText.includes('olá') || messageText.includes('oi') || messageText.includes('bom dia') || messageText.includes('boa tarde')) {
    response = responses.greeting;
  } else if (messageText.includes('serviço') || messageText.includes('solução') || messageText.includes('ia') || messageText.includes('automação')) {
    response = responses.services;
  } else if (messageText.includes('setor') || messageText.includes('indústria') || messageText.includes('saúde') || messageText.includes('logística')) {
    response = responses.sectors;
  } else if (messageText.includes('contato') || messageText.includes('agendar') || messageText.includes('diagnóstico') || messageText.includes('whatsapp')) {
    response = responses.contact;
  }
  
  res.json({
    success: true,
    response: response,
    timestamp: new Date().toISOString()
  });
});

// Serve the main HTML file for all routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err);
});

const PORT = parseInt(process.env.PORT || '5000');
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Website accessible at http://localhost:${PORT}`);
});