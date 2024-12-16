import * as Button from '@/src/components/button'
import { DeleteModal } from '@/src/components/delete-modal'
import { DetailItem } from '@/src/components/detail-item'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { useDELETEEmployee } from '@/src/hooks/employee/useDELETEemployee'
import { useGETEmployeeById } from '@/src/hooks/employee/useGETEmployeeById'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export default function EmployeeById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: employee, isError, isLoading } = useGETEmployeeById(String(id))

  const { mutate, data: requestError, isSuccess } = useDELETEEmployee()

  function onDeleteEmployee() {
    mutate(String(id))
  }

  useEffect(() => {
    if (!isSuccess) return

    if (requestError) {
      toast.show({
        title: requestError,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'rose.400',
      })
    } else {
      toast.show({
        title: 'Funcionário deletado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bgColor: 'success.600',
      })
    }

    return router.navigate('/employee/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/employee/" />

  const fullAdress = `${employee?.address}, ${employee?.locationNumber}${employee?.complement ? ` - ${employee.complement}` : ''} - ${employee?.cep}`

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Funcionário" />

      {isLoading || !employee ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View className="mb-12 gap-4" entering={FadeInUp}>
              <View className="mb-12" style={{ gap: 16 }}>
                <DetailItem
                  title="NOME"
                  value={`${employee.name} ${employee.surname}`}
                />
                <DetailItem title="E-MAIL" value={employee.email} />
                <DetailItem title="CPF" value={employee.cpf} />
                <DetailItem title="CEP" value={employee.cep} />
                <DetailItem title="ENDEREÇO" value={fullAdress} />
                <DetailItem
                  title="NÚMERO DA CONTA"
                  value={employee.accountNumber}
                />
                <DetailItem title="DEPARTAMENTO" value={employee.departament} />
                <DetailItem title="OCUPAÇÃO" value={employee.occupation} />
              </View>

              <View style={{ gap: 12 }}>
                <Link href={`/employee/update/${id}`} asChild>
                  <Button.Root>
                    <Button.Icon>
                      <Feather
                        name="edit"
                        size={18}
                        color={colors.slate[950]}
                      />
                    </Button.Icon>
                    <Button.Title>Editar Funcionário</Button.Title>
                  </Button.Root>
                </Link>

                <Button.Root
                  variant="outline-delete"
                  onPress={() => setIsModalVisible(true)}
                >
                  <Button.Icon>
                    <Feather
                      name="trash-2"
                      size={18}
                      color={colors.rose[400]}
                    />
                  </Button.Icon>
                  <Button.Title className="text-rose-400">
                    Excluir Funcionário
                  </Button.Title>
                </Button.Root>
              </View>
            </Animated.View>
          </ScrollView>

          <DeleteModal
            itemName={`${employee.name} ${employee.surname}`}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onDelete={onDeleteEmployee}
          />
        </>
      )}
    </View>
  )
}
