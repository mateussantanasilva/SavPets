import { Modal, View, Text, StatusBar } from 'react-native'
import * as Button from '@/src/components/button'
import 'tailwindcss/tailwind.css'
import { useState } from 'react'

interface DeleteModalProps {
  itemName: string
  isVisible: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeleteModal({
  itemName,
  isVisible,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const confirmationMessage = `Deseja realmente excluir o registro de ${itemName}?`

  function handleDeleteItem() {
    setIsDeleting(true)

    onDelete()
    onClose()

    setIsDeleting(false)
  }

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
      />
      <View className="flex-1 items-center justify-center">
        <View className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-50" />
        <View className="mx-5 items-center rounded-lg bg-gray-800">
          <Text className="mb-7 px-11 pt-8 text-center text-lg font-semibold text-white">
            {confirmationMessage}
          </Text>

          <View
            className="flex-row justify-center px-7 pb-8"
            style={{ gap: 12 }}
          >
            <Button.Root variant="outline" onPress={onClose}>
              <Button.Title className="px-10 font-bold text-slate-300">
                Cancelar
              </Button.Title>
            </Button.Root>

            <Button.Root
              variant="delete"
              disabled={isDeleting}
              onPress={handleDeleteItem}
              testID="delete-button"
            >
              <Button.Title className="px-8 py-4 font-bold text-slate-950">
                Sim, excluir
              </Button.Title>
            </Button.Root>
          </View>
        </View>
      </View>
    </Modal>
  )
}
