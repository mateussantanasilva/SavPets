import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import { Input } from '@/src/components/input'
import { Select } from '@/src/components/select'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useToast } from 'native-base'
import { useGETMedicines } from '@/src/hooks/medicine/useGETMedicines'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { usePOSTAnimalReport } from '@/src/hooks/animal/animalReport/usePOSTAnimalReport'
import { Controller, useForm } from 'react-hook-form'
import {
  AnimalReportSchema,
  animalReportSchema,
} from '@/src/schemas/animalReportSchema'

import { useGETAnimalCategories } from '@/src/hooks/animal/animalCategory/useGETAnimalCategories'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputMask } from 'react-native-masked-text'

export default function CreateAnimalReport() {
  const router = useRouter()
  const toast = useToast()

  const { data: medicines } = useGETMedicines()

  const medicineOptions = medicines
    ? [
        { label: 'Não Medicado', value: 'nao_medicado' },
        ...medicines.map((medicine) => ({
          label: medicine.name,
          value: medicine.name,
        })),
      ]
    : []

  const animalCategories = useGETAnimalCategories()

  const categoryOptions =
    animalCategories.query.data?.map((category) => ({
      label: `${category.name} - ${category.race} - ${category.gender} - ${category.size} - ${category.coatColor}`,
      value: `${category.name} - ${category.race} - ${category.gender} - ${category.size} - ${category.coatColor}`,
    })) || []

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePOSTAnimalReport()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnimalReportSchema>({
    resolver: yupResolver(animalReportSchema),
  })

  function handleCreateAnimalReport({
    animalName,
    medicine,
    animalCategory,
    arrivalDate,
    local,
    description,
  }: AnimalReportSchema) {
    mutate({
      animalName,
      medicine,
      animalCategory,
      arrivalDate,
      local,
      description,
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
        title: 'Relatório criado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/animal/animalReport/')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Novo Relatório" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.ScrollView
          entering={FadeInUp}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="py-8"
        >
          <View className="mb-12" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="animalName"
              render={({ field: { onChange } }) => (
                <Input
                  title="Nome"
                  errorMessage={errors.animalName?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="animalCategory"
              render={({ field: { onChange } }) => (
                <Select
                  title={'Categoria'}
                  options={categoryOptions}
                  value={''}
                  errorMessage={errors.animalCategory?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="local"
              render={({ field: { onChange } }) => (
                <Input
                  title="Local encontrado"
                  errorMessage={errors.local?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
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
            />

            <Controller
              control={control}
              name="medicine"
              render={({ field: { onChange } }) => (
                <Select
                  title={'Medicamento'}
                  options={medicineOptions}
                  value={''}
                  errorMessage={errors.medicine?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <Input
                  title="Descrição"
                  multiline={true}
                  textAlignVertical="top"
                  errorMessage={errors.description?.message}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <View>
            <Button.Root
              disabled={isSubmitting || isPending}
              onPress={handleSubmit(handleCreateAnimalReport)}
            >
              <Button.Icon>
                <Feather
                  name="plus-square"
                  size={18}
                  color={colors.slate[950]}
                />
              </Button.Icon>
              <Button.Title>Cadastrar relatório</Button.Title>
            </Button.Root>
          </View>
        </Animated.ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}
