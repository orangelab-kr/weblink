import { Button } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { PassCard } from '../..';

export const PassAvailable = withRouter(({ passProgram, history }) => {
  const onPurchase = () =>
    history.push(`/passPrograms/${passProgram.passProgramId}`);

  return (
    <PassCard
      title={passProgram.name}
      description={passProgram.description}
      validity={passProgram.validity}
      price={passProgram.price}
    >
      <Button
        block={true}
        color="success"
        style={{ margin: '10px 0' }}
        onClick={onPurchase}
      >
        자세히 보기
      </Button>
    </PassCard>
  );
});
