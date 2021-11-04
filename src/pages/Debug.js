import { Button } from 'antd-mobile';
import {
  AddOutline,
  ChatCheckOutline,
  CloseOutline,
  MinusOutline,
  RightOutline,
  SetOutline,
  SoundOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons';
import { PageHeader } from '..';

export const Debug = () => {
  const buttons = [
    {
      icon: <UnorderedListOutline />,
      color: 'default',
      name: '라이드 기록',
      href: 'hikick://rides',
    },
    {
      icon: <UnorderedListOutline />,
      color: 'primary',
      name: '쿠폰 목록',
      href: 'hikick://coupons',
    },
    {
      icon: <SoundOutline />,
      color: 'warning',
      name: '공지사항',
      href: 'hikick://weblink/notices',
    },
    {
      icon: <SetOutline />,
      color: 'primary',
      name: '설정',
      href: 'hikick://weblink/setting',
    },
    {
      icon: <AddOutline />,
      color: 'success',
      name: '카카오 연동',
      href: 'hikick://methods/kakao/connect',
    },
    {
      icon: <AddOutline />,
      color: 'success',
      name: '애플 연동',
      href: 'hikick://methods/apple/connect',
    },
    {
      icon: <MinusOutline />,
      color: 'danger',
      name: '카카오 연동해제',
      href: 'hikick://methods/kakao/disconnect',
    },
    {
      icon: <MinusOutline />,
      color: 'danger',
      name: '애플 연동해제',
      href: 'hikick://methods/apple/disconnect',
    },
    {
      icon: <ChatCheckOutline />,
      color: 'primary',
      name: '채널톡',
      href: 'hikick://weblink/channeltalk',
    },
    {
      icon: <RightOutline />,
      color: 'danger',
      name: '로그아웃',
      href: 'hikick://auth/logout',
    },
    {
      icon: <CloseOutline />,
      color: 'danger',
      name: '웹뷰 닫기',
      href: 'hikick://weblink/close',
    },
  ];

  return (
    <div style={{ marginLeft: 28, marginRight: 28 }}>
      <PageHeader>디버그</PageHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '80vh',
        }}
      >
        {buttons.map((button) => (
          <Button
            color={button.color}
            onClick={() => (window.location.href = button.href)}
            key={button.name}
          >
            {button.icon} {button.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
