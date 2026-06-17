'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account settings anytime. Your plan stays active until end of billing period.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'We offer a 7-day money-back guarantee on all paid plans. Contact support within 7 days of your first payment.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'All major credit and debit cards (Visa, Mastercard, Amex) via Stripe. Bank transfers for Enterprise plans.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle.',
  },
  {
    q: 'What happens to my data if I downgrade?',
    a: 'All data stays safe. You simply lose access to premium features — nothing is deleted.',
  },
  {
    q: 'Do Seeker and Recruiter plans overlap?',
    a: 'No. Separate tracks for separate account types. Recruiters post jobs; seekers apply to them.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='mt-20 max-w-3xl mx-auto px-4'>
      {/* Header with Icon */}
      <div className='text-center mb-12'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/10 mb-4'>
          <FiHelpCircle className='w-8 h-8 text-violet-400' />
        </div>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>
          Frequently Asked Questions
        </h2>
        <p className='text-gray-400 max-w-lg mx-auto'>
          Everything you need to know about our plans and pricing
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className='space-y-3'>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-xl transition-all duration-300 ${
                isOpen
                  ? 'border-violet-500/50 bg-linear-to-r from-violet-500/10 to-fuchsia-500/10 shadow-lg shadow-violet-500/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className='w-full px-6 py-4 flex items-center justify-between gap-4 text-left'
                aria-expanded={isOpen}
              >
                <span className='font-medium text-white text-sm md:text-base'>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div className='px-6 pb-5 pt-1'>
                      <div className='h-px w-full bg-linear-to-r from-transparent via-violet-500/30 to-transparent mb-3' />
                      <p className='text-gray-300 text-sm md:text-base leading-relaxed'>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className='mt-10 text-center'>
        <p className='text-gray-400 text-sm'>
          Still have questions?{' '}
          <a
            href='/contact'
            className='text-violet-400 hover:text-violet-300 font-medium transition-colors'
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
