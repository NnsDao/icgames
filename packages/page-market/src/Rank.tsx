import { CaretDownOutlined } from '@ant-design/icons';
import { currencyFormat } from '@horse-racing/app-config/utils';
import { FormatNumber } from '@horse-racing/react-components';
import { colorDown, colorUp } from '@horse-racing/react-components/style';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { CollectionData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';
import { Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background-size: 100% 333px;
  min-height: 100vh;
`;

const Content = styled.div`
  ${widthMedia()};
  margin: 0 auto;
`;

const SelectWrapper = styled.div`
  ${paddingMedia(3.5)}
  text-align:center;
  margin: 0 auto;
  h1 {
    color: #000;
    font-size: 38px;
    ${media('lg')} {
      font-size: 20px;
      margin-bottom: 0;
    }
  }
`;
const ListWrapper = styled.div`
  ${paddingMedia(2)}
  text-align:center;
  margin: 0 auto;
  h1 {
    color: #000;
    font-size: 38px;
  }
  ${media('lg')} {
    width: 100vw;
    overflow: auto;
  }
`;
const HeaderWrapper = styled.div`
  user-select: none;
  ${paddingMedia(0.4, 0.4, 1.5, 1.5)}
  font-weight:bold;
  font-size: 14px;
  color: #5f5f5f;
  border-bottom: 1px solid #f5f5f5;
  ul {
    width: 100%;
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  div {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    width: 18%;
    text-align: right;
    ${paddingMedia(0, 0, 0.5, 0.5)}
  }
  div:first-of-type {
    text-align: left;
    width: 28%;
  }
  ${media('lg')} {
    width: 1200px;
  }
`;

const RankContent = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #5f5f5f;
  border-bottom: 1px solid #f5f5f5;

  ul {
    width: 100%;
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    cursor: pointer;
    ${paddingMedia(0.5, 0.5, 1, 1.5)}
    &:hover {
      background: #f5f5f5;
      border-radius: 8px;
    }
  }
  .cell {
    color: #000;
    display: inline-block;
    vertical-align: middle;
    width: 18%;
    text-align: right;
    ${paddingMedia(0, 0, 0.5, 0.5)}
    font-size:16px;
  }
  .percent {
    span {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 15px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .info {
    ${paddingMedia(0, 0, 0, 1)}
    display:inline-block;
    vertical-align: middle;
    text-align: left;
    width: 28%;
    font-size: 14px;
    color: #000;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      display: inline-block;
      vertical-align: middle;
      width: 48px;
      height: 48px;
      border-radius: 5px;
      ${marginMedia(0, 0, 0.5, 0.4)}
    }
    .name {
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
    }
  }
  ${media('lg')} {
    width: 1200px;
  }
`;

interface cellProps {
  item: CollectionData;
  sortkey?: number;
  rank: number;
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
    <li onClick={() => push(`/explore/artworks/${item.id}`)}>
      <div className="info">
        <span>{rank + 1 < 10 ? `0${rank + 1}` : rank + 1}</span>
        <img className="logo" src={item.logo} />
        <span className="name">{item.name}</span>
      </div>
      <div className="cell">
        <FormatNumber balance={item.openseaStats?.one_day_volume} />
      </div>
      <div className="cell percent" style={{ color: percent.indexOf('-') ? colorUp : colorDown }}>
        <img src={percent.indexOf('-') ? '/images/up.png' : '/images/down.png'} />
        <span>{percent}</span>
      </div>
      <div className="cell">
        <FormatNumber balance={item.openseaStats?.floor_price} />
      </div>
      <div className="cell">{currencyFormat(item.totalCount)}</div>
    </li>
  );
};

const Rank: React.FC = () => {
  const api = useApi();
  const [data, setData] = useState<CollectionData[]>([]);
  const [isActive, setActive] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [headConfig, setHeadConfig] = useState([
    { label: 'COLLECTIONS', isSort: false },
    { label: 'VOLUME', isSort: true, isAsc: false },
    { label: '% CHANGE', isSort: true, isAsc: false },
    { label: 'FLOOR PRICE', isSort: true, isAsc: false },
    { label: 'ITEMS', isSort: false }
  ]);

  useEffect(() => {
    setFetching(true);
    api
      ?.getAllcollections({})
      .then((res) => {
        sortData(res.list);
        setData(res.list);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api]);

  const sortData = (
    listData: CollectionData[],
    sortType?: number,
    asc?: boolean,
    rangeValue?: string
  ) => {
    listData.sort((a, b) => {
      let _a, _b;
      if (rangeValue == '1') {
        // 7d
        _a = Number(a.openseaStats.seven_day_volume);
        _b = Number(b.openseaStats.seven_day_volume);
      } else {
        // 24h
        if (sortType == 2) {
          _a = Number(a.percent);
          _b = Number(b.percent);
        } else if (sortType == 3) {
          _a = Number(a.openseaStats.floor_price);
          _b = Number(b.openseaStats.floor_price);
        } else {
          _a = Number(a.openseaStats.one_day_volume);
          _b = Number(b.openseaStats.one_day_volume);
        }
      }
      return asc ? _a - _b : _b - _a;
    });
  };

  const tabClick = (selectIndex: number) => {
    setHeadConfig(
      headConfig.map((item, index) => {
        if (index == selectIndex && item.isSort) {
          setActive(selectIndex);
          item.isAsc = !item.isAsc;
          sortData(data, selectIndex, item.isAsc);
          return item;
        } else {
          item.isAsc = false;
          return item;
        }
      })
    );
  };

  return (
    <Wrapper>
      <Content>
        <SelectWrapper>
          <h1>Ranking</h1>
        </SelectWrapper>
        <ListWrapper>
          <HeaderWrapper>
            <ul>
              <li>
                {headConfig.map((item, index) => (
                  <div
                    key={index}
                    style={{ color: isActive == index ? '#000' : '' }}
                    onClick={() => tabClick(index)}
                  >
                    {item.label}
                    {item.isSort ? (
                      <CaretDownOutlined size={12} rotate={item.isAsc ? 180 : 0} />
                    ) : (
                      ''
                    )}
                  </div>
                ))}
              </li>
            </ul>
          </HeaderWrapper>
          <RankContent>
            <ul>
              {data.map((item, index) => (
                <Cell item={item} key={index} rank={index} />
              ))}
            </ul>
            <Spin spinning={fetching} style={{ width: '100%' }} />
          </RankContent>
        </ListWrapper>
      </Content>
    </Wrapper>
  );
};

export default Rank;
