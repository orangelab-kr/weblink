import { ProgressBar } from 'antd-mobile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Client, DepthPage, LevelDescription, PageHeader } from '..';

const Bold = styled.b`
  font-weight: 800;
`;

const ProgressBarText = styled.div`
  position: absolute;
  margin: 4px 0px 0px 10px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  text-shadow: ${({ color }) =>
    `-1px 0 ${color}, 0 1px ${color}, 1px 0 ${color}, 0 -1px ${color}`};
`;

export const Level = () => {
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(null);
  const [levels, setLevels] = useState([]);
  const nextLevel = useMemo(() => {
    if (level === null || levels.length <= 0) return;
    const idx = levels.findIndex((l) => l.levelNo === level.levelNo);
    return levels[idx + 1];
  }, [level, levels]);

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

  return (
    <DepthPage>
      <div style={{ marginLeft: 28, marginRight: 28 }}>
        <PageHeader>레벨</PageHeader>
        {level && (
          <>
            <div style={{ position: 'relative' }}>
              <ProgressBarText color={level.color}>
                <Bold>{progressLevel}%</Bold> / {level.name} 레벨
              </ProgressBarText>
              <ProgressBar
                percent={progressLevel}
                style={{
                  '--track-width': '20px',
                  '--fill-color': level.color,
                }}
              />
            </div>
            <LevelDescription
              point={point}
              level={level}
              levels={levels}
              nextLevel={nextLevel}
            />
          </>
        )}

        <iframe
          title="level-notice"
          src="https://i.hikick.kr/level"
          style={{ border: 0, height: '80vh', width: '100%' }}
        />
      </div>
    </DepthPage>
  );
};
