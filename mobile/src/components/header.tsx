import { Feather } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { NavigationMenu } from './navigation-menu'
import { MenuContext } from '../contexts/menu-context'
import { useContextSelector } from 'use-context-selector'
import { UserSessionProps, getUserSession } from '../storages/auth'
import { useEffect, useState } from 'react'

import userProfilerImage from '@/src/assets/user-profile.png'

export function Header() {
  const { isOpenMenu, handleChangeMenuVisibility } = useContextSelector(
    MenuContext,
    (context) => context,
  )

  const [userSession, setUserSession] = useState<UserSessionProps | null>(null)

  const userName = userSession
    ? `${userSession.name} ${userSession.surname}`
    : 'Olá, Bem Vindo!'

  async function fetchSession() {
    const userSession = await getUserSession()
    setUserSession(userSession)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <View className="mt-16">
      <View className="flex-row items-center justify-between bg-slate-900 px-6">
        <View className="mr-5 flex-row items-center">
          <Image alt="Imagem de perfil do usuário" source={userProfilerImage} />
          <Text className="ml-1 pl-4 text-lg font-bold leading-short text-white">
            {userName}
          </Text>
        </View>

        <TouchableOpacity
          className="h-12 w-12 items-center justify-center"
          onPress={handleChangeMenuVisibility}
          activeOpacity={0.8}
        >
          <Feather
            name={isOpenMenu ? 'x' : 'bar-chart'}
            size={28}
            color="white"
            style={!isOpenMenu && { transform: [{ rotate: '-90deg' }] }}
          />
        </TouchableOpacity>
      </View>

      <View className="ml-5 mr-5 mt-6 justify-center border-b border-slate-700" />

      <NavigationMenu isOpen={isOpenMenu} />
    </View>
  )
}
