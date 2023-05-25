import { formatImage } from '@horse-racing/app-config/utils';
import { Button, Collapse, Divider, Drawer, Form, Input, Select, Spin } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
const { TextArea } = Input;
// import { Exchange } from '@nft-market/contracts-core';
// import Order from '@nft-market/contracts-core/Order';
import { FormatBalance, FormatNumber } from '@horse-racing/react-components';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { CollectionData, Erc721DetailData, NObject } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

const { Panel } = Collapse;
const { Option } = Select;

const Wrapper = styled.div`
  background: #000;
  width: 100%;
  min-height: 300vh;
  .ant-collapse {
    user-select: none;
  }
  .ant-collapse-header {
    font-weight: bold;
    :hover {
      background-color: #000;
    }
  }

  .ant-checkbox-group {
    width: 100%;
  }
  .ant-checkbox-group-item {
    ${paddingMedia(0.2, 0.2, 0.2, 0.2)}
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    :hover {
      background-color: #000;
    }

    ::after {
      display: none;
    }
  }
  .ant-collapse-content {
    max-height: 200px;
    overflow: auto;
  }
  .ant-pagination {
    ${marginMedia(1.5)}
    text-align:right;
    .ant-pagination-item-active {
      a {
        color: #000;
      }
    }
    ${media('lg')} {
      text-align: center;
    }
  }
`;

const BgWrapper = styled.div`
  background: url('/images/mask.png') no-repeat;
  background-position: center;
  background-size: cover;
`;

const Content = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  > .grid {
    margin-bottom: 40px;
  }
`;

const UserWrapper = styled.div`
  margin-top: -180px;
  display: flex;
  z-index: 10;
  > img {
    border-radius: 24px;
    width: 128px;
    height: 128px;
  }
  .user-art {
    margin-left: 33px;
    .art-title {
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 48px;
      ${media('lg')} {
        font-size: 28px;
      }
    }

    .art-num {
      color: #cacaca;
      color: #d5ff40;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
      ${media('lg')} {
        font-size: 16px;
      }
    }
  }
`;

const CgStyle = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  width: 100%;

  > .cg-card {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 24px;
    > img {
      width: 781px;
      height: 440px;
      border-radius: 32px;
    }
  }
`;

const SliderStyle = styled.div`
  ${widthMedia()};

  margin: 0 auto;
  display: flex;
  overflow-x: auto;

  width: 100%;

  > .grid {
    margin-bottom: 40px;
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
  > .slider-cg {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 66px;
    height: 66px;
    line-height: 66px;
    top: 1024px;
    right: 240px;
    border-radius: 1000px;
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.3);
    transform: rotate(-90deg);
    > img {
      width: 60px;
      height: 30px;
      transform: rotate(90deg);
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AboutGameStyle = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 85px;
  margin-bottom: 100px;
  > .about-title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    color: #ffffff;
  }
  > .about-content {
    width: 781px;
    height: 240px;
    padding-top: 24px;
    display: block;
    .click-to-show {
      z-index: 1000;
      width: 90px;
      display: flex;
      height: 28px;
      flex-direction: column;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #d5ff40;
      margin-bottom: 60px;
    }
    .click-to-less {
      z-index: 1000;
      width: 90px;
      height: 28px;
      display: flex;
      font-family: 'Poppins';
      margin-bottom: 60px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #d5ff40;
      margin-top: 30px;
      padding-top: 100px;
    }
    > .moreContentHidden {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      word-wrap: break-word;
      word-break: break-all;
      font-size: 16px;
      height: 200px;
      line-height: 28px;
      color: #ffffff;
      opacity: 0.8;
      overflow: hidden;
    }
    > .moreContent {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      word-wrap: break-word;
      word-break: break-all;
      font-size: 16px;
      line-height: 28px;
      height: 300px;
      color: #ffffff;
      opacity: 0.8;
    }
  }
`;

const ArtNumWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  ${marginMedia(0.8)}
  ${media('lg')} {
    ${marginMedia(0, 0, 0.5, 0.5)}
    display:inline-block;
    width: 100%;
  }
