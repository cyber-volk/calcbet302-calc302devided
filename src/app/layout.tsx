import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from './components/shared/Navbar'

const inter = localFont({
  src: [
    {
      path: './fonts/GeistVF.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GeistVF.woff',
      weight: '700',
      style: 'normal',
    }
  ],
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
})

export const metadata = {
  title: 'Calc302 - Financial Calculator',
  description: 'A powerful financial calculator with two versions: original and modular.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
