import styled from 'styled-components';

const Menu = styled.p`
  margin-top: 15px;
  font-weight: 500;
  font-size: 18px;
`;

export const BottomBarPrimaryMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};
