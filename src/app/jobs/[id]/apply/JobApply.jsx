// app/jobs/[id]/apply/JobApply.jsx
// app/jobs/[id]/apply/page.jsx - main page
'use client';

import { submitApplication } from '@/app/lib/actions/applications';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FiSend,
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiLink,
} from 'react-icons/fi';

const initialState = (job, user) => ({
  jobId: job?._id || job?.id || '',
  jobTitle: job?.jobTitle || '',
  applicantName: user?.name || user?.fullName || '',
  applicantEmail: user?.email || '',
  phone: '',
  linkedinUrl: '',
  resumeUrl: '',
  coverLetter: '',
});

export default function JobApply({ job, user }) {
  const [formData, setFormData] = useState(initialState(job, user));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.applicantName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!formData.applicantEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitApplication(formData);
      toast.success('Application submitted successfully!');
      setFormData(initialState(job, user));
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 text-white shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8'>
      <div className='mb-6'>
        <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-zinc-400'>
          <FiBriefcase className='h-3.5 w-3.5' />
          Apply now
        </div>

        <h2 className='text-2xl font-semibold tracking-tight text-white'>
          Apply for {job?.jobTitle}
        </h2>

        <p className='mt-2 text-sm leading-6 text-zinc-400'>
          Complete the form below to submit your application for this role.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <input type='hidden' name='jobId' value={formData.jobId} />
        <input type='hidden' name='jobTitle' value={formData.jobTitle} />

        <div className='grid gap-5 md:grid-cols-2'>
          {/* Full Name */}
          <div>
            <label className='mb-2 block text-sm font-medium text-zinc-300'>
              Full name
            </label>
            <div className='relative'>
              <FiUser className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
              <input
                type='text'
                name='applicantName'
                value={formData.applicantName}
                onChange={handleChange}
                placeholder='Your full name'
                readOnly={!!user?.name || !!user?.fullName}
                className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.07] read-only:cursor-not-allowed read-only:opacity-60'
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='mb-2 block text-sm font-medium text-zinc-300'>
              Email address
            </label>
            <div className='relative'>
              <FiMail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
              <input
                type='email'
                name='applicantEmail'
                value={formData.applicantEmail}
                onChange={handleChange}
                placeholder='you@example.com'
                readOnly={!!user?.email}
                className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.07] read-only:cursor-not-allowed read-only:opacity-60'
                required
              />
            </div>
          </div>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          {/* Phone */}
          <div>
            <label className='mb-2 block text-sm font-medium text-zinc-300'>
              Phone number
            </label>
            <div className='relative'>
              <FiPhone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+8801XXXXXXXXX'
                className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.07]'
                required
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className='mb-2 block text-sm font-medium text-zinc-300'>
              LinkedIn / Portfolio
              <span className='ml-1 text-zinc-500'>(optional)</span>
            </label>
            <div className='relative'>
              <FiLink className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />
              <input
                type='url'
                name='linkedinUrl'
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder='https://linkedin.com/in/yourname'
                className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.07]'
              />
            </div>
          </div>
        </div>

        {/* Resume URL */}
        <div>
          <label className='mb-2 block text-sm font-medium text-zinc-300'>
            Resume URL
            <span className='ml-1 text-zinc-500'>(optional)</span>
          </label>
          <input
            type='url'
            name='resumeUrl'
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder='https://drive.google.com/... or portfolio resume link'
            className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.07]'
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className='mb-2 block text-sm font-medium text-zinc-300'>
            Cover letter
            <span className='ml-1 text-zinc-500'>(optional)</span>
          </label>
          <textarea
            name='coverLetter'
            value={formData.coverLetter}
            onChange={handleChange}
            rows={6}
            placeholder='Briefly explain why you are a good fit for this role'
            className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.07]'
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <FiSend className='h-4 w-4' />
          {isSubmitting ? 'Submitting application...' : 'Submit application'}
        </button>
      </form>
    </section>
  );
}
