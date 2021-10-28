import { LeftOutline } from 'antd-mobile-icons';

export const DepthPage = ({ children }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 30,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <LeftOutline />
      </div>
      <div style={{ marginTop: 65 }}>{children}</div>
    </>
  );
};
