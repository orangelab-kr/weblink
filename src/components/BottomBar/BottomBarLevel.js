import { ProgressBar } from 'antd-mobile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Client } from '../../tools/client';
import { LevelDescription } from '../LevelDescription';

const ProgressBarText = styled.div`
  position: absolute;
  margin: 4px 0px 0px 10px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  text-shadow: ${({ color }) =>
    `-1px 0 ${color}, 0 1px ${color}, 1px 0 ${color}, 0 -1px ${color}`};
`;

const Bold = styled.b`
  font-weight: 800;
`;

export const BottomBarLevel = () => {
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(null);
  const [levels, setLevels] = useState([]);
  const nextLevel = useMemo(() => {
    if (level === null || levels.length <= 0) return;
    const idx = levels.findIndex((l) => l.levelNo === level.levelNo);
    return levels[idx + 1];
  }, [level, levels]);

  const onClick = () => (window.location.href = 'hikick://weblink/level');
  const getLevel = useCallback(async () => {
    const { data } = await Client.get('/accounts/level');
    setLevel(data.level);
    setPoint(data.point);
  }, []);

  const getAllLevels = useCallback(async () => {
    const { data } = await Client.get('/accounts/level/all');
    setLevels(data.levels);
  }, []);

  const progressLevel = useMemo(() => {
    if (!level || point === null) return 0;
    const maxPoint = nextLevel ? nextLevel.requiredPoint : level.requiredPoint;
    const percentage = Math.round((100 * point) / maxPoint);
    return Math.min(percentage, 100);
  }, [level, nextLevel, point]);

  useEffect(() => getLevel(), [getLevel]);
  useEffect(() => getAllLevels(), [getAllLevels]);
  // if (level === null) return <div style={{ marginTop: 75 }}></div>;
  return (
    <div onClick={onClick}>
      <div style={{ position: 'relative', marginTop: 5 }}>
        <ProgressBarText color={level?.color || '#32CD32'}>
          <Bold>{progressLevel || 0}%</Bold> / {level?.name || '로드 중...'}
        </ProgressBarText>
        <ProgressBar
          percent={progressLevel}
          style={{
            '--track-width': '20px',
            '--fill-color': level?.color,
          }}
        />
      </div>
      <LevelDescription
        point={point}
        level={level}
        levels={levels}
        nextLevel={nextLevel}
      />
    </div>
  );
};
