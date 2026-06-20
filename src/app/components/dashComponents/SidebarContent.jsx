import Image from 'next/image';
import Link from 'next/link';
import { RiseLoader } from 'react-spinners';

const roleLabel = {
  seeker: 'Job Seeker',
  recruiter: 'Recruiter',
  admin: 'Admin',
};

export default function SidebarContent({
  user,
  role,
  links,
  accent,
  pathname,
  mobileOpen,
  setMobileOpen,
  handleSignOut,
  signingOut,
}) {
  return (
    <div className='flex h-full flex-col'>
      {/* Logo */}
      <div className='border-b border-white/10 px-5 py-5'>
        <Link href='/' className='flex items-center gap-3'>
          <div className='leading-none'>
            <Image
              src='/images/logo.png'
              alt='Hire Loop Logo'
              width={80} // mobile default
              height={32}
              priority
              className='block sm:hidden' // mobile only
            />
            <Image
              src='/images/logo.png'
              alt='Hire Loop Logo'
              width={80} // desktop
              height={40}
              className='hidden sm:block logo' // desktop only
              priority
            />
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className='border-b border-white/10 px-5 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white overflow-hidden'>
            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name || 'User'}
                width={36}
                height={36}
                referrerPolicy='no-referrer'
                className='rounded-full object-cover'
              />
            ) : (
              user?.name?.[0]?.toUpperCase() || 'U'
            )}
          </div>
          <div className='min-w-0'>
            <p className='truncate text-sm font-medium text-white'>
              {user?.name || 'User'}
            </p>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${accent}`}
            >
              {roleLabel[role] || role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className='flex-1 overflow-y-auto px-3 py-4'>
        <ul className='space-y-1'>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? 'bg-white/10 font-medium text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className='text-base'>{link.icon}</span>
                  {link.label}
                  {isActive && (
                    <span className='ml-auto h-1.5 w-1.5 rounded-full bg-white' />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className='my-4 border-t border-white/10' />

        {/* Settings & Pricing */}
        <ul className='space-y-1'>
          <li>
            <Link
              href='/dashboard/settings'
              onClick={() => setMobileOpen(false)}
              className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white'
            >
              <span className='text-base'>⚙️</span>
              Settings
            </Link>
          </li>
          {role !== 'admin' && (
            <li>
              <Link
                href='/pricing'
                onClick={() => setMobileOpen(false)}
                className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white'
              >
                <span className='text-base'>💎</span>
                Pricing
                {user?.plan === 'free' && (
                  <span className='ml-auto rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-xs text-emerald-400'>
                    Upgrade
                  </span>
                )}
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Plan Badge + Sign Out */}
      <div className='space-y-3 border-t border-white/10 px-5 py-4'>
        {role !== 'admin' && (
          <div className='flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2'>
            <span className='text-xs text-slate-500'>Current Plan</span>
            <span className='text-xs font-semibold capitalize text-white'>
              {user?.plan || 'free'}
            </span>
          </div>
        )}
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className='flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50'
        >
          {signingOut ? (
            <RiseLoader size={6} color='#ef4444' />
          ) : (
            <>
              <span>🚪</span>
              Sign Out
            </>
          )}
        </button>
      </div>
    </div>
  );
}
