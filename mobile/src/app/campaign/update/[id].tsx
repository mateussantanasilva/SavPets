import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Input } from '@/src/components/input'
import { useGETCampaignById } from '@/src/hooks/campaign/useGETCampaignById'
import { Loading } from '@/src/components/loading'
import { usePUTCampaign } from '@/src/hooks/campaign/usePUTCampaign'
import { Controller, useForm } from 'react-hook-form'
import { CampaignSchema, campaignSchema } from '@/src/schemas/campaignSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useToast } from 'native-base'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UpdateCampaignById() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToast()

  const { data: campaign, isError, isLoading } = useGETCampaignById(String(id))

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CampaignSchema>({
    resolver: yupResolver(campaignSchema),

    defaultValues: {
      name: campaign?.name,
      date: campaign?.date,
      startTime: campaign?.startTime,
      endTime: campaign?.endTime,
      location: campaign?.location,
      description: campaign?.description,
    },
  })

  const { mutate, data: requestError, isPending, isSuccess } = usePUTCampaign()

  function handleUpdateCampaign({
    name,
    date,
    startTime,
    endTime,
    location,
    description,
  }: CampaignSchema) {
    if (
      name === campaign?.name &&
      date === campaign?.date &&
      startTime === campaign?.startTime &&
      endTime === campaign?.endTime &&
      location === campaign?.location &&
      description === campaign?.description
    )
      return

    const updatedCampaign = {
      name,
      date,
      startTime,
      endTime,
      location,
      description,
    }

    mutate({ id: String(id), updatedCampaign })
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
        title: 'Campanha atualizada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/campaign/')
  }, [isSuccess, requestError])

  if (isError) return <Redirect href="/campaign/" />

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Editar Campanha" />

      {isLoading ? (
        <Loading />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInUp} className="py-8">
            <View className="mb-12" style={{ gap: 16 }}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Nome"
                    defaultValue={value}
                    errorMessage={errors.name?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Data"
                    defaultValue={value}
                    errorMessage={errors.date?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="startTime"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Horário Inicial"
                    defaultValue={value}
                    errorMessage={errors.startTime?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="endTime"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Horário final"
                    defaultValue={value}
                    errorMessage={errors.endTime?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="location"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Localização"
                    defaultValue={value}
                    errorMessage={errors.location?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="Descrição"
                    defaultValue={value}
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                    multiline={true}
                    textAlignVertical="top"
                  />
                )}
              />
            </View>

            <Button.Root
              disabled={isSubmitting || isPending}
              onPress={handleSubmit(handleUpdateCampaign)}
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
          </Animated.View>
        </KeyboardAwareScrollView>
      )}
    </View>
  )
}
