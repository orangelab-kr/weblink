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
import { ActionSheet, DatePicker } from 'antd-mobile';
import { useState } from 'react';

export const SettingsInfoBlock = ({ user, updateUser }) => {
  const [birthdayPicker, setBirthdayPicker] = useState(false);
  const onChange = (field) => (value) => updateUser({ [field]: value });

  const onBirthdayClick = () => {
    const onClick = () => setBirthdayPicker(true);
    if (!user.licenseId) return onClick();
    ActionSheet.show({
      closeOnAction: true,
      cancelText: '아니요',
      actions: [{ onClick, text: '네, 변경합니다', danger: true }],
      extra: (
        <div style={{ textAlign: 'center', fontSize: '1em' }}>
          <div>현재 운전면허가 등록되어 있습니다.</div>
          <div>해지 후 생년월일을 변경하시겠습니까?</div>
        </div>
      ),
    });
  };

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
      <SettingsItem
        gap={12}
        title='생년월일'
        extra={<EditSOutline />}
        onClick={onBirthdayClick}
      >
        {dayjs(user.birthday).format('YYYY년 MM월 DD일')}
      </SettingsItem>
      <DatePicker
        title='생년월일'
        visible={birthdayPicker}
        defaultValue={new Date(user.birthday)}
        onClose={() => setBirthdayPicker(false)}
        onConfirm={onChange('birthday')}
        confirmText='확인'
        cancelText='취소'
        min={new Date(0)}
        max={new Date()}
      />
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
