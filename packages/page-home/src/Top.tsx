import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { CollectionData } from '@horse-racing/service/types';
import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${widthMedia()};
  ${paddingMedia(3.5)}

  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media('lg')} {
    display: block;
  }
  img {
    width: 535px;
    box-sizing: border-box;
    ${marginMedia(0, 0, 0.5, 1.6)}
    border-radius: 32px;
    &:hover {
      cursor: pointer;
    }
    ${media('lg')} {
      width: 535px;
      display: block;
      margin: 0 auto;
    }
  }
  .slogan {
    display: flex;
    flex-direction: column;
    .slogan-title {
      display: flex;
      margin-left: 30px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 48px;
      line-height: 72px;

      ${media('lg')} {
        font-size: 20px;
        line-height: 28px;
        ${marginMedia(1)}
      }
      > span {
        color: #d5ff40;
      }
    }
    .slogan-title-two {
      display: flex;
      margin-left: 30px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 48px;
      line-height: 72px;
      > span {
        color: #d5ff40;
      }
    }
    p {
      margin-left: 30px;
      font-size: 18px;
      text-align: left;
      ${media('lg')} {
        font-size: 12px;
        line-height: 17px;
      }
    }
    ${media('lg')} {
      display: block;
    }
  }

  .btn {
    margin-left: 30px;
    ${marginMedia(2.2)}
    text-align:left;
    ${media('lg')} {
      margin: 0 auto;
      text-align: center;
      ${marginMedia(1.2)}
    }
    .ant-btn {
      ${marginMedia(0, 0, 0, 0.4)}
      font-size:16px;
      height: 46px;
      border: 1;
      color: #fff;
      border-radius: 1000px;
      background: #000;

      ${paddingMedia(0, 0, 1.6, 1.6)}
      &:hover {
        background: #2f2f2f;
        opacity: 0.8;
      }
      ${media('lg')} {
        ${marginMedia(0, 0, 0, 0)}
        ${paddingMedia(0, 0, 2, 2)}
      }
    }
    .ant-btn-primary {
      ${media('lg')} {
        ${marginMedia(0, 0, 0, 1)}
      }
      color: #000;
      border-radius: 1000px;
      background: #d5ff40;
    }
  }
  .rank-bg {
    position: absolute;
    width: 732px;
    height: 732px;
    left: 0px;
    top: 560px;
    background: #d5ff40;
    opacity: 0.5;
    filter: blur(400px);
  }
`;

const SbtStyle = styled.div`
  ${paddingMedia(2)}
  display: flex;
  > .sbt-content {
    > .sbt-card {
      display: flex;
      align-items: center;
      position: relative;
      > img {
        width: 535px;
        height: 535px;
        border-radius: 32px;
      }
      > .sbt-author {
        display: flex;
        align-items: center;
        padding: 0 20px;
        position: absolute;
        bottom: 20px;
        margin: 0 40px;
        width: 495px;
        height: 96px;
        background: rgba(245, 245, 245, 0.5);
        backdrop-filter: blur(40px);
        border-radius: 10000px;
        > img {
          width: 56px;
          height: 56px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 1000px;
        }
        > .sbt-company {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          margin-left: 16px;
          font-size: 18px;
          line-height: 18px;
          text-transform: uppercase;
          color: #000000;
        }
      }
    }
  }
`;

interface Props {
  data: CollectionData;
}

const SbtGame: React.FC<{}> = ({}) => {
  const { push } = useHistory();

  return (
    <SbtStyle onClick={() => push(`/myCollection/1`)}>
      <div className="sbt-content">
        <div className="sbt-card">
          <img src={require('@horse-racing/app-config/assets/sbt-bg.png')} />
          <div className="sbt-author">
            <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
            <div className="sbt-company">Starfish Club</div>
          </div>
        </div>
      </div>
    </SbtStyle>
  );
};

const Token: React.FC<Props> = ({ data }) => {
  const { push } = useHistory();
  console.log(data);
  return (
    <Wrapper>
      {/* <img onClick={() => push(`/explore/artworks/${data?.id}`)} src={data?.logo} /> */}

      <div className="slogan">
        <div className="slogan-title">
          <span>Game &nbsp; </span> on, Get Rewarded,
        </div>
        <div className="slogan-title-two">
          Join the <span> &nbsp;Revolution</span>!
        </div>
        <p>Discover Your favorite web3 Game on icgames.</p>
        <div className="btn">
          <Button onClick={() => push('/rank')} type="primary">
            Ranking
          </Button>
          <Button onClick={() => push('/explore')}>Explore</Button>
        </div>
      </div>
      <SbtGame />
      <div className="rank-bg"></div>
    </Wrapper>
  );
};

export default Token;
