'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiCheck,
  FiArrowRight,
  FiStar,
  FiZap,
  FiShield,
  FiMail,
} from 'react-icons/fi';

const COLORS = ['#8b5cf6', '#a78bfa', '#e879f9', '#f0abfc', '#ffffff'];

const features = [
  { icon: <FiZap className='h-3.5 w-3.5' />, label: 'Instant access' },
  { icon: <FiShield className='h-3.5 w-3.5' />, label: 'Secure & private' },
  { icon: <FiStar className='h-3.5 w-3.5' />, label: 'Premium features' },
];

function ConfettiParticle({ index }) {
  const { color, left, duration, delay, size, rotate, xDrift, isCircle } =
    useMemo(
      () => ({
        color: COLORS[index % COLORS.length],
        left: `${(index * 17.3 + 7) % 100}%`,
        duration: 2.5 + (index % 5) * 0.4,
        delay: (index % 12) * 0.1,
        size: 6 + (index % 5) * 1.6,
        rotate: (index * 47) % 360,
        xDrift: ((index % 7) - 3) * 40,
        isCircle: index % 2 === 0,
      }),
      [index]
    );

  return (
    <motion.div
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: '110vh',
        opacity: [1, 1, 0],
        rotate: rotate + 360,
        x: [0, xDrift],
      }}
      transition={{ duration, delay, ease: 'easeIn' }}
      className='pointer-events-none absolute top-0'
      style={{
        left,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: isCircle ? '50%' : '2px',
      }}
    />
  );
}

// ── customerEmail prop টা server থেকে আসবে ──
export default function SuccessUI({ customerEmail }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkDone, setCheckDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfetti(true), 300);
    const t2 = setTimeout(() => setCheckDone(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-950 to-black'>
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className='absolute -left-1/4 -top-1/4 h-125 w-125 rounded-full bg-violet-600/15 blur-[120px]'
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className='absolute -bottom-1/4 -right-1/4 h-125 w-125 rounded-full bg-fuchsia-600/15 blur-[120px]'
      />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className='pointer-events-none absolute inset-0 overflow-hidden'>
            {Array.from({ length: 60 }).map((_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='w-full max-w-md'
        >
          <div className='overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl'>
            <div className='h-1 w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-violet-500' />

            <div className='p-8 text-center sm:p-10'>
              {/* Checkmark */}
              <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                    delay: 0.2,
                  }}
                  className='relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/40'
                >
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                    className='absolute inset-0 rounded-full bg-violet-500/40'
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={checkDone ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <FiCheck className='h-9 w-9 text-white' strokeWidth={3} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className='mb-1 text-xs font-semibold uppercase tracking-widest text-violet-400'>
                  Payment confirmed
                </p>
                <h1 className='mb-3 text-3xl font-bold text-white'>
                  You&apos;re all set! 🎉
                </h1>
                <p className='mx-auto max-w-xs text-sm leading-relaxed text-gray-400'>
                  Your subscription is now active. Start exploring all the
                  premium features available to you.
                </p>
              </motion.div>

              {/* Customer email — server থেকে আসা real email */}
              {customerEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className='mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5'
                >
                  <FiMail className='h-4 w-4 shrink-0 text-violet-400' />
                  <p className='text-sm text-gray-300'>
                    Confirmation sent to{' '}
                    <span className='font-medium text-white'>
                      {customerEmail}
                    </span>
                  </p>
                </motion.div>
              )}

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className='mt-4 flex flex-wrap justify-center gap-2'
              >
                {features.map((f) => (
                  <span
                    key={f.label}
                    className='flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300'
                  >
                    {f.icon}
                    {f.label}
                  </span>
                ))}
              </motion.div>

              <div className='my-8 h-px w-full bg-white/5' />

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className='flex flex-col gap-3'
              >
                <Link href='/dashboard'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40'
                  >
                    Go to Dashboard
                    <FiArrowRight size={16} />
                  </motion.div>
                </Link>
                <Link href='/pricing'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white'
                  >
                    View plan details
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <div className='border-t border-white/5 bg-white/2 px-8 py-4 text-center'>
              <p className='text-xs text-gray-500'>
                Questions?{' '}
                <Link
                  href='/support'
                  className='text-violet-400 hover:text-violet-300'
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className='mt-6 text-center text-xs text-gray-600'
          >
            Powered by <span className='text-gray-500'>Stripe</span> — secure
            payments
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
