import { Image, Popover, Toast } from 'antd-mobile';
import { PicturesOutline, VideoOutline } from 'antd-mobile-icons';

export const SettingProfileBlock = ({ user }) => {
  return (
    <>
      <div
        style={{
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Popover.Menu
          actions={[
            { text: '앨범에서 선택', icon: <PicturesOutline /> },
            { text: '카메라로 촬영', icon: <VideoOutline /> },
          ]}
          onAction={(node) => Toast.show(`选择了 ${node.text}`)}
          placement="bottom"
          trigger="click"
        >
          <Image
            width={100}
            height={100}
            fit="cover"
            style={{ borderRadius: 100 }}
          />
        </Popover.Menu>
        <div style={{ marginLeft: 30 }}>
          <p
            style={{
              fontSize: 25,
              fontWeight: 800,
              marginBottom: 5,
            }}
          >
            {user.realname}님
          </p>
          <p
            style={{
              fontSize: 30,
              fontWeight: 400,
            }}
          >
            반가워요.
          </p>
        </div>
      </div>
    </>
  );
};
