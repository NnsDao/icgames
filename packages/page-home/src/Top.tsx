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
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  ${media('lg')} {
    display: block;
  }
  img {
    flex: 2;
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
    flex: 3;
    h1 {
      font-size: 32px;
      text-align: center;
      ${media('lg')} {
        font-size: 20px;
        line-height: 28px;
        ${marginMedia(1)}
      }
    }
    p {
      margin-left: 58px;
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
    margin-left: 58px;
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
interface Props {
  data: CollectionData;
}
const Token: React.FC<Props> = ({ data }) => {
  const { push } = useHistory();
  console.log(data);
  return (
    <Wrapper>
      <img onClick={() => push(`/explore/artworks/${data?.id}`)} src={data?.logo} />
      <div className="slogan">
        <h1>Game on, Get Rewarded, Join the Revolution!</h1>
        <p>discover Your favorite web3 Game on icgames.</p>
        <div className="btn">
          <Button onClick={() => push('/rank')} type="primary">
            Ranking
          </Button>
          <Button onClick={() => push('/explore')}>Explore</Button>
        </div>
      </div>
      <div className="rank-bg"></div>
    </Wrapper>
  );
};

export default Token;
