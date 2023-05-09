import React from 'react';
import styled from 'styled-components';

import { marginMedia, widthMedia } from '@horse-racing/react-components/style/media';

const Content = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  ${marginMedia(3, 3)};
  text-align: center;
  
  > img {
    max-width: 100%;
    ${marginMedia(0, 2)};
  }
`;

const Token: React.FC = () => {
  return (
    <Content>
      <img src="/images/token.png" />
      <img src="/images/token-distribution.png" />
    </Content>
  );
};

export default Token;
