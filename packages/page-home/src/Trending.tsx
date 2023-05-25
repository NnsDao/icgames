import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { CollectionData } from '@horse-racing/service/types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  ${widthMedia()};
  ${marginMedia(4)}
  ${media('lg')} {
    ${marginMedia(3)}
  }
  .title {
    text-align: center;
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    ${marginMedia(0, 1.5)}
    ${media('lg')} {
      font-size: 18px;
    }
    span {
      margin-right: 8px;
      background: rgba(22, 22, 23, 0.8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .custom-slider {
    img {
      background: #000;
    }
    &:hover {
      cursor: pointer;
      background-image: url('/assets/slider.svg');
      background-repeat: no-repeat;
    }
  }
  .grid {
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const CellStyle = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  ${paddingMedia(0, 0.7)}
  &:hover {
    cursor: pointer;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.06);
  }
  .banner {
    width: 100%;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > .user-info {
    color: #fff;
    margin-top: -34px;
    img {
      width: 68px;
      height: 68px;
      border-radius: 5px;
      ${marginMedia(0, 0, 0.7, 0.2)}
    }
    span {
      max-width: calc(100% - 120px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      display: inline-block;
      vertical-align: bottom;
    }
  }
`;

const SbtStyle = styled.div`
  display: flex;
  width: 459px;
  height: 344px;
  margin-bottom: 60px;
  > .sbt-content {
    &:hover {
      cursor: pointer;
      box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.06);
    }
    > .sbt-card {
      display: flex;
      align-items: center;
      width: 429px;
      height: 344px;
      position: relative;
      > img {
        width: 429px;
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
  z-index: 9999;
  > .grid {
    margin-bottom: 40px;
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '60px',
  dots: true,
  slidesToShow: 3,
  speed: 500,
  rows: 2,
  //@ts-ignore
  customPaging: (i) => (
    <div className="custom-slider">
      <img datatype={i} src={require('@horse-racing/app-config/assets/slider-gray.svg')} />
    </div>
  )
};

const Cell: React.FC<{ item: CollectionData }> = ({ item }) => {
  const { push } = useHistory();

  return (
    <SbtStyle onClick={() => push(`/myCollection/1`)}>
      <div className="sbt-content">
        <div className="sbt-card">
          <img src={item.banner} />
          <div className="sbt-author">
            <img src={item.logo} />
            <div className="sbt-company">{item.name}</div>
          </div>
        </div>
      </div>
    </SbtStyle>
  );
};

interface Props {
  data: CollectionData[];
}
const Token: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <div className="title">Popular Games</div>
      <SliderStyle>
        <Slider {...settings}>
          {data.slice(0, 16).map((item, index) => (
            <Cell item={item} key={index} />
          ))}
        </Slider>
      </SliderStyle>
    </Wrapper>
  );
};

export default Token;
