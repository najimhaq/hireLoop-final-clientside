'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLogIn,
} from 'react-icons/fi';
import { signIn } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        toast.error(result.error.message || 'Sign in failed');
      } else {
        toast.success('Welcome back!');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-950 to-black'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -left-1/4 -top-1/4 h-125 w-125 rounded-full bg-violet-600/20 blur-[100px]'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -bottom-1/4 -right-1/4 h-125 w-125 rounded-full bg-fuchsia-600/20 blur-[100px]'
        />
      </div>

      {/* Grid Pattern */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `linear-linear(to right, rgba(139, 92, 246, 0.2) 1px, transparent 1px),
                          linear-linear(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className='relative z-10 flex min-h-screen items-center justify-center px-4 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='w-full max-w-md'
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className='mb-8 text-center'
          >
            <Link href='/' className='inline-flex items-center gap-3 group'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-500 shadow-lg group-hover:scale-105 transition-transform'>
                <FiLogIn className='text-xl font-bold text-white' />
              </div>
              <h1 className='text-2xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                HireLoop
              </h1>
            </Link>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'
          >
            {/* Header */}
            <div className='mb-8 text-center'>
              <h2 className='text-3xl font-bold text-white'>Welcome Back</h2>
              <p className='mt-2 text-gray-400'>Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className='mb-2 block text-sm font-medium text-gray-300'>
                  Email Address
                </label>
                <div className='relative'>
                  <FiMail className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500' />
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-500 transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20'
                    placeholder='you@example.com'
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className='mb-2 block text-sm font-medium text-gray-300'>
                  Password
                </label>
                <div className='relative'>
                  <FiLock className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className='w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder-gray-500 transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20'
                    placeholder='••••••••'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300'
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className='text-right'
              >
                <Link
                  href='/auth/forgot-password'
                  className='text-sm text-violet-400 transition hover:text-violet-300'
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type='submit'
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='relative w-full overflow-hidden rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50'
              >
                <motion.div
                  className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent'
                  animate={{
                    x: isLoading ? '200%' : ['0%', '200%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isLoading ? 0 : Infinity,
                    repeatDelay: 2,
                  }}
                />
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    Signing in...
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    Sign In
                    <FiArrowRight size={18} />
                  </div>
                )}
              </motion.button>

              {/* Divider */}
              <div className='relative my-6'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-white/10'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='bg-white/5 px-2 text-gray-500'>
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className='grid grid-cols-2 gap-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-white transition hover:bg-white/10'
                >
                  <svg className='h-5 w-5' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='currentColor'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Google
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-white transition hover:bg-white/10'
                >
                  <svg
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                  </svg>
                  GitHub
                </motion.button>
              </div>

              {/* Sign Up Link */}
              <p className='text-center text-gray-400'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/signup'
                  className='font-medium text-violet-400 transition hover:text-violet-300'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
