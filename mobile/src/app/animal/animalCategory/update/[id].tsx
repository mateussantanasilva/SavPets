import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { ButtonSelect } from '@/src/components/button-select'
import { GenderOptions, SizeOptions } from '../create'
import { useGETAnimalCategory } from '@/src/hooks/animal/animalCategory/useGETAnimalCategory'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AnimalCategorySchema,
  animalCategorySchema,
} from '@/src/schemas/animalCategorySchema'
import { Loading } from '@/src/components/loading'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { usePUTAnimalCategory } from '@/src/hooks/animal/animalCategory/usePUTAnimalCategory'
import { useEffect } from 'react'
import { useToast } from 'native-base'

export default function UpdateAnimalCategoryById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const {
    data: category,
    isLoading,
    isError,
  } = useGETAnimalCategory(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnimalCategorySchema>({
    resolver: yupResolver(animalCategorySchema),

    defaultValues: {
      name: category?.name,
      race: category?.race,
      gender: category?.gender,
      size: category?.size,
      coatColor: category?.coatColor,
    },
  })

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePUTAnimalCategory()

  function handleUpdateAnimalCategory({
    name,
    race,
    gender,
    size,
    coatColor,
  }: AnimalCategorySchema) {
    if (
      name === category?.name &&
      race === category?.race &&
      gender === category?.gender &&
      size === category?.size &&
      coatColor === category?.coatColor
    )
      return

    const updatedAnimalCategory = { name, race, gender, size, coatColor }

    mutate({ id: String(id), updatedAnimalCategory })
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
        title: 'Categoria atualizada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/animal/animalCategory/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/animal/animalCategory/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar categoria" />

      {isLoading || !category ? (
        <Loading />
      ) : (
        <Animated.View entering={FadeInUp} className="py-8">
          <View className="mb-12" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  title="Nome"
                  defaultValue={category.name}
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="race"
              render={({ field: { onChange } }) => (
                <Input
                  title="Raça"
                  defaultValue={category.race}
                  errorMessage={errors.race?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="coatColor"
              render={({ field: { onChange } }) => (
                <Input
                  title="Cor"
                  defaultValue={category.coatColor}
                  errorMessage={errors.coatColor?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange } }) => (
                <ButtonSelect
                  title="Gênero"
                  options={GenderOptions}
                  errorMessage={errors.gender?.message}
                  value={category.gender}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="size"
              render={({ field: { onChange } }) => (
                <ButtonSelect
                  title={'Porte'}
                  options={SizeOptions}
                  value={category.size}
                  onChange={onChange}
                  errorMessage={errors.size?.message}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleUpdateAnimalCategory)}
          >
            <Button.Icon>
              <Feather
                name="check-square"
                size={18}
                color={colors.slate[950]}
              />
            </Button.Icon>
            <Button.Title>Salvar alterações</Button.Title>
          </Button.Root>
        </Animated.View>
      )}
    </View>
  )
}
