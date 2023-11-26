'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Sidemenu from '@/components/Sidemenu'
import store from '../src/store'
import { Provider } from 'react-redux'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Nav/>
        <Sidemenu/>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
