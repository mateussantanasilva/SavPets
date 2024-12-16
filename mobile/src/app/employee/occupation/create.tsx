import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import { useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { usePOSTOccupation } from '@/src/hooks/employee/occupation/usePOSTOccupation'
import { Controller, useForm } from 'react-hook-form'
import {
  OccupationSchema,
  occupationSchema,
} from '@/src/schemas/occupationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function CreateOccupation() {
  const router = useRouter()
  const toast = useToast()

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePOSTOccupation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OccupationSchema>({
    resolver: yupResolver(occupationSchema),
  })

  function handleCreateOccupation({ name, description }: OccupationSchema) {
    mutate({ name, description })
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
        title: 'Cargo criado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/employee/occupation/')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Novo cargo" />

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
              name="description"
              render={({ field: { onChange } }) => (
                <Input
                  title="Descrição"
                  multiline
                  textAlignVertical="top"
                  errorMessage={errors.description?.message}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleCreateOccupation)}
          >
            <Button.Icon>
              <Feather name="plus-square" size={18} color={colors.slate[950]} />
            </Button.Icon>
            <Button.Title>Cadastrar cargo</Button.Title>
          </Button.Root>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  )
}
