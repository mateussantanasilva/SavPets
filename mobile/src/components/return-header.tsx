import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

interface ReturnHeaderProps {
  title: string
}

export function ReturnHeader({ title }: ReturnHeaderProps) {
  const { goBack } = useNavigation()

  return (
    <View className="flex-row items-center justify-center border-b border-slate-700 pb-6">
      <TouchableOpacity
        onPress={() => goBack()}
        activeOpacity={0.8}
        className="absolute left-0 top-0"
      >
        <Feather name="chevron-left" size={28} color={colors.white} />
      </TouchableOpacity>
      <Text className="text-xl font-bold leading-short text-white">
        {title}
      </Text>
    </View>
  )
}
