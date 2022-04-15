import {
  CheckShieldFill,
  EditSOutline,
  RightOutline,
  SmileOutline,
} from 'antd-mobile-icons';
import { SettingBlock } from '../SettingBlock/SettingBlock';
import { SettingItem } from '../SettingItem/SettingItem';
import { EditableText } from '../../EditableText';
import dayjs from 'dayjs';

export const SettingInfoBlock = ({ user, updateUser }) => {
  const onChange = (field) => (value) => updateUser({ [field]: value });

  return (
    <SettingBlock
      icon={<SmileOutline />}
      title='개인정보'
      description='고객님의 개인정보를 위해 항상 노력하고 있습니다.'
    >
      <SettingItem gap={12} title='성명'>
        <EditableText value={user.realname} onChange={onChange('realname')} />
      </SettingItem>
      <SettingItem gap={12} title='전화번호' extra={<EditSOutline />}>
        {user.phoneNo}
      </SettingItem>
      <SettingItem gap={12} title='이메일'>
        <EditableText value={user.email} onChange={onChange('email')} />
      </SettingItem>
      <SettingItem gap={12} title='생년월일' extra={<EditSOutline />}>
        {dayjs(user.birthday).format('YYYY년 MM월 DD일')}
      </SettingItem>
      <SettingItem
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
      </SettingItem>
    </SettingBlock>
  );
};
