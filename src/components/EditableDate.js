import { ActionSheet, DatePicker, Loading } from 'antd-mobile';
import { EditSOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useState } from 'react';

export const EditableDate = ({ value, onChange, askLicenseDelete }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    const onClick = () => setVisible(true);
    if (!askLicenseDelete) return onClick();
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

  const onChangeWithLoading = async (value) => {
    if (!onChange) return;

    try {
      setLoading(true);
      await onChange(value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={onClick}>
        {dayjs(value).format('YYYY년 MM월 DD일')}{' '}
        {loading ? <Loading /> : <EditSOutline />}
      </div>
      <DatePicker
        title='생년월일'
        visible={visible}
        defaultValue={new Date(value)}
        onClose={() => setVisible(false)}
        onConfirm={onChangeWithLoading}
        confirmText='확인'
        cancelText='취소'
        min={new Date(0)}
        max={new Date()}
      />
    </>
  );
};
