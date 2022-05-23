import { useCallback, useEffect, useState } from 'react';
import { Client } from '../tools/client';
import { FullScreenLoading } from './FullScreenLoading';

export const RequiredAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const loadUser = useCallback(async () => {
    await Client.get('/accounts/auth');
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser, setLoading]);

  return <FullScreenLoading loading={loading}>{children}</FullScreenLoading>;
};
