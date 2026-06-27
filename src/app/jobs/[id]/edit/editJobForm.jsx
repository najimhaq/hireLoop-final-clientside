// src/app/jobs/[id]/edit/EditJobForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { updateJobById } from '@/app/lib/api/updateJobById';

const INPUT_CLS =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition';
const LABEL_CLS =
  'block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2';

export default function EditJobForm({ job }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    jobTitle: job.jobTitle || '',
    jobCategory: job.jobCategory || '',
    jobType: job.jobType || 'full-time',
    experienceLevel: job.experienceLevel || 'entry',
    location: job.location || '',
    isRemote: job.isRemote || false,
    minSalary: job.minSalary || '',
    maxSalary: job.maxSalary || '',
    currency: job.currency || 'USD',
    vacancies: job.vacancies || 1,
    deadline: job.deadline ? job.deadline.split('T')[0] : '',
    responsibilities: job.responsibilities || '',
    requirements: job.requirements || '',
    benefits: job.benefits || '',
    status: job.status || 'pending',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateJobById(job._id, {
        ...form,
        minSalary: Number(form.minSalary),
        maxSalary: Number(form.maxSalary),
        vacancies: Number(form.vacancies),
        deadline: new Date(form.deadline).toISOString(),
      });

      if (res?.success) {
        toast.success('Job updated successfully ✓');
        router.push(`/jobs/${job._id}`);
        router.refresh();
      } else {
        toast.error(res?.message || 'Update failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Job Title */}
      <div>
        <label className={LABEL_CLS}>Job Title</label>
        <input
          name='jobTitle'
          value={form.jobTitle}
          onChange={handleChange}
          placeholder='e.g. Senior UI Designer'
          className={INPUT_CLS}
          required
        />
      </div>

      {/* Category + Type */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={LABEL_CLS}>Category</label>
          <input
            name='jobCategory'
            value={form.jobCategory}
            onChange={handleChange}
            placeholder='e.g. design'
            className={INPUT_CLS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Job Type</label>
          <select
            name='jobType'
            value={form.jobType}
            onChange={handleChange}
            className={INPUT_CLS}
          >
            {[
              'full-time',
              'part-time',
              'internship',
              'contract',
              'freelance',
            ].map((t) => (
              <option key={t} value={t} className='bg-zinc-900'>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Experience + Status */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={LABEL_CLS}>Experience Level</label>
          <select
            name='experienceLevel'
            value={form.experienceLevel}
            onChange={handleChange}
            className={INPUT_CLS}
          >
            {['entry', 'mid', 'senior'].map((l) => (
              <option key={l} value={l} className='bg-zinc-900'>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>Status</label>
          <select
            name='status'
            value={form.status}
            onChange={handleChange}
            className={INPUT_CLS}
          >
            {['pending', 'active', 'closed', 'draft'].map((s) => (
              <option key={s} value={s} className='bg-zinc-900'>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location + Remote */}
      <div>
        <label className={LABEL_CLS}>Location</label>
        <input
          name='location'
          value={form.location}
          onChange={handleChange}
          placeholder='e.g. Dhaka, Bangladesh'
          className={INPUT_CLS}
        />
        <label className='mt-2 flex items-center gap-2 text-sm text-zinc-400 cursor-pointer'>
          <input
            type='checkbox'
            name='isRemote'
            checked={form.isRemote}
            onChange={handleChange}
            className='accent-violet-500 w-4 h-4'
          />
          Remote position
        </label>
      </div>

      {/* Salary */}
      <div className='grid gap-4 sm:grid-cols-3'>
        <div>
          <label className={LABEL_CLS}>Min Salary</label>
          <input
            type='number'
            name='minSalary'
            value={form.minSalary}
            onChange={handleChange}
            className={INPUT_CLS}
            min={0}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Max Salary</label>
          <input
            type='number'
            name='maxSalary'
            value={form.maxSalary}
            onChange={handleChange}
            className={INPUT_CLS}
            min={0}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Currency</label>
          <select
            name='currency'
            value={form.currency}
            onChange={handleChange}
            className={INPUT_CLS}
          >
            {['USD', 'BDT', 'EUR', 'GBP'].map((c) => (
              <option key={c} value={c} className='bg-zinc-900'>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vacancies + Deadline */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className={LABEL_CLS}>Vacancies</label>
          <input
            type='number'
            name='vacancies'
            value={form.vacancies}
            onChange={handleChange}
            className={INPUT_CLS}
            min={1}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Deadline</label>
          <input
            type='date'
            name='deadline'
            value={form.deadline}
            onChange={handleChange}
            className={INPUT_CLS}
          />
        </div>
      </div>

      {/* Responsibilities */}
      <div>
        <label className={LABEL_CLS}>Responsibilities</label>
        <textarea
          name='responsibilities'
          value={form.responsibilities}
          onChange={handleChange}
          rows={5}
          className={INPUT_CLS}
        />
      </div>

      {/* Requirements */}
      <div>
        <label className={LABEL_CLS}>Requirements</label>
        <textarea
          name='requirements'
          value={form.requirements}
          onChange={handleChange}
          rows={5}
          className={INPUT_CLS}
        />
      </div>

      {/* Benefits */}
      <div>
        <label className={LABEL_CLS}>Benefits</label>
        <textarea
          name='benefits'
          value={form.benefits}
          onChange={handleChange}
          rows={4}
          className={INPUT_CLS}
        />
      </div>

      {/* Actions */}
      <div className='flex items-center gap-3 pt-2'>
        <button
          type='submit'
          disabled={loading}
          className='inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type='button'
          onClick={() => router.back()}
          className='inline-flex h-11 items-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-300 transition hover:bg-white/10'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
