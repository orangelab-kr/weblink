import { ExclamationCircleOutline, RightOutline } from 'antd-mobile-icons';
import { SettingBlock } from '.';
import { SettingItem } from '..';

export const SettingEtcBlock = () => {
  return (
    <SettingBlock icon={<ExclamationCircleOutline />} title="기타">
      <SettingItem title="로그아웃">
        <RightOutline />
      </SettingItem>
      <SettingItem title="탈퇴">
        <RightOutline />
      </SettingItem>
    </SettingBlock>
  );
};
