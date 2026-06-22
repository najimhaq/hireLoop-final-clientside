import { getApplicationsByApplicant } from '@/app/lib/api/getApplicationsByApplicant';
import { getUserSession } from '@/app/lib/core/session';

const SeekerApplications = async () => {
  const user = await getUserSession();

  console.log('SeekerApplications', user);
  const seekerApplications = await getApplicationsByApplicant(user.id);
  console.log(SeekerApplications);
  return (
    <div>
      <h1>Seeker Applications : {seekerApplications.length}</h1>
    </div>
  );
};

export default SeekerApplications;
