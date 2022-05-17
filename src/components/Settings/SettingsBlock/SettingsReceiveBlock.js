import { Switch, Toast } from 'antd-mobile';
import { BellOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SettingsItem } from '../SettingsItem';
import { SettingsBlock } from './SettingsBlock';

export const SettingsReceiveBlock = ({ user, updateUser }) => {
  const { receiveSMS, receivePush, receiveEmail } = user;
  const [loading, setLoading] = useState({
    receiveSMS: false,
    receivePush: false,
    receiveEmail: false,
  });

  const [checked, setChecked] = useState({
    receiveSMS,
    receivePush,
    receiveEmail,
  });

  const onChange = (field) => async (isChecked) => {
    setLoading({ ...loading, [field]: true });
    await updateUser({ [field]: isChecked });
    setChecked({ ...checked, [field]: isChecked });
    setLoading({ ...loading, [field]: false });
    if (isChecked) {
      const date = dayjs().format('YYYY년 MM월 DD일');
      Toast.show({
        icon: 'success',
        content: (
          <div style={{ margin: '0 -1.8em', textAlign: 'center' }}>
            <div style={{ fontSize: '1em', fontWeight: '800' }}>{date}</div>
            <div style={{ fontSize: '0.88em', wordBreak: 'keep-all' }}>
              이후 광고 수신에 동의하셨습니다.
            </div>
          </div>
        ),
      });
    }
  };

  return (
    <SettingsBlock
      icon={<BellOutline />}
      title='수신동의'
      description='알림을 켜두면 더 다양한 혜택을 받아보실 수 있습니다.'
    >
      <SettingsItem gap={8} title='SMS 문자 수신'>
        <Switch
          checked={checked.receiveSMS || false}
          loading={loading.receiveSMS}
          onChange={onChange('receiveSMS')}
        />
      </SettingsItem>
      <SettingsItem gap={8} title='앱 알림 수신'>
        <Switch
          checked={checked.receivePush || false}
          loading={loading.receivePush}
          onChange={onChange('receivePush')}
        />
      </SettingsItem>
      <SettingsItem gap={8} title='이메일 수신'>
        <Switch
          checked={checked.receiveEmail || false}
          loading={loading.receiveEmail}
          onChange={onChange('receiveEmail')}
        />
      </SettingsItem>
    </SettingsBlock>
  );
};
