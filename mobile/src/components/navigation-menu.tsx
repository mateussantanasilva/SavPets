import { useRouter } from 'expo-router'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { MenuContext } from '../contexts/menu-context'
import { useContextSelector } from 'use-context-selector'
import {
  UserSessionProps,
  deleteUserSession,
  getUserSession,
} from '../storages/auth'
import { useToast } from 'native-base'
import { filterNavSectionsByOccupation } from '../utils/filterNavSectionsByOccupation'
import { useEffect, useState } from 'react'

interface NavigationMenuProps {
  isOpen: boolean
}

export function NavigationMenu({ isOpen }: NavigationMenuProps) {
  const router = useRouter()
  const toast = useToast()

  const handleChangeMenuVisibility = useContextSelector(
    MenuContext,
    (context) => context.handleChangeMenuVisibility,
  )

  const [userSession, setUserSession] = useState<UserSessionProps | null>(null)

  const filteredSectionsByRole = filterNavSectionsByOccupation(
    userSession?.occupation,
  )

  async function handleNavigateToScreen(href: string) {
    if (href === '/auth/login') {
      await deleteUserSession()
      handleChangeMenuVisibility()

      toast.show({
        title: 'Sessão encerrada',
        placement: 'top',
        textAlign: 'center',
        bg: 'info.600',
      })

      return router.navigate(href)
    }

    handleChangeMenuVisibility()
    return router.navigate(href)
  }

  async function fetchSession() {
    const userSession = await getUserSession()
    setUserSession(userSession)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={isOpen && { paddingBottom: 100 }}
      className={`${isOpen && 'mt-8'}`}
    >
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
        className={`${!isOpen && 'h-0'} mx-5 rounded-lg bg-slate-800 px-5`}
      >
        {filteredSectionsByRole.map((section) => (
          <View key={section?.title}>
            <Text className="my-5 w-screen text-sm font-semibold uppercase leading-short text-slate-300">
              {section?.title}
            </Text>

            <View className="flex-row flex-wrap justify-between">
              {section?.data.map((navLink) => (
                <TouchableOpacity
                  key={navLink?.text}
                  onPress={() => handleNavigateToScreen(String(navLink?.href))}
                  activeOpacity={0.8}
                  className="mb-8 mr-3 w-1/2 flex-row gap-3 truncate"
                >
                  <View>
                    <Feather
                      name={navLink?.icon}
                      color={
                        navLink?.icon === 'power'
                          ? colors.rose[400]
                          : colors.white
                      }
                      size={24}
                    />
                  </View>

                  <Text
                    className={`${navLink?.text === 'Sair' ? 'text-rose-400' : 'text-slate-100'} font-body text-base leading-short`}
                  >
                    {navLink?.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  )
}
