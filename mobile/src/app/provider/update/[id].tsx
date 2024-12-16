import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { useGETProviderById } from '@/src/hooks/provider/useGETProviderById'
import { Loading } from '@/src/components/loading'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useToast } from 'native-base'
import { ProviderSchema, providerSchema } from '@/src/schemas/providerSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { usePUTProvider } from '@/src/hooks/provider/usePUTProvider'
import { useEffect, useState } from 'react'
import { AddressDTO } from '@/src/schemas/addressSchema'
import axios from 'axios'

export default function UpdateProviderByID() {
  const [address, setAddress] = useState<string>('')
  const [cep, setCep] = useState<string | undefined>(undefined)
  const [isCepCorrect, setIsCepCorrect] = useState<boolean | undefined>(
    undefined,
  )

  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const { data: provider, isLoading, isError } = useGETProviderById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProviderSchema>({
    resolver: yupResolver(providerSchema),

    defaultValues: {
      cnpj: provider?.cnpj,
      name: provider?.name,
      cep: provider?.cep,
      address: provider?.address,
      locationNumber: provider?.locationNumber,
      complement: provider?.complement,
    },
  })

  const { mutate, data: requestError, isPending, isSuccess } = usePUTProvider()

  function handleUpdateProvider({
    cnpj,
    name,
    cep,
    address,
    locationNumber,
    complement,
  }: ProviderSchema) {
    if (
      cnpj === provider?.cnpj &&
      name === provider?.name &&
      cep === provider?.cep &&
      address === provider?.address &&
      locationNumber === provider?.locationNumber &&
      complement === provider?.complement
    ) {
      return
    }

    const updatedProvider = {
      cnpj,
      name,
      cep,
      address,
      locationNumber,
      complement,
    }

    mutate({ id: String(id), updatedProvider })
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
        title: 'Fornecedor atualizado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/provider/')
  }, [isSuccess, requestError])

  useEffect(() => {
    ;(async () => {
      if (cep) {
        await axios
          .get<AddressDTO>(`https://viacep.com.br/ws/${cep}/json/`)
          .then(({ data }) => {
            if (data.erro) {
              setIsCepCorrect(false)
              setAddress('')
            } else {
              setAddress(data.logradouro)
              setIsCepCorrect(true)
            }
          })
          .catch(() => {
            setAddress('')
            setIsCepCorrect(false)
          })
      }
    })()
  }, [cep])

  useEffect(() => {
    if (provider?.cep) {
      setAddress(provider.address)
    }
  }, [provider?.address, provider?.cep])

  if (isError) return <Redirect href="/provider/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar fornecedor" />

      {isLoading || !provider ? (
        <Loading />
      ) : (
        <Animated.ScrollView
          entering={FadeInUp}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          className="py-8"
        >
          <View className="mb-12" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Razão Social"
                  defaultValue={value}
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="cnpj"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="CNPJ"
                  defaultValue={value}
                  errorMessage={errors.cnpj?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="cep"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="CEP"
                  defaultValue={value}
                  errorMessage={errors.cep?.message}
                  onChangeText={onChange}
                  onEndEditing={(e) => setCep(e.nativeEvent.text)}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Endereço"
                  defaultValue={value}
                  value={address}
                  isReadOnly
                  errorMessage={!isCepCorrect ? 'O CEP está incorreto' : null}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="locationNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Número do Endereço"
                  defaultValue={value.toString()}
                  errorMessage={errors.locationNumber?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="complement"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Complemento"
                  defaultValue={value || ''}
                  errorMessage={errors.complement?.message}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleUpdateProvider)}
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
        </Animated.ScrollView>
      )}
    </View>
  )
}
