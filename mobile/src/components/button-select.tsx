import { FC, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { clsx } from 'clsx'
import { FormControl } from 'native-base'

interface SelectButtonProps {
  label: string
  onToggle: () => void
  isSelected?: boolean
}

const SelectButton: FC<SelectButtonProps> = ({
  label,
  onToggle,
  isSelected,
}) => (
  <View>
    <Pressable
      className={clsx(
        'h-12 rounded-md border border-slate-700 bg-slate-800 px-4 pt-3 font-body text-sm leading-short',
        isSelected && 'border-sky-300',
      )}
      onPress={onToggle}
    >
      <Text
        className={clsx(
          'items-center text-slate-300',
          isSelected && 'text-sky-300',
        )}
      >
        {label}
      </Text>
    </Pressable>
  </View>
)

interface ButtonSelectProps {
  title: string
  options: { label: string; value: string }[]
  value: string | null
  errorMessage?: string | null
  onChange: (value: string | null) => void
}

const ButtonSelect: FC<ButtonSelectProps> = ({
  title,
  errorMessage = null,
  options,
  value,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(value)

  const handleOptionToggle = (label: string) => {
    const newValue = selectedOption === label ? null : label
    setSelectedOption(newValue)
    onChange(newValue)
  }

  useEffect(() => {
    setSelectedOption(value)
  }, [value])

  return (
    <View className="gap-0.5">
      <Text className="text-base font-semibold leading-short text-slate-300">
        {title}
      </Text>
      <FormControl>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {options.map((option) => (
            <SelectButton
              key={option.label}
              label={option.label}
              onToggle={() => handleOptionToggle(option.label)}
              isSelected={selectedOption === option.label}
            />
          ))}
        </View>
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    </View>
  )
}

export { ButtonSelect }
