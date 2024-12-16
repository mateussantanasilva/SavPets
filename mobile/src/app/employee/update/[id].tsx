import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { ButtonSelect } from '@/src/components/button-select'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useToast } from 'native-base'
import { yupResolver } from '@hookform/resolvers/yup'
import { EmployeeSchema, employeeSchema } from '@/src/schemas/employeeSchema'
import { Controller, useForm } from 'react-hook-form'
import { usePUTEmployee } from '@/src/hooks/employee/usePUTEmployee'
import { useGETEmployeeById } from '@/src/hooks/employee/useGETEmployeeById'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AddressDTO } from '@/src/schemas/addressSchema'
import { useGETOccupations } from '@/src/hooks/employee/occupation/useGETOccupations'
import { useGETDepartaments } from '@/src/hooks/employee/departament/useGETDepartaments'
import { Option } from '@/src/components/select'
import { Loading } from '@/src/components/loading'

export default function UpdateEmployeeById() {
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [cep, setCep] = useState<string | undefined>(undefined)
  const [isCepCorrect, setIsCepCorrect] = useState<boolean | undefined>(
    undefined,
  )

  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const {
    data: employee,
    isError,
    isLoading,
  } = useGETEmployeeById(String(id))

  const { data: departaments, isLoading: isLoadingDepartaments } =
    useGETDepartaments()

  const { data: occupations, isLoading: isLoadingOccupations } =
    useGETOccupations()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeSchema>({
    resolver: yupResolver(employeeSchema),

    defaultValues: {
      name: employee?.name,
      surname: employee?.surname,
      email: employee?.email,
      cpf: employee?.cpf,
      cep: employee?.cep,
      address: employee?.address,
      locationNumber: employee?.locationNumber,
      complement: employee?.complement,
      departament: employee?.departament,
      occupation: employee?.occupation,
    },
  })

  const { mutate, data: requestError, isPending, isSuccess } = usePUTEmployee()

  function handleUpdateEmployee({
    name,
    surname,
    email,
    cpf,
    cep,
    locationNumber,
    departament,
    occupation,
  }: EmployeeSchema) {
    if (
      name === employee?.name &&
      surname === employee.surname &&
      email === employee?.email &&
      cpf === employee?.cpf &&
      cep === employee?.cep &&
      locationNumber === employee?.locationNumber &&
      departament === employee?.departament &&
      occupation === employee?.occupation
    )
      return

    const updatedEmployee = {
      name,
      surname,
      email,
      cpf,
      cep,
      address,
      locationNumber,
      departament,
      occupation,
    }

    if (isCepCorrect) mutate({ id: String(id), updatedEmployee })
  }

  useEffect(() => {
    ;(async () => {
      if (cep?.length === 9) {
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
    if (employee) {
      setAddress(employee?.address)
      setCep(employee?.cep)
    }
  }, [employee])

  const departamentsOptions: Option[] = []

  departaments?.forEach((departament) => {
    const newOption = {
      label: departament.name,
      value: departament.name,
    }

    departamentsOptions.push(newOption)
  })

  const occupationsOptions: Option[] = []

  occupations?.forEach((departament) => {
    const newOption = {
      label: departament.name,
      value: departament.name,
    }

    occupationsOptions.push(newOption)
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
        title: 'Funcionário atualizado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/employee/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/provider/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar funcionário" />

      {isLoading ||
      !employee ||
      isLoadingDepartaments ||
      isLoadingOccupations ? (
        <Loading />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-12" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Nome"
                  errorMessage={errors.name?.message}
                  defaultValue={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="surname"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Sobrenome"
                  errorMessage={errors.surname?.message}
                  defaultValue={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Email"
                  errorMessage={errors.email?.message}
                  defaultValue={value}
                  keyboardType="email-address"
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="CPF"
                  errorMessage={errors.cpf?.message}
                  defaultValue={value}
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
                  errorMessage={errors.cep?.message}
                  onChangeText={onChange}
                  defaultValue={value}
                  keyboardType="numbers-and-punctuation"
                  onEndEditing={(e) => setCep(e.nativeEvent.text)}
                />
              )}
            />

            <Input
              title="Endereço"
              isReadOnly
              errorMessage={isCepCorrect === false ? 'CEP Inválido' : null}
              value={address}
            />

            <Controller
              control={control}
              name="locationNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Número da Residência"
                  errorMessage={errors.locationNumber?.message}
                  onChangeText={onChange}
                  defaultValue={value.toString()}
                  keyboardType="numeric"
                />
              )}
            />

            <Controller
              control={control}
              name="complement"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Complemento"
                  errorMessage={errors.complement?.message}
                  onChangeText={onChange}
                  defaultValue={value || ''}
                />
              )}
            />

            <Controller
              control={control}
              name="departament"
              render={({ field: { onChange } }) => (
                <ButtonSelect
                  value={employee.departament}
                  title="Departamento"
                  options={departamentsOptions}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="occupation"
              render={({ field: { onChange } }) => (
                <ButtonSelect
                  value={employee.occupation}
                  title="Departamento"
                  options={occupationsOptions}
                  onChange={onChange}
                />
              )}
            />
          </View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleUpdateEmployee)}
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
    </View>
  )
}
