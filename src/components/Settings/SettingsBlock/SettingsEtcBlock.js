import { ExclamationCircleOutline, RightOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { SettingsItem } from '../SettingsItem';
import { SettingsBlock } from './SettingsBlock';

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

export const SettingsEtcBlock = () => {
  return (
    <SettingsBlock icon={<ExclamationCircleOutline />} title='기타'>
      <Link href='hikick://auth/logout'>
        <SettingsItem title='로그아웃'>
          <RightOutline />
        </SettingsItem>
      </Link>
      <Link href='/secession'>
        <SettingsItem title='탈퇴'>
          <RightOutline />
        </SettingsItem>
      </Link>
    </SettingsBlock>
  );
};
