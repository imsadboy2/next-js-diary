'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Sidemenu from '@/components/Sidemenu'
import store from '../src/store'
import { Provider } from 'react-redux'
import Signbtn from '@/components/Login'
import { SessionProvider } from 'next-auth/react'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Nav/>
        <Sidemenu/>
        <SessionProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
