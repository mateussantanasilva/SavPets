import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useToast } from 'native-base'
import { useRouter } from 'expo-router'
import { usePOSTAdoption } from '@/src/hooks/adoption/usePOSTAdoption'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdoptionSchema, adoptionSchema } from '@/src/schemas/adoptionSchema'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useGETEmployess } from '@/src/hooks/employee/useGETEmployees'
import { Loading } from '@/src/components/loading'
import { Option, Select } from '@/src/components/select'
import { useGETClients } from '@/src/hooks/client/useGETClients'
import { useGETAnimalReports } from '@/src/hooks/animal/animalReport/useGETAnimalReports'
import { TextInputMask } from 'react-native-masked-text'

export default function CreateAdoption() {
  const [isLoading, setIsLoading] = useState(true)

  const [employee, setEmployee] = useState<string>('')
  const [client, setClient] = useState<string>('')
  const [animalReport, setAnimalReport] = useState<string>('')

  const employeeOptions: Option[] = []
  const clientOptions: Option[] = []
  const animalReportOptions: Option[] = []

  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = usePOSTAdoption()

  const { data: employees, isLoading: isLoadingEmployees } = useGETEmployess()
  const { data: clients, isLoading: isLoadingClients } = useGETClients()
  const { data: animalReports, isLoading: isLoadingAnimalReports } =
    useGETAnimalReports()

  useEffect(() => {
    if (!isLoadingAnimalReports || !isLoadingClients || !isLoadingEmployees)
      setIsLoading(false)

    const entitieDontHaveData =
      employees?.length === 0 ||
      clients?.length === 0 ||
      animalReports?.length === 0

    if (entitieDontHaveData) {
      const title =
        employees?.length === 0
          ? 'Cadastre um Funcionário antes uma adoção'
          : clients?.length === 0
            ? 'Cadastre um Cliente antes de uma adoção'
            : 'Cadastre um Relatório de uma Animal antes uma adoção'

      toast.show({
        title,
        placement: 'top',
        textAlign: 'center',
        bg: 'rose.400',
      })

      return router.navigate('/adoption/')
    }

    if (employees) setEmployee(`${employees[0].name} ${employees[0].surname}`)

    if (clients) setClient(`${clients[0].firstName} ${clients[0].lastName}`)

    if (animalReports) setAnimalReport(animalReports[0].id)
  }, [
    animalReports,
    clients,
    employees,
    isLoadingAnimalReports,
    isLoadingClients,
    isLoadingEmployees,
    requestError,
    router,
  ])

  employees?.forEach((employee) => {
    const newOption = {
      label: `${employee.name} ${employee.surname}`,
      value: `${employee.name} ${employee.surname}`,
    }

    employeeOptions.push(newOption)
  })

  clients?.forEach((client) => {
    const newOption = {
      label: `${client.firstName} ${client.lastName}`,
      value: `${client.firstName} ${client.lastName}`,
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionSchema>({
    resolver: yupResolver(adoptionSchema),
  })

  function handleCreateAdoption({ adoptionDate, report }: AdoptionSchema) {
    mutate({
      employee,
      client,
      adoptionDate,
      animalReport,
      report,
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
        title: 'Adoção criada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/adoption/')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Nova adoção" />

      {isLoading ||
      isLoadingEmployees ||
      isLoadingAnimalReports ||
      isLoadingClients ? (
        <Loading />
      ) : (
        <Animated.ScrollView
          entering={FadeInUp}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          className="py-8"
        >
          <View style={{ gap: 16 }} className="mb-12">
            <Controller
              control={control}
              name="employee"
              render={({ field: { onChange } }) => (
                <Select
                  options={employeeOptions}
                  title="Funcionário"
                  value={employee}
                  errorMessage={errors.employee?.message}
                  onValueChange={setEmployee}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="client"
              render={({ field: { onChange } }) => (
                <Select
                  options={clientOptions}
                  title="Cliente"
                  value={client}
                  errorMessage={errors.client?.message}
                  onValueChange={setClient}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="adoptionDate"
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
                    title: 'Data de adoção',
                    errorMessage: errors.adoptionDate?.message,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="animalReport"
              render={() => (
                <Select
                  options={animalReportOptions}
                  title="Animal"
                  value={animalReport}
                  errorMessage={errors.animalReport?.message}
                  onValueChange={setAnimalReport}
                />
              )}
            />
            <Controller
              control={control}
              name="report"
              render={({ field: { onChange } }) => (
                <Input
                  title="Relatório"
                  errorMessage={errors.report?.message}
                  onChangeText={onChange}
                  multiline
                  textAlignVertical="top"
                  numberOfLines={4}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleCreateAdoption)}
          >
            <Button.Icon>
              <Feather name="plus-square" size={18} color={colors.slate[950]} />
            </Button.Icon>
            <Button.Title>Cadastrar adoção</Button.Title>
          </Button.Root>
        </Animated.ScrollView>
      )}
    </View>
  )
}
