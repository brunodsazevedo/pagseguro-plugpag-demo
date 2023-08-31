import { Text, View } from 'react-native';
import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';
import { styled } from 'nativewind';

type Props = CurrencyInputProps & {
  label?: string
  error?: string
}

const CurrencyInputStyled = styled(CurrencyInput)

export function InputCurrency({ label, error, ...rest }: Props) {
  const isInvalid = !!error

  return (
    <View>
      <CurrencyInputStyled
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