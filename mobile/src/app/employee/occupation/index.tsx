import * as Button from '@/src/components/button'
import { Header } from '@/src/components/header'
import { ListEmpty } from '@/src/components/list-empty'
import { Loading } from '@/src/components/loading'
import { MenuContext } from '@/src/contexts/menu-context'
import { useGETOccupations } from '@/src/hooks/employee/occupation/useGETOccupations'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'
import { useContextSelector } from 'use-context-selector'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export default function Occupation() {
  const isOpenMenu = useContextSelector(
    MenuContext,
    (context) => context.isOpenMenu,
  )

  const {
    data: occupationList,
    occupationCount,
    isLoading,
  } = useGETOccupations()

  return (
    <>
      <Header />

      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={isOpenMenu && { display: 'none' }}
          className="mx-5 mt-8 flex-1"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold leading-short text-white">
              Cargos
            </Text>
            <Text className="font-body text-sm leading-short text-slate-300">
              Total de {occupationCount}
            </Text>
          </View>

          <FlatList
            data={occupationList}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Link href={`/employee/occupation/${item.id}`} asChild>
                <AnimatedTouchableOpacity
                  activeOpacity={0.8}
                  entering={SlideInLeft.delay(index * 150)}
                  className="border-b border-slate-700 py-4"
                >
                  <View className="mb-0.5 flex-row items-center justify-between">
                    <Text className="text-base font-semibold leading-short text-slate-100">
                      {item.name}
                    </Text>
                    <Text className="font-body text-sm leading-short text-slate-100">
                      {item.createdAt}
                    </Text>
                  </View>

                  <Text className="font-body text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </Text>
                </AnimatedTouchableOpacity>
              </Link>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmpty}
            contentContainerStyle={{ paddingBottom: 100 }}
            className="my-8"
          />

          <View style={{ position: 'absolute', right: 0, bottom: 80 }}>
            <Link href="/employee/occupation/create" asChild>
              {/* usando o princípio da composição selecionando apenas os itens que serão usados - ícone | texto */}

              <Button.Root isFloat>
                <Button.Icon>
                  <Feather name="plus" size={28} color={colors.slate[950]} />
                </Button.Icon>
              </Button.Root>
            </Link>
          </View>
        </View>
      )}
    </>
  )
}
