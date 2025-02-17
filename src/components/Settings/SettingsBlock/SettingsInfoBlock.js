import { SmileOutline } from 'antd-mobile-icons';
import { SettingsBlock } from './SettingsBlock';
import { SettingsItem } from '../SettingsItem';
import { EditableText } from '../../EditableText';
import { EditableDate } from '../../EditableDate';
import { EditablePhone } from '../../EditablePhone';
import { EditableLicense } from '../../EditableLicense';

export const SettingsInfoBlock = ({ user, updateUser, loadUser }) => {
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
      <SettingsItem gap={12} title='전화번호'>
        <EditablePhone value={user.phoneNo} onChange={onChange('phone')} />
      </SettingsItem>
      <SettingsItem gap={12} title='이메일'>
        <EditableText value={user.email} onChange={onChange('email')} />
      </SettingsItem>
      <SettingsItem gap={12} title='생년월일'>
        <EditableDate
          value={user.birthday}
          onChange={onChange('birthday')}
          askLicenseDelete={!!user.licenseId}
        />
      </SettingsItem>
      <SettingsItem gap={12} title='운전면허'>
        <EditableLicense
          user={user}
          value={user.licenseId}
          onReload={loadUser}
        />
      </SettingsItem>
    </SettingsBlock>
  );
};
