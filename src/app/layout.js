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
      <body className='flex min-h-screen flex-col antialiased'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          {/* Nav */}
          <Navbar />
        </header>

        <main className='grow'>
          <div className='max-w-7xl mx-auto '>{children}</div>
        </main>
        {/* footer */}
        <Footer />
      </body>
    </html>
  );
}
