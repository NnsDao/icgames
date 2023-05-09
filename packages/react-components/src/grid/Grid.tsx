import type { RowProps } from 'antd';

import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { useGrid } from './useGrid';

interface Props {
  justify?: RowProps['justify'];
  align?: RowProps['align'];
  spans: [number, number, number, number, number, number];
  className?: string;
  overrideGutter?: number;
}

const Container = styled.div``;

const Grid: React.FC<Props> = ({ align, children, className, justify, overrideGutter, spans }) => {
  const { gutter, gutterSize, rowNum, spans: _spans } = useGrid(spans);

  return (
    <Container className={className}>
      <Row align={align} gutter={overrideGutter ?? gutter} justify={justify}>
        {React.Children.map(children, (child, index) => (
          <Col
            key={index}
            {..._spans}
            style={{
              marginBottom:
                Math.ceil((index + 1) / rowNum) ===
                Math.ceil(React.Children.count(children) / rowNum)
                  ? 0
                  : overrideGutter ?? gutterSize
            }}
          >
            {child}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default React.memo<typeof Grid>(Grid);
