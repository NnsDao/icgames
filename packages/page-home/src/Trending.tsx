import { Grid } from '@horse-racing/react-components';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { CollectionData } from '@horse-racing/service/types';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
  .grid {
    ${marginMedia(0, 0, 0.5, 0.5)}
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

const Cell: React.FC<{ item: CollectionData }> = ({ item }) => {
  const { push } = useHistory();

  return (
    <CellStyle onClick={() => push(`/explore/artworks/${item.id}`)}>
      <div className="banner">
        <img src={item.banner} />
      </div>
      <div className="user-info">
        <img src={item.logo} />
        <span>{item.name}</span>
      </div>
    </CellStyle>
  );
};

interface Props {
  data: CollectionData[];
}
const Token: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <div className="title">Popular Games</div>
      <Grid className="grid" spans={[3, 3, 3, 2, 2, 1]}>
        {data.slice(0, 6).map((item, index) => (
          <Cell item={item} key={index} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Token;
