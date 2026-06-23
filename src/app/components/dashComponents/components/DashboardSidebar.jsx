'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useState } from 'react';
import { RiseLoader } from 'react-spinners';
import SidebarContent from './SidebarContent';
import { useMounted } from '@/app/hooks/useMounted';
import { signOut, useSession } from '@/app/lib/auth-client';


const seekerLinks = [
  { href: '/dashboard/seeker', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/seeker/applications', label: 'Applications', icon: '📋' },
  { href: '/dashboard/seeker/saved', label: 'Saved Jobs', icon: '🔖' },
  { href: '/jobs', label: 'Browse Jobs', icon: '🔍' },
  { href: '/dashboard/seeker/transactions', label: 'Transactions', icon: '💸' },
  { href: '/dashboard/seeker/profile', label: 'My Profile', icon: '👤' },
];

const recruiterLinks = [
  { href: '/dashboard/recruiter', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/recruiter/jobs', label: 'My Jobs', icon: '💼' },
  { href: '/dashboard/recruiter/jobs/new', label: 'Post a Job', icon: '📝' },
  { href: '/dashboard/recruiter/applicants', label: 'Applicants', icon: '👥' },
  { href: '/dashboard/recruiter/transactions', label: 'Transactions', icon: '💸' },
  {
    href: '/dashboard/recruiter/profile',
    label: 'Company Profile',
    icon: '🏢',
  },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Overview', icon: '⚙️' },
  { href: '/dashboard/admin/users', label: 'Users', icon: '👤' },
  { href: '/dashboard/admin/companies', label: 'Companies', icon: '🏢' },
  { href: '/dashboard/admin/jobs', label: 'Jobs', icon: '💼' },
  { href: '/dashboard/admin/applications', label: 'Applications', icon: '📋' },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: '🛠️' },
];

const linksByRole = {
  seeker: seekerLinks,
  recruiter: recruiterLinks,
  admin: adminLinks,
};

const accentByRole = {
  seeker: 'text-emerald-400 bg-emerald-400/10',
  recruiter: 'text-violet-400 bg-violet-400/10',
  admin: 'text-red-400 bg-red-400/10',
};

export default function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const role = user?.role || 'seeker';
  const links = linksByRole[role] || seekerLinks;
  const accent = accentByRole[role] || accentByRole.seeker;

  const mounted = useMounted()
  if(!mounted){
    return null
  }

  if (isPending) {
    return (
      <div className='flex h-screen w-64 items-center justify-center border-r border-white/10 bg-zinc-950'>
        <RiseLoader color='#ef5ff9' size={8} />
      </div>
    );
  }

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.replace('/signin');
  };

  const contentProps = {
    user,
    role,
    links,
    accent,
    pathname,
    mobileOpen,
    setMobileOpen,
    handleSignOut,
    signingOut,
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='hidden w-64 shrink-0 border-r border-white/10 bg-zinc-950 lg:block'>
        <SidebarContent {...contentProps} />
      </aside>

      {/* Mobile Top Bar */}
      <div className='fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-white/10 bg-zinc-950 px-4 py-3 lg:hidden'>
        <Link href='/' className='text-base font-bold text-white'>
          Hire<span className='text-emerald-400'>Loop</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label='Toggle menu'
          className='rounded-lg border border-white/10 p-2 text-slate-400 transition hover:text-white'
        >
          {mobileOpen ? (
            <svg
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className='fixed inset-0 z-30 lg:hidden'>
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={() => setMobileOpen(false)}
          />
          <aside className='absolute left-0 top-0 h-full w-72 border-r border-white/10 bg-zinc-950'>
            <SidebarContent {...contentProps} />
          </aside>
        </div>
      )}
    </>
  );
}
