import { Tabs } from 'antd-mobile';
import { useCallback, useEffect, useState } from 'react';
import { Client, DepthPage, PageHeader, PassAvailable, PassMy } from '..';

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

  useEffect(() => getMyPasses(), [getMyPasses]);
  useEffect(() => getAvailablePasses(), [getAvailablePasses]);

  return (
    <DepthPage>
      <div style={{ marginLeft: 28, marginRight: 28 }}>
        <PageHeader>패스</PageHeader>
        <Tabs onChange={setTab} activeKey={tab}>
          <Tabs.Tab title="내 패스" key="myPasses">
            {myPasses.map((pass) => (
              <PassMy pass={pass} onRefresh={getMyPasses} />
            ))}
          </Tabs.Tab>
          <Tabs.Tab title="구매 가능한 패스" key="availablePasses">
            {availablePasses.map((passProgram) => (
              <PassAvailable passProgram={passProgram} setTab={setTab} />
            ))}
          </Tabs.Tab>
        </Tabs>
      </div>
    </DepthPage>
  );
};
