import { Input, Loading } from 'antd-mobile';
import { EditSOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  .adm-input {
    text-align: right;
    font-weight 600;
    line-height: 1;
    min-height: 100%;
  }
`;

export const EditableText = ({ value, onChange }) => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedValue, onUpdatedValue] = useState(value);
  const onClick = () => setEditable(true);
  const onRef = (ref) => {
    if (ref === null) return;
    if (!editable) return;
    ref.focus();
  };

  const onUpdate = async () => {
    setEditable(false);
    if (onChange && value !== updatedValue) {
      try {
        setLoading(true);
        await onChange(updatedValue);
      } finally {
        setLoading(false);
      }
    }
  };

  const onKeyDown = async (event) => {
    if (!editable || event.keyCode !== 13) return;
    await onUpdate();
  };

  return (
    <div onKeyDown={onKeyDown}>
      {!editable && (
        <div onClick={onClick}>
          {updatedValue} {loading ? <Loading /> : <EditSOutline />}
        </div>
      )}

      {editable && (
        <StyledInput
          value={updatedValue}
          style={{ '--font-size': 15 }}
          onChange={onUpdatedValue}
          onBlur={onUpdate}
          ref={onRef}
        />
      )}
    </div>
  );
};
