import { Button, Form, Input, Toast } from 'antd-mobile';
import { UserAddOutline } from 'antd-mobile-icons';
import copy from 'copy-to-clipboard';
import RCForm from 'rc-field-form';
import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Client } from '../tools/client';

export const Referral = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const loadUser = useCallback(async () => {
    const { data } = await Client.get('/accounts/auth');
    setUser(data.user);
    setLoading(false);
  }, []);

  const loadReferralCount = useCallback(async () => {
    const { data } = await Client.get('/accounts/referral/count');
    setCount(data.count);
    setLoading(false);
  }, []);

  const submitReferralCode = async (data) => {
    if (loading) return;

    try {
      setLoading(true);
      const referralCode = data.referralCode.toUpperCase();
      await Client.post('/accounts/referral', { referralCode });
      await loadUser();
    } finally {
      setLoading(false);
    }
  };

  const onCopyClick = () => {
    copy(user && user.referralCode);
    Toast.show({ content: '복사되었습니다.', position: 'top' });
  };

  useEffect(() => {
    loadUser();
  }, [loadUser, setLoading]);

  useEffect(() => {
    loadReferralCount();
  }, [loadReferralCount]);

  return (
    <div>
      {' '}
      <div style={{ margin: '0 28px' }}>
        <PageHeader>초대하기⁺</PageHeader>
        {count ? (
          <p style={{ fontSize: 20 }}>
            🏆 지금까지 {count.toLocaleString()}명 초대했습니다.
          </p>
        ) : (
          ''
        )}
      </div>
      {user && (
        <>
          <div
            style={{
              margin: 25,
              backgroundColor: '#eee',
              borderRadius: 10,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              {user.realname}님의 초대 코드
            </p>
            <p
              onClick={onCopyClick}
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: 300,
                fontFamily: 'monospace',
              }}
            >
              {user.referralCode.toUpperCase()}
            </p>
            <p style={{ marginTop: 15, fontSize: 15 }}>
              초대코드를 클릭하여 복사하세요.
            </p>
          </div>
          {!user.referrerUserId && (
            <div
              style={{
                margin: 25,
                backgroundColor: '#eee',
                borderRadius: 10,
                padding: 10,
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                초대코드 입력
              </p>
              <RCForm
                onFinish={submitReferralCode}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
              >
                <Form.Item name='referralCode' noStyle>
                  <Input
                    maxLength={6}
                    placeholder='초대 코드'
                    style={{
                      width: '30%',
                      textAlign: 'center',
                      '--font-size': '25px',
                    }}
                  />
                </Form.Item>
                <Button color='success' size='large' type='submit'>
                  <UserAddOutline /> 등록
                </Button>
              </RCForm>
            </div>
          )}
        </>
      )}
    </div>
  );
};
