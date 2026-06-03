'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiGlobe,
  FiUsers,
  FiClock,
  FiAward,
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
// import { createJob } from '@/lib/actions/jobs';

const steps = [
  { id: 1, name: 'Basic Info', icon: FiBriefcase },
  { id: 2, name: 'Job Details', icon: FiFileText },
  { id: 3, name: 'Requirements', icon: FiCheckCircle },
];

const jobCategories = [
  {
    value: 'technology',
    label: '💻 Technology',
    color: 'from-blue-500 to-cyan-500',
  },
  { value: 'design', label: '🎨 Design', color: 'from-purple-500 to-pink-500' },
  {
    value: 'marketing',
    label: '📢 Marketing',
    color: 'from-orange-500 to-red-500',
  },
  { value: 'sales', label: '📈 Sales', color: 'from-green-500 to-emerald-500' },
  {
    value: 'finance',
    label: '💰 Finance',
    color: 'from-yellow-500 to-amber-500',
  },
  { value: 'hr', label: '👥 HR', color: 'from-indigo-500 to-purple-500' },
];

const jobTypes = [
  { value: 'full-time', label: 'Full-time', icon: '💼' },
  { value: 'part-time', label: 'Part-time', icon: '⏰' },
  { value: 'contract', label: 'Contract', icon: '📝' },
  { value: 'internship', label: 'Internship', icon: '🎓' },
  { value: 'remote', label: 'Remote', icon: '🏠' },
];

