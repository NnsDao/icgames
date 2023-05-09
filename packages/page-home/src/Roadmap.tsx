import React from 'react';
import styled from 'styled-components';

import media, { marginMedia, widthMedia } from '@horse-racing/react-components/style/media';

const Content = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  ${marginMedia(3, 3)};
  text-align: center;

  ${media('sm')} {
    width: 100% !important;
  }

  > img {
    max-width: 100%;
    ${marginMedia(0, 2)};
  }

  > div {
    width: 100%;
    img {
      width: 100%;
    }

    ${media('lg')} {
      overflow-x: scroll;
      padding-bottom: 10px;

      img {
        width: 200%;
      }
    }
  }
`;

const Roadmap: React.FC = () => {
  return (
    <Content>
      <img src="/images/roadmap.png" />
      <div>
        <img src="/images/roadmap-detail.png" />
      </div>
    </Content>
  );
};

export default Roadmap;
