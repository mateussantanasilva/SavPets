import * as Button from '@/src/components/button'
import { ListEmpty } from '@/src/components/list-empty'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { useGETAdoptions } from '@/src/hooks/adoption/useGETAdoptions'
import { Header } from '@/src/components/header'
import { Loading } from '@/src/components/loading'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import { MenuContext } from '@/src/contexts/menu-context'
import { useContextSelector } from 'use-context-selector'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export default function Adoption() {
  const isOpenMenu = useContextSelector(
    MenuContext,
    (context) => context.isOpenMenu,
  )

  const { data: adoptions, adoptionsCount, isLoading } = useGETAdoptions()

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
              Adoções
            </Text>
            <Text className="font-body text-sm leading-short text-slate-300">
              Total de {adoptionsCount}
            </Text>
          </View>
          <FlatList
            data={adoptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Link href={`/adoption/${item.id}`} asChild>
                <AnimatedTouchableOpacity
                  entering={SlideInLeft.delay(index * 150)}
                  activeOpacity={0.8}
                  className="border-b border-slate-700 py-4"
                >
                  <View className="mb-0.5 flex-row items-center justify-between">
                    <Text className="text-base font-semibold leading-short text-slate-100">
                      {item.animalName}
                    </Text>
                    <Text className="font-body text-sm leading-relaxed text-slate-300">
                      {item.createdAt}
                    </Text>
                  </View>
                  <Text className="mb-0.5 font-body text-sm leading-relaxed text-slate-300">
                    Ciente: {item.client}
                  </Text>
                  <Text className="mb-0.5 font-body text-sm leading-relaxed text-slate-300">
                    Funcionário: {item.employee}
                  </Text>
                </AnimatedTouchableOpacity>
              </Link>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmpty}
            className="my-8"
          />
          <View style={{ position: 'absolute', right: 0, bottom: 80 }}>
            <Link href="/adoption/create" asChild>
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
