export const PLANS = {
  free: {
    id: 'free',
    label: 'Free',
    price: 0,
    maxApplications: 3,
    maxSavedJobs: 10,
  },
  pro: {
    id: 'pro',
    label: 'Pro',
    price: 29,
    maxApplications: Infinity,
    maxSavedJobs: Infinity,
  },
  enterprise: {
    id: 'enterprise',
    label: 'Enterprise',
    price: 99,
    maxApplications: Infinity,
    maxSavedJobs: Infinity,
  },
};
