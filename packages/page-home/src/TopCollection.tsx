import { FormatNumber, Grid } from '@horse-racing/react-components';
import { colorDown, colorUp } from '@horse-racing/react-components/style';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { CollectionData } from '@horse-racing/service/types';
import { Button, Dropdown, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  ${widthMedia()};
  ${marginMedia(5)}
  ${media('lg')} {
    ${marginMedia(4)}
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
      margin-left: 8px;
      background: #d5ff40;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .game-bg {
    position: absolute;
    width: 732px;
    height: 732px;
    right: 0px;
    z-index: -22;
    top: 1279px;
    background: #d5ff40;
    opacity: 0.4;
    filter: blur(400px);
  }
  .btn {
    text-align: center;
    ${marginMedia(1.5, 1.5)}
    .ant-btn {
      ${marginMedia(0, 0, 0, 0.4)}
      font-size:16px;
      height: 46px;
      ${paddingMedia(0, 0, 1.6, 1.6)}
      background: #D5FF40;
      border-radius: 1000px;
      &:hover {
        opacity: 0.6;
      }
    }
  }
`;

const CellStyle = styled.div`
  position: relative;
  margin: 0 auto;
  ${paddingMedia(0.2, 0.2, 0.7, 0.7)}
  overflow:hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#fff;
  border-radius: 8px;
  &:hover{
    cursor:pointer;
    color: #D5FF40;
    background: rgba(213, 255, 64, 0.1);
    border-radius: 32px;
  }
  .left{
    font-size:14px;
    font-weight:bold;
    display:flex;
    align-items: center;
    .logo{
      width: 48px;
      height: 48px;
      border-radius:5px;
      ${marginMedia(0, 0, 0.5, 0.4)}
    }
    .info{
      p{margin:0}
      .price{
        display:flex;
        font-size: 12px;
        span{
          color:#5f5f5f;
          ${marginMedia(0, 0, 0, 0.2)}
        }
      }
      .name{
        max-width:180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: bold;
      }

    }
  }
  .banner{
    width:100%;
    height:220px;

    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  > .user-info {
    margin-top:-34px;
  }
  .right{
    text-align:right;
    .volume{
      font-size:16px;
      font-weight:bold;
    }
    .percent{
      span{
        display:inline-block;
        vertical-align:middle;
      }
      img{
        width:15px;
        display:inline-block;
        vertical-align:middle;
      }
    }
  }
  .color-down{
    color:${colorDown}
    font-size:14px;
  }
  .color-up{
    color:${colorUp}
    font-size:14px;
  }
`;

interface cellProps {
  item: CollectionData;
  rank: number;
  sortkey: number;
}

const Cell: React.FC<cellProps> = ({ item, rank, sortkey }) => {
  const { push } = useHistory();

  const percent = useMemo(() => {
    if (sortkey) {
      // 7 day
      if (Number(item.openseaStats?.seven_day_volume) == 0) {
        item.percent = '0';
        return `${item.percent}`;
      }
      let num =
        Number(item.openseaStats?.seven_day_volume_change) /
        Number(item.openseaStats?.seven_day_volume);
      item.percent = num.toFixed(2);
      return `${item.percent}%`;
    } else {
      // 24 hour
      if (Number(item.openseaStats?.one_day_volume) == 0) {
        item.percent = '0';
        return `${item.percent}`;
      }
      let num =
        Number(item.openseaStats?.one_day_volume_change) /
        Number(item.openseaStats?.one_day_volume);
      item.percent = num.toFixed(2);
      return `${item.percent}%`;
    }
  }, [item, sortkey]);

  return (
    <CellStyle onClick={() => push(`/explore/artworks/${item.id}`)}>
      <div className="left">
        <span>{rank + 1 < 10 ? `0${rank + 1}` : rank + 1}</span>
        <img className="logo" src={item.logo} />
        <div className="info">
          <p className="name">{item.name}</p>
          <div className="price">
            <span>Floor Price</span>
            <FormatNumber balance={item.openseaStats?.floor_price} />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="percent" style={{ color: percent.indexOf('-') ? colorUp : colorDown }}>
          <img src={percent.indexOf('-') ? '/images/up.png' : '/images/down.png'} />
          <span>{percent}</span>
        </div>
        <div className="volume">
          <FormatNumber
            balance={
              sortkey ? item.openseaStats?.seven_day_volume : item.openseaStats?.one_day_volume
            }
          />
        </div>
      </div>
    </CellStyle>
  );
};

interface Props {
  data: CollectionData[];
  onSelectChange: Function;
}
const TopCollection: React.FC<Props> = ({ data, onSelectChange }) => {
  const [sort, setSort] = useState<string>('last 24h');
  const [sortkey, setSortkey] = useState<number>(0);
  const sortList = ['last 24h', 'last 7d'];
  const { push } = useHistory();

  const onClick = ({ key }: { key: string }) => {
    setSort(sortList[Number(key)]);
    setSortkey(Number(key));
    onSelectChange(key);
  };

  const menu = (
    <Menu onClick={onClick}>
      {sortList.map((item, index) => (
        <Menu.Item key={index}>{item}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Wrapper>
      <div className="title">
        Top Game over
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <span>
              {sort} <img src="/images/gdown.png" />
            </span>
          </a>
        </Dropdown>
      </div>
      <div className="game-bg"></div>
      <Grid className="grid" spans={[3, 3, 3, 2, 2, 1]}>
        {data.slice(0, 12).map((item, index) => (
          <Cell item={item} key={index} rank={index} sortkey={sortkey} />
        ))}
      </Grid>
      <div className="btn">
        <Button onClick={() => push('/rank')}>Go Ranking</Button>
      </div>
    </Wrapper>
  );
};

export default TopCollection;
