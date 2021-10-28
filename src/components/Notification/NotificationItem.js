import { Divider } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import styled from 'styled-components';

export const NotificationItem = ({ title, description, url }) => {
  const ActiveContainer = styled.div`
    margin-bottom: 20px;
    &:active {
      opacity: 0.5;
    }
  `;

  const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  `;

  const Title = styled.p`
    font-size: 16px;
    font-weight: 650;
    margin-bottom: 10px;
  `;

  const Description = styled.p`
    font-size: 13px;
    font-weight: 400;
  `;

  const onClick = () => {
    if (!url) return;
    window.location.href = url;
  };

  return (
    <ActiveContainer onClick={onClick}>
      <FlexContainer>
        <div style={{ maxWidth: url && '90%' }}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
        {url && <RightOutline />}
      </FlexContainer>
      <Divider />
    </ActiveContainer>
  );
};
