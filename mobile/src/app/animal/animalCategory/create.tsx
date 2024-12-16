import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import { ButtonSelect } from '@/src/components/button-select'
import { Controller, useForm } from 'react-hook-form'
import {
  AnimalCategorySchema,
  animalCategorySchema,
} from '@/src/schemas/animalCategorySchema'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { usePOSTAnimalCategory } from '@/src/hooks/animal/animalCategory/usePOSTAnimalCategory'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useToast } from 'native-base'

export const GenderOptions = [
  { label: 'Macho', value: 'macho' },
  { label: 'Fêmea', value: 'femea' },
]

export const SizeOptions = [
  { label: 'Grande', value: 'grande' },
  { label: 'Médio', value: 'medio' },
  { label: 'Pequeno', value: 'pequeno' },
]

export default function CreateAnimalCategory() {
  const router = useRouter()
  const toast = useToast()

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePOSTAnimalCategory()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnimalCategorySchema>({
    resolver: yupResolver(animalCategorySchema),
  })

  function handleCreateAnimalCategory({
    name,
    race,
    gender,
    size,
    coatColor,
  }: AnimalCategorySchema) {
    mutate({ name, race, gender, size, coatColor })
  }

  useEffect(() => {
    if (!isSuccess) return

    if (!requestError) {
      toast.show({
        title: 'Categoria criada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bgColor: 'success.600',
      })
    } else {
      const errorMessage =
        typeof requestError === 'string'
          ? requestError
          : requestError?.message || 'Erro ao criar categoria'

      toast.show({
        title: errorMessage,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'rose.400',
      })
    }

    return router.navigate('/animal/animalCategory/')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Nova categoria" />
      <Animated.View entering={FadeInUp} className="py-8">
        <View className="mb-12" style={{ gap: 16 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                title="Nome"
                errorMessage={errors.name?.message}
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
                onChangeText={onChange}
                errorMessage={errors.coatColor?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="race"
            render={({ field: { onChange } }) => (
              <Input
                title="Raça"
                onChangeText={onChange}
                errorMessage={errors.race?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange } }) => (
              <ButtonSelect
                title={'Gênero'}
                options={GenderOptions}
                value={''}
                onChange={onChange}
                errorMessage={errors.gender?.message}
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
                value={''}
                onChange={onChange}
                errorMessage={errors.size?.message}
              />
            )}
          />
        </View>

        <View>
          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleCreateAnimalCategory)}
          >
            <Button.Icon>
              <Feather name="plus-square" size={18} color={colors.slate[950]} />
            </Button.Icon>
            <Button.Title>Cadastrar categoria</Button.Title>
          </Button.Root>
        </View>
      </Animated.View>
    </View>
  )
}
