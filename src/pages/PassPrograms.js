import { Button, Checkbox, Dialog, Form } from 'antd-mobile';
import {
  BankcardOutline,
  FileOutline,
  HandPayCircleOutline,
} from 'antd-mobile-icons';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, withRouter } from 'react-router';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import {
  CardSelect,
  Client,
  DepthPage,
  PageHeader,
  SettingBlock,
  SettingItem,
} from '..';

const NoborderForm = styled(Form)`
  .adm-list-default {
    border: none;
  }
`;

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
      <NoborderForm onFinish={onPurchase} style={{ border: 'none' }}>
        {passProgram && passProgram.description && (
          <SettingBlock icon={<FileOutline />} title="패스 정보">
            <ReactMarkdown
              children={passProgram.description}
              remarkPlugins={[remarkGfm]}
            />
          </SettingBlock>
        )}

        <SettingBlock icon={<BankcardOutline />} title="결제 수단">
          <Form.Item name="cardId" noStyle>
            <CardSelect />
          </Form.Item>
          <SettingItem title="자동 연장">
            <Form.Item name="autoRenew" noStyle>
              <Checkbox />
            </Form.Item>
          </SettingItem>
          <p style={{ fontSize: 13 }}>
            자동 연장시 별도로 선택한 카드가 아닌 카드 우선순위대로 결제가
            시도됩니다.
          </p>
        </SettingBlock>
        <div
          style={{
            position: 'fixed',
            margin: '0 auto',
            bottom: 15,
            left: 0,
            right: 0,
            width: '90%',
            height: 120,
          }}
        >
          <p
            style={{
              marginBottom: 5,
              padding: 10,
              fontSize: 16,
              backgroundColor: '#eee',
              borderRadius: 15,
            }}
          >
            구매시{' '}
            <a href="https://i.hikick.kr/7572f609-29c1-4f3e-af18-4e5eb885e2f0">
              하이킥 패스 추가 이용약관
            </a>
            에 동의하는 것으로 간주됩니다.
          </p>
          <Button
            size="large"
            type="submit"
            color="primary"
            block={true}
            icon={<HandPayCircleOutline />}
            loading={loading}
            loadingText="구매를 진행하고 있습니다."
            style={{
              borderRadius: 15,
            }}
          >
            {passProgram &&
              passProgram.price &&
              `${passProgram.price.toLocaleString()}원 `}
            구매
          </Button>
        </div>
      </NoborderForm>
    </DepthPage>
  );
});
