import { ReactNode, createContext, useState } from 'react'
import { PaymentTransactionResponseProps } from 'react-native-pagseguro-plugpag'

type SalesProviderProps = {
  children: ReactNode
}

type SalesContextProps = {
  sales: PaymentTransactionResponseProps[]
  onAddSale: (data: PaymentTransactionResponseProps) => void;
  onRemoveSale: (transactionId: string) => void
}

export const SalesContext = createContext({} as SalesContextProps)

export function SalesProvider({ children }: SalesProviderProps) {
  const [sales, setSales] = useState<PaymentTransactionResponseProps[]>([])

  function onAddSale(data: PaymentTransactionResponseProps) {
    setSales([...sales, data])
  }

  function onRemoveSale(transactionId: string) {
    const salesUpdated = sales.filter(item => item.transactionId !== transactionId)

    setSales(salesUpdated)
  }

  return (
    <SalesContext.Provider value={{
      sales,
      onAddSale,
      onRemoveSale
    }}>
      {children}
    </SalesContext.Provider>
  )
}
