import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { useToast } from 'native-base'
import { useGETOccupationById } from '@/src/hooks/employee/occupation/useGETOccupationById'
import { Loading } from '@/src/components/loading'
import { Controller, useForm } from 'react-hook-form'
import {
  OccupationSchema,
  occupationSchema,
} from '@/src/schemas/occupationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePUTOccupation } from '@/src/hooks/employee/occupation/usePUTOccupation'
import { useEffect } from 'react'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UpdateOccupationById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const {
    data: occupation,
    isError,
    isLoading,
  } = useGETOccupationById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OccupationSchema>({
    resolver: yupResolver(occupationSchema),

    defaultValues: {
      name: occupation?.name,
      description: occupation?.description,
    },
  })

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePUTOccupation()

  function handleUpdateOccupation({ name, description }: OccupationSchema) {
    if (name === occupation?.name && description === occupation.description)
      return

    const updatedOccupation = { name, description }

    mutate({ id: String(id), updatedOccupation })
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
        title: 'Cargo atualizado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/employee/occupation/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/employee/occupation/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar cargo" />

      {isLoading ? (
        <Loading />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInUp} className="py-8">
            <View className="mb-12" style={{ gap: 16 }}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Nome"
                    defaultValue={value}
                    errorMessage={errors.name?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Descrição"
                    multiline
                    textAlignVertical="top"
                    defaultValue={value}
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <Button.Root
              disabled={isSubmitting || isPending}
              onPress={handleSubmit(handleUpdateOccupation)}
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
        </KeyboardAwareScrollView>
      )}
    </View>
  )
}
