import {
  Button,
  DatePicker,
  Form,
  Input,
  NumberKeyboard,
  PasscodeInput,
} from 'antd-mobile';
import { BankcardOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { PageHeader, useToggle } from '..';

export const Pay = () => {
  const [expiryVisible, setExpiryVisible] = useToggle(false);

  return (
    <div style={{ margin: '0 28px' }}>
      <PageHeader>결제</PageHeader>
      <div
        style={{
          border: '1px solid #eeeeee',
          borderRadius: 5,
          padding: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
        >
          <p style={{ fontWeight: 700, fontSize: 20 }}>이용료(DE20KP) 결제</p>
          <p style={{ fontSize: 15 }}>9,000원</p>
        </div>
        <Form initialValues={{ expiry: new Date() }}>
          <Form.Item label="카드번호" style={{ '--padding-left': 0 }}>
            <Input placeholder="XXXX-XXXX-XXXX-XXXX" />
          </Form.Item>
          <Form.Item
            label="유효기간"
            name="expiry"
            trigger="onConfirm"
            onClick={setExpiryVisible(true)}
            style={{ '--padding-left': 0 }}
          >
            <DatePicker
              visible={expiryVisible}
              min={new Date()}
              precision="month"
              cancelText="취소"
              confirmText="선택"
              onConfirm={setExpiryVisible(false)}
              onCancel={setExpiryVisible(false)}
            >
              {(value) => value && dayjs(value).format('YYYY년 MM월')}
            </DatePicker>
          </Form.Item>
          <Form.Item
            label="주민등록번호 또는 사업자등록번호"
            style={{ '--padding-left': 0 }}
          >
            <Input maxLength={10} placeholder="XXXXXX / XXX-XX-XXXXX" />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            style={{
              '--padding-left': 0,
              '--border-inner': 'none',
            }}
          >
            <PasscodeInput length={2} seperated keyboard={<NumberKeyboard />} />
          </Form.Item>
          <p
            style={{
              marginBottom: 5,
              padding: 10,
              fontSize: 16,
              backgroundColor: '#eee',
              borderRadius: 15,
            }}
          >
            카드 결제시 자동으로 계정에 카드가 등록되고 결제를 시도합니다.
          </p>
          <Button color="primary" block>
            <BankcardOutline /> 결제
          </Button>
        </Form>
      </div>
    </div>
  );
};
