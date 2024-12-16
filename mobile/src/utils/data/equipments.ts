interface EquipamentProps {
  id: string
  name: string
  description: string
  createdAt: string
}

export const EQUIPMENTS: EquipamentProps[] = [
  {
    id: '1',
    name: 'Kit Banho',
    description:
      'Item utilizado para auxiliar o banho dos animais que chegam na instituição.',
    createdAt: '10/01/2024',
  },
  {
    id: '2',
    name: 'Carro Curativo',
    description:
      'Utilizado na sala de atendimento, internação e centro cirúrgico.',
    createdAt: '19/02/2024',
  },
  {
    id: '3',
    name: 'Aparelho de Anestesia',
    description:
      'Aparelho para a aplicação/administração de anestesia inalatório nos animais',
    createdAt: '19/02/2024',
  },
  {
    id: '4',
    name: 'Mesa de Atendimento com Balança',
    description: 'Utilizada no atendimento do animal e controle do seu peso.',
    createdAt: '19/02/2024',
  },
]
