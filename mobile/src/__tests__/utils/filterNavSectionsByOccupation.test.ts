import { filterNavSectionsByOccupation } from '@/src/utils/filterNavSectionsByOccupation'
import { NAVIGATION_SECTIONS } from '@/src/utils/navigationSections'

describe('Util: filterNavSectionsByOccupation', () => {
  it('should be returned only one navigation section for empty role', () => {
    const filteredSections = filterNavSectionsByOccupation(null)

    expect(filteredSections).toEqual([
      expect.objectContaining({
        title: 'CONTA',
      }),
    ])
  })

  it('should be returned navigation sections for administrator role', () => {
    const filteredSections = filterNavSectionsByOccupation('Administrador')

    expect(filteredSections).toEqual(NAVIGATION_SECTIONS)
  })

  it('should be returned navigation sections for receptionist role', () => {
    const filteredSections = filterNavSectionsByOccupation('Recepcionista')

    expect(filteredSections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'ANIMAIS',
        }),
        expect.objectContaining({
          title: 'CLIENTES',
          data: expect.arrayContaining([
            expect.objectContaining({
              text: 'Adoções',
            }),
          ]),
        }),
        expect.objectContaining({
          title: 'FORNECEDORES',
          data: expect.arrayContaining([
            expect.objectContaining({
              text: 'Fornecedores',
            }),
          ]),
        }),
        expect.objectContaining({
          title: 'CONTA',
        }),
      ]),
    )
  })

  it('should be returned navigation sections for veterinarian role', () => {
    const filteredSections = filterNavSectionsByOccupation('Veterinário')

    expect(filteredSections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'ANIMAIS',
          data: expect.arrayContaining([
            expect.objectContaining({
              text: 'Categorias',
            }),
            expect.objectContaining({
              text: 'Relatórios',
            }),
          ]),
        }),
        expect.objectContaining({
          title: 'FORNECEDORES',
          data: expect.arrayContaining([
            expect.objectContaining({
              text: 'Medicamentos',
            }),
          ]),
        }),
        expect.objectContaining({
          title: 'CONTA',
        }),
      ]),
    )
  })
})
