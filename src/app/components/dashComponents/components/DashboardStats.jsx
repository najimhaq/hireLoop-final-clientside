'use client';

import { motion } from 'motion/react';
import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAward,
  FiDollarSign,
} from 'react-icons/fi';

const iconMap = {
  'Total Job Posts': FiBriefcase,
  'Total Applicants': FiUsers,
  'Active Jobs': FiTrendingUp,
  'Jobs Closed': FiCheckCircle,
  'Pending Reviews': FiClock,
  Completed: FiAward,
  Revenue: FiDollarSign,
  Rejected: FiXCircle,
};

const colorMap = {
  'Total Job Posts': 'from-violet-500 to-purple-500',
  'Total Applicants': 'from-blue-500 to-cyan-500',
  'Active Jobs': 'from-emerald-500 to-teal-500',
  'Jobs Closed': 'from-orange-500 to-red-500',
  'Pending Reviews': 'from-yellow-500 to-amber-500',
  Completed: 'from-green-500 to-emerald-500',
  Revenue: 'from-rose-500 to-pink-500',
  Rejected: 'from-gray-500 to-slate-500',
};

const bgColorMap = {
  'Total Job Posts': 'bg-violet-500/10',
  'Total Applicants': 'bg-blue-500/10',
  'Active Jobs': 'bg-emerald-500/10',
  'Jobs Closed': 'bg-orange-500/10',
  'Pending Reviews': 'bg-yellow-500/10',
  Completed: 'bg-green-500/10',
  Revenue: 'bg-rose-500/10',
  Rejected: 'bg-gray-500/10',
};

export function DashboardStats({
  title,
  value,
  icon,
  color,
  trend,
  trendValue,
  delay = 0,
}) {
  const Icon = icon || iconMap[title] || FiBriefcase;
  const linearColor =
    color || colorMap[title] || 'from-violet-500 to-purple-500';
  const bgColor = bgColorMap[title] || 'bg-violet-500/10';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className='group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/3 to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl'
    >
      {/* Animated linear Border */}
      <motion.div
        className='absolute inset-0 rounded-2xl bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{
          background: `linear-linear(90deg, transparent, ${linearColor.split(' ')[1]}, transparent)`,
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

      {/* Icon Section */}
      <div className='flex items-start justify-between'>
        <div className={`rounded-xl ${bgColor} p-3 backdrop-blur-sm`}>
          <Icon
            className={`h-6 w-6 ${linearColor.split(' ')[1]?.replace('from-', 'text-') || 'text-violet-400'}`}
          />
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              trend === 'up'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </div>
        )}
      </div>

      {/* Value */}
      <motion.h3
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.1, type: 'spring' }}
        className='mt-4 text-3xl font-bold tracking-tight text-white'
      >
        {value}
      </motion.h3>

      {/* Title */}
      <p className='mt-1 text-sm text-gray-400'>{title}</p>

      {/* Decorative Line */}
      <motion.div
        className={`mt-4 h-0.5 w-12 rounded-full bg-linear-to-r ${linearColor}`}
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: delay + 0.2, duration: 0.8 }}
      />
    </motion.div>
  );
}
