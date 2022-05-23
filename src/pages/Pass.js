import { Tabs } from 'antd-mobile';
import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Client } from '../tools/client';
import { PassMy } from '../components/Pass/PassMy';
import { PassAvailable } from '../components/Pass/PassAvailable';

export const Pass = () => {
  const [tab, setTab] = useState('myPasses');
  const [myPasses, setMyPasses] = useState([]);
  const [availablePasses, setAvailablePasses] = useState([]);

  const getMyPasses = useCallback(async () => {
    if (tab !== 'myPasses') return;
    const { data } = await Client.get('/accounts/passes', { take: 100 });
    setMyPasses(data.passes);
  }, [tab]);

  const getAvailablePasses = useCallback(async () => {
    if (tab !== 'availablePasses') return;
    const { data } = await Client.get('/accounts/passPrograms', { take: 100 });
    setAvailablePasses(data.passPrograms);
  }, [tab]);

  useEffect(() => {
    getMyPasses();
  }, [getMyPasses]);

  useEffect(() => {
    getAvailablePasses();
  }, [getAvailablePasses]);

  return (
    <div>
      {' '}
      <div style={{ margin: '0 28px' }}>
        <PageHeader>패스</PageHeader>
      </div>
      <Tabs onChange={setTab} activeKey={tab} style={{ margin: '0 12px' }}>
        <Tabs.Tab title='내 패스' key='myPasses'>
          {myPasses.map((pass) => (
            <PassMy pass={pass} onRefresh={getMyPasses} key={pass.passId} />
          ))}
        </Tabs.Tab>
        <Tabs.Tab title='구매 가능한 패스' key='availablePasses'>
          {availablePasses.map((passProgram) => (
            <PassAvailable
              passProgram={passProgram}
              setTab={setTab}
              key={passProgram.passProgramId}
            />
          ))}
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};
