import { ProgressBar } from 'antd-mobile';
import styled from 'styled-components';
import { DepthPage, PageHeader } from '..';

const LevelDescription = styled.p`
  margin: 6px 0;
  font-size: 20px;
`;

const Bold = styled.b`
  font-weight: 800;
`;

export const Level = () => {
  return (
    <DepthPage>
      <div style={{ marginLeft: 28, marginRight: 28 }}>
        <PageHeader>레벨</PageHeader>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              margin: '6px 0px 0px 10px',
              color: 'white',
              fontSize: 18,
              fontWeight: 400,
              textShadow:
                '-1px 0 green, 0 1px green, 1px 0 green, 0 -1px green',
            }}
          >
            그린 레벨
          </div>
          <ProgressBar
            percent={10}
            style={{
              '--track-width': '30px',
              '--fill-color': 'green',
            }}
          />
        </div>
        <LevelDescription>
          다음 <Bold>블루</Bold> 레벨까지 <Bold>3포인트</Bold> 남았습니다.
        </LevelDescription>
        <iframe
          title="level-notice"
          src="https://i.hikick.kr/level"
          style={{ border: 0, height: '80vh', width: '100%' }}
        />
      </div>
    </DepthPage>
  );
};
