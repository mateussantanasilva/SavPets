import * as Button from '@/src/components/button'
import { DetailItem } from '@/src/components/detail-item'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { useGETAdoptionById } from '@/src/hooks/adoption/useGETAdoptionById'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export default function AdoptionById() {
  const { id } = useLocalSearchParams()
  const { data: adoption, isError, isLoading } = useGETAdoptionById(String(id))

  if (isError) return <Redirect href="/adoption/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Adoção" />
      {isLoading || !adoption ? (
        <Loading />
      ) : (
        <Animated.ScrollView
          entering={FadeInUp}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          className="py-8"
        >
          <View style={{ gap: 16 }} className="mb-12">
            <DetailItem title="ANIMAL" value={adoption.animalName} />

            <DetailItem title="FUNCIONÁRIO" value={adoption.employee!} />

            <DetailItem title="CLIENTE" value={adoption.client!} />

            <DetailItem title="DATA DE ADOÇÃO" value={adoption.adoptionDate} />

            <DetailItem title="RELATÓRIO" value={adoption.report} />
          </View>
          <View style={{ gap: 12 }}>
            <Link href={`/adoption/update/${id}`} asChild>
              <Button.Root>
                <Button.Icon>
                  <Feather name="edit" size={18} color={colors.slate[950]} />
                </Button.Icon>
                <Button.Title>Editar adoção</Button.Title>
              </Button.Root>
            </Link>
          </View>
        </Animated.ScrollView>
      )}
    </View>
  )
}
