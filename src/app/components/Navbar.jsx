'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { AnimatePresence, motion } from 'motion/react';
import { signOut, useSession } from '../lib/auth-client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { data: session } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  const navLinks = [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'Company', href: '/company' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <div className='sticky top-4 z-50 px-4 sm:px-6 lg:px-8'>
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className='mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-[#0B0B0F]/70 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl'
      >
        <div className='flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* LOGO */}
          <Link href='/' className='flex items-center gap-3'>
            <div className='relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-500 to-purple-500 shadow-lg'>
              <div className='absolute inset-0 rounded-2xl bg-white/10' />
              <span className='relative text-xl font-bold text-white'>P</span>
            </div>

            <div className='hidden leading-none sm:block'>
              <h1 className='text-lg font-semibold tracking-tight text-white'>
                Hire Loop
              </h1>
              <p className='mt-1 text-xs text-white/45'>
                Find work with clarity
              </p>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className='hidden items-center gap-6 md:flex'>
            <ul
              className='flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5'
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className='relative'
                  onMouseEnter={() => setHovered(link.href)}
                >
                  {hovered === link.href && (
                    <motion.span
                      layoutId='nav-pill'
                      className='absolute inset-0 rounded-full bg-white/10'
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 28,
                      }}
                    />
                  )}

                  <Link
                    href={link.href}
                    className='relative z-10 block rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className='h-6 w-px bg-white/10' />

            <div className='flex items-center gap-3'>
              {user ? (
                <>
                  <span className='rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75'>
                    Hi, {user.name}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant='ghost'
                    className='text-white/80 hover:bg-white/10'
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link
                  href='/signin'
                  className='text-sm font-medium text-white/70 transition hover:text-violet-300'
                >
                  Sign In
                </Link>
              )}

              <Button
                as={Link}
                href='/register'
                radius='full'
                className='h-11 bg-white px-6 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-zinc-200'
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden'
            aria-label='Toggle Menu'
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {isMenuOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </motion.div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className='overflow-hidden border-t border-white/10 md:hidden'
            >
              <div className='space-y-3 px-4 py-5'>
                <ul className='space-y-2'>
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className='block rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-base font-medium text-white/75 transition hover:bg-white/5 hover:text-white'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className='border-t border-white/10 pt-4'>
                  <div className='flex flex-col gap-3'>
                    {user ? (
                      <>
                        <div className='rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/75'>
                          Signed in as {user.name}
                        </div>
                        <Button
                          onClick={handleSignOut}
                          variant='ghost'
                          className='justify-start text-white/80 hover:bg-white/10'
                        >
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link
                        href='/signin'
                        className='rounded-2xl px-4 py-3 text-base font-medium text-violet-300 transition hover:bg-white/5'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}

                    <Button
                      as={Link}
                      href='/register'
                      className='bg-white font-semibold text-black'
                      radius='full'
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
