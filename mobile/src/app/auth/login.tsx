import { Input } from '@/src/components/input'
import { ScrollView, Text, View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useLogin } from '@/src/hooks/auth/useLogin'
import { Controller, useForm } from 'react-hook-form'
import {
  UserCredentialsSchema,
  userCredentialsSchema,
} from '@/src/schemas/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

import LogoImg from '@/src/assets/logo.svg'

export default function Login() {
  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserCredentialsSchema>({
    resolver: yupResolver(userCredentialsSchema),
  })

  function handleSignIn(userCredentials: UserCredentialsSchema) {
    mutate(userCredentials)
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

      return router.navigate('/auth/login')
    }

    toast.show({
      title: 'Autenticação realizada com sucesso',
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
        Entre para continuar
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <View className="mb-12" style={{ gap: 16 }}>
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
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleSignIn)}
          >
            <Button.Icon>
              <Feather name="log-in" size={18} color={colors.slate[900]} />
            </Button.Icon>
            <Button.Title>Entrar</Button.Title>
          </Button.Root>

          <Link
            href="/auth/change-password"
            asChild
            className="mt-3 self-center"
          >
            <Button.Root variant="ghost">
              <Button.Title className="text-slate-300">
                Esqueceu a senha?
              </Button.Title>
            </Button.Root>
          </Link>
        </View>

        <Link href="/auth/register" asChild className="mt-28 self-center">
          <Button.Root variant="ghost">
            <Button.Title className="font-semibold text-slate-300">
              Não tem nenhuma conta?
              <Text className="text-sky-400"> Cadastre-se</Text>
            </Button.Title>
          </Button.Root>
        </Link>
      </ScrollView>
    </View>
  )
}
