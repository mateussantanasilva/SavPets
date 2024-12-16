import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import { ButtonSelect } from '@/src/components/button-select'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useToast } from 'native-base'
import { useRouter } from 'expo-router'
import { usePOSTEmployee } from '@/src/hooks/employee/usePOSTEmployee'
import { EmployeeSchema, employeeSchema } from '@/src/schemas/employeeSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'
import axios from 'axios'
import { AddressDTO } from '@/src/schemas/addressSchema'
import { useGETDepartaments } from '@/src/hooks/employee/departament/useGETDepartaments'
import { Loading } from '@/src/components/loading'
import { Option } from '@/src/components/select'
import { useGETOccupations } from '@/src/hooks/employee/occupation/useGETOccupations'

export default function CreateEmployee() {
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [cep, setCep] = useState<string | undefined>(undefined)
  const [isCepCorrect, setIsCepCorrect] = useState<boolean | undefined>(
    undefined,
  )

  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = usePOSTEmployee()

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
  })

  function handleCreateEmployee({
    name,
    surname,
    email,
    cpf,
    cep,
    locationNumber,
    departament,
    occupation,
  }: EmployeeSchema) {
    mutate({
      name,
      surname,
      email,
      cpf,
      cep,
      address,
      locationNumber,
      departament,
      occupation,
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
        title: 'Funcionário criado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/employee/')
  }, [isSuccess, requestError])

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

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Novo funcionário" />

      {isLoadingDepartaments || isLoadingOccupations ? (
        <Loading />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View className="mb-12" style={{ gap: 16 }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  title="Nome"
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="surname"
              render={({ field: { onChange } }) => (
                <Input
                  title="Sobrenome"
                  errorMessage={errors.surname?.message}
                  onChangeText={onChange}
                />
              )}
            />
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
              name="cpf"
              render={({ field: { onChange } }) => (
                <Input
                  title="CPF"
                  errorMessage={errors.cpf?.message}
                  onChangeText={onChange}
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
                  keyboardType="numbers-and-punctuation"
                  onChangeText={onChange}
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

            <Controller
              control={control}
              name="departament"
              render={({ field: { onChange } }) => (
                <ButtonSelect
                  value={''}
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
                  value={''}
                  title="Ocupação"
                  options={occupationsOptions}
                  onChange={onChange}
                />
              )}
            />
          </Animated.View>

          <Button.Root
            disabled={isSubmitting || isPending}
            onPress={handleSubmit(handleCreateEmployee)}
          >
            <Button.Icon>
              <Feather name="plus-square" size={18} color={colors.slate[950]} />
            </Button.Icon>
            <Button.Title>Cadastrar Funcionário</Button.Title>
          </Button.Root>
        </KeyboardAwareScrollView>
      )}
    </View>
  )
}
