import {
  BankcardOutline,
  ChatCheckOutline,
  CouponOutline,
  FileOutline,
  RightOutline,
  SetOutline,
  SoundOutline,
  UnorderedListOutline,
  UserAddOutline,
} from 'antd-mobile-icons';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FullScreenLoading } from '../components/FullScreenLoading';
import { SidebarProfile } from '../components/Sidebar/SidebarProfile';
import { SidebarLevel } from '../components/Sidebar/SidebarLevel';
import { SidebarPrimaryMenu } from '../components/Sidebar/SidebarPrimary/SidebarPrimaryMenu';
import { SidebarPrimaryButton } from '../components/Sidebar/SidebarPrimary/SidebarPrimaryButton';
import { SidebarSecondaryMenu } from '../components/Sidebar/SidebarSecondary/SidebarSecondaryMenu';
import { SidebarSecondaryButton } from '../components/Sidebar/SidebarSecondary/SidebarSecondaryButton';
import { Client } from '../tools/client';

const MainContainer = styled.div`
  margin: 60px 20px 0;
`;

export const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const loadUser = useCallback(async () => {
    const { data } = await Client.get('/accounts/auth');
    setUser(data.user);
    setLoading(false);
  }, []);

  useEffect(() => loadUser(), [loadUser]);
  return (
    <FullScreenLoading loading={loading}>
      <MainContainer>
        <SidebarProfile user={user} />
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
            name='패스'
            icon={<FileOutline />}
            href='hikick://webview/passes'
          />
          <SidebarPrimaryButton
            name='초대하기⁺'
            icon={<UserAddOutline />}
            href='hikick://webview/referral'
          />
          <SidebarPrimaryButton
            name='공지사항'
            icon={<SoundOutline />}
            href='hikick://weblink/notices'
          />
          <SidebarPrimaryButton
            name='설정'
            icon={<SetOutline />}
            href='hikick://weblink/Settingss'
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
    </FullScreenLoading>
  );
};
