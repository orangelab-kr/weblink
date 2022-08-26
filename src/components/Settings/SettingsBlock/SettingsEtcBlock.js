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
      <Link href='hikick://notices/terms'>
        <SettingsItem title='이용약관'>
          <RightOutline />
        </SettingsItem>
      </Link>
      <Link href='hikick://notices/terms/privacy'>
        <SettingsItem title='개인정보취급방침'>
          <RightOutline />
        </SettingsItem>
      </Link>
      <Link href='hikick://notices/terms/helmet'>
        <SettingsItem title='헬멧대여 이용약관'>
          <RightOutline />
        </SettingsItem>
      </Link>
      <Link href='hikick://notices/terms/location'>
        <SettingsItem title='위치기반서비스 이용약관'>
          <RightOutline />
        </SettingsItem>
      </Link>
      <Link href='hikick://notices/oss'>
        <SettingsItem title='오픈소스 라이선스'>
          <RightOutline />
        </SettingsItem>
      </Link>
      <Link href='hikick://auth/logout'>
        <SettingsItem title='로그아웃'>
          <RightOutline />
        </SettingsItem>
      </Link>
      {/* <Link href='/secession'>
        <SettingsItem title='탈퇴'>
          <RightOutline />
        </SettingsItem>
      </Link> */}
    </SettingsBlock>
  );
};
