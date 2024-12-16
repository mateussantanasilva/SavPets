import { Href } from 'expo-router'
import { Feather } from '@expo/vector-icons'

export interface NavigationSections {
  title: string
  data: {
    icon: keyof typeof Feather.glyphMap
    text: string
    href: Href<string>
  }[]
}

export const NAVIGATION_SECTIONS: NavigationSections[] = [
  {
    title: 'FUNCIONÁRIOS',
    data: [
      {
        icon: 'user',
        text: 'Funcionários',
        href: '/employee/',
      },
      {
        icon: 'briefcase',
        text: 'Cargos',
        href: '/employee/occupation/',
      },
      {
        icon: 'home',
        text: 'Departamentos',
        href: '/employee/departament/',
      },
    ],
  },

  {
    title: 'CLIENTES',
    data: [
      {
        icon: 'user',
        text: 'Clientes',
        href: '/client/',
      },
      {
        icon: 'heart',
        text: 'Adoções',
        href: '/adoption/',
      },
    ],
  },

  {
    title: 'ANIMAIS',
    data: [
      {
        icon: 'tag',
        text: 'Categorias',
        href: '/animal/animalCategory/',
      },
      {
        icon: 'file-text',
        text: 'Relatórios',
        href: '/animal/animalReport/',
      },
      {
        icon: 'calendar',
        text: 'Campanhas',
        href: '/campaign/',
      },
    ],
  },

  {
    title: 'FORNECEDORES',
    data: [
      {
        icon: 'truck',
        text: 'Fornecedores',
        href: '/provider/',
      },
      {
        icon: 'activity',
        text: 'Medicamentos',
        href: '/medicine/',
      },
    ],
  },

  {
    title: 'CONTA',
    data: [
      {
        icon: 'power',
        text: 'Sair',
        href: '/auth/login',
      },
    ],
  },
]
