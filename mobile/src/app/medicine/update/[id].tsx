import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { useGETMedicineById } from '@/src/hooks/medicine/useGETMedicineById'
import { Loading } from '@/src/components/loading'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useToast } from 'native-base'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { MedicineSchema, medicineSchema } from '@/src/schemas/medicineSchema'
import { usePUTMedicine } from '@/src/hooks/medicine/usePUTMedicine'
import { useEffect } from 'react'
import { Option, Select } from '@/src/components/select'
import { useGETProviders } from '@/src/hooks/provider/useGETProviders'
// import { TextInputMask } from 'react-native-masked-text'

export default function UpdateMedicineById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const { data: medicine, isError, isLoading } = useGETMedicineById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MedicineSchema>({
    resolver: yupResolver(medicineSchema),

    defaultValues: {
      name: medicine?.name,
      manufacturingDate: medicine?.manufacturingDate,
      expirationDate: medicine?.expirationDate,
      utility: medicine?.utility,
      observation: medicine?.observation,
      amount: medicine?.amount,
      arrivalDate: medicine?.arrivalDate,
      leaflet: medicine?.leaflet,
      provider: medicine?.provider,
    },
  })

  const { mutate, data: requestError, isPending, isSuccess } = usePUTMedicine()

  function handleUpdateMedicine({
    name,
    manufacturingDate,
    expirationDate,
    utility,
    observation,
    amount,
    arrivalDate,
    leaflet,
    provider,
  }: MedicineSchema) {
    if (
      name === medicine?.name &&
      manufacturingDate === medicine?.manufacturingDate &&
      expirationDate === medicine?.expirationDate &&
      utility === medicine?.utility &&
      observation === medicine?.observation &&
      amount === medicine?.amount &&
      arrivalDate === medicine?.arrivalDate &&
      leaflet === medicine?.leaflet &&
      provider === medicine?.provider
    )
      return

    const updatedMedicine = {
      name,
      manufacturingDate,
      expirationDate,
      utility,
      observation,
      amount,
      arrivalDate,
      leaflet,
      provider,
    } as MedicineSchema

    mutate({ id: String(id), updatedMedicine })
  }

  const providersOptions: Option[] = []

  const { data: providers, isLoading: isLoadingProviders } = useGETProviders()

  providers?.forEach((provider) => {
    const newOption = {
      label: provider.name,
      value: provider.name,
    }

    providersOptions.push(newOption)
  })

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
        title: 'Medicamento atualizado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/medicine/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/medicine/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar medicamento" />

      {isLoading || isLoadingProviders ? (
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
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                  defaultValue={value}
                  title="Nome"
                />
              )}
            />

            <Controller
              control={control}
              name="manufacturingDate"
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.manufacturingDate?.message}
                  onChangeText={onChange}
                  title="Data de Fabricação"
                  defaultValue={value}
                  keyboardType="numbers-and-punctuation"
                />
              )}
            />

            <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.expirationDate?.message}
                  onChangeText={onChange}
                  title="Data de Validade"
                  defaultValue={value}
                  keyboardType="numbers-and-punctuation"
                />
              )}
            />
            {/* <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  value={medicine?.expirationDate.toString()}
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
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.utility?.message}
                  onChangeText={onChange}
                  title="Utilidade"
                  defaultValue={value}
                />
              )}
            />

            <Controller
              control={control}
              name="observation"
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.observation?.message}
                  onChangeText={onChange}
                  defaultValue={value!}
                  title="Observação"
                  multiline
                  textAlignVertical="top"
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.amount?.message}
                  onChangeText={onChange}
                  defaultValue={value.toString()}
                  title="Quantidade"
                  keyboardType="number-pad"
                />
              )}
            />

            <Controller
              control={control}
              name="arrivalDate"
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.arrivalDate?.message}
                  onChangeText={onChange}
                  title="Data de chegada"
                  defaultValue={value}
                  keyboardType="numbers-and-punctuation"
                />
              )}
            />

            {/* <Controller
              control={control}
              name="arrivalDate"
              render={({ field: { onChange } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  value={medicine?.arrivalDate.toString()}
                  onChangeText={onChange}
                  customTextInput={Input}
                  customTextInputProps={{
                    title: 'Data de Validade',
                    errorMessage: errors.arrivalDate?.message,
                  }}
                />
              )}
            /> */}

            <Controller
              control={control}
              name="leaflet"
              render={({ field: { onChange, value } }) => (
                <Input
                  errorMessage={errors.leaflet?.message}
                  onChangeText={onChange}
                  title="Bula"
                  defaultValue={value}
                  multiline
                  textAlignVertical="top"
                />
              )}
            />

            <Controller
              control={control}
              name="provider"
              render={({ field: { onChange, value } }) => (
                <Select
                  title="Fornecedor"
                  value={value!}
                  options={providersOptions}
                  onChange={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleUpdateMedicine)}
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