`;

const NumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
  ${media('lg')} {
    width: 95%;
  }
`;

const CateWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  ${marginMedia(0.8)}
  ${media('lg')} {
    ${marginMedia(0, 0, 0.5, 0.5)}
    display:inline-block;
    width: 100%;
  }
`;

const UpWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 780px;
  ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
  ${media('xxl')} {
    width: 560px;
    margin-left: 30px;
  }
`;

const GameTypeStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
  .button-wrap {
    display: flex;
    flex-wrap: nowrap;
    > .bottom-button {
      width: 145px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #232323;
      border-radius: 1000px;
      margin-left: 20px;
      > .role-button {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 60px;
        color: #fff;
      }
    }
  }
`;

const GameVersionStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
  ${media('xxl')} {
    margin-left: 30px;
  }
  .divider {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  .version-title {
    display: flex;
    flex-direction: flex-start;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    color: #ffffff;
  }
  .version-desc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    .version-desc-content {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #ffffff;
      opacity: 0.8;
    }
    .version-desc-date {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #ffffff;
      opacity: 0.6;
    }
  }
`;

const GameRateStyle = styled.div`
  margin: 0 auto;
  ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
  ${media('xxl')} {
    margin-left: 30px;
  }
  .rate-content {
    display: flex;
    flex-direction: column;
    > .rate-title {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 24px;
      color: #ffffff;
    }
    > .rate-score {
      padding-top: 24px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 60px;
      line-height: 60px;
      color: #d5ff40;
      padding-bottom: 8px;
    }
    > .rate-total {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      opacity: 0.6;
    }
  }
`;

