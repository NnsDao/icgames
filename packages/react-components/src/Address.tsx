import { Tooltip, Typography } from 'antd';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const { Paragraph } = Typography;

interface Props {
  address: string;
}

const Span = styled(Paragraph)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Address: React.FC<Props> = ({ address }) => {
  const display = useMemo(() => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <Tooltip title={address}>
      <Span copyable={{ text: address }}>{display}</Span>
    </Tooltip>
  );
};

export default React.memo(Address);
