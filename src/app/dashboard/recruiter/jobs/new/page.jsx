import { getLoggedInRecruiterCompany } from '@/app/lib/api/companies';
import PostJobForm from './PostJobForm';

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();
  // console.log('inCOmpany', company);
  return (
    <div>
      {company && company.status === 'approved' ? (
        <PostJobForm company={company} />
      ) : (
        <div className='flex min-h-[60vh] items-center justify-center px-4'>
          <div className='max-w-sm w-full text-center space-y-5'>
            {/* Icon */}
            <div className='w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='text-amber-400'
              >
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='8' x2='12' y2='12' />
                <line x1='12' y1='16' x2='12.01' y2='16' />
              </svg>
            </div>

            {/* Text */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-zinc-200'>
                {!company ? 'No Company Registered' : 'Approval Pending'}
              </h3>
              <p className='text-sm text-zinc-500 leading-relaxed'>
                {!company
                  ? 'Please register your company first before posting a job.'
                  : 'Your company profile is currently under review. Please wait for admin approval before posting a job.'}
              </p>
            </div>

            {/* Status Badge */}
            {company && (
              <span className='inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20 capitalize'>
                <span className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse' />
                {company.status || 'pending'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJobPage;

/*
https://i.ibb.co/G48K0dg8/adobe.png
https://i.ibb.co/kVNqvNH8/airbnb.png
https://i.ibb.co/QFCFZLmy/amazon.png
https://i.ibb.co/35sbYTCF/apple.png
https://i.ibb.co/0ppxN1NP/google.png
https://i.ibb.co/DPLS63H4/meta.png
https://i.ibb.co/7dQ92S1V/microsoft.png
https://i.ibb.co/5XnWrNRz/netflix.png
https://i.ibb.co/cXSvGQnB/nvidia.png
https://i.ibb.co/8DWfVZpg/spotify.png
https://i.ibb.co/5grdC1Wj/tesla.png
https://i.ibb.co/Q3xFcMzK/uber.png
*/

/*
Recruiter#123456
*/
