import { Button, Checkbox, Selector } from 'antd-mobile';
import styled from 'styled-components';
import { Client, DepthPage, PageHeader } from '..';

const MessageContainer = styled.div`
  background-color: #eee;
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
`;

const Subtitle = styled.p`
  font-size: 20px;
`;

const ConfirmContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
`;

const ConfirmMessage = styled.p`
  margin-left: 5px;
`;

const SecessionButton = styled.div`
  margin-bottom: 10px;
`;

export const Secession = () => {
  const newReason = (message) => ({ label: message, value: message });
  const reasons = [
    newReason('잦은 시스템 오류'),
    newReason('가격이 너무 비쌈'),
    newReason('재가입을 위한 탈퇴'),
    newReason('자주 사용하지 않음'),
    newReason('타사 서비스 이용'),
    newReason('사용법을 모르겠음'),
  ];

  const onSecession = async () => {
    await Client.delete('/accounts/auth/secession', {
      data: { reason: '테스트' },
    });
  };

  return (
    <DepthPage>
      <div style={{ marginLeft: 28, marginRight: 28 }}>
        <PageHeader>탈퇴</PageHeader>
        <Subtitle>하이킥 탈퇴 전 꼭 확인해주세요.</Subtitle>
        <MessageContainer>
          1. 모든 데이터는 복구가 불가능합니다.
        </MessageContainer>
        <p style={{ marginBottom: 10 }}>탈퇴 사유를 선택해주세요.</p>
        <Selector multiple={true} options={reasons} />
        <ConfirmContainer>
          <Checkbox />
          <ConfirmMessage>
            안내 사항을 모두 확인하였으며, 이에 동의합니다.
          </ConfirmMessage>
        </ConfirmContainer>
        <SecessionButton>
          <Button color="danger" block={true} onClick={onSecession}>
            탈퇴
          </Button>
        </SecessionButton>
      </div>
    </DepthPage>
  );
};
