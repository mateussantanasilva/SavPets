interface Occupations {
  id: string
  name: string
  description: string
  createdAt: string
}

export const OCCUPATIONS: Occupations[] = [
  {
    id: '1',
    name: 'Gerente',
    description:
      'Atua em busca de conquistar o público da sua marca a partir de campanhas estratégicas, buscando sempre oportunidades relevantes em um mercado cada vez mais competitivo.',
    createdAt: '19/02/2024',
  },
  {
    id: '2',
    name: 'Atendente',
    description:
      'Acolher bem os clientes, orientá-los sobre os produtos e serviços oferecidos, resolver problemas, esclarecer dúvidas, prestar informações, realizar vendas e emitir notas fiscais.',
    createdAt: '19/02/2024',
  },
  {
    id: '3',
    name: 'Desenvolvedor',
    description:
      'Responsável por criar e manter aplicações de software, desenvolvendo soluções inovadoras e eficientes para atender às necessidades dos usuários e do mercado.',
    createdAt: '23/02/2024',
  },
  {
    id: '4',
    name: 'Assistente Administrativo',
    description:
      'Auxilia nas atividades administrativas da empresa, realizando tarefas como organização de documentos, agendamento de reuniões, atendimento telefônico e suporte aos funcionários.',
    createdAt: '23/02/2024',
  },
  {
    id: '5',
    name: 'Analista de Marketing',
    description:
      'Responsável por analisar o mercado e o comportamento do consumidor, desenvolvendo estratégias para promover produtos ou serviços e aumentar a visibilidade da marca.',
    createdAt: '23/02/2024',
  },
  {
    id: '6',
    name: 'Consultor Financeiro',
    description:
      'Oferece orientação e planejamento financeiro para pessoas físicas e jurídicas, auxiliando na gestão de recursos, investimentos, orçamento e tomada de decisões financeiras.',
    createdAt: '23/02/2024',
  },
  {
    id: '7',
    name: 'Designer Gráfico',
    description:
      'Cria elementos visuais para transmitir uma mensagem ou conceito, utilizando ferramentas digitais e tradicionais para desenvolver layouts, logos, ilustrações e materiais gráficos.',
    createdAt: '23/02/2024',
  },
  {
    id: '8',
    name: 'Professor',
    description:
      'Ministra aulas em instituições de ensino, transmitindo conhecimentos e habilidades para os alunos, elaborando planos de aula, atividades educativas e avaliações de desempenho.',
    createdAt: '23/02/2024',
  },
  {
    id: '9',
    name: 'Engenheiro Civil',
    description:
      'Planeja, projeta, executa e gerencia obras e projetos na área da construção civil, garantindo a qualidade, segurança e sustentabilidade das construções.',
    createdAt: '23/02/2024',
  },
  {
    id: '10',
    name: 'Psicólogo',
    description:
      'Realiza avaliações, diagnósticos e intervenções psicológicas para auxiliar indivíduos, grupos e comunidades a lidar com questões emocionais, cognitivas e comportamentais.',
    createdAt: '23/02/2024',
  },
]

interface Departament {
  id: string
  name: string
  initials: string
  createdAt: string
}

export const DEPARTAMENTS: Departament[] = [
  {
    id: '1',
    name: 'Marketing',
    initials: 'MK',
    createdAt: '19/02/2024',
  },
  {
    id: '2',
    name: 'Recursos Humanos',
    initials: 'RH',
    createdAt: '19/02/2024',
  },
  {
    id: '3',
    name: 'Finanças',
    initials: 'FN',
    createdAt: '19/02/2024',
  },
  {
    id: '4',
    name: 'Tecnologia da Informação',
    initials: 'TI',
    createdAt: '19/02/2024',
  },
  {
    id: '5',
    name: 'Operações',
    initials: 'OP',
    createdAt: '19/02/2024',
  },
]
