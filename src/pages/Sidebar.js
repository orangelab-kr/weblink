import {
  ChatCheckOutline,
  CouponOutline,
  RightOutline,
  SetOutline,
  SoundOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Client,
  FullScreenLoading,
  SidebarPrimaryButton,
  SidebarPrimaryMenu,
  SidebarProfile,
  SidebarSecondaryButton,
  SidebarSecondaryMenu,
} from '..';

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
        <SidebarPrimaryMenu>
          <SidebarPrimaryButton
            name="라이드 기록"
            icon={<UnorderedListOutline />}
            href="hikick://rides"
          />
          <SidebarPrimaryButton
            name="쿠폰"
            icon={<CouponOutline />}
            href="hikick://coupons"
          />
          <SidebarPrimaryButton
            name="공지사항"
            icon={<SoundOutline />}
            href="hikick://weblink/notices"
          />
          <SidebarPrimaryButton
            name="설정"
            icon={<SetOutline />}
            href="hikick://weblink/setting"
          />
        </SidebarPrimaryMenu>
        <SidebarSecondaryMenu>
          {/* <SidebarSecondaryButton
            name="센터코인 인증"
            icon={<HeartOutline />}
          /> */}
          <SidebarSecondaryButton
            name="고객센터"
            icon={<ChatCheckOutline />}
            href="hikick://weblink/channeltalk"
          />
          <SidebarSecondaryButton
            name="로그아웃"
            icon={<RightOutline />}
            href="hikick://auth/logout"
          />
        </SidebarSecondaryMenu>
      </MainContainer>
    </FullScreenLoading>
  );
};
