import styled from 'styled-components';

const Menu = styled.p`
  font-weight: 500;
  font-size: 18px;
`;

export const SidebarPrimaryMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};
