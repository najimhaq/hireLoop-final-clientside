import { getLoggedInRecruiterCompany } from '@/app/lib/api/companies';
import PostJobForm from './PostJobForm';

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();
  return (
    <div>
      <PostJobForm company={company} />
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
