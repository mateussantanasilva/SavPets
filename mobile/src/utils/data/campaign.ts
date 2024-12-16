interface Campaign {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
}

export const CAMPAIGN: Campaign[] = [
  {
    id: '1',
    name: 'Seu Vira-Lata',
    date: '30/06/2024',
    time: '08:00am - 12:00am',
    location: 'Avenida Dos Imigrantes',
    description: 'Campanha para adoção de Vira-Latas em situação de rua.',
  },
  {
    id: '2',
    name: 'Pastas em Casas',
    date: '10/09/2024',
    time: '12:00am - 16:00am',
    location: 'Parque Ibirapuera',
    description:
      'Campanha de Adoção que ocorerrá no Parque Ibirapura.Venha com familía conhecer nosso animais.',
  },
  {
    id: '3',
    name: 'Patas em busca de lar',
    date: '20/06/2025',
    time: '08:00am - 18:00am',
    location: 'Vila do Carmo',
    description:
      'Neste evento você terá a possibilidade de encontrar cães e gatos em busca de um lar. Todos vacinados e prontos para terem uma familía.',
  },
]
