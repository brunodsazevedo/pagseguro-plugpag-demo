import { useContext } from "react";

import { SalesContext } from "@contexts/SalesContext";

export function useSales() {
  const context = useContext(SalesContext)

  return context
}
