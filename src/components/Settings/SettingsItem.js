import { Divider } from 'antd-mobile';

export const SettingsItem = ({
  children,
  icon,
  gap,
  title,
  extra,
  onClick,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 400 }}>
          {icon} {title}
        </div>
        <div style={{ fontWeight: 600 }}>
          {children} {extra}
        </div>
      </div>
      <Divider style={{ marginTop: gap, marginBottom: gap }} />
    </>
  );
};
