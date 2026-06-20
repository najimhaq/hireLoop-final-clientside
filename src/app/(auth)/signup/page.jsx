'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiImage,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiAlertCircle,
  FiUserPlus,
  FiBriefcase,
  FiUsers,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { authClient } from '@/app/lib/auth-client';
import { GrUserAdmin } from 'react-icons/gr';

const roleConfig = {
  seeker: {
    label: 'Job Seeker',
    color: 'text-violet-300',
    gradient: 'from-violet-600 to-fuchsia-600',
    shadow: 'hover:shadow-violet-500/25',
  },
  recruiter: {
    label: 'Recruiter',
    color: 'text-fuchsia-300',
    gradient: 'from-fuchsia-600 to-pink-700',
    shadow: 'hover:shadow-fuchsia-500/25',
  },
  admin: {
    label: 'Admin',
    color: 'text-orange-300',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'hover:shadow-orange-500/25',
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const floatingOrb = (duration) => ({
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 90, 0],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'linear',
  },
});

const passwordLabels = {
  length: '8+ characters',
  uppercase: 'Uppercase letter',
  lowercase: 'Lowercase letter',
  number: 'Number',
  special: 'Special character',
};

function validatePassword(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
}

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  focusedField,
  setFocusedField,
  rightAction,
  delay,
  required = true,
}) {
  const isFocused = focusedField === name;

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate(delay)}>
      <label className='mb-2 block text-sm font-medium text-gray-300'>
        {label}
      </label>

      <div
        className={`relative rounded-xl border transition-all ${
          isFocused
            ? 'border-violet-500 ring-2 ring-violet-500/20'
            : 'border-white/10'
        }`}
      >
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required={required}
          className='w-full rounded-xl bg-white/5 py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none'
          placeholder={placeholder}
        />

        {rightAction && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            {rightAction}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect');
  const redirect = rawRedirect && rawRedirect !== 'null' ? rawRedirect : '/';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [role, setRole] = useState('seeker');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageUrl: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordValidation = useMemo(
    () => validatePassword(formData.password),
    [formData.password]
  );

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const doPasswordsMatch =
    formData.confirmPassword === '' ||
    formData.password === formData.confirmPassword;

  const fields = [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      placeholder: 'John Doe',
      icon: <FiUser className='h-5 w-5' />,
      delay: 0.4,
      required: true,
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'you@example.com',
      icon: <FiMail className='h-5 w-5' />,
      delay: 0.5,
      required: true,
    },
    {
      label: 'Profile Picture URL (optional)',
      name: 'imageUrl',
      type: 'url',
      placeholder: 'https://example.com/your-photo.jpg',
      icon: <FiImage className='h-5 w-5' />,
      delay: 0.55,
      required: false,
    },
    {
      label: 'Password',
      name: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: '••••••••',
      icon: <FiLock className='h-5 w-5' />,
      delay: 0.6,
      rightAction: (
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='text-gray-500 transition hover:text-gray-300'
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      ),
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
      placeholder: '••••••••',
      icon: <FiCheck className='h-5 w-5' />,
      delay: 0.7,
      rightAction: (
        <button
          type='button'
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className='text-gray-500 transition hover:text-gray-300'
        >
          {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      ),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error('Please meet all password requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.imageUrl) {
      try {
        new URL(formData.imageUrl);
      } catch {
        toast.error('Please enter a valid image URL');
        return;
      }
    }

    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        email: formData.email.trim(),
        password: formData.password.trim(),
        name: formData.name.trim(),
        role,
        image: formData.imageUrl || undefined,
        callbackURL: '/',
      });

      if (result?.error) {
        toast.error(result.error.message || 'Sign up failed');
        return;
      }

      toast.success(`Account created successfully as ${role}!`);
      router.replace(redirect);
    } catch (error) {
      console.error('Full error object:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Role label helper
  const roleDisplayName =
    role === 'seeker'
      ? 'Job Seeker'
      : role === 'recruiter'
        ? 'Recruiter'
        : 'Admin';

  return (
    <div className='relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-950 to-black'>
      {/* Background Orbs */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          {...floatingOrb(20)}
          className='absolute -left-1/4 -top-1/4 h-125 w-125 rounded-full bg-violet-600/20 blur-[100px]'
        />
        <motion.div
          {...floatingOrb(15)}
          className='absolute -bottom-1/4 -right-1/4 h-125 w-125 rounded-full bg-fuchsia-600/20 blur-125'
        />
      </div>

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
            <Link href='/' className='group inline-flex items-center gap-3'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-500 to-purple-500 shadow-lg'
              >
                <FiUserPlus className='text-2xl text-white' />
              </motion.div>
              <div>
                <h1 className='bg-linear-to-r from-white to-gray-400 bg-clip-text text-2xl font-bold text-transparent'>
                  HireLoop
                </h1>
                <p className='text-xs text-gray-500'>Create your account</p>
              </div>
            </Link>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'
          >
            <div className='mb-8 text-center'>
              <h2 className='text-3xl font-bold text-white'>Get Started</h2>
              <p className='mt-2 text-gray-400'>
                Join thousands of professionals
              </p>
            </div>

            {/* Social Buttons */}
            <div className='mb-6 grid grid-cols-2 gap-3'>
              {[
                { label: 'Google', icon: <FcGoogle size={20} /> },
                { label: 'GitHub', icon: <FaGithub size={18} /> },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='button'
                  className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-white transition hover:bg-white/10'
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className='relative mb-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-white/10' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white/5 px-2 text-gray-500'>
                  or sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              {/* Input Fields */}
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              ))}

              {/* ── Role Selection ─────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className='space-y-2'
              >
                <label className='block text-sm font-medium text-gray-300'>
                  I am a
                </label>

                <div className='grid grid-cols-3 gap-3'>
                  {/* Seeker */}
                  <motion.button
                    type='button'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('seeker')}
                    className={`relative rounded-xl border p-4 transition-all ${
                      role === 'seeker'
                        ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className='flex flex-col items-center gap-2 text-center'>
                      <div
                        className={`rounded-full p-2 ${role === 'seeker' ? 'bg-violet-500/20' : 'bg-white/5'}`}
                      >
                        <FiUsers
                          className={`h-6 w-6 ${role === 'seeker' ? 'text-violet-400' : 'text-gray-400'}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${role === 'seeker' ? 'text-white' : 'text-gray-300'}`}
                        >
                          Job Seeker
                        </p>
                        <p className='text-xs text-gray-500'>
                          Looking for jobs
                        </p>
                      </div>
                    </div>
                    {role === 'seeker' && (
                      <motion.div
                        layoutId='active-role'
                        className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500'
                      >
                        <FiCheck className='h-3 w-3 text-white' />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Recruiter */}
                  <motion.button
                    type='button'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('recruiter')}
                    className={`relative rounded-xl border p-4 transition-all ${
                      role === 'recruiter'
                        ? 'border-fuchsia-500 bg-fuchsia-500/10 shadow-lg shadow-fuchsia-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className='flex flex-col items-center gap-2 text-center'>
                      <div
                        className={`rounded-full p-2 ${role === 'recruiter' ? 'bg-fuchsia-500/20' : 'bg-white/5'}`}
                      >
                        <FiBriefcase
                          className={`h-6 w-6 ${role === 'recruiter' ? 'text-fuchsia-400' : 'text-gray-400'}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${role === 'recruiter' ? 'text-white' : 'text-gray-300'}`}
                        >
                          Recruiter
                        </p>
                        <p className='text-xs text-gray-500'>Hiring talents</p>
                      </div>
                    </div>
                    {role === 'recruiter' && (
                      <motion.div
                        layoutId='active-role'
                        className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-500'
                      >
                        <FiCheck className='h-3 w-3 text-white' />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Admin */}
                  <motion.button
                    type='button'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole('admin')}
                    className={`relative rounded-xl border p-4 transition-all ${
                      role === 'admin'
                        ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className='flex flex-col items-center gap-2 text-center'>
                      <div
                        className={`rounded-full p-2 ${role === 'admin' ? 'bg-orange-500/20' : 'bg-white/5'}`}
                      >
                        <GrUserAdmin
                          className={`h-6 w-6 ${role === 'admin' ? 'text-orange-400' : 'text-gray-400'}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${role === 'admin' ? 'text-white' : 'text-gray-300'}`}
                        >
                          Admin
                        </p>
                        <p className='text-xs text-gray-500'>Manage platform</p>
                      </div>
                    </div>
                    {role === 'admin' && (
                      <motion.div
                        layoutId='active-role'
                        className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500'
                      >
                        <FiCheck className='h-3 w-3 text-white' />
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Password Requirements */}
              <AnimatePresence>
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='space-y-2 rounded-lg bg-white/5 p-3'
                  >
                    <p className='text-xs font-medium text-gray-400'>
                      Password requirements:
                    </p>
                    <div className='grid grid-cols-2 gap-2 text-xs'>
                      {Object.entries(passwordValidation).map(
                        ([key, valid]) => (
                          <div key={key} className='flex items-center gap-2'>
                            {valid ? (
                              <FiCheck className='text-green-400' size={12} />
                            ) : (
                              <FiAlertCircle
                                className='text-gray-500'
                                size={12}
                              />
                            )}
                            <span
                              className={
                                valid ? 'text-green-400' : 'text-gray-500'
                              }
                            >
                              {passwordLabels[key]}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password mismatch */}
              {!doPasswordsMatch && formData.confirmPassword && (
                <p className='text-xs text-rose-400'>Passwords do not match</p>
              )}

              {/* Submit Button */}
              <motion.button
                type='submit'
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full overflow-hidden rounded-xl bg-linear-to-r ${roleConfig[role].gradient} py-3.5 font-semibold text-white transition-all hover:shadow-lg ${roleConfig[role].shadow} disabled:opacity-50`}
              >
                <motion.div
                  className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent'
                  animate={{ x: isLoading ? '200%' : ['0%', '200%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: isLoading ? 0 : Infinity,
                    repeatDelay: 2,
                  }}
                />

                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    Creating account...
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    Create Account as{' '}
                    <span className={`font-bold ${roleConfig[role].color}`}>
                      {roleConfig[role].label}
                    </span>
                    <FiArrowRight size={18} />
                  </div>
                )}
              </motion.button>

              <p className='text-center text-xs text-gray-500'>
                By signing up, you agree to our{' '}
                <Link
                  href='/terms'
                  className='text-violet-400 hover:text-violet-300'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href='/privacy'
                  className='text-violet-400 hover:text-violet-300'
                >
                  Privacy Policy
                </Link>
              </p>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-400'>
                Already have an account?{' '}
                <Link
                  href={
                    redirect !== '/'
                      ? `/signin?redirect=${redirect}`
                      : '/signin'
                  }
                  className='font-medium text-violet-400 transition hover:text-violet-300'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
