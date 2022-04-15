import { Image } from 'antd-mobile';
import { useRef } from 'react';
import { Client } from '../../../tools/client';

export const SettingsProfileBlock = ({ user, updateUser }) => {
  const imageRef = useRef(null);
  const onSelectImage = () => imageRef.current.click();
  const onChangeImage = async (event) => {
    const file = event.target.files[0];
    const { data } = await Client.post('/images', file);
    await updateUser({ profileUrl: data.url });
  };

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
        <Image
          width={100}
          height={100}
          fit='cover'
          src={user.profileUrl || '/assets/user.png'}
          style={{ borderRadius: 100 }}
          onClick={onSelectImage}
        />
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
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={onChangeImage}
          ref={imageRef}
        />
      </div>
    </>
  );
};
