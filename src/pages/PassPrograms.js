import { Button, Checkbox, Dialog, Form } from 'antd-mobile';
import {
  BankcardOutline,
  ContentOutline,
  HandPayCircleOutline,
} from 'antd-mobile-icons';
import { useCallback, useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import { Client, DepthPage, PageHeader, SettingBlock, SettingItem } from '..';
import { CardSelect } from '../components/CardSelect';

export const PassPrograms = withRouter(({ history }) => {
  const [loading, setLoading] = useState(false);
  const [passProgram, setPassProgram] = useState();
  const { passProgramId } = useParams();

  const loadPassProgram = useCallback(async () => {
    try {
      setLoading(true);
      const { passProgram } = await Client.get(
        `/accounts/passPrograms/${passProgramId}`
      ).then(({ data }) => data);

      setPassProgram(passProgram);
      setLoading(false);
    } catch (err) {
      Dialog.show({ content: '잘못된 패스 프로그램입니다.' });
      history.goBack();
    }
  }, [history, passProgramId]);

  const onPurchase = async (form) => {
    if (!form.terms) {
      return await Dialog.alert({
        content: '이용약관을 동의해주세요.',
        confirmText: '확인',
      });
    }

    setLoading(true);
    await Client.post(
      `/accounts/passPrograms/${passProgram.passProgramId}/purchase`,
      form
    );

    setLoading(false);
    await Dialog.alert({
      content: '구매가 완료되었습니다.',
      confirmText: '확인',
    });

    history.push('/pass');
  };

  useEffect(() => loadPassProgram(), [loadPassProgram]);
  return (
    <DepthPage>
      <div style={{ margin: '0 28px' }}>
        <PageHeader>{passProgram && passProgram.name}</PageHeader>
      </div>
      <Form onFinish={onPurchase}>
        <SettingBlock icon={<BankcardOutline />} title="결제 수단">
          <Form.Item name="cardId" noStyle>
            <CardSelect />
          </Form.Item>
          <SettingItem title="자동 연장">
            <Form.Item name="autoRenew" noStyle>
              <Checkbox />
            </Form.Item>
          </SettingItem>
        </SettingBlock>
        <SettingBlock icon={<ContentOutline />} title="추가 약관">
          <SettingItem title="하이킥 패스 추가 이용약관 동의">
            <Form.Item name="terms" noStyle>
              <Checkbox disabled={loading} />
            </Form.Item>
          </SettingItem>
        </SettingBlock>
        <Button
          size="large"
          type="submit"
          color="primary"
          block={true}
          icon={<HandPayCircleOutline />}
          loading={loading}
          loadingText="구매를 진행하고 있습니다."
          style={{
            position: 'fixed',
            margin: '0 auto',
            bottom: 15,
            left: 0,
            right: 0,
            width: '90%',
            height: 50,
            borderRadius: 15,
          }}
        >
          구매하기
        </Button>
      </Form>
    </DepthPage>
  );
});
