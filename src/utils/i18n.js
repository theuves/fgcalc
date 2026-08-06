export const SUPPORTED_LOCALES = ['en', 'pt', 'es'];

export const LOCALE_LABELS = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export const getLocaleFromPath = (path) => {
  const firstSegment = path?.replace(/\/$/, '').split('/').filter(Boolean)[0] || '';
  return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : 'en';
};

export const t = {
  en: {
    documentTitle: 'AWS Fargate Calculator',
    skipToCalculator: 'Skip to calculator',
    header: {
      titleMain: 'Calculator',
      links: {
        home: 'home',
        repo: 'repo',
        docs: 'docs',
      },
      updatingRates: 'Updating exchange rates...',
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
      timePeriod: 'Time period',
      cpu: 'CPU (vCPU)',
      memory: 'Memory (GiB)',
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
    documentTitle: 'AWS Fargate Calculator',
    skipToCalculator: 'Pular para a calculadora',
    header: {
      titleMain: 'Calculadora',
      links: {
        home: 'home',
        repo: 'repo',
        docs: 'docs',
      },
      updatingRates: 'Atualizando taxas de câmbio...',
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
      timePeriod: 'Período',
      cpu: 'CPU (vCPU)',
      memory: 'Memória (GiB)',
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
    documentTitle: 'AWS Fargate Calculator',
    skipToCalculator: 'Saltar al calculador',
    header: {
      titleMain: 'Calculadora',
      links: {
        home: 'home',
        repo: 'repo',
        docs: 'docs',
      },
      updatingRates: 'Actualizando tipos de cambio...',
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
      timePeriod: 'Período',
      cpu: 'CPU (vCPU)',
      memory: 'Memoria (GiB)',
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
