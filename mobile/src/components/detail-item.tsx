import { View, Text } from 'react-native'

interface DetailItemProps {
  title: string
  value: string | Date
}

export function DetailItem({ title, value }: DetailItemProps) {
  return (
    <View className="gap-0.5">
      <Text className="text-base font-semibold uppercase leading-short text-slate-300">
        {title.toUpperCase()}
      </Text>

      <Text className="font-body text-base leading-relaxed text-slate-100">
        {value.toString()}
      </Text>
    </View>
  )
}
