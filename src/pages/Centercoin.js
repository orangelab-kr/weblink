import detectEthereumProvider from '@metamask/detect-provider';
import { Button, Dialog, Space, Steps, Tag } from 'antd-mobile';
import {
  AddCircleOutline,
  AppstoreOutline,
  CheckCircleFill,
  DownlandOutline,
  LinkOutline,
  MailOpenOutline,
  SmileOutline,
} from 'antd-mobile-icons';
import { Step } from 'antd-mobile/es/components/steps/step';
import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Client } from '../tools/client';

const Process = {
  Install: 0,
  Open: 1,
  AddNetwork: 2,
  ImportToken: 3,
  RequestPermission: 4,
  GetWallet: 5,
  Done: 6,
};

export const Centercoin = () => {
  const [ethereum, setEthereum] = useState();
  const [currentStep, setCurrentStep] = useState(Process.Install);
  const networkInfo = {
    chainId: '0x2019',
    chainName: 'Klaytn Mainnet',
    rpcUrls: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    iconUrls: ['https://scope.klaytn.com/icons/favicon@120.png'],
    blockExplorerUrls: ['https://scope.klaytn.com'],
    nativeCurrency: {
      name: 'KLAY',
      symbol: 'KLAY',
      decimals: 18,
    },
  };

  const tokenInfo = {
    type: 'ERC20',
    options: {
      address: '0xd364de0683b29e582e5713425b215b24ce804ae9',
      image: `${window.location.origin}/assets/centercoin.png`,
      symbol: 'CENT',
      decimals: 18,
    },
  };

  const getAppUrl = () => {
    const android = `https://play.google.com/store/apps/details?id=io.metamask`;
    const ios = `https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202`;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/Android/i.test(userAgent)) return android;
    return ios;
  };

  const onInstall = async () => {
    window.location.href = getAppUrl();
    setCurrentStep(Process.Open);
  };

  const onOpen = async () => {
    const redirect = '/centercoin';
    const sessionId = localStorage.getItem('weblink-session-id');
    const basePath = `${window.location.host}/auth/authorize`;
    const url = `dapp://${basePath}?redirect=${redirect}&sessionId=${sessionId}`;
    window.location.href = url;
  };

  const onAddNetwork = async () => {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networkInfo],
    });

    setCurrentStep(Process.ImportToken);
  };

  const onImportToken = async () => {
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: tokenInfo,
    });

    setCurrentStep(Process.RequestPermission);
  };

  const onRequestPermission = async () => {
    await ethereum.request({ method: 'eth_requestAccounts' });
    setCurrentStep(Process.GetWallet);
  };

  const onGetWallet = async () => {
    const { chainId } = networkInfo;
    const accounts = await ethereum.request({
      method: 'eth_accounts',
      params: [{ chainId }],
    });

    const [centercoinAddress] = accounts;
    await Client.post(`/accounts/auth`, { centercoinAddress });
    setCurrentStep(Process.Done);
    Dialog.alert({
      confirmText: '확인',
      header: <CheckCircleFill style={{ fontSize: 64 }} color='#00b578' />,
      title: '등록이 완료되었습니다.',
      content: '영업일 기준 3일 이내로 지급될 예정입니다.',
    });
  };

  useEffect(() => {
    if (Process.AddNetwork < currentStep) return;
    const checkEthereum = async () => {
      const ethereum = await detectEthereumProvider();
      if (!ethereum) return;

      setEthereum(ethereum);
      setCurrentStep(Process.AddNetwork);
    };

    checkEthereum();
  }, [currentStep]);

  const StepWithTime = ({
    step,
    title,
    description,
    time,
    icon,
    button,
    onClick,
  }) => (
    <Step
      icon={icon}
      status={
        step === currentStep
          ? 'process'
          : step < currentStep
          ? 'finish'
          : 'wait'
      }
      title={
        <Space block direction='horizontal'>
          <div>{title}</div>
          <Tag
            color='primary'
            fill='outline'
            style={{ fontSize: 12, fontWeight: 800 }}
          >
            소요시간: {time}
          </Tag>
        </Space>
      }
      description={
        <Space block direction='vertical'>
          <div>{description}</div>
          <Button
            color='primary'
            onClick={onClick}
            disabled={step !== currentStep}
          >
            {button}
          </Button>
        </Space>
      }
    />
  );

  return (
    <div>
      <div style={{ margin: '0 28px' }}>
        <PageHeader>센터코인</PageHeader>
        <Steps
          direction='vertical'
          current={currentStep}
          style={{
            '--title-font-size': '20px',
            '--description-font-size': '15px',
            '--indicator-margin-right': '20px',
            '--icon-size': '30px',
          }}
        >
          <StepWithTime
            step={Process.Install}
            title='MetaMask 설치'
            icon={<AppstoreOutline />}
            description='다운로드 후 비밀번호를 설정해주세요.'
            onClick={onInstall}
            button='설치하기'
            time='3분'
          />
          <StepWithTime
            step={Process.Open}
            title='MetaMask 열기'
            icon={<MailOpenOutline />}
            description='아래 버튼을 눌러 실행해주세요.'
            onClick={onOpen}
            button='MetaMask에서 이어가기'
            time='30초'
          />
          <StepWithTime
            step={Process.AddNetwork}
            title='네트워크 추가(Klaytn)'
            icon={<AddCircleOutline />}
            description='아래 버튼을 눌러 네트워크를 추가하세요'
            onClick={onAddNetwork}
            button='원클릭 추가'
            time='10초'
          />
          <StepWithTime
            step={Process.ImportToken}
            title='토큰 추가(센터코인)'
            icon={<DownlandOutline />}
            description='아래 버튼을 눌러 토큰을 추가하세요.'
            onClick={onImportToken}
            button='센터코인 추가'
            time='10초'
          />
          <StepWithTime
            step={Process.RequestPermission}
            title='지갑 권한 동의'
            icon={<LinkOutline />}
            description='하이킥이 지갑 정보를 가져올 수 있게 동의해주세요.'
            onClick={onRequestPermission}
            button='안전하게 동의'
            time='10초'
          />
          <StepWithTime
            step={Process.GetWallet}
            title='리워드 받기'
            icon={<SmileOutline />}
            description='영업일 기준 3일 이내로 지급받을 수 있습니다.'
            onClick={onGetWallet}
            button='리워드 받기'
            time='3초'
          />
        </Steps>
      </div>
    </div>
  );
};
