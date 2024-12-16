import * as Button from '@/src/components/button'
import { DeleteModal } from '@/src/components/delete-modal'
import { Loading } from '@/src/components/loading'
import { ReturnHeader } from '@/src/components/return-header'
import { useDELETEProvider } from '@/src/hooks/provider/useDELETEProvider'
import { useGETProviderById } from '@/src/hooks/provider/useGETProviderById'
import { Feather } from '@expo/vector-icons'
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export default function ProviderByID() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: provider, isLoading, isError } = useGETProviderById(String(id))

  const { mutate, data: requestError, isSuccess } = useDELETEProvider()

  function onDeleteProvider() {
    mutate(String(id))
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
        title: 'Fornecedor deletado com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/provider/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/provider/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Fornecedor" />

      {isLoading || !provider ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <Animated.View entering={FadeInUp} className="py-8">
              <View className="mb-12 gap-4">
                <View className="gap-0.5">
                  <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                    Razão Social
                  </Text>
                  <Text className="font-body text-base leading-relaxed text-slate-100">
                    {provider.name}
                  </Text>
                </View>

                <View className="gap-0.5">
                  <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                    CNPJ
                  </Text>
                  <Text className="font-body text-base leading-relaxed text-slate-100">
                    {provider.cnpj}
                  </Text>
                </View>

                <View className="gap-0.5">
                  <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                    CEP
                  </Text>
                  <Text className="font-body text-base leading-relaxed text-slate-100">
                    {provider.cep}
                  </Text>
                </View>

                <View className="gap-0.5">
                  <Text className="text-base font-semibold uppercase leading-short text-slate-300">
                    Endereço Completo
                  </Text>
                  <Text className="font-body text-base leading-relaxed text-slate-100">
                    {`${provider.address}, ${provider.locationNumber}${provider.complement ? ` - ${provider.complement}` : ''}`}
                  </Text>
                </View>
              </View>

              <View>
                <Link href={`/provider/update/${id}`} asChild>
                  <Button.Root style={{ gap: 12 }} className="mb-3">
                    <Button.Icon>
                      <Feather
                        name="edit"
                        size={18}
                        color={colors.slate[950]}
                      />
                    </Button.Icon>
                    <Button.Title>Editar Fornecedor</Button.Title>
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
                    Excluir Fornecedor
                  </Button.Title>
                </Button.Root>
              </View>
            </Animated.View>
          </ScrollView>

          <DeleteModal
            itemName={provider.name}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onDelete={onDeleteProvider}
          />
        </>
      )}
    </View>
  )
}
