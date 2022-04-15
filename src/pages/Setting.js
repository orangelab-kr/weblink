import { useCallback, useEffect, useState } from 'react';
import { Client } from '../tools/client';
import { FullScreenLoading } from '../components/FullScreenLoading';
import { SettingProfileBlock } from '../components/Setting/SettingBlock/SettingProfileBlock';
import { SettingInfoBlock } from '../components/Setting/SettingBlock/SettingInfoBlock';
import { SettingMethodBlock } from '../components/Setting/SettingBlock/SettingMethodBlock';
import { SettingReceiveBlock } from '../components/Setting/SettingBlock/SettingReceiveBlock';
import { SettingEtcBlock } from '../components/Setting/SettingBlock/SettingEtcBlock';

export const Setting = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [methods, setMethods] = useState([]);
  const loadUser = useCallback(async () => {
    const { data } = await Client.get('/accounts/auth');
    setUser(data.user);
    await loadMethods();
    setLoading(false);
  }, []);

  const loadMethods = async () => {
    const { data } = await Client.get('/accounts/methods');
    setMethods(data.methods);
  };

  const updateUser = async (payload) => {
    const { data } = await Client.post('/accounts/auth', payload);
    setUser(data.user);
    return data.user;
  };

  useEffect(() => loadUser(), [loadUser, setLoading]);
  return (
    <FullScreenLoading loading={loading}>
      <SettingProfileBlock user={user} updateUser={updateUser} />
      <SettingInfoBlock user={user} updateUser={updateUser} />
      <SettingMethodBlock user={user} methods={methods} />
      <SettingReceiveBlock user={user} updateUser={updateUser} />
      <SettingEtcBlock user={user} />
    </FullScreenLoading>
  );
};
