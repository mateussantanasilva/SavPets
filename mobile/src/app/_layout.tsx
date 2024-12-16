import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { Loading } from '../components/loading'
import { QueryProvider } from '../lib/ReactQuery'
import { NativeBaseProvider } from 'native-base'
import { MenuProvider } from '../contexts/menu-context'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })

  if (!fontsLoaded) return <Loading />

  return (
    // SafeAreaView ignores physical details (need size)
    <NativeBaseProvider>
      <QueryProvider>
        <MenuProvider>
          <SafeAreaView className="flex-1 bg-slate-900">
            <Slot />
          </SafeAreaView>
        </MenuProvider>
      </QueryProvider>
    </NativeBaseProvider>
  )
}
