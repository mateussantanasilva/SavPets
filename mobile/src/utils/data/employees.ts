interface Employee {
  id: string
  name: string
  surname: string
  email: string
  password: string
  repeatPassword?: string
  cpf: string
  cep: string
  address: string
  locationNumber: number
  complement?: string
  accountNumber: string
  departament: string
  occupation: string
}

export const EMPLOYEES: Employee[] = [
  {
    id: '2',
    name: 'Fernanda',
    surname: 'Sena',
    email: 'fernanda.sena@savpets.com',
    password: '123456',
    cpf: '367.831.460-00',
    cep: '05185-450',
    address: 'Rua Luís Gusso',
    locationNumber: 364,
    complement: 'Casa 1A',
    accountNumber: '123456',
    departament: 'Tecnologia da Informação',
    occupation: 'Gerente',
  },
  {
    id: '1',
    name: 'Gustavo',
    surname: 'Nascimento',
    email: 'gustavo.nascimento@savpets.com',
    password: '123456',
    cpf: '061.884.058-31',
    cep: '02060-085',
    address: 'Praça Luiz Pizzoti',
    locationNumber: 812,
    accountNumber: '123456',
    departament: 'Tecnologia da Informação',
    occupation: 'Desenvolvedor',
  },
  {
    id: '3',
    name: 'Matheus',
    surname: 'Carvalho',
    email: 'matheus.carvalho@savpets.com',
    password: '123456',
    cpf: '452.016.188-63',
    cep: '03417-010',
    address: 'Rua João Manuel',
    locationNumber: 257,
    accountNumber: '123456',
    departament: 'Tecnologia da Informação',
    occupation: 'Desenvolvedor',
  },
  {
    id: '4',
    name: 'Mateus',
    surname: 'Santana',
    email: 'mateus.santana@savpets.com',
    password: '123456',
    cpf: '120.664.718-36',
    cep: '04547-006',
    address: 'Rua Gomes de Carvalho',
    locationNumber: 36,
    accountNumber: '123456',
    departament: 'Tecnologia da Informação',
    occupation: 'Desenvolvedor',
  },
  {
    id: '5',
    name: 'Pedro',
    surname: 'Pessina',
    email: 'pedro.pessina@savpets.com',
    password: '123456',
    cpf: '452.016.188-63',
    cep: '02273-011',
    address: 'Avenida Paulo Lincoln do Valle Pontin',
    locationNumber: 319,
    accountNumber: '123456',
    departament: 'Tecnologia da Informação',
    occupation: 'Desenvolvedor',
  },
  {
    id: '6',
    name: 'Guilherme',
    surname: 'Gonçalves',
    email: 'guilherme.gonçalves@savpets.com',
    password: '123456',
    cpf: '431.406.128-69',
    cep: '03589-040',
    address: 'Rua José Taliberti',
    locationNumber: 319,
    accountNumber: '123456',
    departament: 'Tecnologia da Informação',
    occupation: 'Desenvolvedor',
  },
]
