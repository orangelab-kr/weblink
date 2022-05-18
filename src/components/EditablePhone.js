import { Button, Dialog, Form, Input, Loading, Popup } from 'antd-mobile';
import { EditSOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { Client } from '../tools/client';
import { onPhoneFormatter } from '../tools/formatter';
import styled from 'styled-components';

const VerifiedText = styled.div`
  color: green;
  margin: 0.6em;
  text-align: right;
`;

export const EditablePhone = ({ value, onChange }) => {
  const [form] = Form.useForm();
  const [verified, setVerified] = useState(false);
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onPhoneNoChange = async (phoneNo) => {
    phoneNo = phoneNo
      .replace(/[^0-9]/, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    setVerified(false);
    form.setFieldsValue({ phoneNo });
    if (phoneNo.length >= 13) {
      const request = await Dialog.confirm({
        content: `인증번호를 발송할까요?`,
        confirmText: '발송',
        cancelText: '취소',
      });

      if (request) await requestVerify();
    }
  };

  const requestVerify = async () => {
    setRequested(true);
    setVerified(false);
    let { phoneNo } = form.getFieldsValue();
    phoneNo = `+82${phoneNo.replace(/-/g, '').substring(1)}`;
    await Client.get('/accounts/methods/phone/verify', {
      params: { phoneNo },
    });
  };

  const verifyPhone = async () => {
    let { phoneNo, code } = form.getFieldsValue();
    phoneNo = `+82${phoneNo.replace(/-/g, '').substring(1)}`;
    if (code.length < 6) return;
    const { phone } = await Client.post('/accounts/methods/phone/verify', {
      phoneNo,
      code,
    }).then((r) => r.data);

    form.setFieldsValue({ phone });
    setVerified(true);
  };

  const SendVerify = (
    <Button
      size='middle'
      color='primary'
      onClick={requestVerify}
      disabled={verified}
    >
      {requested ? '재전송' : '문자 발송'}
    </Button>
  );

  const onConfirm = async () => {
    const { phone } = form.getFieldsValue();
    if (!phone) return;
    setVisible(false);
    form.resetFields();
    setVerified(false);
    setRequested(false);

    if (!onChange) return;
    try {
      setLoading(true);
      await onChange(phone);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setVisible(true)}>
        {onPhoneFormatter(value)} {loading ? <Loading /> : <EditSOutline />}
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ height: '25vh' }}
      >
        <div style={{ margin: '2em' }}>
          <p style={{ fontSize: '1.8em', fontWeight: 800 }}>전화번호 변경</p>
          <Form form={form} style={{ marginTop: '1em' }}>
            <Form.Item name='phoneNo' label='전화번호'>
              <Input
                type='tel'
                placeholder='010-0000-0000'
                onChange={onPhoneNoChange}
              />
            </Form.Item>
            <Form.Item name='code' label='인증번호' extra={SendVerify}>
              <Input
                type='text'
                pattern='[0-9]*'
                placeholder='000000'
                onChange={verifyPhone}
                disabled={!requested || verified}
              />
            </Form.Item>
            <Form.Item name='phone' hidden>
              <Input type='hidden' />
            </Form.Item>
            {verified && (
              <div>
                <VerifiedText>인증이 완료되었습니다.</VerifiedText>{' '}
                <Button color='primary' block onClick={onConfirm}>
                  변경 완료하기
                </Button>
              </div>
            )}
          </Form>
        </div>
      </Popup>
    </>
  );
};
