import { Input } from '@/src/components/input'
import { ScrollView, Text, View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useRegister } from '@/src/hooks/auth/useRegister'
import {
  NewUserCredentialsSchema,
  newUserCredentialsSchema,
} from '@/src/schemas/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

import LogoImg from '@/src/assets/logo.svg'

export default function Register() {
  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = useRegister()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewUserCredentialsSchema>({
    resolver: yupResolver(newUserCredentialsSchema),
  })

  function handleRegisterUser(newUser: NewUserCredentialsSchema) {
    mutate(newUser)
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

      return router.navigate('/auth/register')
    }

    toast.show({
      title: 'Cadastro realizado com sucesso',
      placement: 'top',
      textAlign: 'center',
      bg: 'success.600',
    })

    return router.navigate('/welcome')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 flex-1 pt-32">
      <LogoImg className="self-center" />

      <Text className="my-8 text-center text-xl font-bold leading-short text-white">
        Crie uma conta para acessar
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <View className="mb-12" style={{ gap: 16 }}>
            <View className="flex-row">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                  <Input
                    title="Nome"
                    variant="small"
                    mr={3}
                    errorMessage={errors.name?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="surname"
                render={({ field: { onChange } }) => (
                  <Input
                    title="Sobrenome"
                    variant="small"
                    errorMessage={errors.surname?.message}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input
                  title="Email"
                  keyboardType="email-address"
                  errorMessage={errors.email?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  title="Senha"
                  secureTextEntry
                  errorMessage={errors.password?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="repeatPassword"
              render={({ field: { onChange } }) => (
                <Input
                  title="Confirmar senha"
                  secureTextEntry
                  errorMessage={errors.repeatPassword?.message}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleRegisterUser)}
          >
            <Button.Icon>
              <Feather name="log-in" size={18} color={colors.slate[900]} />
            </Button.Icon>
            <Button.Title>Cadastrar</Button.Title>
          </Button.Root>
        </View>

        <Link href="/auth/login" asChild className="mt-28 self-center">
          <Button.Root variant="ghost">
            <Button.Title className="font-semibold text-slate-300">
              Já possui algum registro?
              <Text className="text-sky-400"> Entre na sua conta</Text>
            </Button.Title>
          </Button.Root>
        </Link>
      </ScrollView>
    </View>
  )
}
