interface Food {
  id: string
  name: string
  calories: number
  fats: number
  proteins: number
  manufacturingDate: string
  dueDate: string
  amount: number
}

export const FOODS: Food[] = [
  {
    id: '1',
    name: 'Filé de peixe (porção de 100 gramas)',
    calories: 232,
    fats: 12,
    proteins: 16,
    manufacturingDate: '13/02/2022',
    dueDate: '21/02/2024',
    amount: 123,
  },
  {
    id: '2',
    name: 'Frango (porção de 100 gramas)',
    calories: 210,
    fats: 19,
    proteins: 18,
    manufacturingDate: '23/12/2023',
    dueDate: '23/12/2025',
    amount: 179,
  },
  {
    id: '3',
    name: 'Batata doce (porção de 100 gramas)',
    calories: 21,
    fats: 10,
    proteins: 15,
    manufacturingDate: '23/10/2022',
    dueDate: '01/01/2025',
    amount: 125,
  },
]
