import { useEffect } from 'react';

import { useUserIdQuery } from '@/queries/authQuery';
import { useUserStore } from '@/stores/user';

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
  }, [status, data, setUser, error]);

  return { user, status, error };
};

export default useUser;
