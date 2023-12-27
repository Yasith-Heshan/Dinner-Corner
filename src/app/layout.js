import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/Navbar/Navbar';
import { AuthContextProvider } from '@/app/context/AuthContext';
import { classNames } from '@/utils/supportFuncitons';
import CustomToast from '@/components/CustomToast/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DinnerCorner',
  description: 'Buy delicious dinner for the lowest price.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Dinner Corner</title>
      </head>
      <body className={classNames(inter.className, 'bg-[#1F2937] text-white')}>
        <AuthContextProvider>
          <NavBar />
          {children}
          <CustomToast />
        </AuthContextProvider>
      </body>
    </html>
  );
}
