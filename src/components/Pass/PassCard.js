import { Divider } from 'antd-mobile';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const PassContainer = styled.div`
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 10px 0;
`;

const PassTitle = styled.b`
  font-size: 20px;
  font-weight: 800;
`;

export const PassCard = ({
  title,
  description,
  expiredAt,
  children,
  validity,
  price,
}) => {
  return (
    <PassContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <PassTitle>{title}</PassTitle>
        <p>
          {validity && `${validity / 24 / 60 / 60}일`}
          {validity && price && ' / '}
          {price && `${price.toLocaleString()}원`}
        </p>
      </div>
      {expiredAt && <p>{expiredAt.format('YYYY년 M월 D일까지')}</p>}
      <Divider />
      {description && (
        <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
      )}

      {children}
    </PassContainer>
  );
};
