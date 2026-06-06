'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiLogOut,
  FiHome,
  FiUser,
  FiSettings,
  FiBriefcase,
  FiBarChart2,
  FiUsers,
  FiFileText,
  FiStar,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { Button, Badge } from '@heroui/react';
import { signOut, useSession } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';
import { IoCreateOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';

const navItems = [
  {
    icon: FiHome,
    label: 'Dashboard',
    href: '/dashboard/recruiter',
  },
  {
    icon: FiBriefcase,
    label: 'Jobs',
    href: '/dashboard/recruiter/jobs',
  },
  {
    icon: IoCreateOutline,
    label: 'Create A Job',
    href: '/dashboard/recruiter/jobs/new',
  },
  {
    icon: FiUsers,
    label: 'Candidates',
    href: '/dashboard/recruiter/candidates',
  },
  {
    icon: FiFileText,
    label: 'Applications',
    href: '/dashboard/recruiter/applications',
  },

  {
    icon: FiUser,
    label: 'Company Profile',
    href: '/dashboard/recruiter/company',
  },
  {
    icon: FiSettings,
    label: 'Settings',
    href: '/dashboard/recruiter/settings',
  },
];

const UseAvater = dynamic(() => import('../UseAvater'), {
  ssr: false,
});

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const NavItem = ({ item, index, onClick }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link href={item.href} onClick={onClick}>
          <motion.div
            whileHover={{
              scale: 1.02,
              x: 8,
              transition: { type: 'spring', stiffness: 400, damping: 20 },
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 ease-out ${
              isActive
                ? 'bg-linear-to-r from-violet-500/20 to-purple-500/20 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId='active-nav'
                className='absolute left-0 h-full w-1 rounded-r-full bg-linear-to-b from-violet-500 to-purple-500'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}

            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className={`relative ${isActive ? 'text-violet-400' : 'text-gray-500'}`}
            >
              <Icon className='size-5' />

              {(item.label === 'Messages' ||
                item.label === 'Notifications') && (
                <Badge
                  color='danger'
                  size='sm'
                  className='absolute -right-2 -top-2 h-4 min-w-4'
                >
                  3
                </Badge>
              )}
            </motion.div>

            <motion.span
              className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}
            >
              {item.label}
            </motion.span>

            {!isActive && (
              <motion.div
                className='absolute inset-0 rounded-xl bg-white/5'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        </Link>
      </motion.div>
    );
  };

  const NavContent = ({ isMobile = false, onItemClick }) => (
    <nav className={`flex flex-col gap-1 ${isMobile ? 'px-2' : ''}`}>
      {navItems.map((item, index) => (
        <NavItem
          key={item.label}
          item={item}
          index={index}
          onClick={onItemClick}
        />
      ))}

      <div className='my-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent' />

      <motion.button
        onClick={handleSignOut}
        whileHover={{
          scale: 1.02,
          x: 8,
          transition: { type: 'spring', stiffness: 400, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        className='flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 ease-out hover:bg-red-500/10 hover:text-red-300'
      >
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          <FiLogOut className='size-5' />
        </motion.div>
        Sign Out
      </motion.button>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className='hidden h-[calc(100vh-6rem)] w-72 flex-col border-r border-white/10 bg-linear-to-b from-black via-gray-950 to-black lg:mt-24 lg:flex'
      >
        <div className='border-b border-white/10 p-4'>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className='flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 p-3'
          >
            <UseAvater className='h-10 w-10' user={user} />
            <div className='flex-1'>
              <p className='text-sm font-medium text-white'>
                {mounted ? user?.name || 'User' : 'User'}
              </p>
              <p className='text-xs text-gray-500'>
                {mounted
                  ? user?.email || 'user@example.com'
                  : 'user@example.com'}
              </p>
            </div>
          </motion.div>
        </div>

        <div className='custom-scrollbar flex-1 overflow-y-auto p-4'>
          {NavContent({ isMobile: false })}
        </div>

        <div className='border-t border-white/10 p-4'>
          <p className='text-center text-xs text-gray-600'>© 2024 HireLoop</p>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className='sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl lg:hidden'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className='flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-fuchsia-500'
          >
            <span className='text-sm font-bold text-white'>H</span>
          </motion.div>
          <span className='font-bold text-white'>HireLoop</span>
        </Link>

        <Button
          isIconOnly
          variant='light'
          onPress={() => setIsMobileMenuOpen(true)}
          className='text-white'
        >
          <FiMenu className='size-6' />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden'
            />

            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className='fixed inset-y-0 left-0 z-60 flex w-80 max-w-[85vw] flex-col border-r border-white/10 bg-linear-to-b from-black via-gray-950 to-black lg:hidden'
            >
              <div className='flex items-center justify-between border-b border-white/10 p-4'>
                <div className='flex items-center gap-3'>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500'
                  >
                    <span className='text-lg font-bold text-white'>H</span>
                  </motion.div>
                  <div>
                    <h2 className='text-lg font-bold text-white'>HireLoop</h2>
                    <p className='text-xs text-gray-500'>Navigation Menu</p>
                  </div>
                </div>

                <button
                  type='button'
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label='Close menu'
                  className='rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white'
                >
                  <FiX className='size-5' />
                </button>
              </div>

              <div className='p-4'>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-6 rounded-xl bg-white/5 p-4'
                >
                  <div className='flex items-center gap-3'>
                    <UseAvater className='h-12 w-12' user={user} />
                    <div>
                      <p className='font-medium text-white'>
                        {user?.name || 'User'}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {NavContent({
                  isMobile: true,
                  onItemClick: () => setIsMobileMenuOpen(false),
                })}
              </div>

              <div className='mt-auto border-t border-white/10 p-4'>
                <p className='w-full text-center text-xs text-gray-600'>
                  © 2024 HireLoop
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
