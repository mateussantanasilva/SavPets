interface Medicine {
  id: string
  name: string
  manufacturingDate: string
  expirationDate: string
  utility: string
  observation: string
  amount: string
  arrivalDate: string
  leaflet: string
  provider: string
}

export const MEDICINE: Medicine[] = [
  {
    id: '1',
    name: 'Vermífugo Antiparasitário',
    manufacturingDate: '2024-03-01',
    expirationDate: '2025-03-01',
    utility: 'Vermifugação interna contra nematoides, cestoides e protozoários',
    observation:
      'Para filhotes a partir de 2 meses de idade e adultos. Consulte o veterinário para dosagem.',
    amount: '1 comprimido',
    arrivalDate: '2024-03-15',
    leaflet:
      'https://coveli.com.br/wp-content/uploads/sites/95/2021/02/leaflet -blu.pdf',
    provider: 'AgroPet',
  },
  {
    id: '2',
    name: 'Anti-inflamatório e Analgésico',
    manufacturingDate: '2024-04-20',
    expirationDate: '2025-04-20',
    utility: 'Redução da dor e inflamação em cães',
    observation:
      'Somente com prescrição veterinária. Siga as instruções da leaflet .',
    amount: '1 comprimido a cada 12 horas',
    arrivalDate: '2024-04-25',
    leaflet: 'https://www.gov.br/anvisa/pt-br',
    provider: 'VetMed',
  },
  {
    id: '3',
    name: 'Shampoo Antisseborreico',
    manufacturingDate: '2024-02-15',
    expirationDate: '2024-12-15',
    utility: 'Controle da oleosidade e caspa na pele de cães',
    observation:
      'Uso tópico. Evite contato com olhos e mucosas. Consulte o veterinário.',
    amount: '250ml',
    arrivalDate: '2024-02-22',
    leaflet:
      'https://www.petshopamarosbichos.com.br/produto/shampoo-sebotrat-s-seborreia-seca-200ml-70467',
    provider: 'DermaPet',
  },
]
