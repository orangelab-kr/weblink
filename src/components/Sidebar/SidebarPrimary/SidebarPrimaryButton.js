import styled from 'styled-components';

const Button = styled.p`
  padding: 15px 0px;
  &:active {
    opacity: 0.5;
  }
`;

export const SidebarPrimaryButton = ({ name, icon, href }) => {
  const onClick = () => href && (window.location.href = href);

  return (
    <Button onClick={onClick}>
      {icon} {name}
    </Button>
  );
};
