// src/app/components/dashComponents/ApplicationStatusCard.jsx
// app/jobs/[id]/apply/page.jsx - main page
import { FiCheckCircle, FiStar } from "react-icons/fi";

export const  ApplicationStatusCard = ({
  plan,
  currentApplications,
  hasReachedLimit,
}) => {
  const percentage = (currentApplications / plan.maxApplications) * 100;

  return (
    <div className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-24'>
      <h3 className='text-lg font-semibold text-white mb-4'>
        Your Application Status
      </h3>

      {/* Plan Info */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-gray-400'>Current Plan</span>
          <span className='text-white font-semibold'>{plan.name}</span>
        </div>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-gray-400'>Applications Used</span>
          <span
            className={`font-semibold ${hasReachedLimit ? 'text-amber-400' : 'text-emerald-400'}`}
          >
            {currentApplications} / {plan.maxApplications}
          </span>
        </div>

        {/* Progress Bar */}
        <div className='mt-2 h-2 bg-white/10 rounded-full overflow-hidden'>
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              hasReachedLimit
                ? 'bg-amber-500'
                : 'bg-linear-to-r from-violet-500 to-fuchsia-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Features */}
      <div className='border-t border-white/10 pt-4'>
        <p className='text-sm text-gray-400 mb-3'>Free Plan Features:</p>
        <ul className='space-y-2'>
          <li className='flex items-center gap-2 text-sm'>
            <FiCheckCircle className='w-4 h-4 text-emerald-400' />
            <span className='text-gray-300'>Browse jobs</span>
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <FiCheckCircle className='w-4 h-4 text-emerald-400' />
            <span className='text-gray-300'>Save up to 50 jobs</span>
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <FiCheckCircle className='w-4 h-4 text-emerald-400' />
            <span className='text-gray-300'>Basic profile</span>
          </li>
        </ul>
      </div>

      {!hasReachedLimit && (
        <div className='mt-6 p-3 bg-violet-500/10 rounded-xl border border-violet-500/20'>
          <div className='flex items-start gap-2'>
            <FiStar className='w-4 h-4 text-violet-400 mt-0.5' />
            <p className='text-xs text-gray-300'>
              You have {plan.maxApplications - currentApplications} application
              {plan.maxApplications - currentApplications !== 1 ? 's' : ''}{' '}
              remaining
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
