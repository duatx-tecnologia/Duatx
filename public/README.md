# DUATX - Website em HTML/CSS/JavaScript

Site da DUATX desenvolvido com stack pura de HTML, CSS e JavaScript, sem frameworks.

## Estrutura do Projeto

```
├── public/                 # Arquivos públicos do website
│   ├── index.html         # Página principal
│   ├── css/               # Estilos CSS
│   │   └── main.css       # CSS principal com design neomórfico
│   ├── js/                # Scripts JavaScript
│   │   ├── data.js        # Dados e conteúdo do site
│   │   ├── animations.js  # Efeitos de animação e scroll
│   │   └── main.js        # Funcionalidade principal
│   └── assets/            # Imagens e recursos
│       ├── logo-escrita-lightversion.png
│       └── ...
├── server/                # Servidor Express.js
│   └── index.js          # Servidor simples para servir arquivos estáticos
├── package.json          # Dependências do projeto
└── start.js             # Script de inicialização
```

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design neomórfico responsivo com variáveis CSS
- **JavaScript ES6+** - Funcionalidade interativa pura
- **Express.js** - Servidor para arquivos estáticos e API de contato
- **Lucide Icons** - Ícones via CDN

## Funcionalidades

- Design neomórfico escuro e responsivo
- Animações suaves com scroll
- Formulário de contato funcional
- Navegação mobile responsiva
- Seções: Hero, Serviços, Setores, Casos de Sucesso, Depoimentos, Sobre, Contato
- API endpoint para processar formulários de contato

## Como Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O site estará disponível em `http://localhost:5000`

## API Endpoints

- `GET /` - Página principal
- `POST /api/contact` - Processar formulário de contato

## Design

- Tema escuro com paleta de cores personalizadas
- Efeitos neomórficos com sombras inset/outset
- Gradientes laranja-azul para elementos de destaque
- Tipografia Montserrat
- Layout responsivo com breakpoints mobile-first

## Estrutura CSS

- Variáveis CSS para cores e espaçamentos
- Classes utilitárias para componentes
- Sistema de grid responsivo
- Animações e transições suaves

## Estrutura JavaScript

- **data.js**: Contém todos os dados do site (serviços, setores, casos, depoimentos)
- **animations.js**: Sistema de animações com Intersection Observer
- **main.js**: Funcionalidade principal, navegação e formulários

## Browser Support

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)