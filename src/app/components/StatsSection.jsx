'use client';

import { Briefcase, Factory, Magnifier, Star } from '@gravity-ui/icons';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <Briefcase className='h-6 w-6' />,
      value: '50K+',
      label: 'Active Jobs',
      color: 'from-violet-500 to-purple-500',
      delay: 0,
    },
    {
      id: 2,
      icon: <Factory className='h-6 w-6' />,
      value: '12K+',
      label: 'Companies',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      id: 3,
      icon: <Magnifier className='h-6 w-6' />,
      value: '2M+',
      label: 'Job Seekers',
      color: 'from-emerald-500 to-teal-500',
      delay: 0.2,
    },
    {
      id: 4,
      icon: <Star className='h-6 w-6' />,
      value: '97%',
      label: 'Satisfaction Rate',
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingIcons = [
    { icon: '💼', x: '10%', y: '20%', delay: 0 },
    { icon: '🏢', x: '85%', y: '15%', delay: 1 },
    { icon: '🔍', x: '15%', y: '70%', delay: 2 },
    { icon: '⭐', x: '90%', y: '75%', delay: 3 },
    { icon: '📊', x: '50%', y: '85%', delay: 4 },
  ];

  return (
    <section className='relative overflow-hidden bg-linear-to-b from-black via-gray-950 to-black py-32 text-white'>
      {/* Animated Background linear */}
      <motion.div
        className='absolute inset-0 opacity-30'
        animate={{
          background: [
            'radial-linear(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            'radial-linear(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            'radial-linear(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Icons Animation */}
      {floatingIcons.map((item, idx) => (
        <motion.div
          key={idx}
          className='absolute hidden text-4xl opacity-20 md:block lg:text-5xl'
          style={{
            left: item.x,
            top: item.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Animated Grid Pattern */}
      <motion.div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `
            linear-linear(to right, rgba(139, 92, 246, 0.2) 1px, transparent 1px),
            linear-linear(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className='relative z-10 mx-auto max-w-7xl px-6'>
        {/* Heading with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-4xl text-center'
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            viewport={{ once: true }}
            className='mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 backdrop-blur-sm'
          >
            <span className='text-sm font-medium text-violet-400'>
              Trusted Worldwide
            </span>
          </motion.div>

          <h2 className='text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl'>
            Empowering{' '}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className='bg-linear-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent'
            >
              15,000+ Job Seekers
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className='mt-6 text-xl text-gray-300'
          >
            Find your dream position with our innovative platform
          </motion.p>

          {/* Job Type Tags with Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className='cursor-pointer mt-8 flex flex-wrap items-center justify-center gap-3'
          >
            {['Remote Jobs', 'On-site Jobs', 'Hybrid Jobs', 'Freelance'].map(
              (job, idx) => (
                <motion.span
                  key={job}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1, type: 'spring' }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className='rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white'
                >
                  {job}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='cursor-pointer mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4'
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className='group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/3 to-transparent p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20'
            >
              {/* Animated linear Border */}
              <motion.div
                className='absolute inset-0 rounded-2xl bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                style={{
                  background: `linear-linear(90deg, transparent, ${stat.color.split(' ')[1]}, transparent)`,
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />

              {/* Card Background Glow */}
              <motion.div
                className='absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-3xl'
                style={{
                  background: `linear-linear(135deg, ${stat.color.split(' ')[1]}, transparent)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Icon with Animation */}
              <motion.div
                className='relative z-10 mb-6 inline-flex rounded-xl bg-linear-to-br from-white/10 to-white/5 p-3 text-white'
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `linear-linear(135deg, ${stat.color.split(' ')[1]}20, transparent)`,
                }}
              >
                {stat.icon}
              </motion.div>

              {/* Number with Counter Animation */}
              <motion.h3
                className='relative z-10 text-5xl font-bold tracking-tight'
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: stat.delay + 0.3, type: 'spring' }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.h3>

              {/* Label */}
              <p className='relative z-10 mt-3 text-gray-400'>{stat.label}</p>

              {/* Decorative Line */}
              <motion.div
                className='relative z-10 mt-6 h-0.5 w-12 rounded-full'
                style={{
                  background: `linear-linear(90deg, ${stat.color.split(' ')[1]}, transparent)`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: stat.delay + 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
