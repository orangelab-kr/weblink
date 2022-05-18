import { Button, Form, Input, Loading, Popup } from 'antd-mobile';
import { CheckShieldFill, RightOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Client } from '../tools/client';
import { onLicenseStrFormatter } from '../tools/formatter';

export const EditableLicense = ({ user, value, onReload }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const defaultValue = {
    ...user,
    birthday: dayjs(user.birthday).format('YYYY년 MM월 DD일'),
  };

  const onLicenseStrChange = async (licenseStr) => {
    licenseStr = onLicenseStrFormatter(licenseStr);
    form.setFieldsValue({ licenseStr });
  };

  const onConfirm = async () => {
    const { licenseStr } = form.getFieldsValue();
    if (!licenseStr) return;

    try {
      setLoading(true);
      await Client.post('/accounts/license', { licenseStr });
      form.resetFields();
      setVisible(false);
      if (onReload) await onReload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {value ? (
        <div>
          인증됨 <CheckShieldFill color='#3cb371' />
        </div>
      ) : (
        <div onClick={() => setVisible(true)}>
          인증 필요 {loading ? <Loading /> : <RightOutline />}
        </div>
      )}

      <Popup visible={visible} onMaskClick={() => setVisible(false)}>
        <div style={{ margin: '2em' }}>
          <p style={{ fontSize: '1.8em', fontWeight: 800 }}>운전면허 등록</p>
          <Form
            form={form}
            style={{ marginTop: '1em' }}
            initialValues={defaultValue}
          >
            <Form.Item name='realname' label='성명'>
              <Input type='text' disabled={true} />
            </Form.Item>
            <Form.Item name='birthday' label='생년월일'>
              <Input type='text' disabled={true} />
            </Form.Item>
            <Form.Item name='licenseStr' label='운전면허'>
              <Input
                type='text'
                maxLength={15}
                placeholder='서울-00-000000-00'
                onChange={onLicenseStrChange}
              />
            </Form.Item>
          </Form>
          <Button color='primary' block onClick={onConfirm}>
            등록하기
          </Button>
        </div>
      </Popup>
    </>
  );
};
