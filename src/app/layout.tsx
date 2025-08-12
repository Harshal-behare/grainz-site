import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GrainZ by Maitri Ramaiya - Transform Your Body, Transform Your Life',
  description: 'Your ultimate fitness companion for personalized workout plans, nutrition guidance, and health tracking.',
  keywords: 'fitness, workout, nutrition, health, bodybuilding, weight loss, muscle gain, GrainZ, Maitri Ramaiya',
  authors: [{ name: 'Maitri Ramaiya' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ef4444',
  openGraph: {
    title: 'GrainZ by Maitri Ramaiya - Transform Your Body, Transform Your Life',
    description: 'Your ultimate fitness companion for personalized workout plans, nutrition guidance, and health tracking.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrainZ by Maitri Ramaiya - Transform Your Body, Transform Your Life',
    description: 'Your ultimate fitness companion for personalized workout plans, nutrition guidance, and health tracking.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}