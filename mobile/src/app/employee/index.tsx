import { ListEmpty } from '@/src/components/list-empty'
import { Link } from 'expo-router'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Header } from '@/src/components/header'
import { MenuContext } from '@/src/contexts/menu-context'
import { useContextSelector } from 'use-context-selector'
import { useGETEmployess } from '@/src/hooks/employee/useGETEmployees'
import { Loading } from '@/src/components/loading'
import Animated, { SlideInLeft } from 'react-native-reanimated'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export default function Employee() {
  const isOpenMenu = useContextSelector(
    MenuContext,
    (context) => context.isOpenMenu,
  )

  const { data: employees, employessCount, isLoading } = useGETEmployess()

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
              Funcionários
            </Text>
            <Text className="font-body text-sm leading-short text-slate-300">
              Total de {employessCount}
            </Text>
          </View>

          <FlatList
            data={employees}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Link href={`/employee/${item.id}`} asChild>
                <AnimatedTouchableOpacity
                  activeOpacity={0.8}
                  entering={SlideInLeft.delay(index * 150)}
                  className="border-b border-slate-700 py-4"
                >
                  <Text className="mb-0.5 text-base font-semibold leading-short text-slate-100">
                    {item.name} {item.surname}
                  </Text>

                  <Text className="mb-4 font-body text-sm leading-relaxed text-slate-300">
                    {item.departament} - {item.occupation}
                  </Text>

                  <Text className="font-body text-sm leading-relaxed text-slate-300">
                    {item.email}
                  </Text>
                </AnimatedTouchableOpacity>
              </Link>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmpty}
            className="my-8"
          />
        </View>
      )}
    </>
  )
}
