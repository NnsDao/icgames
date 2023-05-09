import React from 'react';
import styled from 'styled-components';

import media, { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';

const Wrapper = styled.div`
  > .upper-part {
    height: 266px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media('lg')} {
      height: 200px;
    }
    ${paddingMedia(1.55, 0, 0, 0)}
    > .left {
      ${marginMedia(0, 0, 0, 1.75)}
      height: 141px;
      width: 156px;
      ${media('lg')} {
        height: 0px;
        width: 0px;
      }
      > .left-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .left-img {
          height: 77px;
          width: 77px;
          ${media('lg')} {
            height: 0px;
            width: 0px;
          }
        }
        > .left-img2 {
          margin-left: 18px;
          margin-top: 20px;
          height: 58px;
          width: 58px;
          ${media('lg')} {
            height: 0px;
            width: 0px;
          }
        }
      }
      > .left-img3 {
        ${marginMedia(0.425, 0, 1.75, 0)}
        height: 47px;
        width: 47px;
        ${media('lg')} {
          height: 0px;
          width: 0px;
        }
      }
    }
    > .middle {
      // ${marginMedia(0, 0, 1.75, 0)}
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      > .font-create {
        font-size: 48px;
        font-family: Outfit-SemiBold, Outfit;
        font-weight: 600;
        color: #000000;
        line-height: 60px;
        letter-spacing: 1px;
        ${media('lg')} {
          font-size: 20px;
          font-family: Outfit-SemiBold, Outfit;
          font-weight: 600;
          color: #000000;
          line-height: 25px;
        }
      }
      > .button-apply {
        ${marginMedia(1, 0, 0, 0)}
        width: 200px;
        height: 46px;
        background: rgba(22, 22, 23, 0.8);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        > .font-apply {
          font-size: 16px;
          font-family: Outfit-SemiBold, Outfit;
          font-weight: 600;
          color: #fcfcfd;
          line-height: 20px;
        }
      }
      > .button-apply:hover {
        ${marginMedia(1, 0, 0, 0)}
        width: 200px;
        height: 46px;
        background: rgba(22, 22, 23, 0.8);
        border-radius: 2px;
        opacity: 0.6;
        cursor: pointer;
      }
    }
    > .right {
      ${marginMedia(0, 0, 2.075, 0)}
      > .right-img {
        height: 141px;
        width: 156px;
        ${media('lg')} {
          height: 0px;
          width: 0px;
        }
      }
      ${media('lg')} {
        height: 0px;
        width: 0px;
      }
    }
  }
  > .middle-part {
    ${marginMedia(0.7, 0, 2, 2)}
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > .item {
      ${marginMedia(0.8, 0, 0.6, 0)}
      width: 411px;
      height: 265px;
      border-radius: 8px;
      border: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      > .middle-img {
        height: 68px;
        width: 68px;
      }
      > .font-middle {
        ${marginMedia(0.6, 0, 0, 0)}
        font-size: 20px;
        font-family: Outfit-Bold, Outfit;
        font-weight: bold;
        color: #000000;
        line-height: 24px;
      }
      > .font-below {
        ${marginMedia(0.325, 0, 0.6, 0.6)}
        font-size: 16px;
        font-family: Outfit-Regular, Outfit;
        font-weight: 400;
        color: #5f5f5f;
        line-height: 24px;
        text-align: center;
      }
    }
  }
  > .bottom {
    ${marginMedia(1.5, 2, 0, 0)}
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > .font-bottom {
      font-size: 32px;
      font-family: Outfit-SemiBold, Outfit;
      font-weight: 600;
      color: #000000;
      line-height: 44px;
      ${media('lg')} {
        font-size: 16px;
        font-family: Outfit-SemiBold, Outfit;
        font-weight: 600;
        color: #000000;
        line-height: 24px;
      }
    }
    > .bottom-img {
      ${marginMedia(1, 0, 0, 0)}
      width: 444px;
      height: 119px;
      ${media('lg')} {
        width: 299px;
        height: 119px;
      }
    }
  }
`;

const Create: React.FC = () => {
  return (
    <Wrapper>
      <div className="upper-part">
        <div className="left">
          <div className="left-group">
            <img className="left-img" src="/images/create/left1.png" />
            <img className="left-img2" src="/images/create/left3.png" />
          </div>
          <img className="left-img3" src="/images/create/left2.png" />
        </div>
        <div className="middle">
          <span className="font-create">Create auction,Mint,Staking</span>
          <div className="button-apply">
            <span className="font-apply">Apply</span>
          </div>
        </div>
        <div className="right">
          <img className="right-img" src="/images/create/right.png" />
        </div>
      </div>
      <div className="middle-part">
        <div className="item">
          <img className="middle-img" src="/images/create/middle1.png" />
          <span className="font-middle">Low Fee</span>
          <span className="font-below">
            Our service fee of only 1% will be charged, and creators of collections may set a
            royalty of about 10%.
          </span>
        </div>
        <div className="item">
          <img className="middle-img" src="/images/create/middle2.png" />
          <span className="font-middle">Non-custodial</span>
          <span className="font-below">
            All assets remain in your full cntrol - we never take custody anu of your digital
            assets.
          </span>
        </div>
        <div className="item">
          <img className="middle-img" src="/images/create/middle3.png" />
          <span className="font-middle">Staking Collections</span>
          <span className="font-below">
            We plan to give NFTs more attributes,such as pledges,derivatives,games,reputation.
          </span>
        </div>
      </div>
      <div className="bottom">
        <span className="font-bottom">Can you upload an NFT of that hit type?</span>
        <img className="bottom-img" src="/images/create/below.png" />
      </div>
    </Wrapper>
  );
};

export default Create;
