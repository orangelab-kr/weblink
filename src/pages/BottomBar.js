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
import { BottomBarLevel } from '../components/BottomBar/BottomBarLevel';
import { BottomBarPrimaryMenu } from '../components/BottomBar/BottomBarPrimary/BottomBarPrimaryMenu';
import { BottomBarPrimaryButton } from '../components/BottomBar/BottomBarPrimary/BottomBarPrimaryButton';
import { BottomBarSecondaryMenu } from '../components/BottomBar/BottomBarSecondary/BottomBarSecondaryMenu';
import { BottomBarSecondaryButton } from '../components/BottomBar/BottomBarSecondary/BottomBarSecondaryButton';

const MainContainer = styled.div`
  margin: 15px 32px 0;
`;

export const BottomBar = () => {
  return (
    <MainContainer>
      <BottomBarLevel />
      <BottomBarPrimaryMenu>
        <BottomBarPrimaryButton
          name='라이드 기록'
          icon={<UnorderedListOutline />}
          href='hikick://rides'
        />
        <BottomBarPrimaryButton
          name='카드'
          icon={<BankcardOutline />}
          href='hikick://payments'
        />
        <BottomBarPrimaryButton
          name='쿠폰'
          icon={<CouponOutline />}
          href='hikick://coupons'
        />
        <BottomBarPrimaryButton
          name='알림'
          icon={<BellOutline />}
          href='hikick://weblink/notifications'
        />
        <BottomBarPrimaryButton
          name='패스'
          icon={<FileOutline />}
          href='hikick://weblink/pass'
        />
        <BottomBarPrimaryButton
          name='초대하기⁺'
          icon={<UserAddOutline />}
          href='hikick://weblink/referral'
        />
        <BottomBarPrimaryButton
          name='공지사항'
          icon={<SoundOutline />}
          href='hikick://notices'
        />
        <BottomBarPrimaryButton
          name='설정'
          icon={<SetOutline />}
          href='hikick://weblink/settings'
        />
      </BottomBarPrimaryMenu>
      <BottomBarSecondaryMenu>
        {/* <BottomBarSecondaryButton
            name="센터코인 인증"
            icon={<HeartOutline />}
          /> */}
        <BottomBarSecondaryButton
          name='고객센터'
          icon={<ChatCheckOutline />}
          href='hikick://channeltalk'
        />
        <BottomBarSecondaryButton
          name='로그아웃'
          icon={<RightOutline />}
          href='hikick://auth/logout'
        />
      </BottomBarSecondaryMenu>
    </MainContainer>
  );
};
