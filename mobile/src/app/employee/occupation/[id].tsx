import * as Button from '@/src/components/button'
import { DeleteModal } from '@/src/components/delete-modal'
import { DetailItem } from '@/src/components/detail-item'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { useDELETEOccupation } from '@/src/hooks/employee/occupation/useDELETEOccupation'
import { useGETOccupationById } from '@/src/hooks/employee/occupation/useGETOccupationById'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export default function OccupationById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    data: occupation,
    isError,
    isLoading,
  } = useGETOccupationById(String(id))

  const { mutate, data: requestError, isSuccess } = useDELETEOccupation()

  function onDeleteOccupation() {
    mutate(String(id))
  }

  useEffect(() => {
    if (!isSuccess) return

    if (requestError) {
      toast.show({
        title: requestError,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'rose.400',
      })
    } else {
      toast.show({
        title: 'Cargo deletado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bgColor: 'success.600',
      })
    }

    return router.navigate('/employee/occupation/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/employee/occupation/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Cargo" />

      {isLoading || !occupation ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <Animated.View entering={FadeInUp} className="py-8">
              <View className="mb-12" style={{ gap: 16 }}>
                <DetailItem title="NOME" value={occupation.name} />

                <DetailItem title="DESCRIÇÃO" value={occupation.description} />

                {occupation.createdAt && (
                  <DetailItem
                    title="DATA DE CRIAÇÃO"
                    value={occupation.createdAt}
                  />
                )}
              </View>

              <View>
                <Link href={`/employee/occupation/update/${id}`} asChild>
                  <Button.Root style={{ gap: 12 }} className="mb-3">
                    <Button.Icon>
                      <Feather
                        name="edit"
                        size={18}
                        color={colors.slate[950]}
                      />
                    </Button.Icon>
                    <Button.Title>Editar cargo</Button.Title>
                  </Button.Root>
                </Link>

                <Button.Root
                  variant="outline-delete"
                  onPress={() => setIsModalVisible(true)}
                >
                  <Button.Icon>
                    <Feather
                      name="trash-2"
                      size={18}
                      color={colors.rose[400]}
                    />
                  </Button.Icon>
                  <Button.Title className="text-rose-400">
                    Excluir cargo
                  </Button.Title>
                </Button.Root>
              </View>
            </Animated.View>
          </ScrollView>

          <DeleteModal
            itemName={occupation.name}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onDelete={onDeleteOccupation}
          />
        </>
      )}
    </View>
  )
}
