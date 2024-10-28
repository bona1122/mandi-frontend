import { useUserIdQuery } from '@/queries/authQuery';
import { useUserStore } from '@/stores/user';
import { useEffect } from 'react';

const useUser = () => {
  const { user, setUser } = useUserStore();
  const { data, status, error } = useUserIdQuery();

  useEffect(() => {
    if (status === 'success' && data) {
      setUser({
        userId: data.response + '',
      });
    } else if (status === 'error') {
      setUser({
        userId: null,
      });
      console.error('Failed to fetch user ID:', error);
    }
  }, [status, data, setUser]);

  return { user, status, error };
};

export default useUser;
