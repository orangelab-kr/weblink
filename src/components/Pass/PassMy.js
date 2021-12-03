import { Button, Checkbox, Dialog } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Client, PassCard } from '../..';

export const PassMy = ({ pass, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const expiredAt = pass.expiredAt && dayjs(pass.expiredAt);
  const onExtend = async () => {
    const confirm = await Dialog.confirm({
      content: `${pass.passProgram.name}(을)를 연장하시겠습니까?`,
      confirmText: '네, 연장합니다',
      cancelText: '아니요',
    });

    if (!confirm) return;
    setLoading(true);
    await Client.get(`/accounts/passes/${pass.passId}/extend`);
    setLoading(false);
    await Dialog.alert({
      content: '연장이 완료되었습니다.',
      confirmText: '확인',
    });

    await onRefresh();
  };

  const onModifyPass = async (autoRenew) => {
    await Client.post(`/accounts/passes/${pass.passId}`, { autoRenew });
    await onRefresh();
  };

  return (
    <PassCard
      title={pass.passProgram.name}
      description={pass.passProgram.description}
      validity={pass.passProgram.validity}
      expiredAt={expiredAt}
    >
      <Checkbox
        style={{ margin: '10px 0' }}
        disabled={!pass.passProgram.allowRenew}
        onChange={onModifyPass}
      >
        자동 연장
      </Checkbox>

      {expiredAt.isBefore(dayjs().add(7, 'day')) &&
      pass.passProgram.isSale &&
      pass.passProgram.allowRenew &&
      pass.passProgram.price ? (
        <Button
          block={true}
          color="success"
          loadingText="연장을 진행하고 있습니다."
          loading={loading}
          onClick={onExtend}
        >
          {pass.passProgram.price.toLocaleString()}원 연장 (
          {expiredAt.diff(dayjs(), 'd')}일 만료)
        </Button>
      ) : expiredAt.isAfter(dayjs()) ? (
        <Button block={true} color="warning" disabled>
          구매 완료 ({expiredAt.diff(dayjs(), 'd')}일 만료)
        </Button>
      ) : (
        <Button block={true} color="danger" disabled>
          만료됨
        </Button>
      )}
    </PassCard>
  );
};
