import { Image } from 'antd-mobile';
import styled from 'styled-components';

const NameContainer = styled.p`
  margin-top: 20px;
  font-size: 25px;
  font-weight: 600;
`;

export const BottomBarProfile = ({ user }) => {
  return (
    <>
      <Image
        fit='cover'
        src={user.profileUrl || '/assets/user.png'}
        style={{ borderRadius: 100 }}
        height={50}
        width={50}
      />
      <NameContainer>{user.realname}</NameContainer>
    </>
  );
};
