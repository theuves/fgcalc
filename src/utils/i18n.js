import { SEO_CONTENT } from './seoContent.js';

export const SUPPORTED_LOCALES = ['en', 'pt', 'es'];

export const LOCALE_LABELS = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export const getLocaleFromPath = (path, preferredLanguages = []) => {
  const firstSegment = path?.replace(/\/$/, '').split('/').filter(Boolean)[0] || '';
  if (SUPPORTED_LOCALES.includes(firstSegment)) return firstSegment;

  const languages = Array.isArray(preferredLanguages) ? preferredLanguages : [preferredLanguages];
  for (const language of languages) {
    const code = typeof language === 'string' ? language.toLowerCase().split(/[-_]/)[0] : '';
    if (SUPPORTED_LOCALES.includes(code)) return code;
  }

  return 'pt';
};

export const t = {
  en: {
    ui: {
      headerByline: 'by Fidalgo IT Solutions', headerCta: 'Talk to Fidalgo',
      calculatorIntroTitle: 'About this estimate',
      calculatorIntroText: 'AWS Fargate runs containers without managing servers. Choose a region, vCPU, memory, duration, and task count to estimate Fargate and Fargate Spot compute costs.',
      stepConfiguration: 'Your scenario', stepEstimate: 'Your result',
      infrastructure: 'Infrastructure', resources: 'Resources per task', workload: 'Workload and duration',
      totalCaption: 'Estimated cost for the selected period', breakdown: 'Cost breakdown',
      pricingCaution: 'Indicative estimate; check current AWS pricing before making decisions.',
      share: {
        button: 'Share', title: 'Share this estimate',
        description: 'Send this configuration to someone else. The link opens the calculator with the same settings.',
        preview: 'Estimate preview', urlLabel: 'Shareable link', copy: 'Copy link', copied: 'Copied',
        copiedMessage: 'Link copied to clipboard.', copyError: 'Could not copy automatically. Select and copy the link above.',
        note: 'The total may change with exchange rates and Fargate Spot prices.', nativeButton: 'Share on device', close: 'Close sharing dialog',
      },
      education: {
        eyebrow: 'Understand the estimate',
        title: 'What goes into a Fargate cost?',
        intro: 'A quick guide to the service, this estimate, and costs outside its scope.',
        source: 'Official AWS pricing',
        cards: [
          { title: 'AWS and Fargate', text: 'AWS provides cloud infrastructure. Fargate runs containers on ECS or EKS without your team managing servers.' },
          { title: 'What this calculator includes', text: 'The estimate combines region, vCPU, memory, runtime, and task count for Fargate and Fargate Spot.' },
          { title: 'Spot and extra charges', text: 'Fargate Spot uses interruptible capacity for Amazon ECS tasks. Additional storage, data transfer, logs, and other AWS services can add charges.' },
        ],
      },
      prefooter: {
        eyebrow: 'Fidalgo IT Solutions',
        title: 'Turn an estimate into a plan.',
        text: 'Fidalgo works across software engineering, cloud infrastructure, and cost optimization. Let us review your context and identify practical next steps.',
        cta: 'Talk to Fidalgo', secondary: 'Explore our services',
      },
      siteFooter: {
        tagline: 'Technology engineering and consulting',
        description: 'Technology aligned with business goals, with the technical clarity to build, run, and optimize.',
        navigationLabel: 'Footer navigation', appTitle: 'Application', calculator: 'Calculator', awsPrices: 'AWS pricing', source: 'Source code',
        companyTitle: 'Fidalgo', services: 'Services', blog: 'Blog', contact: 'Contact', socialTitle: 'Follow us',
        rights: 'All rights reserved.', disclaimer: 'Independent tool; not affiliated with Amazon Web Services.',
      },
    },
    documentTitle: SEO_CONTENT.en.title,
    skipToCalculator: 'Skip to calculator',
    header: {
      titleMain: 'Calculator',
      links: {
        home: 'home',
        repo: 'repo',
        docs: 'docs',
      },
      updatingRates: 'Updating exchange rates...',
      ratesUnavailable: 'Exchange rate unavailable for this currency. Select USD or try again later.',
      regionsAndCurrency: 'Region and currency controls',
      languageLabel: 'Language',
    },
    selectors: {
      regionLabel: 'Region',
      regionPlaceholder: 'Search region...',
      currencyLabel: 'Currency',
      currencyPlaceholder: 'Search currency...',
      openSelector: 'Open',
      closeSelector: 'Close selector',
      noResults: 'No results.',
      resultHint: '{count} options available. Use arrow keys and Enter to select.',
    },
    sections: {
      configuration: 'Configuration',
      estimatedCost: 'Estimated Cost',
      totalCost: 'Total Cost',
      fargateTasks: 'Fargate Tasks',
      fargateSpotTasks: 'Fargate Spot Tasks',
      fargateSpotScope: 'Amazon ECS only · Linux/x86',
      timePeriod: 'Time period',
      cpu: 'CPU (vCPU)',
      memory: 'Memory (GiB)',
      pricingUpdate: 'Linux/x86 rates verified on September 29, 2026. Fargate Spot rates can change.',
      timeInputValueAria: 'Time value',
      timeInputUnitAria: 'Time unit',
      timeInputHelp: 'Type value and then choose unit.',
      cpuAria: 'CPU value',
      memoryAria: 'Memory value in GiB',
      fargateTasksAria: 'Number of Fargate tasks',
      fargateSpotTasksAria: 'Number of Fargate Spot tasks',
      timeUnits: {
        hour: { singular: 'hour', plural: 'hours' },
        day: { singular: 'day', plural: 'days' },
        month: { singular: 'month', plural: 'months' },
        year: { singular: 'year', plural: 'years' },
      },
      table: {
        fargate: 'Fargate',
        fargateSpot: 'Fargate Spot',
        vcpuLabel: 'vCPU',
        gibsLabel: 'GiB',
      },
    },
    project: [
      {
        title: 'What this tool is for',
        text: 'This calculator estimates AWS Fargate and Fargate Spot operating costs quickly. Set your region, compute time, vCPU, memory, and task count, then get instant totals without switching tabs.',
      },
      {
        title: 'What is Fargate',
        text: 'AWS Fargate is a serverless compute engine for containers on ECS and EKS. You configure CPU and memory for your tasks, and pay based on the resources used, not on managing nodes.',
      },
    ],
    marketing: {
      overline: 'Operator-focused',
      title: 'Build cost confidence before you click Deploy.',
      text: 'If pricing is uncertain, teams over-allocate, over-spend, and lose momentum. This tool gives fast, repeatable Fargate estimates with no extra dashboard clutter.',
      buttons: {
        talk: 'Talk with us',
        visit: 'Visit Fidalgo IT Solutions',
        source: 'Open source project',
      },
      footerLine: 'Not affiliated with Amazon/AWS; brand names are shown only for context.',
    },
    footer: {
      copyright: 'Copyright © 2026 Fidalgo IT Solutions',
      note: 'Independent pricing calculator.',
      disclaimer: 'Not affiliated with Amazon/AWS; brand names are shown only for context.',
      links: {
        github: 'GitHub',
        company: 'Fidalgo IT Solutions',
      },
    },
  },
  pt: {
    ui: {
      headerByline: 'por Fidalgo IT Solutions', headerCta: 'Fale com a Fidalgo',
      calculatorIntroTitle: 'Sobre esta estimativa',
      calculatorIntroText: 'O AWS Fargate executa contêineres sem exigir a gestão de servidores. Informe região, vCPU, memória, duração e quantidade de tarefas para estimar os custos de processamento no Fargate e Fargate Spot.',
      stepConfiguration: 'Seu cenário', stepEstimate: 'Seu resultado',
      infrastructure: 'Infraestrutura', resources: 'Recursos por tarefa', workload: 'Carga de trabalho e duração',
      totalCaption: 'Custo estimado para o período selecionado', breakdown: 'Composição do custo',
      pricingCaution: 'Estimativa indicativa; confira os preços atuais da AWS antes de decidir.',
      share: {
        button: 'Compartilhar', title: 'Compartilhar estimativa',
        description: 'Envie esta configuração para outra pessoa. O link abre a calculadora com os mesmos parâmetros.',
        preview: 'Prévia da estimativa', urlLabel: 'Link compartilhável', copy: 'Copiar link', copied: 'Copiado',
        copiedMessage: 'Link copiado para a área de transferência.', copyError: 'Não foi possível copiar automaticamente. Selecione e copie o link acima.',
        note: 'O total pode mudar com o câmbio e os preços do Fargate Spot.', nativeButton: 'Compartilhar no dispositivo', close: 'Fechar compartilhamento',
      },
      education: {
        eyebrow: 'Entenda a estimativa',
        title: 'O que compõe o custo do Fargate?',
        intro: 'Um resumo do serviço, das variáveis deste cálculo e dos custos que ficam fora dele.',
        source: 'Preços oficiais da AWS',
        cards: [
          { title: 'AWS e Fargate', text: 'A AWS oferece infraestrutura em nuvem. O Fargate executa contêineres no ECS ou EKS sem que sua equipe gerencie servidores.' },
          { title: 'O que a calculadora considera', text: 'A estimativa combina região, vCPU, memória, tempo de execução e quantidade de tarefas para Fargate e Fargate Spot.' },
          { title: 'Spot e custos adicionais', text: 'O Fargate Spot usa capacidade sujeita a interrupção em tarefas do Amazon ECS. Armazenamento extra, tráfego, logs e outros serviços da AWS podem gerar cobranças adicionais.' },
        ],
      },
      prefooter: {
        eyebrow: 'Fidalgo IT Solutions',
        title: 'Transforme a estimativa em um plano.',
        text: 'A Fidalgo atua em engenharia de software, infraestrutura em nuvem e otimização de custos. Vamos entender seu cenário e identificar próximos passos concretos.',
        cta: 'Converse com a Fidalgo', secondary: 'Conheça nossa atuação',
      },
      siteFooter: {
        tagline: 'Engenharia e consultoria em tecnologia',
        description: 'Tecnologia orientada aos objetivos do negócio, com clareza técnica para construir, operar e otimizar.',
        navigationLabel: 'Navegação do rodapé', appTitle: 'Aplicação', calculator: 'Calculadora', awsPrices: 'Preços da AWS', source: 'Código-fonte',
        companyTitle: 'Fidalgo', services: 'Atuação', blog: 'Blog', contact: 'Contato', socialTitle: 'Acompanhe',
        rights: 'Todos os direitos reservados.', disclaimer: 'Ferramenta independente, sem afiliação à Amazon Web Services.',
      },
    },
    documentTitle: SEO_CONTENT.pt.title,
    skipToCalculator: 'Pular para a calculadora',
    header: {
      titleMain: 'Calculadora',
      links: {
        home: 'home',
        repo: 'repo',
        docs: 'docs',
      },
      updatingRates: 'Atualizando taxas de câmbio...',
      ratesUnavailable: 'Cotação indisponível para esta moeda. Selecione USD ou tente novamente mais tarde.',
      regionsAndCurrency: 'Controles de região e moeda',
      languageLabel: 'Idioma',
    },
    selectors: {
      regionLabel: 'Região',
      regionPlaceholder: 'Buscar região...',
      currencyLabel: 'Moeda',
      currencyPlaceholder: 'Buscar moeda...',
      openSelector: 'Abrir',
      closeSelector: 'Fechar seletor',
      noResults: 'Nenhum resultado.',
      resultHint: '{count} opções disponíveis. Use as setas e Enter para selecionar.',
    },
    sections: {
      configuration: 'Configuração',
      estimatedCost: 'Custo estimado',
      totalCost: 'Custo total',
      fargateTasks: 'Tarefas Fargate',
      fargateSpotTasks: 'Tarefas Fargate Spot',
      fargateSpotScope: 'Somente Amazon ECS · Linux/x86',
      timePeriod: 'Período',
      cpu: 'CPU (vCPU)',
      memory: 'Memória (GiB)',
      pricingUpdate: 'Preços Linux/x86 verificados em 29/09/2026. As tarifas do Fargate Spot podem variar.',
      timeInputValueAria: 'Valor de tempo',
      timeInputUnitAria: 'Unidade de tempo',
      timeInputHelp: 'Digite o valor e depois escolha a unidade.',
      cpuAria: 'Valor de CPU',
      memoryAria: 'Valor de memória em GiB',
      fargateTasksAria: 'Número de tarefas Fargate',
      fargateSpotTasksAria: 'Número de tarefas Fargate Spot',
      timeUnits: {
        hour: { singular: 'hora', plural: 'horas' },
        day: { singular: 'dia', plural: 'dias' },
        month: { singular: 'mês', plural: 'meses' },
        year: { singular: 'ano', plural: 'anos' },
      },
      table: {
        fargate: 'Fargate',
        fargateSpot: 'Fargate Spot',
        vcpuLabel: 'vCPU',
        gibsLabel: 'GiB',
      },
    },
    project: [
      {
        title: 'Para que serve',
        text: 'Esta calculadora estima rapidamente os custos de operação do AWS Fargate e do Fargate Spot. Defina região, tempo de uso, vCPU, memória e número de tarefas para obter o total instantâneo sem trocar de página.',
      },
      {
        title: 'O que é o Fargate',
        text: 'O AWS Fargate é um mecanismo de execução serverless para containers no ECS e EKS. Você configura CPU e memória das suas tasks e paga pelo recurso alocado, sem gerenciar nós.',
      },
    ],
    marketing: {
      overline: 'Foco em operação',
      title: 'Crie previsibilidade de custos antes de clicar em deploy.',
      text: 'Quando o preço é incerto, as equipes superalocam e gastam mais. Esta ferramenta entrega estimativas rápidas e repetíveis para Fargate sem poluir o dashboard.',
      buttons: {
        talk: 'Fale com a gente',
        visit: 'Visitar Fidalgo IT Solutions',
        source: 'Projeto open source',
      },
      footerLine: 'Não somos afiliados à Amazon/AWS; marcas são citadas apenas para contexto.',
    },
    footer: {
      copyright: 'Copyright © 2026 Fidalgo IT Solutions',
      note: 'Calculadora de preços independente.',
      disclaimer: 'Não somos afiliados à Amazon/AWS; marcas citadas apenas para contexto.',
      links: {
        github: 'GitHub',
        company: 'Fidalgo IT Solutions',
      },
    },
  },
  es: {
    ui: {
      headerByline: 'por Fidalgo IT Solutions', headerCta: 'Habla con Fidalgo',
      calculatorIntroTitle: 'Sobre esta estimación',
      calculatorIntroText: 'AWS Fargate ejecuta contenedores sin administrar servidores. Elige región, vCPU, memoria, duración y número de tareas para estimar los costos de procesamiento de Fargate y Fargate Spot.',
      stepConfiguration: 'Tu escenario', stepEstimate: 'Tu resultado',
      infrastructure: 'Infraestructura', resources: 'Recursos por tarea', workload: 'Carga de trabajo y duración',
      totalCaption: 'Costo estimado para el período seleccionado', breakdown: 'Desglose del costo',
      pricingCaution: 'Estimación orientativa; consulta los precios actuales de AWS antes de decidir.',
      share: {
        button: 'Compartir', title: 'Compartir estimación',
        description: 'Envía esta configuración a otra persona. El enlace abre la calculadora con los mismos parámetros.',
        preview: 'Vista previa de la estimación', urlLabel: 'Enlace para compartir', copy: 'Copiar enlace', copied: 'Copiado',
        copiedMessage: 'Enlace copiado al portapapeles.', copyError: 'No se pudo copiar automáticamente. Selecciona y copia el enlace de arriba.',
        note: 'El total puede cambiar con el tipo de cambio y los precios de Fargate Spot.', nativeButton: 'Compartir en el dispositivo', close: 'Cerrar ventana de compartir',
      },
      education: {
        eyebrow: 'Entiende la estimación',
        title: '¿Qué compone el costo de Fargate?',
        intro: 'Un resumen del servicio, las variables de este cálculo y los costos que quedan fuera.',
        source: 'Precios oficiales de AWS',
        cards: [
          { title: 'AWS y Fargate', text: 'AWS ofrece infraestructura en la nube. Fargate ejecuta contenedores en ECS o EKS sin que tu equipo administre servidores.' },
          { title: 'Qué incluye la calculadora', text: 'La estimación combina región, vCPU, memoria, tiempo de ejecución y número de tareas para Fargate y Fargate Spot.' },
          { title: 'Spot y cargos adicionales', text: 'Fargate Spot usa capacidad sujeta a interrupciones para tareas de Amazon ECS. Almacenamiento adicional, tráfico, registros y otros servicios de AWS pueden generar cargos extra.' },
        ],
      },
      prefooter: {
        eyebrow: 'Fidalgo IT Solutions',
        title: 'Convierte la estimación en un plan.',
        text: 'Fidalgo trabaja en ingeniería de software, infraestructura en la nube y optimización de costos. Conversemos sobre tu escenario y los próximos pasos.',
        cta: 'Habla con Fidalgo', secondary: 'Conoce nuestros servicios',
      },
      siteFooter: {
        tagline: 'Ingeniería y consultoría tecnológica',
        description: 'Tecnología alineada con los objetivos del negocio y claridad técnica para construir, operar y optimizar.',
        navigationLabel: 'Navegación del pie de página', appTitle: 'Aplicación', calculator: 'Calculadora', awsPrices: 'Precios de AWS', source: 'Código fuente',
        companyTitle: 'Fidalgo', services: 'Servicios', blog: 'Blog', contact: 'Contacto', socialTitle: 'Síguenos',
        rights: 'Todos los derechos reservados.', disclaimer: 'Herramienta independiente, sin afiliación con Amazon Web Services.',
      },
    },
    documentTitle: SEO_CONTENT.es.title,
    skipToCalculator: 'Saltar al calculador',
    header: {
      titleMain: 'Calculadora',
      links: {
        home: 'home',
        repo: 'repo',
        docs: 'docs',
      },
      updatingRates: 'Actualizando tipos de cambio...',
      ratesUnavailable: 'Tipo de cambio no disponible para esta moneda. Selecciona USD o inténtalo más tarde.',
      regionsAndCurrency: 'Controles de región y moneda',
      languageLabel: 'Idioma',
    },
    selectors: {
      regionLabel: 'Región',
      regionPlaceholder: 'Buscar región...',
      currencyLabel: 'Moneda',
      currencyPlaceholder: 'Buscar moneda...',
      openSelector: 'Abrir',
      closeSelector: 'Cerrar selector',
      noResults: 'No hay resultados.',
      resultHint: '{count} opciones disponibles. Use las flechas y Enter para seleccionar.',
    },
    sections: {
      configuration: 'Configuración',
      estimatedCost: 'Costo estimado',
      totalCost: 'Costo total',
      fargateTasks: 'Tareas Fargate',
      fargateSpotTasks: 'Tareas Fargate Spot',
      fargateSpotScope: 'Solo Amazon ECS · Linux/x86',
      timePeriod: 'Período',
      cpu: 'CPU (vCPU)',
      memory: 'Memoria (GiB)',
      pricingUpdate: 'Precios Linux/x86 verificados el 29/09/2026. Las tarifas de Fargate Spot pueden variar.',
      timeInputValueAria: 'Valor de tiempo',
      timeInputUnitAria: 'Unidad de tiempo',
      timeInputHelp: 'Escribe el valor y luego elige la unidad.',
      cpuAria: 'Valor de CPU',
      memoryAria: 'Valor de memoria en GiB',
      fargateTasksAria: 'Número de tareas Fargate',
      fargateSpotTasksAria: 'Número de tareas Fargate Spot',
      timeUnits: {
        hour: { singular: 'hora', plural: 'horas' },
        day: { singular: 'día', plural: 'días' },
        month: { singular: 'mes', plural: 'meses' },
        year: { singular: 'año', plural: 'años' },
      },
      table: {
        fargate: 'Fargate',
        fargateSpot: 'Fargate Spot',
        vcpuLabel: 'vCPU',
        gibsLabel: 'GiB',
      },
    },
    project: [
      {
        title: 'Para qué sirve',
        text: 'Esta calculadora estima rápidamente los costes de operación de AWS Fargate y Fargate Spot. Define región, tiempo, vCPU, memoria y número de tareas para obtener el total al instante.',
      },
      {
        title: 'Qué es Fargate',
        text: 'AWS Fargate es un motor de ejecución serverless para contenedores en ECS y EKS. Configuras CPU y memoria para tus tareas y pagas por los recursos usados, sin administrar nodos.',
      },
    ],
    marketing: {
      overline: 'Pensado para operación',
      title: 'Genera confianza de costos antes de hacer deploy.',
      text: 'Cuando el precio es incierto, los equipos sobredimensionan y gastan de más. Esta herramienta entrega estimaciones rápidas y repetibles para Fargate sin agregar ruido visual.',
      buttons: {
        talk: 'Habla con nosotros',
        visit: 'Visitar Fidalgo IT Solutions',
        source: 'Proyecto open source',
      },
      footerLine: 'No estamos afiliados a Amazon/AWS; las marcas aparecen solo por contexto.',
    },
    footer: {
      copyright: 'Copyright © 2026 Fidalgo IT Solutions',
      note: 'Calculadora de precios independiente.',
      disclaimer: 'No estamos afiliados con Amazon/AWS; las marcas se muestran solo por contexto.',
      links: {
        github: 'GitHub',
        company: 'Fidalgo IT Solutions',
      },
    },
  },
};

export const resolveLocaleMessages = (path) => t[getLocaleFromPath(path)];
