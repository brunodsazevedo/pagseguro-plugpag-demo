import { ReactNode, createContext, useState } from 'react'
import { PaymentTransactionResponseProps, PaymentTypes, InstallmentTypes } from 'react-native-pagseguro-plugpag'

type SalesProviderProps = {
  children: ReactNode
}

type SalesContextProps = {
  sales: PaymentTransactionResponseProps[]
  cart: CartProps
  onAddSale: (data: PaymentTransactionResponseProps) => void
  onRemoveSale: (transactionId: string) => void
  onUpdateCart: (data: CartProps) => void
  onClearCart: () => void
}

type CartProps = {
  amount: number
  installments: number
  paymentType: PaymentTypes
  installmentType: InstallmentTypes
}

export const SalesContext = createContext({} as SalesContextProps)

export function SalesProvider({ children }: SalesProviderProps) {
  const [sales, setSales] = useState<PaymentTransactionResponseProps[]>([])
  const [cart, setCart] = useState<CartProps>({} as CartProps)

  function onAddSale(data: PaymentTransactionResponseProps) {
    setSales([...sales, data])
  }

  function onRemoveSale(transactionId: string) {
    const salesUpdated = sales.filter(item => item.transactionId !== transactionId)

    setSales(salesUpdated)
  }

  function onUpdateCart(dataCartUpdated: CartProps) {
    setCart(dataCartUpdated)
  }

  function onClearCart() {
    setCart({} as CartProps)
  }

  return (
    <SalesContext.Provider value={{
      sales,
      cart,
      onAddSale,
      onRemoveSale,
      onUpdateCart,
      onClearCart,
    }}>
      {children}
    </SalesContext.Provider>
  )
}