const CommentGamelist = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  display: flex;
  margin-top: 60px;
  flex-direction: row;
  > .comment-box {
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

  > .comment-wrapcontent {
    padding-left: 200px;
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
  }
`;

const PublishGamelist = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  display: flex;
  margin-top: 60px;
  flex-direction: row;
  > .rate-comment-box {
    > .rate-comment-avator {
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

  > .rate-comment-wrapcontent {
    padding-left: 120px;
    > .rate-comment-star {
      display: flex;
      align-item: center;
      flex-direction: row;
      text-align: center;
      margin-bottom: 10px;
      > span {
        margin-right: 15px;
      }
      > img {
        width: 32px;
        height: 30.43px;
      }
    }

    > .rate-comment-content {
      width: 450px;
      height: 252px;
      .ant-input {
        height: 223px;
        font-size: 20px;
        padding: 24px 32px;
        ${paddingMedia(0, 0, 0.5, 0.5)};
        background: #171717;
        /* Palette/True Gray/600 */
        color: #fff;
        border: 1px solid #525252;
        border-radius: 16px;
        opacity: 0.8;
        border-radius: 40px;
        border-right: 0;
        ::placeholder {
          color: #fff;
          font-size: 14px;
        }
      }
    }
    > .rate-submit-button {
      .ant-btn {
        ${paddingMedia(0.35, 0.35, 0.5, 0.5)}
        border-radius: 40px;
        width: 180px;
        background: #000;
        height: auto;
        color: #d5ff40;
        border: 1px solid #d5ff40;
      }
    }
  }
`;

const ItemWrapper = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  :not(:last-of-type) {
    border-right: 1px dashed rgba(0, 0, 0, 0.1);
  }

  > label {
    display: block;
    color: #ffffff;
    opacity: 0.6;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    ${marginMedia(0.2)};
  }
`;

const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  ${paddingMedia(0, 0.2, 0.5, 0)}
  .ant-btn {
    ${paddingMedia(0.35, 0.35, 0.5, 0.5)}
    width: 180px;
    height: auto;
    border-radius: 1000px;
    border: 1px solid #d5ff40;
    > span {
      margin-left: 5px;
    }
    ${marginMedia(0, 0, 0, 0.8)}
    :not(:last-of-type) {
      border-radius: 40px;
      width: 180px;
      height: auto;
      color: #d5ff40;
      border: 1px solid #d5ff40;
      > span {
        margin-left: 5px;
      }
    }
  }
`;

const CellStyle = styled.div`
  position: relative;
  margin: 0 auto;
  box-shadow: 0px 5px 21px 0px #a2959d;
  border-radius: 10px;
  > .top {
    ${paddingMedia(0.3, 0.3, 0.35, 0.35)};
    color: #1e1e1e;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      color: #ff07ff;
    }
  }
  > img {
    width: 100%;
  }

  > .bottom {
    ${paddingMedia(0.4, 0.4, 0.4, 0.4)};
    text-align: left;
    margin: 0 auto;
    .name {
      color: #000;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc {
      color: #aaa;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ${marginMedia(0, 0.2)}
    }
    > .price {
      margin-bottom: 10px;
      color: #272270;
      font-weight: bold;

      img {
        width: 16px;
        margin-right: 8px;
      }
    }
  }
`;

const MediaWrapper = styled.div`
  ${widthMedia()};
  margin: 0 auto;
  .art-info {
    ${paddingMedia(1, 0, 0.5, 0.5)}
    font-size:14px;
    color: #272270;
  }
  .art-play {
    ${paddingMedia(0.35, 0.35, 0.5, 0.5)}
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 60px;
    gap: 10px;
    width: 300px;
    height: 68px;
    background: #d5ff40;
    color: #000;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    border-radius: 1000px;
    margin-bottom: 88px;
  }
`;

const ImageWrapper = styled.div`
  background: url('/images/mask.png') no-repeat;
  background-position: center;
  background-size: cover;
  img {
    width: 100%;
    object-fit: cover;
    height: 592px;
  }
`;

const SelectWrapper = styled.div`
  .ant-tag {
    border: 0;
    font-weight: 600;
    font-size: 16px;
    padding: 12px 20px;
    border-radius: 6px;
    color: #04111d;
    background-color: rgba(229, 232, 235, 0.5);
    &:hover {
      cursor: pointer;
    }
  }
  .ant-tag-close-icon {
    font-size: 15px;
  }
  div:last-of-type {
    .ant-tag {
      background: #fff;
    }
  }
  > div {
    display: inline-block;
    vertical-align: top;
    ${marginMedia(0, 0.5)}
  }
`;

const FitWrapper = styled.div`
  ${media('lg')} {
    display: none;
  }
`;

const MbWrapper = styled.div`
  display: none;
  ${media('lg')} {
    display: block;
    .grid {
      ${marginMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  ${media('lg')} {
    .ant-drawer-body {
      padding: 0;
    }
    .ant-drawer-header {
      ${paddingMedia(2)}
      border:0;
      .ant-drawer-title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .ant-drawer-close {
        position: absolute;
        right: 0px;
      }
    }
    .ant-checkbox-group {
      width: 100%;
    }
    .ant-checkbox-group-item {
      ${paddingMedia(0.2, 0.2, 0.2, 0.2)}
      width:100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      :hover {
        background-color: #f1f1f1;
      }

      ::after {
        display: none;
      }
    }
    .ant-collapse-header-text {
      font-weight: bold;
    }
    .ant-collapse-content {
      max-height: 200px;
      overflow: auto;
    }
  }
  .btn {
    position: fixed;
    background: #000;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #e5e8eb;
    display: flex;
    width: 100%;
    justify-content: space-around;
    ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
    .ant-btn {
      ${marginMedia(0, 0, 0, 0.4)}
      font-size:16px;
      width: 40%;
      height: 46px;
      border: 0;
      color: #000;
      border-radius: 2px;
      &:hover {
        opacity: 0.6;
      }
      border: 1px solid #f1f1f1;
      ${media('lg')} {
      }
    }
    .ant-btn-primary {
      ${media('lg')} {
      }
      color: #fff;
      background: rgba(22, 22, 23, 0.8);
    }
  }
`;

interface childProps {
  id: string;
  setAddr: Function;
}

const gameList = [
  {
    name: 'Role Playing'
  },
  {
    name: 'Turn-based RPG'
  },
  {
    name: 'Casual'
  },
  {
    name: 'Single player'
  },
  {
    name: 'Stylized'
  },
  {
    name: 'Anime'
  }
];

const UserInfo: React.FC<childProps> = (props) => {
  const { id } = props;
  const [fetching, setFetching] = useState(false);
  const [info, setInfo] = useState<CollectionData>(); // art
  const api = useApi();

  useEffect(() => {
    setFetching(true);
    api
      ?.getCollections({
        id: id
      })
      .then((res) => {
        console.log(res, 2929292);

        setInfo(res);
        props.setAddr(res.address);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, id]);

  const mediaLinks = [
    {
      href: info?.twitter,
      icon: '/images/twitter.svg'
    },
    {
      href: info?.discord,
      icon: '/images/discord.svg'
    }
  ];

  return (
    <>
      <ImageWrapper>
        <img src={info?.banner} />
      </ImageWrapper>
      <MediaWrapper>
        <UserWrapper>
          <img src={info?.logo} />
          <div className="user-art">
            <div className="art-title">{info?.name}</div>
            <div className="art-num">{info?.totalCount} Artworks</div>
          </div>
        </UserWrapper>
        <ArtNumWrapper>
          <NumWrapper>
            <Item title="Downloads">
              <FormatNumber balance={info?.openseaStats?.total_volume} />
            </Item>
            <Item title="Follow">{info?.stats.listing ? info?.stats.listing : '-'}</Item>
            <Item title="Score">
              <FormatNumber balance={info?.openseaStats?.floor_price} />
            </Item>
            <Item title="Popularity">{info?.stats.listing ? info?.stats.listing : '-'}</Item>
          </NumWrapper>
          <Links>
            <Button shape="round" onClick={close} type="primary">
              <img src={require('@horse-racing/app-config/assets/heart.svg')} /> <span>Follow</span>
            </Button>

            <Button shape="round" onClick={close} type="primary">
              <span>Followed</span>
            </Button>
          </Links>
        </ArtNumWrapper>
        <div className="art-play">Play</div>
        {/* <p className="art-info">{info?.description}</p> */}
      </MediaWrapper>
    </>
  );
};

const Item: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <ItemWrapper>
      <div>{children}</div>
      <label>{title}</label>
    </ItemWrapper>
  );
};

const Cell: React.FC<{ order: Erc721DetailData }> = ({ order }) => {
  return (
    <NavLink to={`/explore/artDetail/${order.id}`}>
      <CellStyle>
        <div className="top">
          <span className="token-id">#{order.tokenId}</span>
        </div>
        <img src={formatImage(order.image)} />
        <div className="bottom">
          <div className="name">{order.name}</div>
          <div className="desc">{order.description}</div>
          <div className="price">
            {order.stats.price != '0' ? (
              <FormatBalance balance={order.stats.price} showSymbol />
            ) : (
              '-'
            )}
          </div>
          {/* <BuyNow order={order}></BuyNow> */}
          {/* <ButtonEnable loading={loading} onClick={() => buy(order)} type="primary">
          Buy Now
        </ButtonEnable> */}
        </div>
      </CellStyle>
    </NavLink>
  );
};

// todo data  cg list
const CgGame: React.FC<{}> = ({}) => {
  return (
    <CgStyle>
      <div className="cg-card">
        <img src={require('@horse-racing/app-config/assets/cg-2.png')} />
      </div>
    </CgStyle>
  );
};

const RateComment: React.FC<{ data: number }> = ({ data }) => {
  return (
    <CommentGamelist>
      <div className="comment-box">
        <div className="comment-avator">
          <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
          <span>z.Dom</span>
        </div>
      </div>
      <div className="comment-wrapcontent">
        <div className="comment-star">
          <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
          <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
          <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
          <img src={require('@horse-racing/app-config/assets/star-dark.svg')} />
        </div>
        <div className="comment-date">April 26, 2023</div>
        <div className="comment-content">
          <p>
            The game has excellent visualization and funny storytelling but some flaws. First, the
            turn base combat system with a complete virtual gamepad causes unnecessary and
            complicated player control. Mobile games control should be as simple as possible.
            Second, the story cannot skip or faster. There is a lag on each line that stops you from
            clicking the dialog. Very annoying. Some people may like the story, but others just want
            to skip it. Give the player a choice, please.
          </p>
        </div>
      </div>
    </CommentGamelist>
  );
};

const PublishComment: React.FC<{ data: number }> = ({ data }) => {
  return (
    <PublishGamelist>
      <div className="rate-comment-box">
        <div className="rate-comment-avator">
          <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
          <span>z.Gameplayer</span>
        </div>
      </div>
      <div className="rate-comment-wrapcontent">
        <div className="rate-comment-star">
          <span>Rate Score:</span>
          <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
          <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
          <img src={require('@horse-racing/app-config/assets/star-light.svg')} />
          <img src={require('@horse-racing/app-config/assets/star-dark.svg')} />
        </div>
        <div className="rate-comment-content">
          <Form.Item>
            <TextArea
              placeholder="Would you recommend other ICgame to play this game? What can you tell people from your experience with the game? Reviews that are 150 words long, clearly expressed, and easy to read have a chance to gain more exposure~"
              rows={6}
            />
          </Form.Item>
        </div>
        <div className="rate-submit-button">
          <Button shape="round" onClick={close} type="primary">
            <span>Publish & Review</span>
          </Button>
        </div>
      </div>
    </PublishGamelist>
  );
};

const Artworks: React.FC = () => {
  const {
    params: { id }
  } = useRouteMatch<{ id: string }>();
  const api = useApi();
  const [address, setAddress] = useState('');
  const [sort, setSort] = useState<string>('');
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<Erc721DetailData[]>([]);
  const [list, setList] = useState<Erc721DetailData[]>([]);
  const [attrData, setAttrData] = useState<NObject>({});
  const [selectList, setSelectList] = useState<string[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);

  const [contentStatus, setGetmore] = useState(false);

  const panelStyle = {
    background: '#000',
    border: 'none',
    borderRadius: '10px'
  };

  useMemo(() => {
    setFetching(true);
    // quick select by name
    const _list = _.cloneDeep(list);
    const listData = selectList.length
      ? _list.filter((item) => {
          return item.attributes.length > 0
            ? item.attributes.some((e) => selectList.includes(e.value))
            : [];
        })
      : list;

    // rank by a-z
    if (sort.length) {
      listData.sort((a, b) => {
        const _a = Number(a.stats.price);
        const _b = Number(b.stats.price);

        return sort == 'up' ? _a - _b : _b - _a;
      });
    }

    setFetching(false);

    return setData(listData);
  }, [selectList, sort]);

  // belong to  attr
  useEffect(() => {
    setFetching(true);
    api
      ?.getCollectionsAttr({
        id: id
      })
      .then((res) => {
        setAttrData(res);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, id]);

  useEffect(() => {
    if (!address) return;
    setFetching(true);
    api
      ?.getErc721({
        pageSize,
        current,
        address: address
      })
      .then((res) => {
        setData(res.list);
        setList(res.list);
        setTotal(Math.ceil(res.pagination.total / res.pagination.pageSize));
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [api, address, current, pageSize]);

  const sortOptions = useMemo((): Record<string, string> => {
    return {
      up: 'Price: Low to High',
      down: 'Price: High to Low'
    };
  }, []);

  const getAddr = (address: string) => {
    setAddress(address);
  };

  const onSelect = (key: any[]) => {
    setSelectList(key);
  };

  const onClearSelect = (item: string) => {
    const list = selectList.filter((e) => e !== item);

    setSelectList(list);
  };

  const clearAll = () => {
    setSelectList([]);
  };

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const getmore = useCallback(() => setGetmore(true), []);

  const packup = useCallback(() => setGetmore(false), []);

  const toClear = () => {
    setSelectList([]);
    setVisible(false);
  };

  return (
    <Wrapper>
      <UserInfo id={id} setAddr={getAddr}></UserInfo>
      <Content>
        <SliderStyle>
          <CgGame />
          <CgGame />
          <CgGame />
          <div className="slider-cg">
            <img src={require('@horse-racing/app-config/assets/right.svg')} />
          </div>
        </SliderStyle>

        <AboutGameStyle>
          <div className="about-title">About this game</div>
          <div className="about-content">
            <p className={contentStatus ? 'moreContent' : 'moreContentHidden'}>
              HoYoverse's Honkai: Star Rail is available now! Climb aboard to the stars! □ 10M
              Pre-Registrations Get! Download to get up to 80 warps! They call them, "Aeons" in this
              galaxy. They construct reality, erase stars, and leave their marks on countless
              worlds. Together with your companions you'll travel across the galaxy on the Astral
              Express, following the path once traveled by the Aeons. From here, you will explore
              new civilizations, meet new comrades, and begin new adventures among countless
              fantastical worlds. All the answers you seek will be uncovered among the stars. Well
              what're you waiting for? Are you ready to begin this trailblazing journey? Honkai:
              Star Rail is a new HoYoverse space fantasy RPG. Hop aboard the Astral Express and
              experience the galaxy's infinite wonders filled with adventure and thrills. Players
              will meet new companions across various worlds and maybe even run into some familiar
              faces. Overcome the struggles together caused by Stellaron and unravel the hidden
              truths behind it! May this journey uture with laughter and tears. □ Reimagining
              Tactical Combat — Exploit weaknesses, battle to your heart's desire Get ready for
              exciting battles with a satisfying rhythm! Use a brand-new command combat system that
              enables simple yet strategic controls, employ Techniques and suppress enemies with
              different Types' Weakness Breaks, then finish the fight with style via a stunning
              Ultimate. In the randomly-generated mazes of the Simulated Universe, surprising random
              events and nearly 100 different Blessings and Curios will grant you an incredible
              boost in abilities, allowing you to challenge a more unpredictable combat environment.
            </p>
            {contentStatus == false && (
              <div className="click-to-show" onClick={getmore}>
                <span>show more</span>
              </div>
            )}
            {contentStatus == true && (
              <div className="click-to-less" onClick={packup}>
                <span>show less</span>
              </div>
            )}
          </div>
        </AboutGameStyle>

        <CateWrapper>
          <UpWrapper>
            <Item title="Category">Adventure</Item>
            <Item title="Version">V0.1.3</Item>
            <Item title="Uptime">April 28, 2023</Item>
            <Item title="Size">950M</Item>
            <Item title="Languages">Chinese, English</Item>
          </UpWrapper>
        </CateWrapper>

        <GameTypeStyle>
          <div className="button-wrap">
            {gameList.map((item, index) => (
              <div className="bottom-button">
                <div className="role-button" key={index}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </GameTypeStyle>

        <GameVersionStyle>
          <Divider className="divider" />
          <div className="version-title">What’s New</div>
          <div className="version-desc">
            <div className="version-desc-content">
              Honkai: Star Rail is launching on April 26, 10:00 (UTC+8)!
            </div>
            <div className="version-desc-date">Apr 6, 2023, Version 1.0.5</div>
          </div>
          <Divider className="divider" />
        </GameVersionStyle>

        <GameRateStyle>
          <div className="rate-content">
            <div className="rate-title">Ratings and reviews</div>
            <div className="rate-score">4.8</div>
            <div className="rate-total">A total of 3.5k evaluations</div>
          </div>
          <RateComment data={1} />
          <RateComment data={1} />
          <PublishComment data={1} />
        </GameRateStyle>

        <Spin spinning={fetching} style={{ width: '100%' }} />
      </Content>

      {/* <StyledDrawer
        title="Filter"
        placement="bottom"
        onClose={() => setVisible(false)}
        visible={visible}
        height="100%"
      >
        {Object.keys(attrData).map((key, index) => (
          <Collapse accordion expandIconPosition="end" ghost key={index}>
            <Panel header={key} key={key} style={panelStyle}>
              <Checkbox.Group onChange={onSelect} options={attrData[key]} value={selectList} />
            </Panel>
          </Collapse>
        ))}
        <div className="btn">
          <Button onClick={toClear}>Clear All</Button>
          <Button type="primary" onClick={() => setVisible(false)}>
            Done
          </Button>
        </div>
      </StyledDrawer> */}
    </Wrapper>
  );
};

export default Artworks;
