import { ReturnHeader } from '@/src/components/return-header'
import { View } from 'react-native'
import * as Button from '@/src/components/button'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Input } from '@/src/components/input'
import { Controller, useForm } from 'react-hook-form'
import { CampaignSchema, campaignSchema } from '@/src/schemas/campaignSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePOSTCampaign } from '@/src/hooks/campaign/usePOSTCampaign'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useToast } from 'native-base'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TextInputMask } from 'react-native-masked-text'

export default function CreateCampaign() {
  const router = useRouter()
  const toast = useToast()

  const { mutate, data: requestError, isPending, isSuccess } = usePOSTCampaign()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CampaignSchema>({
    resolver: yupResolver(campaignSchema),
  })

  function handleCreateCampaign({
    name,
    date,
    startTime,
    endTime,
    location,
    description,
  }: CampaignSchema) {
    mutate({ name, date, startTime, endTime, location, description })
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
        title: 'Campanha criada com sucesso',
        placement: 'top',
        textAlign: 'center',
        bg: 'success.600',
      })
    }

    return router.navigate('/campaign/')
  }, [isSuccess, requestError])

  return (
    <View className="mx-5 mt-16 flex-1">
      <ReturnHeader title="Nova Campanha" />

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInUp} className="py-8">
          <View className="mb-12" style={{ gap: 16 }}>
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
              name="date"
              render={({ field: { onChange } }) => (
                <Input
                  title="Data"
                  errorMessage={errors.date?.message}
                  onChangeText={onChange}
                />
              )}
            />

            {/* <Controller
              control={control}
              name="date"
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
                    title: 'Data',
                    errorMessage: errors.date?.message,
                  }}
                />
              )}
            /> */}

            <Controller
              control={control}
              name="startTime"
              render={({ field: { onChange } }) => (
                <Input
                  title="Horário Inicial"
                  errorMessage={errors.startTime?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="endTime"
              render={({ field: { onChange } }) => (
                <Input
                  title="Horário Final"
                  errorMessage={errors.endTime?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="location"
              render={({ field: { onChange } }) => (
                <Input
                  title="Localização"
                  errorMessage={errors.location?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <Input
                  title="Descrição"
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
            onPress={handleSubmit(handleCreateCampaign)}
          >
            <Button.Icon>
              <Feather name="plus-square" size={18} color={colors.slate[950]} />
            </Button.Icon>
            <Button.Title>Cadastrar Campanha</Button.Title>
          </Button.Root>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  )
}