export default function PostJobPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobCategory: '',
    jobType: '',
    minSalary: '',
    maxSalary: '',
    currency: 'USD',
    location: '',
    isRemote: false,
    deadline: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    experienceLevel: '',
    vacancies: '1',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
      if (!formData.jobCategory) newErrors.jobCategory = 'Category is required';
      if (!formData.jobType) newErrors.jobType = 'Job type is required';
      if (!formData.minSalary) newErrors.minSalary = 'Minimum salary required';
      if (!formData.maxSalary) newErrors.maxSalary = 'Maximum salary required';
      if (!formData.isRemote && !formData.location) {
        newErrors.location = 'Location is required for on-site jobs';
      }
      if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    } else if (currentStep === 2) {
      if (!formData.responsibilities)
        newErrors.responsibilities = 'Responsibilities are required';
    } else if (currentStep === 3) {
      if (!formData.requirements)
        newErrors.requirements = 'Requirements are required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    console.log('Moving to next step from step:', currentStep);
    console.log('Current form data before next step:', formData);

    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    console.log('Moving to previous step from step:', currentStep);
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        minSalary: Number(formData.minSalary),
        maxSalary: Number(formData.maxSalary),
        vacancies: Number(formData.vacancies),
        companyId: 'company_123',
        status: 'active',
        isPubliclyVisible: true,
        postedAt: new Date().toISOString(),
      };




      //! console.table(payload);

      // const res = await createJob(payload);

      // console.log('Server response:', res);
      // console.log('Response insertedId:', res.insertedId);

      // if (res.insertedId) {
      //   console.log('✅ Job posted successfully!');
      //   toast.success('Job posted successfully! 🎉');
      //   router.push('/dashboard/recruiter/jobs');
      // } else {
      //   console.log('❌ Failed to post job - no insertedId');
      //   toast.error('Failed to post job');
      // }
    } catch (error) {
      console.error('❌ Error posting job:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  //!  console.log('Initial form data:', formData);

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8'
        >
          <h1 className='text-3xl font-bold text-white mt-5'>Post a New Job</h1>
          <p className='mt-2 text-gray-400'>
            Find the best talent for your team
          </p>
        </motion.div>

        {/* Step Progress */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className='flex-1 relative'>
                  <div className='flex flex-col items-center'>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-linear-to-r from-violet-500 to-fuchsia-500'
                          : isCurrent
                            ? 'bg-linear-to-r from-violet-500 to-fuchsia-500 ring-4 ring-violet-500/30'
                            : 'bg-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <FiCheckCircle className='w-6 h-6 text-white' />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-500'}`}
                        />
                      )}
                    </motion.div>
                    <span
                      className={`mt-2 text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-500'}`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-6 left-1/2 w-full h-0.5 -translate-y-1/2 ${
                        isCompleted
                          ? 'bg-linear-to-r from-violet-500 to-fuchsia-500'
                          : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8'
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode='wait'>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key='step1'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className='space-y-6'
                >
                  {/* Job Title */}
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Job Title *
                    </label>
                    <input
                      type='text'
                      name='jobTitle'
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder='e.g., Senior Frontend Developer'
                      className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all'
                    />
                    {errors.jobTitle && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.jobTitle}
                      </p>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Category */}
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Category *
                      </label>
                      <select
                        name='jobCategory'
                        value={formData.jobCategory}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all'
                      >
                        <option value=''>Select category</option>
                        {jobCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      {errors.jobCategory && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.jobCategory}
                        </p>
                      )}
                    </div>

                    {/* Job Type */}
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Job Type *
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        {jobTypes.map((type) => (
                          <button
                            key={type.value}
                            type='button'
                            onClick={() => {
                              console.log(`Selected job type: ${type.value}`);
                              setFormData((prev) => ({
                                ...prev,
                                jobType: type.value,
                              }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.jobType === type.value
                                ? 'bg-linear-to-r from-violet-500 to-fuchsia-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <span className='mr-1'>{type.icon}</span>{' '}
                            {type.label}
                          </button>
                        ))}
                      </div>
                      {errors.jobType && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.jobType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Salary Range *
                    </label>
                    <div className='grid grid-cols-3 gap-3'>
                      <div className='col-span-1'>
                        <select
                          name='currency'
                          value={formData.currency}
                          onChange={handleChange}
                          className='w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500'
                        >
                          <option value='USD'>USD ($)</option>
                          <option value='EUR'>EUR (€)</option>
                          <option value='GBP'>GBP (£)</option>
                        </select>
                      </div>
                      <div className='col-span-1'>
                        <input
                          type='number'
                          name='minSalary'
                          value={formData.minSalary}
                          onChange={handleChange}
                          placeholder='Min'
                          className='w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500'
                        />
                      </div>
                      <div className='col-span-1'>
                        <input
                          type='number'
                          name='maxSalary'
                          value={formData.maxSalary}
                          onChange={handleChange}
                          placeholder='Max'
                          className='w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500'
                        />
                      </div>
                    </div>
                    {(errors.minSalary || errors.maxSalary) && (
                      <p className='mt-1 text-xs text-red-400'>
                        Salary range is required
                      </p>
                    )}
                  </div>

                  {/* Location & Remote */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Location
                      </label>
                      <div className='relative'>
                        <FiMapPin className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
                        <input
                          type='text'
                          name='location'
                          value={formData.location}
                          onChange={handleChange}
                          disabled={formData.isRemote}
                          placeholder={
                            formData.isRemote
                              ? 'Remote position'
                              : 'e.g., New York, NY'
                          }
                          className='w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 disabled:opacity-50 transition-all'
                        />
                      </div>
                      {errors.location && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        <input
                          type='checkbox'
                          name='isRemote'
                          checked={formData.isRemote}
                          onChange={handleChange}
                          className='mr-2'
                        />
                        Remote Position
                      </label>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Application Deadline *
                    </label>
                    <input
                      type='date'
                      name='deadline'
                      value={formData.deadline}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all'
                    />
                    {errors.deadline && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.deadline}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Job Details */}
              {currentStep === 2 && (
                <motion.div
                  key='step2'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className='space-y-6'
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Responsibilities *
                    </label>
                    <textarea
                      name='responsibilities'
                      value={formData.responsibilities}
                      onChange={handleChange}
                      rows={6}
                      placeholder='• Lead development of new features&#10;• Collaborate with cross-functional teams&#10;• Write clean, maintainable code&#10;• Conduct code reviews'
                      className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all resize-none'
                    />
                    {errors.responsibilities && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.responsibilities}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Benefits (Optional)
                    </label>
                    <textarea
                      name='benefits'
                      value={formData.benefits}
                      onChange={handleChange}
                      rows={4}
                      placeholder='• Competitive salary&#10;• Health insurance&#10;• 401(k) matching&#10;• Remote work flexibility'
                      className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all resize-none'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Experience Level
                      </label>
                      <select
                        name='experienceLevel'
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500'
                      >
                        <option value=''>Select level</option>
                        <option value='entry'>Entry Level (0-2 years)</option>
                        <option value='mid'>Mid Level (3-5 years)</option>
                        <option value='senior'>Senior Level (6-9 years)</option>
                        <option value='lead'>Lead/Manager (10+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Number of Vacancies
                      </label>
                      <input
                        type='number'
                        name='vacancies'
                        value={formData.vacancies}
                        onChange={handleChange}
                        min='1'
                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500'
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Requirements */}
              {currentStep === 3 && (
                <motion.div
                  key='step3'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className='space-y-6'
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Requirements *
                    </label>
                    <textarea
                      name='requirements'
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={8}
                      placeholder="• Bachelor's degree in Computer Science or related field&#10;• 5+ years of experience in React development&#10;• Strong knowledge of JavaScript/TypeScript&#10;• Experience with Node.js and REST APIs&#10;• Excellent problem-solving skills"
                      className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all resize-none'
                    />
                    {errors.requirements && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.requirements}
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className='mt-8 p-4 bg-white/5 rounded-xl border border-white/10'>
                    <h3 className='text-lg font-semibold text-white mb-3'>
                      Job Summary
                    </h3>
                    <div className='space-y-2 text-sm'>
                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>Title:</span>{' '}
                        {formData.jobTitle || 'Not set'}
                      </p>
                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>
                          Category:
                        </span>{' '}
                        {jobCategories.find(
                          (c) => c.value === formData.jobCategory
                        )?.label || 'Not set'}
                      </p>
                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>Type:</span>{' '}
                        {formData.jobType || 'Not set'}
                      </p>
                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>Salary:</span>{' '}
                        {formData.minSalary && formData.maxSalary
                          ? `${formData.currency} ${formData.minSalary} - ${formData.maxSalary}`
                          : 'Not set'}
                      </p>
                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>
                          Location:
                        </span>{' '}
                        {formData.isRemote
                          ? 'Remote'
                          : formData.location || 'Not set'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className='flex justify-between gap-4 mt-8 pt-6 border-t border-white/10'>
              {currentStep > 1 && (
                <button
                  type='button'
                  onClick={prevStep}
                  className='px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all flex items-center gap-2'
                >
                  <FiArrowLeft size={18} />
                  Back
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  type='button'
                  onClick={nextStep}
                  className='px-6 py-2.5 rounded-xl bg-linear-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all ml-auto flex items-center gap-2'
                >
                  Continue
                  <FiArrowRight size={18} />
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all ml-auto flex items-center gap-2 disabled:opacity-50'
                >
                  {isLoading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      Posting...
                    </>
                  ) : (
                    <>
                      Post Job
                      <FiCheckCircle size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
