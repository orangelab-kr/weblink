import { useCallback, useEffect, useState } from 'react';
import { Client, DepthPage, NotificationList, PageHeader } from '..';

export const Notification = () => {
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const loadNotification = useCallback(async () => {
    setLoading(true);
    const params = { take, skip };
    const { data } = await Client.get('/accounts/notifications', { params });
    setNotifications((n) => [...n, ...data.notifications]);
    setTotal(data.total);
    setLoading(false);
  }, [skip]);

  const loadMore = () => {
    if (loading) return;
    setSkip((skip) => skip + take);
  };

  useEffect(() => loadNotification(), [loadNotification, setLoading]);
  return (
    <DepthPage>
      <div style={{ marginLeft: 28, marginRight: 28 }}>
        <PageHeader>알림</PageHeader>
        <NotificationList
          notifications={notifications}
          hasMore={!loading & (notifications.length < total)}
          loadMore={loadMore}
        />
      </div>
    </DepthPage>
  );
};
