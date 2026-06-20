'use client';

import { useState } from 'react';

import ComparisonTable from './ComparisonTable';
import FAQSection from './FAQSection';
import PlanCard from './PlanCard';
import useCheckout from '../hooks/useCheckout';
import { recruiterPlans, seekerPlans } from '../config/pricingData';
import {
  recruiterComparison,
  seekerComparison,
} from '../config/comparisonData';

export default function PricingDetailsPage() {
  const { handleCheckout, loadingPlan } = useCheckout();
  const [activeTab, setActiveTab] = useState('seeker');

  return (
    <>
      {/* Hero Section */}
      <div className='relative overflow-hidden pt-16 pb-12 border-b border-white/5'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl' />
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl' />
        </div>

        <div className='container mx-auto px-4 text-center relative z-10'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
            Simple, Transparent
            <span className='block md:inline bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>
              {' '}
              Pricing
            </span>
          </h1>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
            Choose the plan that fits your needs. Upgrade anytime to unlock more
            opportunities.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12'>
        {/* Tabs */}
        <div className='flex justify-center gap-4 mb-12'>
          <button
            onClick={() => setActiveTab('seeker')}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium ${
              activeTab === 'seeker'
                ? 'bg-linear-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🎯 For Job Seekers
          </button>
          <button
            onClick={() => setActiveTab('recruiter')}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium ${
              activeTab === 'recruiter'
                ? 'bg-linear-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🏢 For Recruiters
          </button>
        </div>

        {/* Plan Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {(activeTab === 'seeker' ? seekerPlans : recruiterPlans).map(
            (plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={index}
                accent={
                  plan.id === 'pro' || plan.id === 'pro' ? 'violet' : 'emerald'
                }
                onCheckout={handleCheckout}
                isLoading={loadingPlan === plan.planId}
              />
            )
          )}
        </div>

        {/* Comparison Table */}
        <div className='mt-20 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-center text-white mb-8'>
            📊 Compare Plans
          </h2>
          <ComparisonTable
            rows={
              activeTab === 'seeker' ? seekerComparison : recruiterComparison
            }
            planNames={
              activeTab === 'seeker'
                ? ['Free', 'Pro', 'Enterprise']
                : ['Starter', 'Pro', 'Enterprise']
            }
            accent='violet'
          />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </>
  );
}
