import {
  Divider,
  Empty,
  InfiniteScroll,
  Loading,
  PullToRefresh,
} from 'antd-mobile';
import { CheckOutline, DownOutline, UpOutline } from 'antd-mobile-icons';
import { NotificationItem } from './NotificationItem';

export const NotificationList = ({
  notifications,
  onRefresh,
  loadMore,
  hasMore,
}) => {
  return (
    <>
      <PullToRefresh
        threshold={60}
        onRefresh={onRefresh}
        pullingText={<DownOutline fontSize={22} />}
        releaseText={<UpOutline fontSize={22} />}
        refreshingText={<Loading style={{ fontSize: 22 }} />}
        completeText={<CheckOutline color="green" fontSize={22} />}
      >
        {notifications.length <= 0 && (
          <Empty
            description="알림이 없습니다."
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vw',
            }}
          />
        )}

        {notifications &&
          notifications.map((notification) => (
            <NotificationItem {...notification} />
          ))}
      </PullToRefresh>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {!hasMore ? <Divider>모든 알림을 확인했습니다.</Divider> : <Loading />}
      </InfiniteScroll>
    </>
  );
};
