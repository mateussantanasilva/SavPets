import { Dispatch, SetStateAction } from 'react'
import { Modal, VStack, Pressable, Box, Text } from 'native-base'

interface Option {
  label: string
  value: string
}

interface DropdownModalProps {
  options: Option[]
  onValueChange: Dispatch<SetStateAction<string>>
  isOpen: boolean
  onClose: () => void
}

const DropdownModal: React.FC<DropdownModalProps> = ({
  options,
  onValueChange,
  isOpen,
  onClose,
}) => {
  const handleSelect = (value: string) => {
    onValueChange(value)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="300" p={1} bg="#1e293b">
        <VStack space={2}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => handleSelect(option.value)}
            >
              <Box p={3}>
                <Text color="#cbd5e1">{option.label}</Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </Modal.Content>
    </Modal>
  )
}

export default DropdownModal
