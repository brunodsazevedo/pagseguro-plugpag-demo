import { Text, TextInput, TextInputProps, View } from 'react-native'

type Props = TextInputProps & {
  label?: string
  error?: string
}

export function Input({ label, error, ...rest }: Props) {
  const isInvalid = !!error

  return (
    <View>
      <TextInput
        placeholder={label}
        className={`${
          isInvalid ? 'border-red-500' : 'border-gray-400'
        } border text-md text-gray-900 rounded-lg p-3 focus:border-amber-500`}
        {...rest}
      />

      {error && <Text className="text-sm text-red-500 px-2 mt-1">{error}</Text>}
    </View>
  )
}
