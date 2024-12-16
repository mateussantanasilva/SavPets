import { Input } from '@/src/components/input'
import { ScrollView, Text, View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link, useRouter } from 'expo-router'
import { useChangePassword } from '@/src/hooks/auth/useChangePassword'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useToast } from 'native-base'
import {
  UpdatedUserCredentialsSchema,
  updatedUserCredentialsSchema,
} from '@/src/schemas/authSchema'

import LogoImg from '@/src/assets/logo.svg'

export default function ChangePassword() {
  const router = useRouter()
  const toast = useToast()

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = useChangePassword()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatedUserCredentialsSchema>({
    resolver: yupResolver(updatedUserCredentialsSchema),
  })

  function handleChangePassword(
    updatedCredentials: UpdatedUserCredentialsSchema,
  ) {
    mutate(updatedCredentials)
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

      return router.navigate('/auth/change-password')
    }

    toast.show({
      title: 'Senha alterada com sucesso',
      placement: 'top',
      textAlign: 'center',
      bg: 'success.600',
    })

    return router.navigate('/auth/login')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 flex-1 pt-32">
      <LogoImg className="self-center" />

      <Text className="my-8 text-center text-xl font-bold leading-short text-white">
        Altere sua senha para entrar
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
                  title="Nova senha"
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
                  title="Confirmar nova senha"
                  secureTextEntry
                  errorMessage={errors.repeatPassword?.message}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleChangePassword)}
          >
            <Button.Icon>
              <Feather name="log-in" size={18} color={colors.slate[900]} />
            </Button.Icon>
            <Button.Title>Atualizar</Button.Title>
          </Button.Root>

          <Link href="/auth/login" asChild className="mt-3 self-center">
            <Button.Root variant="ghost" className="mt-3">
              <Button.Title className="text-slate-300">
                Voltar para acessar a conta
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
