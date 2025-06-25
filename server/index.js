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
  
  // In a real application, you would:
  // - Save to database
  // - Send email notification
  // - Integrate with CRM
  
  res.json({ 
    success: true, 
    message: 'Mensagem recebida com sucesso! Entraremos em contato em breve.' 
  });
});

// Serve the main HTML file for all routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err);
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`11:58:45 PM [express] serving on port ${PORT}`);
  console.log(`Website accessible at http://localhost:${PORT}`);
});