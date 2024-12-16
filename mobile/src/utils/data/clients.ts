interface Client {
  id: string
  firstName: string
  lastName: string
  cpf: string
  telephone: string
  cep: string
  address: string
  locationNumber: number
  complement?: string
}

export const CLIENTS: Client[] = [
  {
    id: '1',
    firstName: 'Pedro',
    lastName: 'Pessina',
    cpf: '111.111.111-11',
    telephone: '(11) 98969-7450',
    cep: '03882-100',
    address: 'Rua Sebastião da Silva Bueno',
    locationNumber: 383,
  },
  {
    id: '2',
    firstName: 'Gustavo',
    lastName: 'Nascimento',
    cpf: '222.222.222-22',
    telephone: '(11) 91111-1111',
    cep: '11111-111',
    address: 'Rua do Gustavo',
    locationNumber: 32,
  },
  {
    id: '3',
    firstName: 'Guilherme',
    lastName: 'Gonçalves',
    cpf: '333.333.333-33',
    telephone: '(11) 92222-2222',
    cep: '22222-222',
    address: 'Rua do Guilherme',
    locationNumber: 24,
  },
]
