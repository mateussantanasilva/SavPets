import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { usePOSTClient } from '@/src/hooks/client/usePOSTClient'
import { ClientSchema, clientSchema } from '@/src/schemas/clientSchema'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AddressDTO } from '@/src/schemas/addressSchema'

export default function CreateClient() {
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [cep, setCep] = useState<string | undefined>(undefined)
  const [isCepCorrect, setIsCepCorrect] = useState<boolean | undefined>(
    undefined,
  )

  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = usePOSTClient()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientSchema>({
    resolver: yupResolver(clientSchema),
  })

  function handleCreateClient({
    firstName,
    lastName,
    telephone,
    cpf,
    cep,
    locationNumber,
    complement: locationComplement,
  }: ClientSchema) {
    const complement = locationComplement || null

    mutate({
      firstName,
      lastName,
      telephone,
      cpf,
      cep,
      address,
      locationNumber,
      complement,
    })
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
        title: 'Cliente criado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/client/')
  }, [isSuccess, requestError])

  useEffect(() => {
    ;(async () => {
      if (cep?.length === 9) {
        await axios
          .get<AddressDTO>(`https://viacep.com.br/ws/${cep}/json/`)
          .then(({ data }) => {
            setAddress(data.logradouro)
            setIsCepCorrect(true)
          })
          .catch(() => {
            setAddress('')
            setIsCepCorrect(false)
          })
      }
    })()
  }, [cep])

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Novo cliente" />
      <Animated.ScrollView
        entering={FadeInUp}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="py-8"
      >
        <View className="mb-12" style={{ gap: 16 }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange } }) => (
              <Input
                title="Primeiro nome"
                errorMessage={errors.firstName?.message}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange } }) => (
              <Input
                title="Último nome"
                errorMessage={errors.lastName?.message}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="telephone"
            render={({ field: { onChange } }) => (
              <Input
                title="Telefone"
                errorMessage={errors.telephone?.message}
                onChangeText={onChange}
                keyboardType="numbers-and-punctuation"
              />
            )}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input
                title="CPF"
                errorMessage={errors.cpf?.message}
                onChangeText={onChange}
                keyboardType="numbers-and-punctuation"
              />
            )}
          />
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange } }) => (
              <Input
                title="CEP"
                errorMessage={errors.cep?.message}
                onChangeText={onChange}
                onEndEditing={(e) => setCep(e.nativeEvent.text)}
                keyboardType="numbers-and-punctuation"
              />
            )}
          />

          <Input
            title="Endereço"
            isReadOnly
            errorMessage={isCepCorrect === false ? 'CEP Inválido' : null}
            value={address}
            keyboardType="numeric"
          />
          <Controller
            control={control}
            name="locationNumber"
            render={({ field: { onChange } }) => (
              <Input
                title="Número da Residência"
                errorMessage={errors.locationNumber?.message}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="complement"
            render={({ field: { onChange } }) => (
              <Input
                title="Complemento"
                errorMessage={errors.complement?.message}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <Button.Root
          disabled={isSubmitting || isPending}
          onPress={handleSubmit(handleCreateClient)}
        >
          <Button.Icon>
            <Feather name="plus-square" size={18} color={colors.slate[950]} />
          </Button.Icon>
          <Button.Title>Cadastrar cliente</Button.Title>
        </Button.Root>
      </Animated.ScrollView>
    </View>
  )
}
