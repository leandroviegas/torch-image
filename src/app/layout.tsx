import './globals.css'
import { Inter } from 'next/font/google';
 
const inter = Inter({
  weight: '500',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
