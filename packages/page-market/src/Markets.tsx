import { FormatNumber, Grid } from '@horse-racing/react-components';
import { colorPrimary } from '@horse-racing/react-components/style';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { CollectionData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';
import { Input, Select, Spin } from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
const { Search } = Input;

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  background-size: 100% 333px;
  min-height: 100vh;
`;

const Content = styled.div`
  margin: 0 auto;
  ${widthMedia()}
  > .grid {
    margin-bottom: 40px;
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const CellStyle = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.06);
  }
  .banner {
    width: 100%;
    height: 140px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > .user-info {
    text-align: center;
    margin-top: -30px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
  > .bottom {
    ${paddingMedia(0.4, 0.4, 0.4, 0.4)};
    text-align: center;
    .bottom-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
    }
  }
`;

const NumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemWrapper = styled.div`
  flex: 1;
  ${marginMedia(0.5)};
  font-size: 14px;
  font-weight: bold;
  color: #fff;

  &:not(:last-of-type) {
    ::after {
      float: right;
      content: '';
      margin-top: -40px;
      width: 1px;
      height: 32px;
      background: #f5f5f5;
    }
  }

  > label {
    display: block;
    color: #fff;
    font-weight: normal;
    ${marginMedia(0, 0.15)};
  }
`;

const SelectWrapper = styled.div`
  ${paddingMedia(3.5)}
  text-align:left;
  h1 {
    letter-spacing: 1px;
    color: #fff;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
    ${media('lg')} {
      font-size: 30px;
      margin-bottom: 0;
    }
  }
  ${media('lg')} {
    ${paddingMedia(0, 0, 0.5, 0.5)}
  }
`;

const FilterWrapper = styled.div`
  ${widthMedia()};
  ${paddingMedia(0.1, 1.5)}
  ${marginMedia(2, 1)};
  border-radius: 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  .select-input {
    width: 45%;
  }

  .select-input .ant-input {
    ${marginMedia(0.5)};
    width: 55%;
    ${media('lg')} {
      width: 80%;
    }
    ${media('md')} {
      width: 70%;
    }
    ${media('sm')} {
      width: 80%;
    }
    ${paddingMedia(0.3, 0.3, 0.5, 0.5)}
    background-color: transparent;
    border: 1px solid #232323;
    border-image: #232323;
    border-radius: 10px;
    clip-path: inset(0 round 2px);
    color: #fff;
  }

  .select {
    width: 180px;
    margin-top: 10px;
    color: #fff;
  }

  .select .ant-select-selector {
    border: 1px solid #232323;
    border-radius: 20px;
    background: #000;
    clip-path: inset(0 round 2px);
  }
  .ant-select-arrow {
    color: ${colorPrimary};
  }
  .ant-select-selection-placeholder {
    color: ${colorPrimary};
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-transform: capitalize;
  }
`;

const Item: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <ItemWrapper>
      <label>{title}</label>
      <div>{children}</div>
    </ItemWrapper>
  );
};

const Cell: React.FC<{ item: CollectionData }> = ({ item }) => {
  const { push } = useHistory();

  return (
    <CellStyle onClick={() => push(`/explore/artworks/${item.id}`)}>
      <div className="banner">
        <img src={item.banner} />
      </div>
      <div className="user-info">
        <img src={item.logo} />
      </div>
      <div className="bottom">
        <div className="bottom-title">{item.name}</div>
        <NumWrapper>
          <Item title="VOLUME">
            <FormatNumber balance={item.openseaStats?.total_volume} />
          </Item>
          <Item title="LISTING">{item.stats?.listing ? item.stats?.listing : '-'}</Item>
          <Item title="FLOOR PRICE">
            <FormatNumber balance={item.openseaStats?.floor_price} />
          </Item>
        </NumWrapper>
      </div>
    </CellStyle>
  );
};

const Market: React.FC = () => {
  const api = useApi();
  const deployments = useDeployments();
  const [sort, setSort] = useState<string>('');
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<CollectionData[]>([]);
  const [list, setList] = useState<CollectionData[]>([]);
  const [collectName, setCollectName] = useState<string>();
  // select
  const sortOptions = useMemo((): Record<string, string> => {
    return {
      up: 'Alphabetically:A-Z'
    };
  }, []);

  useEffect(() => {
    setFetching(true);
    api
      ?.getAllcollections({})
      .then((res) => {
        sortData(res.list);
        setData(res.list);
        setList(res.list);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api]);

  const sortData = (listData: CollectionData[]) => {
    listData.sort((a, b) => {
      let _a, _b;

      _a = Number(a.openseaStats.total_volume);
      _b = Number(b.openseaStats.total_volume);

      return _b - _a;
    });
  };

  // const listData =  data

  useMemo(() => {
    setFetching(true);
    // quick select by name
    const collectionList = _.cloneDeep(list);
    const listData = collectName
      ? collectionList.filter((item) => {
          return item.name.toLowerCase().indexOf(collectName.toLowerCase()) !== -1;
        })
      : collectionList;

    // rank by a-z
    if (sort) {
      listData.sort((a, b) => {
        const _a = a.name.toLowerCase();
        const _b = b.name.toLowerCase();

        return _a > _b ? 1 : _a < _b ? -1 : 0;
      });
    }

    setFetching(false);

    return setData(listData);
  }, [collectName, list, sort]);
  // const onFilter = (e: string | number) => {
  //   let list =  collectName?data.filter((item)=>{
  //     return item.name.toLowerCase().indexOf(collectName.toLowerCase())!= -1
  //   }):data
  //   setData(list)
  // };

  return (
    <Wrapper>
      <Content>
        <SelectWrapper>
          <h1>All Games</h1>
        </SelectWrapper>
        <FilterWrapper>
          <div className="select-input">
            <Input
              onChange={(e) => setCollectName(e.target.value)}
              placeholder="Search"
              value={collectName}
            />
          </div>

          <Select
            className="select"
            onChange={(value) => {
              setSort(value);
            }}
            placeholder="Sort By Rate"
          >
            {Object.keys(sortOptions).map((key) => (
              <Option key={key} value={key}>
                {sortOptions[key]}
              </Option>
            ))}
          </Select>
        </FilterWrapper>
        <Grid className="grid" spans={[3, 3, 3, 2, 2, 1]}>
          {data.map((item, index) => (
            <Cell item={item} key={index} />
          ))}
        </Grid>
        <Spin spinning={fetching} style={{ width: '100%' }} />
      </Content>
    </Wrapper>
  );
};

export default React.memo(Market);
