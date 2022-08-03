import { Button, Dialog, Divider, NoticeBar } from 'antd-mobile';
import { CheckCircleFill, ExclamationOutline } from 'antd-mobile-icons';
import { getResult, prepare } from 'klip-sdk';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHeader } from '../../components/PageHeader';
import { Client } from '../../tools/client';
import { useInterval } from '../../tools/useInterval';
import { useLocalStorage } from '../../tools/useLocalStorage';

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

export const Centercoin = () => {
  const [enabled, setEnabled] = useState(true);
  const [requestId, setRequestId] = useLocalStorage('klip-request-id');

  useEffect(() => {
    const loadUser = async () => {
      const { user } = await Client.get('/accounts/auth').then((r) => r.data);
      if (!user.centercoinAddress) return;
      setEnabled(false);
      Dialog.alert({
        confirmText: '확인',
        header: <CheckCircleFill style={{ fontSize: 64 }} color='#00b578' />,
        title: '이미 신청을 완료하신 상태입니다.',
        content: '영업일 기준 3일 이내로 지급될 예정입니다.',
      });
    };

    loadUser();
  }, []);

  const registerAddress = useCallback(
    async (centercoinAddress) => {
      setRequestId();
      setEnabled(false);

      await Client.post(`/accounts/auth`, { centercoinAddress });
      Dialog.alert({
        confirmText: '확인',
        header: <CheckCircleFill style={{ fontSize: 64 }} color='#00b578' />,
        title: '등록이 완료되었습니다.',
        content: '영업일 기준 3일 이내로 지급될 예정입니다.',
      });
    },
    [setRequestId]
  );

  const throwError = useCallback(
    (message) => {
      setRequestId();
      if (message === 'request key does not exist') return;
      Dialog.alert({
        confirmText: '확인',
        header: <ExclamationOutline style={{ fontSize: 64 }} color='warning' />,
        title: '오류가 발생하였습니다.',
        content: message,
      });
    },
    [setRequestId]
  );

  const checkKlip = useCallback(async () => {
    if (!enabled || !requestId) return;

    const res = await getResult(requestId);
    if (res.err) return throwError(res.err);
    if (res.status === 'prepared') return;
    const centercoinAddress = res.result.klaytn_address;
    await registerAddress(centercoinAddress);
  }, [enabled, registerAddress, requestId, throwError]);

  useInterval(() => checkKlip(), requestId ? 1500 : null);
  const onKlip = async () => {
    const callbackLink = 'hikick://weblink/centercoin';
    const res = await prepare.auth({
      bappName: '하이킥',
      successLink: callbackLink,
      failLink: callbackLink,
    });

    if (res.err) return throwError(res.err);
    const requestId = res.request_key;

    setRequestId(requestId);
    const params = `https://klipwallet.com/?target=a2a?request_key=${requestId}`;
    const url = `kakaotalk://klipwallet/open?url=${encodeURIComponent(params)}`;
    window.location.href = url;
  };

  return (
    <div>
      <div style={{ margin: '0 28px' }}>
        <PageHeader>센터코인</PageHeader>
        <div style={{ margin: '0 0.5em' }}>
          <div
            style={{
              display: 'flex',
              height: '80vh',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <NoticeBar
              icon={<ExclamationOutline />}
              style={{ marginBottom: '0.5em' }}
              color={enabled ? 'alert' : 'info'}
              content={
                enabled
                  ? '베타테스터만 Klip을 통한 보상을 받을 수 있습니다.'
                  : '이미 지갑을 연결하신 상태입니다.'
              }
            />
            <Button
              block
              size='large'
              disabled={!enabled}
              onClick={onKlip}
              style={{
                display: 'flex',
                padding: '1em 0',
                fontSize: '1.2em',
                fontWeight: 350,
                backgroundColor: '#216FEA',
                justifyContent: 'center',
                color: '#ffffff',
                gap: 10,
              }}
            >
              <img
                src='https://klipwallet.com/img/teasing-logo.svg'
                alt='Klip'
              />
              카카오톡으로 Klip 연동
            </Button>
            <Divider />
            <Link href='/centercoin/metamask'>
              <Button
                block
                fill='none'
                disabled={!enabled}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1em',
                  alignItems: 'center',
                  fontWeight: 900,
                  gap: 10,
                }}
              >
                <img
                  height='30em'
                  src='https://github.com/MetaMask/brand-resources/raw/master/SVG/metamask-fox.svg'
                  alt='metamask'
                />
                메타마스크로 진행하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
