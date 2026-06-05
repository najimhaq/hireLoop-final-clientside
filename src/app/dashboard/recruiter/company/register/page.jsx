'use client';

import React, { useState } from 'react';
import { FiX, FiChevronDown, FiMapPin, FiUploadCloud } from 'react-icons/fi';

const CompanyRegisterForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Technology',
    website: '',
    location: '',
    employeeCount: '1-10 employees',
    description: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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

            <button
              type='button'
              aria-label='Close form'
              className='inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white'
            >
              <FiX className='h-5 w-5' />
            </button>
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
                    <option className='bg-[#111]' value='Marketing'>
                      Marketing
                    </option>
                    <option className='bg-[#111]' value='Finance'>
                      Finance
                    </option>
                    <option className='bg-[#111]' value='Healthcare'>
                      Healthcare
                    </option>
                    <option className='bg-[#111]' value='Education'>
                      Education
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
                    <option className='bg-[#111]' value='201-500 employees'>
                      201-500 employees
                    </option>
                    <option className='bg-[#111]' value='500+ employees'>
                      500+ employees
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
                  <div className='flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/4 text-white/60 transition hover:bg-white/6'>
                    <FiUploadCloud className='h-6 w-6' />
                  </div>

                  <div>
                    <p className='text-sm font-medium text-white'>
                      Upload image
                    </p>
                    <p className='text-xs text-white/45'>PNG, JPG up to 5MB</p>
                  </div>

                  <input
                    type='file'
                    name='logo'
                    accept='image/png,image/jpeg,image/jpg'
                    onChange={handleChange}
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
                  rows={6}
                  placeholder="Tell us about your company's mission and culture..."
                  className='w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-white outline-none placeholder:text-white/25 transition focus:border-white/20 focus:bg-white/6'
                />
              </div>
            </div>

            {/* Footer */}
            <div className='mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end'>
              <button
                type='button'
                className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/4 px-6 text-sm font-medium text-white/80 transition hover:bg-white/6'
              >
                Cancel
              </button>

              <button
                type='submit'
                className='inline-flex h-14 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90'
              >
                Register Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CompanyRegisterForm;
