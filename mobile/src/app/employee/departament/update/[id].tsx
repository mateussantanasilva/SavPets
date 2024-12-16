import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { useGETDepartamentById } from '@/src/hooks/employee/departament/useGETDepartamentById'
import { Loading } from '@/src/components/loading'
import { usePUTDepartament } from '@/src/hooks/employee/departament/usePUTDepartament'
import { Controller, useForm } from 'react-hook-form'
import {
  DepartamentSchema,
  departamentSchema,
} from '@/src/schemas/departamentSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useToast } from 'native-base'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UpdateDepartamentById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const {
    data: departament,
    isError,
    isLoading,
  } = useGETDepartamentById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartamentSchema>({
    resolver: yupResolver(departamentSchema),

    defaultValues: {
      name: departament?.name,
      initials: departament?.initials,
    },
  })

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePUTDepartament()

  function handleUpdateDepartament({ name, initials }: DepartamentSchema) {
    if (name === departament?.name && initials === departament?.initials) return

    const updatedDepartament = { name, initials }

    mutate({ id: String(id), updatedDepartament })
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
        title: 'Departamento atualizado com sucesso',
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
      <ReturnHeader title="Editar departamento" />

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
                name="initials"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Iniciais"
                    defaultValue={value}
                    errorMessage={errors.initials?.message}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <Button.Root
              disabled={isSubmitting || isPending}
              onPress={handleSubmit(handleUpdateDepartament)}
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
