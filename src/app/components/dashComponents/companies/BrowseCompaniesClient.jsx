'use client';

import { useMemo, useState } from 'react';
import CompanyFilters from './CompanyFilters';
import CompanyCard from './CompaniesCard';


const normalize = (value) => {
  if (typeof value !== 'string') return '';
  return value.toLowerCase().trim();
};

export default function BrowseCompaniesClient({ companies = [] }) {
    console.log('companies', companies)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const industries = useMemo(() => {
    return [
      ...new Set(companies.map((company) => company?.industry).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
  }, [companies]);

  const locations = useMemo(() => {
    return [
      ...new Set(companies.map((company) => company?.location).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const query = normalize(searchQuery);

    return companies.filter((company) => {
      const companyName = normalize(company?.companyName);
      const description = normalize(company?.description);
      const industry = normalize(company?.industry);
      const location = normalize(company?.location);

      const matchesSearch =
        !query ||
        companyName.includes(query) ||
        description.includes(query) ||
        industry.includes(query) ||
        location.includes(query);

      const matchesIndustry =
        selectedIndustry === 'all' || company?.industry === selectedIndustry;

      const matchesLocation =
        selectedLocation === 'all' || company?.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [companies, searchQuery, selectedIndustry, selectedLocation]);

  const handleClear = () => {
    setSearchQuery('');
    setSelectedIndustry('all');
    setSelectedLocation('all');
  };

  return (
    <>
      <CompanyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        totalCount={companies.length}
        filteredCount={filteredCompanies.length}
        industries={industries}
        locations={locations}
        onClear={handleClear}
      />

      {filteredCompanies.length > 0 ? (
        <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {filteredCompanies.map((company, index) => (
            <li key={company?._id?.$oid || company?._id || index}>
              <CompanyCard company={company} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex min-h-75 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-950/40 px-6 text-center'>
          <h2 className='text-xl font-semibold text-white'>
            No matching companies
          </h2>
          <p className='mt-3 max-w-md text-sm leading-6 text-zinc-400'>
            Try changing the search term, industry, or location filter.
          </p>
        </div>
      )}
    </>
  );
}
