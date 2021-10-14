import { Loading } from 'antd-mobile';

export const FullScreenLoading = ({ loading, children }) => {
  if (!loading) return children;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Loading />
    </div>
  );
};
