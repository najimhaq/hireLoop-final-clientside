'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiAlertCircle,
  FiUserPlus,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import toast from 'react-hot-toast';
import { signUp } from '@/app/lib/auth-client';

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
          required
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'you@example.com',
      icon: <FiMail className='h-5 w-5' />,
      delay: 0.5,
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

    setIsLoading(true);

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: '/',
      });

      if (result?.error) {
        toast.error(result.error.message || 'Sign up failed');
        return;
      }

      toast.success('Account created successfully!');
      router.push('/signin');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black'>
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          {...floatingOrb(20)}
          className='absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[100px]'
        />
        <motion.div
          {...floatingOrb(15)}
          className='absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[100px]'
        />
      </div>

      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.2) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className='mb-8 text-center'
          >
            <Link href='/' className='group inline-flex items-center gap-3'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-purple-500 shadow-lg'
              >
                <FiUserPlus className='text-2xl text-white' />
              </motion.div>

              <div>
                <h1 className='bg-gradient-to-r from-white to-gray-400 bg-clip-text text-2xl font-bold text-transparent'>
                  HireLoop
                </h1>
                <p className='text-xs text-gray-500'>Create your account</p>
              </div>
            </Link>
          </motion.div>

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

            <div className='mb-6 grid grid-cols-2 gap-3'>
              {[
                { label: 'Google', icon: <FcGoogle size={20} /> },
                { label: 'GitHub', icon: <FaGithub size={18} /> },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-white transition hover:bg-white/10'
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className='relative mb-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-white/10'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white/5 px-2 text-gray-500'>
                  or sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
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

              {!doPasswordsMatch && formData.confirmPassword && (
                <p className='text-xs text-rose-400'>Passwords do not match</p>
              )}

              <motion.button
                type='submit'
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50'
              >
                <motion.div
                  className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent'
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
                    Creating account...
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    Create Account
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
                  href='/signin'
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
