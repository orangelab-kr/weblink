import { Button, Dialog } from 'antd-mobile';
import { useState } from 'react';
import { Client, PassCard } from '../..';

export const PassAvailable = ({ passProgram, setTab }) => {
  const [loading, setLoading] = useState(false);
  const onPurchase = async () => {
    const confirm = await Dialog.confirm({
      content: `${passProgram.name}(을)를 정말로 구매하시겠습니까?`,
      cancelText: '아니요',
      confirmText: '네, 구매합니다',
    });

    if (!confirm) return;
    setLoading(true);
    await Client.post(
      `/accounts/passPrograms/${passProgram.passProgramId}/purchase`,
      { autoRenew: false }
    );

    setLoading(false);
    await Dialog.alert({
      content: '구매가 완료되었습니다.',
      confirmText: '확인',
    });

    await setTab('myPasses');
  };

  return (
    <PassCard
      title={passProgram.name}
      description={passProgram.description}
      validity={passProgram.validity}
    >
      <Button
        block={true}
        color="success"
        style={{ margin: '10px 0' }}
        loadingText="구매를 진행하고 있습니다."
        loading={loading}
        onClick={onPurchase}
      >
        구매하기 {passProgram.price.toLocaleString()}원
      </Button>
    </PassCard>
  );
};
