import { useMemo } from 'react';
import styled from 'styled-components';

const LevelMessage = styled.p`
  margin: 6px 0;
  font-size: 16px;
`;

const Bold = styled.b`
  font-weight: 800;
`;

export const LevelDescription = ({ level, point, nextLevel }) => {
  const requiredPoint = useMemo(() => {
    if (!level) return;
    let nextLevelRequiredPoint = nextLevel
      ? Math.max(0, nextLevel.requiredPoint - point)
      : 0;
    const levelRequiredPoint = Math.max(0, level.requiredPoint - point);
    return nextLevelRequiredPoint || levelRequiredPoint;
  }, [level, nextLevel, point]);
  if (!level) return <LevelMessage>정보를 불러오고 있습니다.</LevelMessage>;
  if (nextLevel && requiredPoint) {
    return (
      <LevelMessage>
        다음 <Bold>{nextLevel.name}</Bold> 레벨까지{' '}
        <Bold>{requiredPoint}개</Bold> 남았습니다.
      </LevelMessage>
    );
  }

  if (nextLevel && !requiredPoint) {
    return (
      <LevelMessage>
        축하합니다. 다음 달부터 <Bold>{nextLevel.name} 레벨</Bold>이 적용됩니다.
      </LevelMessage>
    );
  }

  if (!nextLevel && requiredPoint) {
    return (
      <LevelMessage>
        <Bold>{level.name}</Bold> 레벨 유지까지 <Bold>{requiredPoint}개</Bold>{' '}
        남았습니다.
      </LevelMessage>
    );
  }

  if (!nextLevel && !requiredPoint) {
    return (
      <LevelMessage>
        축하합니다. 다음 달도 <Bold>{level.name} 레벨</Bold>이 유지됩니다.
      </LevelMessage>
    );
  }

  return <></>;
};
