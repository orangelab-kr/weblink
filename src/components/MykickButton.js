import { ReactComponent as MykickLogo } from '../assets/mykick-logo.svg';
import { BottomBarPrimaryButton } from './BottomBar/BottomBarPrimary/BottomBarPrimaryButton';

export const MykickButton = () => (
  <BottomBarPrimaryButton
    style={{
      marginTop: 10,
      padding: 10,
      border: 'rgb(22, 59, 84) solid 2px',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
    }}
    icon={
      <MykickLogo
        style={{
          width: '6em',
          marginBottom: 5,
          color: '#fff',
        }}
      />
    }
    name='튼튼한 킥보드, 내 마음대로 타자!'
    href='hikick://notices/mykick'
  />
);
