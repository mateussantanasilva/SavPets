export interface AnimalCategory {
  id: string
  name: string
  race: string
  gender: 'Macho' | 'Fêmea'
  size: 'Pequeno' | 'Médio' | 'Grande'
  coatColor: string
  animalCategoryFull: string
  createdAt: string
}

export const ANIMALS_CATEGORY: AnimalCategory[] = [
  {
    id: '1',
    name: 'Gato',
    race: 'Persa',
    gender: 'Macho',
    size: 'Pequeno',
    coatColor: 'Branco',
    animalCategoryFull: 'Gato - Persa - Macho - Pequeno - Branco',
    createdAt: '2222',
  },
  {
    id: '2',
    name: 'Cachorro',
    race: 'Vira-lata',
    gender: 'Macho',
    size: 'Grande',
    coatColor: 'Preto',
    animalCategoryFull: 'Cachorro - Vira-lata - Macho - Grande - Preto',
    createdAt: '',
  },
  {
    id: '3',
    name: 'Cachorro',
    race: 'Poodle',
    gender: 'Fêmea',
    size: 'Médio',
    coatColor: 'Branco',
    animalCategoryFull: 'Cachorro - Poodle - Fêmea - Médio - Branco',
    createdAt: '',
  },
]

interface AnimalReport {
  id: string
  animalName: string
  medicine: string
  animalCategory: string
  arrivalDate: string
  local: string
  description: string
  createdAt: string
}

export const ANIMAL_REPORT: AnimalReport[] = [
  {
    id: '1',
    animalName: 'Hermione',
    medicine: 'Vermifugo',
    animalCategory: '3',
    arrivalDate: '29/02/2024',
    local: 'Avenida São Miguel',
    description: 'Gato com problemas de pele',
    createdAt: '29/02/2024',
  },
  {
    id: '2',
    animalName: 'Pingo',
    medicine: 'Não Medicado',
    animalCategory: '1',
    arrivalDate: '29/02/2024',
    local: 'Avenida São Miguel',
    description: 'Cachorro saudável',
    createdAt: '29/02/2024',
  },
  {
    id: '3',
    animalName: 'Gilberto',
    medicine: 'Prediderm',
    animalCategory: '3',
    arrivalDate: '29/02/2024',
    local: 'Avenida Aricanduva',
    description: 'Cachorro com problemas de pele',
    createdAt: '29/02/2024',
  },
]
