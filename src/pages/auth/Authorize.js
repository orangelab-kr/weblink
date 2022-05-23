import { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { FullScreenLoading } from '../../components/FullScreenLoading';
import { Client, ToastError } from '../../tools/client';
import { useQuery } from '../../tools/useQuery';

export const AuthAuthorize = withRouter(() => {
  const { sessionId, redirect } = useQuery();
  const [loading, setLoading] = useState(true);
  const loadUser = useCallback(async () => {
    if (!sessionId) throw ToastError('세션 정보가 없습니다.');
    localStorage.setItem('weblink-session-id', sessionId);
    await Client.get('/accounts/auth');
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    loadUser();
  }, [loadUser, setLoading]);

  return (
    <FullScreenLoading loading={loading}>
      <Redirect to={redirect || '/'} />
    </FullScreenLoading>
  );
});
