// Data constants for DUATX website
const DATA = {
  services: [
    {
      id: "dashboards",
      title: "Dashboards Personalizados",
      icon: "bar-chart-3",
      problem: "Informações espalhadas, relatórios manuais e a sensação constante de que \"algo está escapando\".",
      solution: "Centralizamos todos os dados críticos em dashboards visuais, fáceis de usar e atualizados em tempo real. KPI por área, unidade, colaborador ou operação — tudo num só lugar.",
      result: "Até 70% mais agilidade na tomada de decisão e controle total da operação, sem depender de planilhas ou pedidos de relatório.",
      color: "from-blue-600 to-blue-500"
    },
    {
      id: "automacao",
      title: "Automações e Agentes de IA",
      icon: "bot",
      problem: "A equipe perde horas por dia com tarefas repetitivas, processos engessados e erros manuais que geram prejuízo silencioso.",
      solution: "Implantamos automações que executam tarefas sozinhas e agentes de IA que respondem, organizam, analisam e avisam — tudo de forma integrada ao seu dia a dia.",
      result: "Redução de até 80% no tempo gasto em tarefas operacionais e um salto de eficiência com menos custo e mais escala.",
      color: "from-green-500 to-blue-400"
    },
    {
      id: "software",
      title: "Software Sob Medida",
      icon: "code",
      problem: "Soluções prontas não acompanham a complexidade e a lógica específica da sua empresa — forçando adaptações e criando gargalos.",
      solution: "Desenvolvemos sistemas personalizados que se moldam à realidade do seu negócio, centralizando fluxos, dados e integrações de forma leve e eficiente.",
      result: "Tecnologia feita para o seu jeito de operar. Zero fricção, alto controle e espaço garantido para escalar com consistência.",
      color: "from-blue-600 to-green-500"
    },
    {
      id: "diagnostico",
      title: "Diagnóstico Empresarial",
      icon: "clipboard-check",
      problem: "A empresa cresce, mas continua operando no escuro: decisões baseadas em feeling, planilhas quebradas, gargalos invisíveis e retrabalho silencioso.",
      solution: "Aplicamos um diagnóstico estratégico com IA para mapear onde a operação está perdendo dinheiro, tempo e margem — com visão clara do que automatizar, organizar e escalar.",
      result: "Entrega de um plano de ação prático, com foco em retorno financeiro em até 30 dias. Você enxerga exatamente onde agir — com clareza e segurança.",
      color: "from-orange-600 to-orange-500"
    }
  ],

  technologies: [
    {
      name: "Inteligência Artificial",
      items: [
        { name: "OpenAI GPT", icon: "brain" },
        { name: "Python", icon: "code" },
        { name: "LangChain", icon: "link" },
        { name: "Whisper", icon: "mic" },
        { name: "Streamlit", icon: "play" },
        { name: "Fireflies", icon: "file-audio" }
      ]
    },
    {
      name: "Business Intelligence",
      items: [
        { name: "Power BI", icon: "bar-chart-3" },
        { name: "Power Query", icon: "database" },
        { name: "Power Automate", icon: "zap" },
        { name: "Excel", icon: "file-spreadsheet" },
        { name: "Google Sheets", icon: "table" },
        { name: "n8n", icon: "workflow" }
      ]
    },
    {
      name: "Automações",
      items: [
        { name: "n8n", icon: "workflow" },
        { name: "APIs REST", icon: "globe" },
        { name: "WhatsApp API", icon: "message-circle" },
        { name: "Redis", icon: "server" },
        { name: "Google Docs API", icon: "file-text" },
        { name: "Zapier", icon: "zap" }
      ]
    },
    {
      name: "Frontend",
      items: [
        { name: "React", icon: "globe" },
        { name: "TypeScript", icon: "code" },
        { name: "Tailwind CSS", icon: "palette" },
        { name: "Vite", icon: "zap" },
        { name: "React Native", icon: "smartphone" },
        { name: "Next.js", icon: "layout" }
      ]
    },
    {
      name: "Backend",
      items: [
        { name: "Node.js", icon: "settings" },
        { name: "Express.js", icon: "server" },
        { name: "PostgreSQL", icon: "database" },
        { name: "Drizzle ORM", icon: "layers" },
        { name: "Auth0", icon: "key" },
        { name: "JWT", icon: "shield" }
      ]
    },
    {
      name: "Infraestrutura",
      items: [
        { name: "Railway", icon: "train" },
        { name: "Vercel", icon: "triangle" },
        { name: "Docker", icon: "box" },
        { name: "Render", icon: "cloud" },
        { name: "Replit", icon: "code" },
        { name: "Redis Cache", icon: "server" }
      ]
    }
  ],



  sectors: [
    {
      id: "saas",
      title: "SaaS",
      icon: "monitor",
      dor: "Churn alto, onboarding manual e decisões sem dados confiáveis.",
      solucao: "Dashboards de MRR, CAC, LTV e churn em tempo real + automações de onboarding, suporte e vendas.",
      resultado: "+30% de retenção e redução de 40% no tempo de atendimento.",
      color: "blue"
    },
    {
      id: "vendas-online",
      title: "Vendas Online",
      icon: "shopping-cart",
      dor: "Baixo controle sobre funil de vendas, abandono de carrinho e gestão de campanhas no escuro.",
      solucao: "Integrações com plataformas, automações de follow-up e dashboards de performance comercial e CAC.",
      resultado: "+25% em conversão de leads e controle total sobre campanhas e ROI.",
      color: "green"
    },
    {
      id: "criacao-conteudo",
      title: "Criação de Conteúdo",
      icon: "video",
      dor: "Falta de previsibilidade, retrabalho com entregas e pouca visibilidade de impacto por canal.",
      solucao: "Dashboards por canal (Instagram, YouTube, etc.), automações de postagem e bots de recomendação de pauta.",
      resultado: "+40% de produtividade e clareza sobre o que realmente converte.",
      color: "orange"
    },
    {
      id: "juridico",
      title: "Jurídico",
      icon: "scale",
      dor: "Retrabalho manual, risco de perda de prazos e dados jurídicos desorganizados.",
      solucao: "Automação de documentos, alertas inteligentes, controle por área e dashboards jurídicos.",
      resultado: "+50% de produtividade e redução drástica de erros em prazos e processos.",
      color: "blue"
    },
    {
      id: "construcao-imobiliario",
      title: "Construção e Imobiliário",
      icon: "building",
      dor: "Falta de visibilidade sobre custos, cronogramas e funil de vendas.",
      solucao: "Dashboards de obra, CRM automatizado, IA para atendimento de leads e integração com ERPs e BIM.",
      resultado: "+30% de controle financeiro e aceleração do ciclo de venda.",
      color: "orange"
    },
    {
      id: "engenharias",
      title: "Engenharias",
      icon: "wrench",
      dor: "Processos técnicos despadronizados, baixa rastreabilidade e decisões sem dados.",
      solucao: "Dashboards técnicos, automações operacionais e bots internos para controle de projeto.",
      resultado: "+35% de eficiência na gestão de projetos e redução de retrabalho técnico.",
      color: "blue"
    },
    {
      id: "servicos",
      title: "Serviços",
      icon: "clipboard",
      dor: "Operação travada por tarefas repetitivas e dificuldade em manter padrão.",
      solucao: "Automação de propostas, contratos, agendamentos e relatórios + bots de atendimento.",
      resultado: "+40% de produtividade e padronização das entregas.",
      color: "green"
    },
    {
      id: "varejo",
      title: "Varejo",
      icon: "shopping-bag",
      dor: "Estoque desatualizado, ruptura de produtos e decisões de compra no escuro.",
      solucao: "IA preditiva para controle de estoque, dashboards de vendas e automações de campanha.",
      resultado: "+35% de margem com redução de perda e melhora de giro.",
      color: "orange"
    },
    {
      id: "saude",
      title: "Clínicas / Saúde",
      icon: "heart-pulse",
      dor: "Agendamentos confusos, prontuários desorganizados e excesso de tarefas administrativas.",
      solucao: "Sistema integrado com automações, dashboards de gestão e bots para triagem e agendamento.",
      resultado: "-30% no tempo de espera e +50% de produtividade da equipe.",
      color: "blue"
    },
    {
      id: "franquias",
      title: "Franquias Diversas",
      icon: "network",
      dor: "Falta de padronização entre unidades, baixa visibilidade de desempenho e gestão descentralizada.",
      solucao: "Dashboards por unidade, automações de processos e relatórios comparativos em tempo real.",
      resultado: "+45% de eficiência na gestão da rede e unificação dos indicadores estratégicos.",
      color: "green"
    }
  ],

  cases: [
    {
      id: "techcorp-automacao",
      company: "TechCorp",
      sector: "Tecnologia",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      challenge: "Processos manuais de onboarding que levavam 2 semanas e geravam 30% de erros",
      solution: "Automação completa do processo com validações inteligentes e integração com RH",
      results: ["Tempo reduzido para 2 dias", "Zero erros de processo", "85% satisfação dos novos funcionários"],
      metrics: ["-86% tempo", "0 erros", "+85% satisfação"]
    },
    {
      id: "mediplus-dashboard",
      company: "MediPlus",
      sector: "Saúde",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      challenge: "Gestão fragmentada de pacientes em múltiplas unidades sem visibilidade centralizada",
      solution: "Dashboard unificado com IA para predição de demanda e otimização de agendas",
      results: ["Redução de 40% no tempo de espera", "Aumento de 25% na capacidade de atendimento", "95% satisfação dos pacientes"],
      metrics: ["-40% espera", "+25% capacidade", "95% satisfação"]
    },
    {
      id: "logistics-pro-otimizacao",
      company: "LogisticsPro",
      sector: "Logística",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      challenge: "Rotas ineficientes e alto custo operacional com baixa visibilidade da frota",
      solution: "Sistema de otimização de rotas com IA e monitoramento em tempo real",
      results: ["Redução de 30% nos custos de combustível", "Aumento de 45% na eficiência de entrega", "Diminuição de 50% em reclamações"],
      metrics: ["-30% combustível", "+45% eficiência", "-50% reclamações"]
    },
    {
      id: "advocacia-silva-automacao",
      company: "Advocacia Silva",
      sector: "Jurídico",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      challenge: "Gestão manual de prazos e documentos gerando riscos de multas e retrabalho",
      solution: "Automação de gestão documental com alertas inteligentes e templates automatizados",
      results: ["Zero multas por atraso", "Redução de 60% no tempo de elaboração de documentos", "Aumento de 40% na produtividade"],
      metrics: ["0 multas", "-60% tempo docs", "+40% produtividade"]
    },
    {
      id: "varejo-mais-predictive",
      company: "VarejoMais",
      sector: "Varejo",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      challenge: "Alto estoque parado e frequentes rupturas, impactando margem e satisfação",
      solution: "Sistema preditivo de demanda com automação de reposição e análise de tendências",
      results: ["Redução de 50% no estoque parado", "Diminuição de 80% nas rupturas", "Aumento de 35% na margem"],
      metrics: ["-50% estoque parado", "-80% rupturas", "+35% margem"]
    },
    {
      id: "servicos-pro-workflow",
      company: "ServiçosPro",
      sector: "Serviços",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      challenge: "Processos burocráticos lentos e baixa visibilidade do status dos projetos",
      solution: "Automação de workflows com dashboards em tempo real e chatbots para clientes",
      results: ["Redução de 70% no tempo de aprovação", "Aumento de 90% na satisfação do cliente", "Eliminação de retrabalho"],
      metrics: ["-70% aprovação", "+90% satisfação", "0 retrabalho"]
    }
  ],

  testimonials: [
    {
      id: "rafael-leite",
      name: "Rafael Leite",
      role: "VELOCITY KORE",
      content: "(...) o dashboard ficou muito bom! Estávamos pilotando o negócio no escuro, agora estamos dirigindo uma Ferrari! Parabéns!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: "carlos-silva",
      name: "Carlos Silva",
      role: "CEO, TechCorp",
      content: "A DUATX transformou completamente nossa operação. Em 6 meses, reduzimos custos em 30% e aumentamos nossa margem significativamente.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: "marina-santos",
      name: "Marina Santos",
      role: "CTO, InnovateLab",
      content: "Os dashboards da DUATX nos deram uma visibilidade que nunca tivemos. Agora tomamos decisões baseadas em dados reais.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: "ricardo-oliveira",
      name: "Ricardo Oliveira",
      role: "Diretor de Operações, LogísticaMax",
      content: "A automação implementada pela DUATX revolucionou nossa logística. Reduzimos custos em 25% e melhoramos o tempo de entrega.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: "ana-costa",
      name: "Ana Costa",
      role: "Gerente de TI, MediCare",
      content: "O sistema desenvolvido pela DUATX otimizou nossos processos médicos. Nossos pacientes estão mais satisfeitos e nossa equipe mais produtiva.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: "eduardo-ferreira",
      name: "Eduardo Ferreira",
      role: "Sócio, Advocacia & Consultoria",
      content: "A automação jurídica da DUATX nos salvou de várias multas e aumentou nossa produtividade em 40%. Investimento que se pagou rapidamente.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: "patricia-lima",
      name: "Patrícia Lima",
      role: "Diretora Comercial, RetailPlus",
      content: "O sistema preditivo de estoque da DUATX revolucionou nossa operação. Reduzimos rupturas em 80% e aumentamos nossa margem significativamente.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5
    }
  ],

  blogPosts: [
    {
      id: "ia-transformacao-digital",
      title: "Como a IA está revolucionando a transformação digital nas empresas",
      excerpt: "Descubra as principais tendências e casos de uso de inteligência artificial que estão mudando o cenário empresarial.",
      date: "2024-01-15",
      readTime: "8 min de leitura",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: "automacao-processos-roi",
      title: "ROI em automação: como calcular o retorno dos seus investimentos",
      excerpt: "Metodologia completa para medir e otimizar o retorno sobre investimento em projetos de automação empresarial.",
      date: "2024-01-10",
      readTime: "10 min de leitura",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: "dashboards-tomada-decisao",
      title: "Dashboards inteligentes: transformando dados em decisões estratégicas",
      excerpt: "Como implementar dashboards eficazes que realmente impactam a tomada de decisão na sua empresa.",
      date: "2024-01-05",
      readTime: "12 min de leitura",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ],

  companies: [
    {
      name: "TechCorp",
      logo: "https://via.placeholder.com/120x60/2C6ECB/FFFFFF?text=TechCorp",
      sector: "Tecnologia"
    },
    {
      name: "MediPlus",
      logo: "https://via.placeholder.com/120x60/96B4A8/FFFFFF?text=MediPlus",
      sector: "Saúde"
    },
    {
      name: "LogisticsPro",
      logo: "https://via.placeholder.com/120x60/AA5C2F/FFFFFF?text=LogisticsPro",
      sector: "Logística"
    },
    {
      name: "Advocacia Silva",
      logo: "https://via.placeholder.com/120x60/7CC1DF/FFFFFF?text=A.Silva",
      sector: "Jurídico"
    },
    {
      name: "VarejoMais",
      logo: "https://via.placeholder.com/120x60/2C6ECB/FFFFFF?text=VarejoMais",
      sector: "Varejo"
    },
    {
      name: "ServiçosPro",
      logo: "https://via.placeholder.com/120x60/96B4A8/FFFFFF?text=ServiçosPro",
      sector: "Serviços"
    }
  ]
};

// Icon mapping for Lucide icons
const ICON_MAP = {
  "clipboard-check": "clipboard-check",
  "bar-chart-3": "bar-chart-3",
  "bot": "bot",
  "code": "code",
  "factory": "factory",
  "heart-pulse": "heart-pulse",
  "truck": "truck",
  "scale": "scale",
  "shopping-cart": "shopping-cart",
  "building": "building",
  "search": "search",
  "cpu": "cpu",
  "trending-up": "trending-up",
  "target": "target",
  "eye": "eye",
  "heart": "heart",
  "alert-triangle": "alert-triangle",
  "check-circle": "check-circle"
};

// Color mappings for gradients
const COLOR_MAP = {
  "orange": "linear-gradient(135deg, hsl(var(--orange-600)) 0%, hsl(var(--orange-600)) 100%)",
  "blue": "linear-gradient(135deg, hsl(var(--blue-600)) 0%, hsl(var(--blue-600)) 100%)",
  "green": "linear-gradient(135deg, hsl(var(--green-500)) 0%, hsl(var(--green-500)) 100%)",
  "from-orange-600 to-orange-500": "linear-gradient(135deg, hsl(var(--orange-600)) 0%, hsl(var(--orange-600)) 100%)",
  "from-blue-600 to-blue-500": "linear-gradient(135deg, hsl(var(--blue-600)) 0%, hsl(var(--blue-600)) 100%)",
  "from-green-500 to-blue-400": "linear-gradient(135deg, hsl(var(--green-500)) 0%, hsl(var(--blue-400)) 100%)",
  "from-blue-600 to-green-500": "linear-gradient(135deg, hsl(var(--blue-600)) 0%, hsl(var(--green-500)) 100%)"
};