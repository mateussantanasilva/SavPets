import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { Select } from '@/src/components/select'
import { useGETAnimalReportById } from '@/src/hooks/animal/animalReport/useGETAnimalReportById'
import { Loading } from '@/src/components/loading'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useToast } from 'native-base'
import { useGETMedicines } from '@/src/hooks/medicine/useGETMedicines'
import { useGETAnimalCategories } from '@/src/hooks/animal/animalCategory/useGETAnimalCategories'
import { usePUTAnimalReport } from '@/src/hooks/animal/animalReport/usePUTAnimalReport'
import { Controller, useForm } from 'react-hook-form'
import {
  AnimalReportSchema,
  animalReportSchema,
} from '@/src/schemas/animalReportSchema'
import { TextInputMask } from 'react-native-masked-text'

export default function UpdateAnimalReportById() {
  const { id } = useLocalSearchParams()
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
    data: report,
    isLoading,
    isError,
  } = useGETAnimalReportById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnimalReportSchema>({
    resolver: yupResolver(animalReportSchema),

    defaultValues: {
      animalName: report?.animalName,
      medicine: report?.medicine,
      animalCategory: report?.animalCategory,
      arrivalDate: report?.arrivalDate,
      description: report?.description,
      local: report?.local,
    },
  })

  const {
    mutate,
    data: requestError,
    isPending,
    isSuccess,
  } = usePUTAnimalReport()

  function handleUpdateAnimalReport({
    animalName,
    medicine,
    animalCategory,
    arrivalDate,
    description,
    local,
  }: AnimalReportSchema) {
    if (
      animalName === report?.animalName &&
      medicine === report?.medicine &&
      animalCategory === report?.animalCategory &&
      arrivalDate === report?.arrivalDate &&
      description === report?.description &&
      local === report?.local
    )
      return

    const updatedAnimalReport = {
      animalName,
      medicine,
      animalCategory,
      arrivalDate,
      description,
      local,
    }

    mutate({ id: String(id), updatedAnimalReport })
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
        title: 'Relatório atualizado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/animal/animalReport/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/animal/animalReport/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar relatório" />

      {isLoading || !report ? (
        <Loading />
      ) : (
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
                  title="Nome do animal"
                  defaultValue={report.animalName}
                  // defaultValue={value}
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
                  value={report.animalCategory}
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
                  defaultValue={report.local}
                  // defaultValue={value}
                  errorMessage={errors.local?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="arrivalDate"
              render={({ field: { onChange } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  value={report.arrivalDate.toString()}
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
                  title="Medicamento"
                  options={medicineOptions}
                  value={report.medicine}
                  // defaultValue={value}
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
                  defaultValue={report.description}
                  // defaultValue={value}
                  errorMessage={errors.description?.message}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleUpdateAnimalReport)}
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
