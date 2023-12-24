import './globals.css'
import {Inter} from 'next/font/google'
import NavBar from "@/components/Navbar/Navbar";
import {AuthContextProvider} from "@/app/context/AuthContext";


const inter = Inter({subsets: ['latin']})


export const metadata = {
    title: 'DinnerCorner',
    description: 'Buy delicious dinner for the lowest price.',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Dinner Corner</title>
        </head>
        <body className={inter.className}>
        <AuthContextProvider>
            <NavBar/>
            {children}
        </AuthContextProvider>
        </body>
        </html>
    )
}
