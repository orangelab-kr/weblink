import {
  BankcardOutline,
  BellOutline,
  ChatCheckOutline,
  CouponOutline,
  FileOutline,
  RightOutline,
  SetOutline,
  SoundOutline,
  UnorderedListOutline,
  UserAddOutline,
} from 'antd-mobile-icons';
import styled from 'styled-components';
import { SidebarLevel } from '../components/Sidebar/SidebarLevel';
import { SidebarPrimaryMenu } from '../components/Sidebar/SidebarPrimary/SidebarPrimaryMenu';
import { SidebarPrimaryButton } from '../components/Sidebar/SidebarPrimary/SidebarPrimaryButton';
import { SidebarSecondaryMenu } from '../components/Sidebar/SidebarSecondary/SidebarSecondaryMenu';
import { SidebarSecondaryButton } from '../components/Sidebar/SidebarSecondary/SidebarSecondaryButton';

const MainContainer = styled.div`
  margin: 15px 32px 0;
`;

export const Sidebar = () => {
  return (
    <MainContainer>
      <SidebarLevel />
      <SidebarPrimaryMenu>
        <SidebarPrimaryButton
          name='라이드 기록'
          icon={<UnorderedListOutline />}
          href='hikick://rides'
        />
        <SidebarPrimaryButton
          name='카드'
          icon={<BankcardOutline />}
          href='hikick://payments'
        />
        <SidebarPrimaryButton
          name='쿠폰'
          icon={<CouponOutline />}
          href='hikick://coupons'
        />
        <SidebarPrimaryButton
          name='알림'
          icon={<BellOutline />}
          href='hikick://weblink?page=notification'
        />
        <SidebarPrimaryButton
          name='패스'
          icon={<FileOutline />}
          href='hikick://weblink?page=pass'
        />
        <SidebarPrimaryButton
          name='초대하기⁺'
          icon={<UserAddOutline />}
          href='hikick://weblink?page=referral'
        />
        <SidebarPrimaryButton
          name='공지사항'
          icon={<SoundOutline />}
          href='hikick://weblink?page=notices'
        />
        <SidebarPrimaryButton
          name='설정'
          icon={<SetOutline />}
          href='hikick://weblink?page=settings'
        />
      </SidebarPrimaryMenu>
      <SidebarSecondaryMenu>
        {/* <SidebarSecondaryButton
            name="센터코인 인증"
            icon={<HeartOutline />}
          /> */}
        <SidebarSecondaryButton
          name='고객센터'
          icon={<ChatCheckOutline />}
          href='hikick://weblink/channeltalk'
        />
        <SidebarSecondaryButton
          name='로그아웃'
          icon={<RightOutline />}
          href='hikick://auth/logout'
        />
      </SidebarSecondaryMenu>
    </MainContainer>
  );
};
