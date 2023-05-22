import { getAddress } from '@ethersproject/address';
import { Grid } from '@horse-racing/react-components';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { CollectionData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

const Wrapper = styled.div`
  width: 100%;
  background-size: 100% 333px;
  min-height: 100vh;
  .empty {
    text-align: center;
    color: #aaa;
    ${marginMedia(1.5)}
  }
`;

const Content = styled.div`
  ${widthMedia()};
  margin: 0 auto;

  > .grid {
    margin-bottom: 40px;
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const SelectWrapper = styled.div`
  ${paddingMedia(3.5)}
  text-align:center;
  display: flex;
  align-items: center;
  margin-bottom: 37px;
  > .user-info {
    text-align: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 32px;
      border: 2px solid #f5f5f5;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.06);
      }
    }
  }
`;

const CellStyle = styled.div`
  ${marginMedia(2)}
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: row;
  > .bottom {
    ${paddingMedia(0.4, 0.4, 0.4, 0.4)};
    text-align: center;
    .bottom-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 40px;
      line-height: 40px;
      color: #fff;
    }
    .art-num {
      margin-left: 20px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 31px;
      color: #ffffff;
      opacity: 0.6;
    }
  }
`;

const SbtStyle = styled.div`
  ${paddingMedia(2)}
  display: flex;
  margin: 0 auto;
  align-items: center;
  > .sbt-content {
    > .sbt-title {
      padding-bottom: 10px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 100%;
      color: #ffffff;
    }
    > .sbt-card {
      display: flex;
      align-items: center;
      width: 459px;
      height: 344px;
      position: relative;
      > img {
        width: 459px;
        height: 344px;
        border-radius: 30px;
      }
      > .sbt-author {
        display: flex;
        align-items: center;
        padding: 20px;
        position: absolute;
        bottom: 20px;
        margin: 0 47px;
        width: 365px;
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
const SliderStyle = styled.div`
  ${widthMedia()};
  margin: 0 auto;

  > .grid {
    margin-bottom: 40px;
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const CommentGamelist = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  > .comment-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    color: #ffffff;
  }
  > .comment-box {
    display: flex;
    > .comment-avator {
      display: flex;
      flex-direction: row;
      align-items: center;
      > img {
        width: 44px;
        height: 44px;
      }
      > span {
        margin-left: 24px;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 100%;
        color: #ffffff;
      }
    }
  }

  > .comment-star {
    display: flex;
    align-item: center;
    > img {
      width: 32px;
      height: 30.43px;
    }
  }
  > .comment-date {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 24px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    opacity: 0.5;
  }
  > .comment-content {
    width: 450px;
    height: 252px;
    > p {
      word-break: break-all;
      word-wrap: break-word;
      opacity: 0.8;
      line-height: 28px;
      color: #ffffff;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      word-break: break-all;
      font-size: 16px;
    }
  }
`;

// todo data  game list
const SbtGame: React.FC<{}> = ({}) => {
  const { push } = useHistory();

  return (
    <SbtStyle onClick={() => push(`/myCollection/1`)}>
      <div className="sbt-content">
        <div className="sbt-title">Favorite Games</div>
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

// todo data comment list

const SbtComment: React.FC<{ data: number }> = ({ data }) => {
  const { push } = useHistory();

  return (
    <CommentGamelist onClick={() => push(`/myCollection/1`)}>
      <div className="comment-title">{data == 1 ? 'Published comments' : <p>&nbsp;</p>} </div>
      <div className="comment-box">
        <div className="comment-avator">
          <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
          <span>z.Dom</span>
        </div>
      </div>
      <div className="comment-star">
        <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
        <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
        <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
        <img src={require('@horse-racing/app-config/assets/star-dark.svg')} />
      </div>
      <br />

      <div className="comment-date">April 26, 2023</div>
      <div className="comment-content">
        <p>
          The game has excellent visualization and funny storytelling but some flaws. First, the
          turn base combat system with a complete virtual gamepad causes unnecessary and complicated
          player control. Mobile games control should be as simple as possible. Second, the story
          cannot skip or faster. There is a lag on each line that stops you from clicking the
          dialog. Very annoying. Some people may like the story, but others just want to skip it.
          Give the player a choice, please.
        </p>
      </div>
    </CommentGamelist>
  );
};

const Market: React.FC = () => {
  const api = useApi();
  const deployments = useDeployments();
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<CollectionData[]>([]);
  const { account, library } = useWallet();
  const [address, setAddress] = useState('');

  console.log(data, 28288282);

  useEffect(() => {
    setFetching(true);
    if (!deployments || !account) return;
    api
      ?.getAllcollections({
        owner: getAddress(account)
      })
      .then((res) => {
        setData(res.list);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, account, deployments]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
  };

  return (
    <Wrapper>
      <Content>
        <SelectWrapper>
          <div className="user-info">
            <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
          </div>
        </SelectWrapper>

        <CellStyle>
          <div className="bottom">
            <div className="bottom-title">
              kkkkdenuabn <span className="art-num">oykqy...6qe</span>
            </div>
          </div>
        </CellStyle>

        <SbtStyle>
          <div className="sbt-content">
            <div className="sbt-title">SBT</div>
            <div className="sbt-card">
              <img src={require('@horse-racing/app-config/assets/sbt-bg.png')} />
              <div className="sbt-author">
                <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
                <div className="sbt-company">Bored Ape Yacht Club</div>
              </div>
            </div>
          </div>
        </SbtStyle>

        {/* {data.length <= 0 ? ( */}
        <Grid className="grid" spans={[4, 3, 3, 2, 2, 1]}>
          {/* {data.map((order, index) => ( */}

          <SliderStyle>
            <Slider {...settings}>
              <SbtGame key={1} />
              <SbtGame key={1} />
              <SbtGame key={1} />
              <SbtGame key={1} />
              <SbtGame key={1} />
              <SbtGame key={1} />
            </Slider>
          </SliderStyle>
          {/* ))} */}
        </Grid>
        {/* ) : (
          <div className="empty">Not yet to display favorite game.</div>
        )} */}
        <SliderStyle>
          <Slider {...settings}>
            <SbtComment data={1} />
            <SbtComment data={2} />
            <SbtComment data={3} />
            <SbtComment data={4} />
            <SbtComment data={5} />
            <SbtComment data={6} />
            <SbtComment data={7} />
          </Slider>
        </SliderStyle>

        <Spin spinning={fetching} style={{ width: '100%' }} />
      </Content>
    </Wrapper>
  );
};

export default React.memo(Market);
