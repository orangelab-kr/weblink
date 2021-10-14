import { ExclamationCircleOutline, RightOutline } from 'antd-mobile-icons';
import { Dialog } from 'antd-mobile';
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
      <SettingItem
        title="탈퇴"
        onClick={() =>
          Dialog.alert({
            content: '고객센터로 문의바랍니다.',
            confirmText: '확인',
          })
        }
      >
        <RightOutline />
      </SettingItem>
    </SettingBlock>
  );
};
