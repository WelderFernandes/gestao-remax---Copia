import { Providers } from '@/store/providers'
import React from 'react'
import { Toaster } from 'sonner'
import AuthProvider from './_providers/auth'
import MyApp from './app'

export const metadata = {
  title: 'Modernize Main Demo',
  description: 'Modernize Main kit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AuthProvider>
            <Toaster />
            <MyApp>{children}</MyApp>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
