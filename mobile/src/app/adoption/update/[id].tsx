import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useGETAdoptionById } from '@/src/hooks/adoption/useGETAdoptionById'
import { Loading } from '@/src/components/loading'
import { AdoptionSchema, adoptionSchema } from '@/src/schemas/adoptionSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { usePUTAdoption } from '@/src/hooks/adoption/usePUTAdoption'
import { Option, Select } from '@/src/components/select'
import { useToast } from 'native-base'
import { useGETAnimalReports } from '@/src/hooks/animal/animalReport/useGETAnimalReports'
import { useGETClients } from '@/src/hooks/client/useGETClients'
import { useGETEmployess } from '@/src/hooks/employee/useGETEmployees'
import { useEffect } from 'react'
import { TextInputMask } from 'react-native-masked-text'

export default function UpdateAdoptionById() {
  const { id } = useLocalSearchParams()

  const employeeOptions: Option[] = []
  const clientOptions: Option[] = []
  const animalReportOptions: Option[] = []

  const router = useRouter()
  const toast = useToast()

  const { data: employees, isLoading: isLoadingEmployees } = useGETEmployess()
  const { data: clients, isLoading: isLoadingClients } = useGETClients()
  const { data: animalReports, isLoading: isLoadingAnimalReports } =
    useGETAnimalReports()

  const { data: adoption, isLoading, isError } = useGETAdoptionById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionSchema>({
    resolver: yupResolver(adoptionSchema),

    defaultValues: {
      employee: adoption?.employee,
      client: adoption?.client,
      adoptionDate: adoption?.adoptionDate,
      report: adoption?.report,
    },
  })

  employees?.forEach((employee) => {
    const newOption = {
      label: `${employee.name} ${employee.surname}`,
      value: employee.id,
    }

    employeeOptions.push(newOption)
  })

  clients?.forEach((client) => {
    const newOption = {
      label: `${client.firstName} ${client.lastName}`,
      value: client.id,
    }

    clientOptions.push(newOption)
  })

  animalReports?.forEach((animalReport) => {
    const newOption = {
      label: `${animalReport.animalName}`,
      value: animalReport.id,
    }

    animalReportOptions.push(newOption)
  })

  const { mutate, data: requestError, isPending, isSuccess } = usePUTAdoption()

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
        title: 'Adoção atualizada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/adoption/')
  }, [isSuccess, requestError])

  function handleUpdatedAdoption({
    employee,
    client,
    adoptionDate,
    animalReport,
    report,
  }: AdoptionSchema) {
    if (
      employee === adoption?.employee &&
      client === adoption?.client &&
      adoptionDate === adoption?.adoptionDate &&
      animalReport === adoption?.animalReport &&
      report === adoption?.report
    )
      return

    const updatedAdoption = {
      employee,
      client,
      adoptionDate,
      animalReport,
      report,
    } as AdoptionSchema

    mutate({ id: String(id), updatedAdoption })
  }

  if (isError) return <Redirect href="/adoption/" />

  return (
    <Animated.View entering={FadeInUp} className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar adoção" />

      {isLoading ||
      isLoadingEmployees ||
      isLoadingAnimalReports ||
      isLoadingClients ||
      !adoption ? (
        <Loading />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="py-8"
        >
          <View className="mb-12" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="employee"
              render={({ field: { onChange } }) => (
                <Select
                  options={employeeOptions}
                  title="Funcionário"
                  value={adoption.employee}
                  errorMessage={errors.employee?.message}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="client"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={clientOptions}
                  title="Cliente"
                  onChange={onChange}
                  value={adoption.client}
                  errorMessage={errors.client?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="adoptionDate"
              render={({ field: { onChange } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  value={adoption.adoptionDate}
                  onChangeText={onChange}
                  customTextInput={Input}
                  customTextInputProps={{
                    title: 'Data de adoção',
                    errorMessage: errors.adoptionDate?.message,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="animalReport"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={animalReportOptions}
                  title="Animal"
                  onChange={onChange}
                  value={adoption.animalReport}
                  errorMessage={errors.animalReport?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="report"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Relatório"
                  errorMessage={errors.report?.message}
                  onChangeText={onChange}
                  multiline
                  textAlignVertical="top"
                  defaultValue={value}
                  numberOfLines={4}
                />
              )}
            />
          </View>
          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleUpdatedAdoption)}
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
        </KeyboardAwareScrollView>
      )}
    </Animated.View>
  )
}
