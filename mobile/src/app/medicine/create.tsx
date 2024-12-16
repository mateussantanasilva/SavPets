import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useToast } from 'native-base'
import { useRouter } from 'expo-router'
import { usePOSTMedicine } from '@/src/hooks/medicine/usePOSTMedine'
import { yupResolver } from '@hookform/resolvers/yup'
import { MedicineSchema, medicineSchema } from '@/src/schemas/medicineSchema'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Option, Select } from '@/src/components/select'
import { useGETProviders } from '@/src/hooks/provider/useGETProviders'
import { Loading } from '@/src/components/loading'
// import { TextInputMask } from 'react-native-masked-text'

export default function CreateMedicine() {
  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = usePOSTMedicine()

  const providersOptions: Option[] = []

  const { data: providers, isLoading } = useGETProviders()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MedicineSchema>({
    resolver: yupResolver(medicineSchema),
  })

  function handleCreateMedicine(medicine: MedicineSchema) {
    mutate({
      ...medicine,
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
        title: 'Fornecedor criado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/medicine/')
  }, [isSuccess, requestError])

  useEffect(() => {
    if (!isLoading) {
      if (providers?.length === 0) {
        toast.show({
          title: 'Cadastre um Fornecedor antes',
          placement: 'top',
          textAlign: 'center',
          bg: 'rose.400',
        })

        return router.navigate('/medicine/')
      }
    }
  }, [isLoading, providers, router, toast])

  providers?.forEach((provider) => {
    const newOption = {
      label: provider.name,
      value: provider.name,
    }

    providersOptions.push(newOption)
  })

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Novo medicamento" />

      {isLoading || !providers ? (
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
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                  title="Nome"
                />
              )}
            />

            <Controller
              control={control}
              name="manufacturingDate"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.manufacturingDate?.message}
                  onChangeText={onChange}
                  title="Data de Fabricação"
                  keyboardType="numbers-and-punctuation"
                />
              )}
            />

            <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.expirationDate?.message}
                  onChangeText={onChange}
                  title="Data de Validade"
                  keyboardType="numbers-and-punctuation"
                />
              )}
            />

            {/* <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange, value } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  value={value}
                  onChangeText={onChange}
                  customTextInput={Input}
                  customTextInputProps={{
                    title: 'Data de Validade',
                    errorMessage: errors.expirationDate?.message,
                  }}
                />
              )}
            /> */}

            <Controller
              control={control}
              name="utility"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.utility?.message}
                  onChangeText={onChange}
                  title="Utilidade"
                />
              )}
            />

            <Controller
              control={control}
              name="observation"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.observation?.message}
                  onChangeText={onChange}
                  title="Observação"
                  multiline
                  textAlignVertical="top"
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.amount?.message}
                  onChangeText={onChange}
                  title="Quantidade"
                  keyboardType="number-pad"
                />
              )}
            />

            <Controller
              control={control}
              name="arrivalDate"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.arrivalDate?.message}
                  onChangeText={onChange}
                  title="Data de chegada"
                  keyboardType="numbers-and-punctuation"
                />
              )}
            />

            {/*  <Controller
              control={control}
              name="arrivalDate"
              render={({ field: { onChange, value } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  value={value}
                  onChangeText={onChange}
                  customTextInput={Input}
                  customTextInputProps={{
                    title: 'Data de chegada',
                    errorMessage: errors.arrivalDate?.message,
                  }}
                />
              )}
            /> */}

            <Controller
              control={control}
              name="leaflet"
              render={({ field: { onChange } }) => (
                <Input
                  errorMessage={errors.leaflet?.message}
                  onChangeText={onChange}
                  title="Bula"
                  multiline
                  textAlignVertical="top"
                />
              )}
            />

            <Controller
              control={control}
              name="provider"
              render={({ field: { onChange } }) => (
                <Select
                  title="Fornecedor"
                  value={''}
                  options={providersOptions}
                  onChange={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleCreateMedicine)}
          >
            <Button.Icon>
              <Feather name="plus-square" size={18} color={colors.slate[950]} />
            </Button.Icon>
            <Button.Title>Cadastrar Medicamento</Button.Title>
          </Button.Root>
        </Animated.ScrollView>
      )}
    </View>
  )
}
