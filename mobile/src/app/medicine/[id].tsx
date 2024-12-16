import * as Button from '@/src/components/button'
import { DeleteModal } from '@/src/components/delete-modal'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { useDELETEMedicine } from '@/src/hooks/medicine/useDELETEMedicine'
import { useGETMedicineById } from '@/src/hooks/medicine/useGETMedicineById'
import { formatDate } from '@/src/utils/formatDate'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export default function MedicineByID() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: medicine, isError, isLoading } = useGETMedicineById(String(id))

  const { mutate, data: requestError, isSuccess } = useDELETEMedicine()

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
        title: 'Medicamento deletado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/medicine/')
  }, [isSuccess, requestError])

  function onDeleteMedicine() {
    mutate(String(id))
  }

  if (isError) return <Redirect href="/medicine/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Medicamento" />

      {isLoading || !medicine ? (
        <Loading />
      ) : (
        <>
          <Animated.ScrollView
            entering={FadeInUp}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="gap-4 py-8">
              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Nome
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {medicine.name}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Data fabricação
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {formatDate(medicine.manufacturingDate)}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Data de validade
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {formatDate(medicine.expirationDate)}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Fornecedor
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {medicine.provider}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Utilidade
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {medicine.utility}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Observação
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {medicine.observation}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Bula
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {medicine.leaflet}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Data de chegada
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {formatDate(medicine.arrivalDate)}
                </Text>
              </View>

              <View className="gap-0.5">
                <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                  Quantidade
                </Text>
                <Text className="font-body text-base leading-relaxed text-slate-100">
                  {medicine.amount.toString()}
                </Text>
              </View>
            </View>

            <View>
              <Link href={`/medicine/update/${id}`} asChild>
                <Button.Root style={{ gap: 12 }} className="mb-3">
                  <Button.Icon>
                    <Feather name="edit" size={18} color={colors.slate[950]} />
                  </Button.Icon>
                  <Button.Title>Editar medicamento</Button.Title>
                </Button.Root>
              </Link>

              <Button.Root
                variant="outline-delete"
                onPress={() => setIsModalVisible(true)}
              >
                <Button.Icon>
                  <Feather name="trash-2" size={18} color={colors.rose[400]} />
                </Button.Icon>
                <Button.Title className="text-rose-400">
                  Excluir medicamento
                </Button.Title>
              </Button.Root>
            </View>
          </Animated.ScrollView>
          <DeleteModal
            itemName={medicine.name}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onDelete={onDeleteMedicine}
          />
        </>
      )}
    </View>
  )
}
