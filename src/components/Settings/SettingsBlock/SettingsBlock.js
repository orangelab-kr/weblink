export const SettingsBlock = ({ icon, title, description, children }) => {
  return (
    <>
      <div style={{ margin: 25, marginBottom: 40 }}>
        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
          {icon} {title}
        </p>
        {description && (
          <p style={{ fontSize: 14, fontWeight: 400 }}>{description}</p>
        )}
        <div style={{ marginTop: 25 }}>{children}</div>
      </div>
    </>
  );
};
