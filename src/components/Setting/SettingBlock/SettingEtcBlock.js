import { ExclamationCircleOutline, RightOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { SettingBlock, SettingItem } from '..';

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

export const SettingEtcBlock = () => {
  return (
    <SettingBlock icon={<ExclamationCircleOutline />} title="기타">
      <Link href="hikick://auth/logout">
        <SettingItem title="로그아웃">
          <RightOutline />
        </SettingItem>
      </Link>
      <Link href="/secession">
        <SettingItem title="탈퇴">
          <RightOutline />
        </SettingItem>
      </Link>
    </SettingBlock>
  );
};
