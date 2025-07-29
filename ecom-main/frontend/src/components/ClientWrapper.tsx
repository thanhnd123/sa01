'use client'

import { ReactNode } from 'react'
import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { UserProvider } from '@/contexts/UserContext'
import type { Session } from 'next-auth'

interface ClientWrapperProps {
  children: ReactNode
  session?: Session | null
}

export default function ClientWrapper({ children, session }: ClientWrapperProps) {
  return (
    <NextAuthProvider session={session}>
      <UserProvider>{children}</UserProvider>
    </NextAuthProvider>
  )
}
