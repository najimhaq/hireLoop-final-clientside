'use client';

import React, { useState } from 'react';
import { FiX, FiChevronDown, FiMapPin, FiUploadCloud } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CompanyRegisterForm = ({ recruiterId, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Technology',
    website: '',
    location: '',
    employeeCount: '1-10 employees',
    description: '',
  });

  const [logoUrl, setLogoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    setIsUploading(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API_URL}`,
        { method: 'POST', body: data }
      );
      const json = await res.json();
      if (json.success) {
        setLogoUrl(json.data.url);
        toast.success('Logo uploaded!');
      } else {
        toast.error('Upload failed. Try again.');
      }
    } catch {
      toast.error('Network error during logo upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      toast.error('Please wait until logo upload finishes');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        website: formData.website.startsWith('http')
          ? formData.website
          : `https://${formData.website}`,
        logo: logoUrl || null,
        recruiterId: recruiterId || null,

      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      if (json.success) {
        toast.success('Company registered successfully!');
        router.refresh();
        if (onClose) onClose();
      } else {
        toast.error(json.message || 'Failed to register company');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='min-h-screen bg-[#050505] px-4 py-16 md:px-6'>
      <div className='mx-auto max-w-4xl'>
        <div className='overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b0d] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_25px_70px_rgba(0,0,0,0.45)]'>
          {/* Header */}
          <div className='flex items-start justify-between border-b border-white/10 px-6 py-8 md:px-8'>
            <div>
              <h1 className='text-3xl font-semibold tracking-tight text-white'>
                Register New Company
              </h1>
              <p className='mt-2 text-sm text-white/50'>
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>
            {onClose && (
              <button
                type='button'
                onClick={onClose}
                aria-label='Close form'
                className='inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white'
              >
                <FiX className='h-5 w-5' />
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='px-6 py-8 md:px-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Company Name */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/90'>
                  Company Name
                </label>
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder='e.g. Acme Corp'
                  className='h-14 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-white outline-none placeholder:text-white/25 transition focus:border-white/20 focus:bg-white/6'
                />
              </div>

              {/* Industry */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/90'>
                  Industry / Category
                </label>
                <div className='relative'>
                  <select
                    name='industry'
                    value={formData.industry}
                    onChange={handleChange}
                    className='h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/4 px-4 pr-12 text-white outline-none transition focus:border-white/20 focus:bg-white/6'
                  >
                    <option className='bg-[#111]' value='Technology'>
                      Technology
                    </option>
                    <option className='bg-[#111]' value='Design'>
                      Design
                    </option>
                    <option className='bg-[#111]' value='Marketing'>
                      Marketing
                    </option>
                    <option className='bg-[#111]' value='Finance'>
                      Finance
                    </option>
                    <option className='bg-[#111]' value='Other'>
                      Other
                    </option>
                  </select>
                  <FiChevronDown className='pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45' />
                </div>
              </div>

              {/* Website URL */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/90'>
                  Website URL
                </label>
                <div className='flex h-14 overflow-hidden rounded-2xl border border-white/10 bg-white/4 focus-within:border-white/20'>
                  <div className='flex items-center border-r border-white/10 bg-white/5 px-4 text-white/70'>
                    https://
                  </div>
                  <input
                    type='text'
                    name='website'
                    value={formData.website}
                    onChange={handleChange}
                    required
                    placeholder='www.company.com'
                    className='w-full bg-transparent px-4 text-white outline-none placeholder:text-white/25'
                  />
                </div>
              </div>

              {/* Location */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/90'>
                  Location
                </label>
                <div className='flex h-14 items-center rounded-2xl border border-white/10 bg-white/4 px-4 transition focus-within:border-white/20'>
                  <FiMapPin className='mr-3 h-5 w-5 text-white/45' />
                  <input
                    type='text'
                    name='location'
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder='City, Country'
                    className='w-full bg-transparent text-white outline-none placeholder:text-white/25'
                  />
                </div>
              </div>

              {/* Employee Count */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/90'>
                  Employee Count Range
                </label>
                <div className='relative'>
                  <select
                    name='employeeCount'
                    value={formData.employeeCount}
                    onChange={handleChange}
                    className='h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/4 px-4 pr-12 text-white outline-none transition focus:border-white/20 focus:bg-white/6'
                  >
                    <option className='bg-[#111]' value='1-10 employees'>
                      1-10 employees
                    </option>
                    <option className='bg-[#111]' value='11-50 employees'>
                      11-50 employees
                    </option>
                    <option className='bg-[#111]' value='51-200 employees'>
                      51-200 employees
                    </option>
                    <option className='bg-[#111]' value='201+ employees'>
                      201+ employees
                    </option>
                  </select>
                  <FiChevronDown className='pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45' />
                </div>
              </div>

              {/* Logo Upload */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/90'>
                  Company Logo
                </label>
                <label className='flex cursor-pointer items-center gap-4 rounded-2xl'>
                  <div className='flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/4 text-white/60 transition hover:bg-white/6'>
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt='Logo preview'
                        width={80}
                        height={80}
                        className='h-full w-full object-contain'
                      />
                    ) : isUploading ? (
                      <span className='text-xs text-white/40'>
                        Uploading...
                      </span>
                    ) : (
                      <FiUploadCloud className='h-6 w-6' />
                    )}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      {isUploading
                        ? 'Uploading...'
                        : logoUrl
                          ? 'Change logo'
                          : 'Upload image'}
                    </p>
                    <p className='text-xs text-white/45'>PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    type='file'
                    name='logo'
                    accept='image/png,image/jpeg,image/jpg'
                    onChange={handleLogoUpload}
                    className='hidden'
                  />
                </label>
              </div>

              {/* Description */}
              <div className='space-y-2 md:col-span-2'>
                <label className='text-sm font-medium text-white/90'>
                  Brief Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your company's mission and culture..."
                  className='w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-white outline-none placeholder:text-white/25 transition focus:border-white/20 focus:bg-white/6'
                />
              </div>
            </div>

            {/* Footer */}
            <div className='mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end'>
              {onClose && (
                <button
                  type='button'
                  onClick={onClose}
                  className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/4 px-6 text-sm font-medium text-white/80 transition hover:bg-white/6'
                >
                  Cancel
                </button>
              )}
              <button
                type='submit'
                disabled={isUploading || isSubmitting}
                className='inline-flex h-14 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Registering...' : 'Register Company'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CompanyRegisterForm;
