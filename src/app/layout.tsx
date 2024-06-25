import { Providers } from '@/store/providers'
import React from 'react'
import { Toaster } from 'sonner'
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
          <Toaster />
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  )
}
