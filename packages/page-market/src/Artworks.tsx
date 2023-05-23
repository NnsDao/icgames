import { Button, Checkbox, Col, Collapse, Drawer, Pagination, Row, Select, Spin, Tag } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { formatImage } from '@horse-racing/app-config/utils';
// import { Exchange } from '@nft-market/contracts-core';
// import Order from '@nft-market/contracts-core/Order';
import { FilterOutlined } from '@ant-design/icons';
import { FormatBalance, FormatNumber, Grid } from '@horse-racing/react-components';
import { colorPrimary } from '@horse-racing/react-components/style';
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
  min-height: 80vh;
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

const FilterWrapper = styled.div`
  ${widthMedia()};
  ${marginMedia(1, 1)};
  ${paddingMedia(0, 0, 0.5, 0.5)}
  margin: 0 auto;
  border-radius: 10px;
  color: #c3c6cc;
  display: flex;
  justify-content: space-between;
  .select {
    width: 200px;
  }

  .select .ant-select-selector {
    border: 1px solid;
    border-image: linear-gradient(270deg, rgba(87, 69, 222, 1), rgba(236, 100, 222, 1)) 1 1;
    border-radius: 2px;
    clip-path: inset(0 round 2px);
  }
  .ant-select-arrow {
    color: ${colorPrimary};
  }
`;

const Filter = styled.div`
  font-size: 16px;
  border: 1px solid;
  border-image: linear-gradient(270deg, rgba(87, 69, 222, 1), rgba(236, 100, 222, 1)) 1 1;
  border-radius: 2px;
  color: ${colorPrimary};
  border-radius: 2px;
  height: 32px;
  width: 160px;
  text-align: center;
  div,
  .anticon {
    display: inline-block;
    vertical-align: middle;
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
    background: #2c2c2c;
    border-radius: 1000px;
    > span {
      margin-left: 5px;
    }
    ${marginMedia(0, 0, 0, 0.8)}
    :not(:last-of-type) {
      border-radius: 40px;
      width: 180px;
      background: #525252;
      height: auto;
      color: #d5ff40;
      border-color: 1px solid #d5ff40;
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
    height: 450px;
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

  const toClear = () => {
    setSelectList([]);
    setVisible(false);
  };

  return (
    <Wrapper>
      <UserInfo id={id} setAddr={getAddr}></UserInfo>
      <Content>
        <FilterWrapper>
          <Select
            className="select"
            onChange={(value) => {
              setSort(value);
            }}
            placeholder="Sort"
            style={{ width: 160 }}
            value={sort}
          >
            {Object.keys(sortOptions).map((key) => (
              <Option key={key} value={key}>
                {sortOptions[key]}
              </Option>
            ))}
          </Select>
          <Filter onClick={open}>
            <FilterOutlined />
            <div>Filters</div>
          </Filter>
        </FilterWrapper>
        <FitWrapper>
          <Row gutter={16}>
            <Col span={6}>
              {Object.keys(attrData).map((key, index) => (
                <Collapse accordion expandIconPosition="end" ghost key={index}>
                  <Panel header={key} key={key} style={panelStyle}>
                    <Checkbox.Group
                      onChange={onSelect}
                      options={attrData[key]}
                      value={selectList}
                    />
                  </Panel>
                </Collapse>
              ))}
            </Col>
            <Col span={18}>
              <SelectWrapper>
                <div>
                  {selectList.map((item, index) => (
                    <Tag closable key={item + index} onClose={() => onClearSelect(item)}>
                      {item}
                    </Tag>
                  ))}
                </div>
                <div>{selectList.length > 0 ? <Tag onClick={clearAll}>Clear All</Tag> : ''}</div>
              </SelectWrapper>
              <Grid className="grid" spans={[5, 4, 4, 3, 2, 2]}>
                {data.map((order, index) => (
                  <Cell key={index} order={order} />
                ))}
              </Grid>
            </Col>
          </Row>
        </FitWrapper>
        <MbWrapper>
          <Grid className="grid" spans={[5, 4, 4, 3, 2, 2]}>
            {data.map((order, index) => (
              <Cell key={index} order={order} />
            ))}
          </Grid>
        </MbWrapper>
        <Spin spinning={fetching} style={{ width: '100%' }} />
        <Pagination
          current={current}
          onChange={(current, pageSize) => {
            setCurrent(current);
            setPageSize(pageSize);
          }}
          pageSize={pageSize}
          total={total}
        />
      </Content>
      <StyledDrawer
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
      </StyledDrawer>
    </Wrapper>
  );
};

export default Artworks;
