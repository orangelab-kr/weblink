import { Button, Dialog, Divider, NoticeBar } from 'antd-mobile';
import { CheckCircleFill, ExclamationOutline } from 'antd-mobile-icons';
import { getResult, prepare, request } from 'klip-sdk';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHeader } from '../../components/PageHeader';
import { Client } from '../../tools/client';

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

export const Centercoin = () => {
  const [enabled, setEnabled] = useState(true);

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

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) {
      localStorage.removeItem('klip-request-id');
      return;
    }

    if (hash.startsWith('#success')) {
      const requestId = localStorage.getItem('kilp-request-id');
      if (!requestId) return;

      getResult(requestId).then(async (res) => {
        const centercoinAddress = res.result.klaytn_address;
        await Client.post(`/accounts/auth`, { centercoinAddress });
        Dialog.alert({
          confirmText: '확인',
          header: <CheckCircleFill style={{ fontSize: 64 }} color='#00b578' />,
          title: '등록이 완료되었습니다.',
          content: '영업일 기준 3일 이내로 지급될 예정입니다.',
        });
      });
    } else if (hash.startsWith('#failed')) {
      Dialog.alert({
        confirmText: '확인',
        header: <ExclamationOutline style={{ fontSize: 64 }} color='warning' />,
        title: '오류가 발생하였습니다.',
        content: '다시 시도하세요.',
      });
    }

    localStorage.removeItem('klip-request-id');
  }, []);

  const onKlip = async () => {
    const bappName = '하이킥';
    const successLink = 'hikick://weblink/centercoin#success';
    const failLink = 'hikick://weblink/centercoin#failed';
    const res = await prepare.auth({ bappName, successLink, failLink });
    if (res.err) {
      Dialog.alert({
        confirmText: '확인',
        header: <ExclamationOutline style={{ fontSize: 64 }} color='warning' />,
        title: '오류가 발생하였습니다.',
        content: res.err,
      });

      return;
    }

    const requestId = res.request_key;

    localStorage.setItem('kilp-request-id', requestId);
    request(requestId);
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
