import styled from 'styled-components';

const Menu = styled.div`
  color: #999;
  width: 80%;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  bottom: 25px;
  border-top: solid #eee 1px;
`;

export const BottomBarSecondaryMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};
