import { useCallback, useEffect, useState } from 'react';
import { Client } from '../tools/client';
import { FullScreenLoading } from '../components/FullScreenLoading';
import { SettingsProfileBlock } from '../components/Settings/SettingsBlock/SettingsProfileBlock';
import { SettingsInfoBlock } from '../components/Settings/SettingsBlock/SettingsInfoBlock';
import { SettingsMethodBlock } from '../components/Settings/SettingsBlock/SettingsMethodBlock';
import { SettingsReceiveBlock } from '../components/Settings/SettingsBlock/SettingsReceiveBlock';
import { SettingsEtcBlock } from '../components/Settings/SettingsBlock/SettingsEtcBlock';

export const Settings = () => {
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
      <SettingsProfileBlock user={user} updateUser={updateUser} />
      <SettingsInfoBlock
        user={user}
        updateUser={updateUser}
        loadUser={loadUser}
      />
      <SettingsMethodBlock user={user} methods={methods} />
      <SettingsReceiveBlock user={user} updateUser={updateUser} />
      <SettingsEtcBlock user={user} />
    </FullScreenLoading>
  );
};
