import React from 'react';
import styled from 'styled-components';

import { Grid } from '@horse-racing/react-components';
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

  .partners {
    img {
      width: 100%;
    }
  }
`;

const Partners: React.FC = () => {
  return (
    <Content>
      <img src="/images/partners.png" />
      <Grid className="partners" spans={[4, 4, 0, 2, 2, 1]}>
        <img src="/images/avalanche.svg" />
        <img src="/images/wallet-connect.svg" />
        <img src="/images/metamask.svg" />
        <img src="/images/yeti-swap.svg" />
      </Grid>
    </Content>
  );
};

export default Partners;
