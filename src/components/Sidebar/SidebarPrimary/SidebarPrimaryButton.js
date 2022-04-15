import styled from 'styled-components';

const Button = styled.p`
  padding: 0.7em 0px;
  font-size: 01em;
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
