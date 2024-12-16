import { NAVIGATION_SECTIONS, NavigationSections } from './navigationSections'

export function filterNavSectionsByOccupation(
  occupation: string | null | undefined,
) {
  if (!occupation) {
    const filteredSections = [
      NAVIGATION_SECTIONS.find((section) => section.title === 'CONTA'),
    ] as NavigationSections[]

    return filteredSections
  }

  const sectionsByOccupation = NAVIGATION_SECTIONS.map((section) => {
    if (section.title === 'CONTA') return section

    switch (occupation) {
      case 'Administrador':
        return section

      case 'Recepcionista':
        if (section.title === 'ANIMAIS') return section

        if (section.title === 'CLIENTES')
          return {
            title: section.title,
            data: [section.data.find((navItem) => navItem.text === 'Adoções')],
          }

        if (section.title === 'FORNECEDORES')
          return {
            title: section.title,
            data: [
              section.data.find((navItem) => navItem.text === 'Fornecedores'),
            ],
          }

        return null

      case 'Veterinário':
        if (section.title === 'ANIMAIS') {
          const filteredData = section.data.filter(
            (navItem) => navItem.text !== 'Campanhas',
          )

          return {
            title: section.title,
            data: filteredData,
          }
        }

        if (section.title === 'FORNECEDORES') {
          return {
            title: section.title,
            data: [
              section.data.find((navItem) => navItem.text === 'Medicamentos'),
            ],
          }
        }

        return null

      default:
        return null
    }
  })

  const filteredSections = sectionsByOccupation.filter(
    (section) => section !== null,
  )

  return filteredSections
}
