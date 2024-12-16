import { Text, View } from 'react-native'

export function ListEmpty() {
  return (
    <View className="mt-40">
      <Text className="text-center text-base font-semibold text-slate-100">
        A lista está vazia. Adicione registros nela para visualizá-los.
      </Text>
    </View>
  )
}
