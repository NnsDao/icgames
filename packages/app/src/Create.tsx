import React from 'react';
import styled from 'styled-components';

import media, { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';

const Wrapper = styled.div`
  > .upper-part {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media('lg')} {
      height: 200px;
    }
    ${paddingMedia(1.55, 0, 0, 0)}
    > .left {
      ${marginMedia(0, 0, 0, 1.75)}
      position: absolute;
      width: 732px;
      height: 732px;
      left: 0px;
      top: -163px;
      background: #d5ff40;
      opacity: 0.5;
      filter: blur(400px);
      ${media('lg')} {
        height: 0px;
        width: 0px;
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
        line-height: 60px;
        letter-spacing: 1px;
        ${media('lg')} {
          font-size: 20px;
          font-family: Outfit-SemiBold, Outfit;
          font-weight: 600;
          line-height: 25px;
        }
      }
      .middle-font {
        color: #d5ff40;
      }
      > .button-apply {
        ${marginMedia(1, 0, 0, 0)}
        width: 240px;
        height: 68px;
        background: #d5ff40;
        border-radius: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        > .font-apply {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 36px;
          color: #000000;
        }
      }
      > .button-apply:hover {
        ${marginMedia(1, 0, 0, 0)}
        width: 240px;
        height: 68px;
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
  > .middle-part {
    ${marginMedia(0.7, 0, 2, 2)}
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    > .item {
      ${marginMedia(0.8, 0, 0.6, 0)}
      width: 405.33px;
      height: 400px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 32px;
      display: flex;
      align-items: start;
      justify-content: start;
      flex-direction: column;
      padding-top: 60px;
      text-align: left;
      > .font-middle {
        ${marginMedia(0.6, 0, 0, 0)}
        font-size: 20px;
        font-family: Outfit-Bold, Outfit;
        font-weight: bold;
        color: #fff;
        line-height: 24px;
        text-align: left;
        padding-left: 40px;
      }
      > .font-below {
        ${marginMedia(0.325, 0, 0.6, 0.6)}
        font-size: 16px;
        font-family: Outfit-Regular, Outfit;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.8;
        line-height: 24px;
        text-align: left;
        padding-left: 20px;
      }
    }
  }
  > .bottom {
    ${marginMedia(1.5, 2, 0, 0)}
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > .font-bottom {
      width: 1284px;
      height: 112px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 40px;
      line-height: 56px;
      text-align: center;

      color: #ffffff;
      ${media('lg')} {
        font-size: 16px;
        font-family: Outfit-SemiBold, Outfit;
        font-weight: 600;
        color: #fff;
        line-height: 24px;
      }
    }
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
        border: 1px solid #fff;
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
  }
`;

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

const Create: React.FC = () => {
  return (
    <Wrapper>
      <div className="upper-part">
        <div className="left"></div>
        <div className="middle">
          <span className="font-create">
            Unlock the full <span className="middle-font">Potential</span> of your game
          </span>
          <div className="button-apply">
            <span className="font-apply">Apply</span>
          </div>
        </div>
      </div>
      <div className="middle-part">
        <div className="item">
          <span className="font-middle">Deep Gaming Communities</span>
          <span className="font-below">
            Our platform boasts a wealth of deep gaming communities that have accumulated a huge
            number of player resources, offering game developers an attractive market to tap into
            that can boost game exposure and user retention.
          </span>
        </div>
        <div className="item">
          <span className="font-middle">Personalized Recommendation</span>
          <span className="font-below">
            Our platform offers personalized tag services that can help game developers precisely
            target their games to the right users, thus increasing game conversion rates and
            revenue.
          </span>
        </div>
        <div className="item">
          <span className="font-middle">Transparent Data Analytics</span>
          <span className="font-below">
            Our platform provides transparent data analytics that allow game developers to better
            understand player behavior and game performance, and make data-driven decisions for
            better game optimization.
          </span>
        </div>
      </div>
      <div className="bottom">
        <span className="font-bottom">
          Get your game in front of the perfect players with our personalized game tags.
        </span>
        <div className="button-wrap">
          {gameList.map((item, index) => (
            <div className="bottom-button">
              <div className="role-button" key={index}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Create;
