import { CloseOutline, LinkOutline, RightOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { SettingsItem } from '../SettingsItem';
import { SettingsBlock } from './SettingsBlock';

const MethodConnectButton = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: black;
`;

export const SettingsMethodBlock = ({ user, methods }) => {
  const kakao = methods.find((method) => method.provider === 'kakao');
  const apple = methods.find((method) => method.provider === 'apple');

  const Connect = ({ provider }) => (
    <MethodConnectButton href={`hikick://methods/${provider}/connect`}>
      연결 <RightOutline />
    </MethodConnectButton>
  );

  const Disconnect = ({ provider }) => (
    <MethodConnectButton href={`hikick://methods/${provider}/disconnect`}>
      해제 <CloseOutline />
    </MethodConnectButton>
  );

  return (
    <SettingsBlock
      icon={<LinkOutline />}
      title='인증수단'
      description='인증수단을 연결하여 더 간편하게 로그인해보세요.'
    >
      <SettingsItem
        title='카카오'
        icon={
          <img
            src='/assets/methods/kakao.svg'
            style={{ objectFit: 'scale-down' }}
            alt=''
            height={16}
            width={16}
          />
        }
      >
        {!kakao ? (
          <Connect provider='kakao' />
        ) : (
          <Disconnect provider='kakao' />
        )}
      </SettingsItem>
      <SettingsItem
        title='애플'
        icon={
          <img
            src='/assets/methods/apple.svg'
            style={{ objectFit: 'scale-down' }}
            alt=''
            height={16}
            width={16}
          />
        }
      >
        {!apple ? (
          <Connect provider='kakao' />
        ) : (
          <Disconnect provider='kakao' />
        )}
      </SettingsItem>
    </SettingsBlock>
  );
};
