interface Provider {
  id: string
  name: string
  cnpj: string
  cep: string
  address: string
  locationNumber: number
  complement?: string
}

export const PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Pedigree Indústria e Comércio LTDA',
    cnpj: '05.401.782/0001-94',
    cep: '35545-000',
    address: 'Avenida Dom Cristiano',
    locationNumber: 1402,
  },
  {
    id: '2',
    name: 'Furacão Pet Indústria e Comércio de Artigos para Animais LTDA',
    cnpj: '17.259.965/0001-04',
    cep: '13573-460',
    address: 'Rua Sophia Bagnato',
    locationNumber: 400,
  },
  {
    id: '3',
    name: 'Zoetis Indústria de Produtos Veterinários LTDA',
    cnpj: '43.588.048/0001-31',
    cep: '13024-500',
    address: 'Rua Luiz Fernando Rodrigues',
    locationNumber: 1701,
  },
]
