import styled from 'styled-components';
import { ProgressBar } from 'antd-mobile';

const LevelDescription = styled.p`
  margin: 6px 0;
  font-size: 14px;
`;

const Bold = styled.b`
  font-weight: 800;
`;

export const SidebarLevel = () => {
  const onClick = () => (window.location.href = 'hikick://weblink/level');

  return (
    <div onClick={onClick}>
      <LevelDescription>
        다음 <Bold>블루</Bold> 레벨까지 <Bold>3개</Bold> 남았습니다.
      </LevelDescription>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            margin: '4px 0px 0px 10px',
            color: 'white',
            fontSize: 14,
            fontWeight: 400,
            textShadow: '-1px 0 green, 0 1px green, 1px 0 green, 0 -1px green',
          }}
        >
          그린 레벨
        </div>
        <ProgressBar
          percent={10}
          style={{
            '--track-width': '20px',
            '--fill-color': 'green',
          }}
        />
      </div>
    </div>
  );
};
