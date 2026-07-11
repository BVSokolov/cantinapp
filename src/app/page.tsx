"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Root from "./root"

export default function CantinApp() {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  )
}
