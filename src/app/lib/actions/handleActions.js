// UserActions.jsx — status change

const handleActivate = async () => {
  const { data, error } = await apiPatch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${user._id}/status`,
    { status: 'active' }
  );
  if (error) toast.error(error);
  else toast.success('User activated ✓');
};

const handleSuspend = async () => {
  const { data, error } = await apiPatch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${user._id}/status`,
    { status: 'suspended' }
  );
  if (error) toast.error(error);
  else toast.success('User suspended ✓');
};

// JobStatusActions.jsx — job approve
const handleApprove = async () => {
  const { data, error } = await apiPatch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${job._id}/status`,
    { status: 'active' }
  );
  if (error) toast.error(error);
  else toast.success('Job approved ✓');
};

// Delete
const handleDelete = async () => {
  const { error } = await apiDelete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${user._id}`
  );
  if (error) toast.error(error);
  else router.refresh();
};

/* const handleStatusChange = async (newStatus) => {
    setLoading(newStatus);
    const { error } = await apiPatch(
      `${base}/api/users/${user._id}/status`,
      {
        status: newStatus,
      }
    );
    if (error) toast.error(error);
    else {
      toast.success(
        newStatus === 'active' ? 'User activated ✓' : 'User suspended'
      );
      router.refresh();
    }
    setLoading(null);
  }; */

export const handleStatusChange = async (newStatus) => {
  setLoading(newStatus);
  const { error } = await apiPatch(`${base}/api/users/${user._id}/status`, {
    status: newStatus,
  });
  if (error) toast.error(error);
  else {
    toast.success(
      newStatus === 'active' ? 'User activated ✓' : 'User suspended'
    );
    router.refresh();
  }
  setLoading(null);
};
