import * as Button from '@/src/components/button'
import { ReturnHeader } from '@/src/components/return-header'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { DeleteModal } from '@/src/components/delete-modal'
import { useGETAnimalCategory } from '@/src/hooks/animal/animalCategory/useGETAnimalCategory'
import { Loading } from '@/src/components/loading'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { DetailItem } from '@/src/components/detail-item'
import { useDELETEAnimalCategory } from '@/src/hooks/animal/animalCategory/useDELETEAnimalCategory'

export default function AnimalCategoryById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const {
    data: category,
    isLoading,
    isError,
  } = useGETAnimalCategory(String(id))

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { mutate, data: requestError, isSuccess } = useDELETEAnimalCategory()

  function onDeleteCategory() {
    mutate(String(id))
  }

  useEffect(() => {
    if (!isSuccess) return

    if (requestError) {
      toast.show({
        title: 'Categoria deletada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bgColor: 'success.600',
      })
    } else {
      const errorMessage =
        typeof requestError === 'string'
          ? requestError
          : requestError.message || 'Erro ao excluir categoria'

      toast.show({
        title: errorMessage,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'rose.400',
      })
    }

    return router.navigate('/animal/animalCategory/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/animal/animalCategory/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Categoria" />

      {isLoading || !category ? (
        <Loading />
      ) : (
        <>
          <Animated.View entering={FadeInUp} className="py-8">
            <View className="mb-12" style={{ gap: 16 }}>
              <DetailItem title="NOME" value={category.name} />

              <DetailItem title="RAÇA" value={category.race} />

              <DetailItem title="COR" value={category.coatColor} />

              <DetailItem title="PORTE" value={category.size} />

              <DetailItem title="GÊNERO" value={category.gender} />
            </View>

            <View>
              <Link href={`/animal/animalCategory/update/${id}`} asChild>
                <Button.Root style={{ gap: 12 }} className="mb-3">
                  <Button.Icon>
                    <Feather name="edit" size={18} color={colors.slate[950]} />
                  </Button.Icon>
                  <Button.Title>Editar categoria</Button.Title>
                </Button.Root>
              </Link>

              <Button.Root
                variant="delete"
                onPress={() => setIsModalVisible(true)}
              >
                <Button.Icon>
                  <Feather name="trash-2" size={18} color={colors.slate[950]} />
                </Button.Icon>
                <Button.Title>Excluir categoria</Button.Title>
              </Button.Root>
            </View>
          </Animated.View>

          <DeleteModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            itemName={category.animalCategoryFull}
            onDelete={onDeleteCategory}
          />
        </>
      )}
    </View>
  )
}
