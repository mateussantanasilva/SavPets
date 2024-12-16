import * as Button from '@/src/components/button'
import { DeleteModal } from '@/src/components/delete-modal'
import { DetailItem } from '@/src/components/detail-item'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { useDELETEDepartament } from '@/src/hooks/employee/departament/useDELETEDepartament'
import { useGETDepartamentById } from '@/src/hooks/employee/departament/useGETDepartamentById'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export default function DepartamentById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    data: departament,
    isError,
    isLoading,
  } = useGETDepartamentById(String(id))

  const { mutate, data: requestError, isSuccess } = useDELETEDepartament()

  function onDeleteDepartament() {
    mutate(String(id))
  }

  useEffect(() => {
    if (!isSuccess) return

    if (requestError) {
      toast.show({
        title: requestError,
        placement: 'top',
        textAlign: 'center',
        bg: 'rose.400',
      })
    } else {
      toast.show({
        title: 'Departamento deletado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/employee/departament/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/employee/departament/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Departamento" />

      {isLoading || !departament ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <Animated.View entering={FadeInUp} className="py-8">
              <View className="mb-12" style={{ gap: 16 }}>
                <DetailItem title="NOME" value={departament.name} />

                <DetailItem title="INICIAIS" value={departament.initials} />

                <DetailItem
                  title="DATA DE CRIAÇÃO"
                  value={departament.createdAt}
                />
              </View>

              <View>
                <Link href={`/employee/departament/update/${id}`} asChild>
                  <Button.Root style={{ gap: 12 }} className="mb-3">
                    <Button.Icon>
                      <Feather
                        name="edit"
                        size={18}
                        color={colors.slate[950]}
                      />
                    </Button.Icon>
                    <Button.Title>Editar departamento</Button.Title>
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
                    Excluir departamento
                  </Button.Title>
                </Button.Root>
              </View>
            </Animated.View>
          </ScrollView>

          <DeleteModal
            itemName={departament.name}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onDelete={onDeleteDepartament}
          />
        </>
      )}
    </View>
  )
}
