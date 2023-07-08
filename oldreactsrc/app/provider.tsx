'use client'

import { AuthProvider } from '@/provider/auth_provider'

export default function Provider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
