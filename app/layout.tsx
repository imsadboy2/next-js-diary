import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Sidemenu from '@/components/Sidemenu'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '하루끝',
  description: '하루끝',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Nav/>
        <Sidemenu/>
          {children}
      </body>
    </html>
  )
}
