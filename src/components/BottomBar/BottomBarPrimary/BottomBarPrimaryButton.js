import styled from 'styled-components';

const Button = styled.div`
  padding: 0.7em 0px;
  font-size: 01em;
  &:active {
    opacity: 0.5;
  }
`;

export const BottomBarPrimaryButton = ({ name, icon, href, ...props }) => {
  const onClick = () => href && (window.location.href = href);

  return (
    <Button onClick={onClick} {...props}>
      {icon} {name}
    </Button>
  );
};
