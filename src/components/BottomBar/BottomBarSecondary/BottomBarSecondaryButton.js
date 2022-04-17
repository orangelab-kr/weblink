import styled from 'styled-components';

const Button = styled.p`
  margin: 12px 0;
  &:active {
    opacity: 0.5;
  }
`;

export const BottomBarSecondaryButton = ({ name, icon, href }) => {
  const onClick = () => href && (window.location.href = href);

  return (
    <Button onClick={onClick}>
      {name} {icon}
    </Button>
  );
};
