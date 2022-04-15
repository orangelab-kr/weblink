import {
  CheckShieldFill,
  EditSOutline,
  RightOutline,
  SmileOutline,
} from 'antd-mobile-icons';
import { SettingsBlock } from './SettingsBlock';
import { SettingsItem } from '../SettingsItem';
import { EditableText } from '../../EditableText';
import dayjs from 'dayjs';

export const SettingsInfoBlock = ({ user, updateUser }) => {
  const onChange = (field) => (value) => updateUser({ [field]: value });

  return (
    <SettingsBlock
      icon={<SmileOutline />}
      title='개인정보'
      description='고객님의 개인정보를 위해 항상 노력하고 있습니다.'
    >
      <SettingsItem gap={12} title='성명'>
        <EditableText value={user.realname} onChange={onChange('realname')} />
      </SettingsItem>
      <SettingsItem gap={12} title='전화번호' extra={<EditSOutline />}>
        {user.phoneNo}
      </SettingsItem>
      <SettingsItem gap={12} title='이메일'>
        <EditableText value={user.email} onChange={onChange('email')} />
      </SettingsItem>
      <SettingsItem gap={12} title='생년월일' extra={<EditSOutline />}>
        {dayjs(user.birthday).format('YYYY년 MM월 DD일')}
      </SettingsItem>
      <SettingsItem
        gap={12}
        title='운전면허'
        extra={
          user.licenseId ? (
            <CheckShieldFill color='#3cb371' />
          ) : (
            <RightOutline />
          )
        }
      >
        {user.licenseId ? '인증됨' : '인증 필요'}
      </SettingsItem>
    </SettingsBlock>
  );
};
