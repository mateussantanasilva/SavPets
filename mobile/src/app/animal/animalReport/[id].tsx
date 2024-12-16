import * as Button from '@/src/components/button'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { DetailItem } from '@/src/components/detail-item'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'
import { useGETAnimalReportById } from '@/src/hooks/animal/animalReport/useGETAnimalReportById'

export default function AnimalReportById() {
  const { id } = useLocalSearchParams()

  const {
    data: report,
    isError,
    isLoading,
  } = useGETAnimalReportById(String(id))

  if (isError) return <Redirect href="/animal/animalReport/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Relatório" />

      {isLoading || !report ? (
        <Loading />
      ) : (
        <>
          <Animated.View entering={FadeInUp} className="py-8">
            <View className="mb-12" style={{ gap: 16 }}>
              <DetailItem title="NOME DO ANIMAL" value={report.animalName} />

              <DetailItem title="MEDICAMENTO" value={report.medicine} />

              <DetailItem title="CATEGORIA" value={report.animalCategory} />

              <DetailItem title="DATA DE CHEGADA" value={report.arrivalDate} />

              <DetailItem title="LOCAL ENCONTRADO" value={report.local} />

              <DetailItem title="DESCRIÇÃO" value={report.description} />
            </View>

            <View>
              <Link href={`/animal/animalReport/update/${id}`} asChild>
                <Button.Root style={{ gap: 12 }} className="mb-3">
                  <Button.Icon>
                    <Feather name="edit" size={18} color={colors.slate[950]} />
                  </Button.Icon>
                  <Button.Title>Editar relatório</Button.Title>
                </Button.Root>
              </Link>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  )
}
