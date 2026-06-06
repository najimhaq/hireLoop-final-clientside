// src/app/dashboard/recruiter/jobs/new/PostJobForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiBriefcase,
  FiMapPin,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { createJob } from '@/app/lib/actions/createJobs';

const steps = [
  { id: 1, name: 'Basic Info', icon: FiBriefcase },
  { id: 2, name: 'Job Details', icon: FiBriefcase },
  { id: 3, name: 'Requirements', icon: FiCheckCircle },
];

const jobCategories = [
  { value: 'technology', label: '💻 Technology' },
  { value: 'design', label: '🎨 Design' },
  { value: 'marketing', label: '📢 Marketing' },
  { value: 'sales', label: '📈 Sales' },
  { value: 'finance', label: '💰 Finance' },
  { value: 'hr', label: '👥 HR' },
];

const jobTypes = [
  { value: 'full-time', label: 'Full-time', icon: '💼' },
  { value: 'part-time', label: 'Part-time', icon: '⏰' },
  { value: 'contract', label: 'Contract', icon: '📝' },
  { value: 'internship', label: 'Internship', icon: '🎓' },
  { value: 'freelance', label: 'Freelance', icon: '🧑‍💻' },
];

const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior Level (6+ years)' },
];

export default function PostJobForm({ company }) {
  console.log('Get Company Id : ', company.data);
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

  const inputClass =
    'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all';

  const textareaClass =
    'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all resize-none';

  const clearFieldError = (name) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };

      if (name === 'isRemote' && checked) {
        updated.location = '';
      }

      return updated;
    });

    clearFieldError(name);

    if (name === 'isRemote') {
      clearFieldError('location');
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = 'Job title is required';
      }

      if (!formData.jobCategory) {
        newErrors.jobCategory = 'Category is required';
      }

      if (!formData.jobType) {
        newErrors.jobType = 'Job type is required';
      }

      if (!formData.minSalary) {
        newErrors.minSalary = 'Minimum salary is required';
      }

      if (!formData.maxSalary) {
        newErrors.maxSalary = 'Maximum salary is required';
      }

      if (formData.minSalary && Number(formData.minSalary) < 0) {
        newErrors.minSalary = 'Minimum salary must be 0 or more';
      }

      if (formData.maxSalary && Number(formData.maxSalary) < 0) {
        newErrors.maxSalary = 'Maximum salary must be 0 or more';
      }

      if (
        formData.minSalary &&
        formData.maxSalary &&
        Number(formData.maxSalary) < Number(formData.minSalary)
      ) {
        newErrors.maxSalary =
          'Max salary must be greater than or equal to min salary';
      }

      if (!formData.isRemote && !formData.location.trim()) {
        newErrors.location = 'Location is required for on-site jobs';
      }

      if (!formData.deadline) {
        newErrors.deadline = 'Deadline is required';
      } else {
        const selectedDate = new Date(formData.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          newErrors.deadline = 'Deadline cannot be in the past';
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.responsibilities.trim()) {
        newErrors.responsibilities = 'Responsibilities are required';
      }

      if (!formData.experienceLevel) {
        newErrors.experienceLevel = 'Experience level is required';
      }

      if (!formData.vacancies) {
        newErrors.vacancies = 'Vacancies is required';
      } else if (Number(formData.vacancies) < 1) {
        newErrors.vacancies = 'Vacancies must be at least 1';
      }
    }

    if (currentStep === 3) {
      if (!formData.requirements.trim()) {
        newErrors.requirements = 'Requirements are required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    setIsLoading(true);

    try {
      const payload = {
        jobTitle: formData.jobTitle.trim(),
        jobCategory: formData.jobCategory,
        jobType: formData.jobType,
        minSalary: Number(formData.minSalary),
        maxSalary: Number(formData.maxSalary),
        currency: formData.currency,
        location: formData.isRemote ? 'Remote' : formData.location.trim(),
        isRemote: formData.isRemote,
        deadline: formData.deadline,
        responsibilities: formData.responsibilities.trim(),
        requirements: formData.requirements.trim(),
        benefits: formData.benefits.trim(),
        experienceLevel: formData.experienceLevel,
        vacancies: Number(formData.vacancies),
        companyId: company?.data?._id,
        companyName: company?.data?.companyName,
        companyLogo: company?.data?.logo,
      };
      // console.table(payload);

      const res = await createJob(payload);

      if (res?.success) {
        toast.success('Job posted successfully! 🎉');
        router.push('/dashboard/recruiter/jobs');
      } else {
        toast.error(res?.message || 'Failed to post job');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
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

        <div className='mb-8'>
          <div className='flex items-center justify-between gap-2'>
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
                          className={`w-6 h-6 ${
                            isCurrent ? 'text-white' : 'text-gray-500'
                          }`}
                        />
                      )}
                    </motion.div>

                    <span
                      className={`mt-2 text-sm font-medium text-center ${
                        isCurrent ? 'text-white' : 'text-gray-500'
                      }`}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8'
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode='wait'>
              {currentStep === 1 && (
                <motion.div
                  key='step1'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className='space-y-6'
                >
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
                      className={inputClass}
                    />
                    {errors.jobTitle && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.jobTitle}
                      </p>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Category *
                      </label>
                      <select
                        name='jobCategory'
                        value={formData.jobCategory}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value=''>Select category</option>
                        {jobCategories.map((cat) => (
                          <option
                            key={cat.value}
                            value={cat.value}
                            className='bg-gray-900 text-white'
                          >
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
                              setFormData((prev) => ({
                                ...prev,
                                jobType: type.value,
                              }));
                              clearFieldError('jobType');
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.jobType === type.value
                                ? 'bg-linear-to-r from-violet-500 to-fuchsia-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <span className='mr-1'>{type.icon}</span>
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

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Salary Range *
                    </label>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                      <div>
                        <select
                          name='currency'
                          value={formData.currency}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option
                            value='USD'
                            className='bg-gray-900 text-white'
                          >
                            USD ($)
                          </option>
                          <option
                            value='EUR'
                            className='bg-gray-900 text-white'
                          >
                            EUR (€)
                          </option>
                          <option
                            value='GBP'
                            className='bg-gray-900 text-white'
                          >
                            GBP (£)
                          </option>
                        </select>
                      </div>

                      <div>
                        <input
                          type='number'
                          name='minSalary'
                          value={formData.minSalary}
                          onChange={handleChange}
                          placeholder='Min'
                          className={inputClass}
                        />
                        {errors.minSalary && (
                          <p className='mt-1 text-xs text-red-400'>
                            {errors.minSalary}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type='number'
                          name='maxSalary'
                          value={formData.maxSalary}
                          onChange={handleChange}
                          placeholder='Max'
                          className={inputClass}
                        />
                        {errors.maxSalary && (
                          <p className='mt-1 text-xs text-red-400'>
                            {errors.maxSalary}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

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
                        Work Mode
                      </label>
                      <label className='inline-flex items-center gap-2 text-white cursor-pointer mt-3'>
                        <input
                          type='checkbox'
                          name='isRemote'
                          checked={formData.isRemote}
                          onChange={handleChange}
                          className='h-4 w-4'
                        />
                        <span>Remote Position</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Application Deadline *
                    </label>
                    <input
                      type='date'
                      name='deadline'
                      value={formData.deadline}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.deadline && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.deadline}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

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
                      placeholder={
                        '• Lead development of new features\n• Collaborate with cross-functional teams\n• Write clean, maintainable code\n• Conduct code reviews'
                      }
                      className={textareaClass}
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
                      placeholder={
                        '• Competitive salary\n• Health insurance\n• Remote work flexibility\n• Paid time off'
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Experience Level *
                      </label>
                      <select
                        name='experienceLevel'
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value=''>Select level</option>
                        {experienceLevels.map((level) => (
                          <option
                            key={level.value}
                            value={level.value}
                            className='bg-gray-900 text-white'
                          >
                            {level.label}
                          </option>
                        ))}
                      </select>
                      {errors.experienceLevel && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.experienceLevel}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Number of Vacancies *
                      </label>
                      <input
                        type='number'
                        name='vacancies'
                        value={formData.vacancies}
                        onChange={handleChange}
                        min='1'
                        className={inputClass}
                      />
                      {errors.vacancies && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.vacancies}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

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
                      placeholder={
                        "• Bachelor's degree in Computer Science or related field\n• Strong knowledge of React and JavaScript\n• Experience with REST APIs\n• Good communication skills"
                      }
                      className={textareaClass}
                    />
                    {errors.requirements && (
                      <p className='mt-1 text-xs text-red-400'>
                        {errors.requirements}
                      </p>
                    )}
                  </div>

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

                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>
                          Experience:
                        </span>{' '}
                        {formData.experienceLevel || 'Not set'}
                      </p>

                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>
                          Vacancies:
                        </span>{' '}
                        {formData.vacancies || 'Not set'}
                      </p>

                      <p className='text-gray-300'>
                        <span className='text-white font-medium'>
                          Deadline:
                        </span>{' '}
                        {formData.deadline || 'Not set'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className='flex justify-between gap-4 mt-8 pt-6 border-t border-white/10'>
              {currentStep > 1 ? (
                <button
                  type='button'
                  onClick={prevStep}
                  className='px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all flex items-center gap-2'
                >
                  <FiArrowLeft size={18} />
                  Back
                </button>
              ) : (
                <div />
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
