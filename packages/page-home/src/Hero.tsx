import React from 'react';
import styled from 'styled-components';

import { mediaLinks } from '@horse-racing/app-config/links';
import { colorPrimary } from '@horse-racing/react-components/style';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';

const Wrapper = styled.div`
  ${paddingMedia(1, 1)}
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${widthMedia()};
  margin: 0 auto;

  ${media('lg')} {
    flex-direction: column;

    > img {
      width: 100% !important;
      margin-bottom: 40px;
    }
  }

  > img {
    width: 40%;
  }
`;

const Details = styled.div`
  max-width: 540px;

  > h1 {
    ${marginMedia(0, 2.5)};
    color: ${colorPrimary};
  }

  > h6 {
    ${marginMedia(0, 2)};
  }

  > .links {
    display: flex;
    align-items: center;

    > a {
      margin-right: 20px;
    }
  }
`;

const Mp4Content = styled.div`
  position: relative;
  width: 60%;
  margin: 0 auto;
  ${marginMedia(2.5)};

  ${media('sm')} {
    ${widthMedia()}
  }

  > img {
    width: 100%;
  }

  > video {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    top: 10%;

    width: 94%;
    height: 88%;
    margin: auto;
  }
`;

const Hero: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <img src="/images/hero-img.png" />
        <Details>
          <h1>This will be your meta universe horse farm.</h1>
          <h6>Horse racing Winner will be the best horse racing game on avalanche..</h6>
          <div className="links">
            {mediaLinks.map(({ href, icon }, index) => (
              <a href={href} key={index} rel="noopener noreferrer" target="_blank">
                <img src={icon} />
              </a>
            ))}
          </div>
        </Details>
      </Content>
      <Mp4Content>
        <img src="/images/mp4-border.png" />
        <video controls poster="/images/mp4-poster.png">
          <source
            data-v-59862427=""
            src="https://masai.s3.amazonaws.com/e7171fb0922c24fe6c68b28a89784093.mp4"
            type="video/mp4"
          />
          <source data-v-59862427="" src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </Mp4Content>
    </Wrapper>
  );
};

export default Hero;
