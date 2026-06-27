const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const deleteJobById = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error deleting job:', error);
        return null;
    }
};

