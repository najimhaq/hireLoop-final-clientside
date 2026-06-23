import Link from "next/link";
import { FiAlertCircle, FiLock, FiTrendingUp } from "react-icons/fi";

export const UpgradeRequiredPlan = ({
  plan,
  currentApplications,
  maxApplications,
}) => (
  <div className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8'>
    <div className='text-center mb-6'>
      <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center'>
        <FiLock className='w-10 h-10 text-white' />
      </div>
      <h2 className='text-2xl font-bold text-white'>
        Application Limit Reached
      </h2>
      <p className='text-gray-400 mt-2'>
        You have used {currentApplications} out of {maxApplications} free
        applications
      </p>
    </div>

    <div className='bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6'>
      <div className='flex items-start gap-3'>
        <FiAlertCircle className='w-5 h-5 text-amber-400 mt-0.5' />
        <div>
          <p className='text-amber-400 font-medium'>Free Plan Limit Reached</p>
          <p className='text-sm text-gray-400 mt-1'>
            Upgrade to Pro or Enterprise to continue applying for more jobs
          </p>
        </div>
      </div>
    </div>

    <Link
      href='/pricing'
      className='w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all'
    >
      Upgrade Plan
      <FiTrendingUp />
    </Link>
  </div>
);
