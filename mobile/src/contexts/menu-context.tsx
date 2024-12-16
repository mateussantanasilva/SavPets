import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'

interface MenuContextProps {
  isOpenMenu: boolean
  handleChangeMenuVisibility: () => void
}

interface MenuProviderProps {
  children: ReactNode
}

export const MenuContext = createContext({} as MenuContextProps)

export function MenuProvider({ children }: MenuProviderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  function handleChangeMenuVisibility() {
    setIsOpenMenu((prevState) => !prevState)
  }

  return (
    <MenuContext.Provider value={{ isOpenMenu, handleChangeMenuVisibility }}>
      {children}
    </MenuContext.Provider>
  )
}
