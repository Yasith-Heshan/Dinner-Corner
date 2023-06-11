import './globals.css'
import {Inter} from 'next/font/google'
import NavBar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
    title: 'DinnerCorner',
    description: 'Buy delicious dinner for the lowest price.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NavBar/>
      {children}
      </body>
    </html>
  )
}
