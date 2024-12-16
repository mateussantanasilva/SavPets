interface Adoption {
  id: string
  employee: string
  client: string
  animalReport: string
  animalName: string
  adoptionDate: string
  report: string
}

export const ADOPTIONS: Adoption[] = [
  {
    id: '1',
    employee: 'Pedro Pessina',
    client: 'João Alves',
    animalReport: '',
    animalName: 'Pipoca',
    adoptionDate: '03/05/2024',
    report: 'Cachorro adotado com saúde boa',
  },
  {
    id: '2',
    employee: 'Pedro Pessina',
    client: 'Luan Pereira',
    animalReport: '',
    animalName: 'Malu',
    adoptionDate: '06/05/2023',
    report: 'Gato adotado com a pata machucada',
  },
]
