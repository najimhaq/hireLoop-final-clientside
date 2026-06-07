import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export const metadata = {
  title: 'HireLoop',
  description: 'A dream recruiting agency',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      data-theme='dark'
      suppressHydrationWarning
      className={`${manrope.className} dark`}
    >
      <body className='flex min-h-screen flex-col bg-black antialiased'>
        <Navbar />

        <main className='grow'>
          <div className='mx-auto max-w-full'>{children}</div>
        </main>

        <Footer />
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
