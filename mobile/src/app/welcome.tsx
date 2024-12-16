import { useContextSelector } from 'use-context-selector'
import { Header } from '../components/header'
import { MenuContext } from '../contexts/menu-context'
import { Text, View } from 'react-native'

import WelcomeBgImage from '@/src/assets/welcome-bg.svg'
import Animated, { FadeInUp } from 'react-native-reanimated'

export default function Welcome() {
  const isOpenMenu = useContextSelector(
    MenuContext,
    (context) => context.isOpenMenu,
  )

  return (
    <>
      <Header />

      <View
        style={isOpenMenu && { display: 'none' }}
        className="mx-5 -mt-16 flex-1 justify-center"
      >
        <Animated.View entering={FadeInUp}>
          <WelcomeBgImage className="self-center" />

          <Text className="mt-8 text-center text-base font-semibold leading-short text-slate-100">
            Selecione a opção que desejar no menu de navegação superior
          </Text>
        </Animated.View>
      </View>
    </>
  )
}
