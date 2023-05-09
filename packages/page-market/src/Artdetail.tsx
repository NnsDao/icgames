import { BranchesOutlined } from '@ant-design/icons';
import { etherscan } from '@horse-racing/app-config/constants';
import { formatImage, returnTime } from '@horse-racing/app-config/utils';
import { FormatBalance } from '@horse-racing/react-components';
import {
  Erc721ActivityListing,
  Erc721ActivitySale,
  Erc721ActivityTrans,
  OrderData,
  OrderStatus
} from '@horse-racing/service/types';
import { Avatar, Card, Col, Collapse, Divider, Select, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { colorPrimary } from '@horse-racing/react-components/style';
import media,{ marginMedia, paddingMedia, widthMedia } from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { Erc721DetailData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

import BuyNow from './BuyNow';

const { Option } = Select;

const { Panel } = Collapse;

const Wrapper = styled.div`
  // width: 100%;
  // min-height: 100vh;
  // ${marginMedia(2, 2)}
  .owner{
    ${paddingMedia(0,0,0.5,0.5)}
    >div{
      display:inline-block;
      vertical-align:middle;
    }
  }
`;

const Content = styled.div`
  margin: 0 auto;
  padding-top: 50px;
  justify-content: space-between;
  ${widthMedia()};
  > .grid {
    margin-bottom: 40px;
  }
  > .art-info {
    ${marginMedia(1)}
    font-size:14px;
    color: #272270;
  }
`;

const StyledImage = styled.img`
  max-width: 480px;
  align-items: center;
  display: flex;
  padding-left: 50px;
  padding-bottom: 80px;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
  border-radius: 32px 32px 0 0;
  ${media('lg')}{
    width:100%;
    padding:0;
    ${paddingMedia(1.5,0,0.5,0.5)}
  }
`;

const Owners = styled.div`
  margin-left: 5px;
  padding-top: 15px;
  ${media('lg')}{
    display:inline-block;
    width:82vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

`;

const NftGrid = styled.div`
  padding-bottom: 24px;
  padding-top: 24px;

  & > div {
    grid-column: 2 / 6;
  }
`;

const StyledGrid = styled(NftGrid)`
  background-color: white;
  border-radius: 10px;
  padding: 65px 20px;
`;

// const StyledButton = styled(Button)`
//   margin-top: 20px;
//   margin-bottom: 40px;
// `;

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  & > div:nth-child(1) {
    width: 150px;
    color: #8e8f99;
  }
  & > div:nth-child(2) {
    flex: 1;
    overflow: hidden;
    p-overflow: ellipsis;
    color: black;
  }
`;

// const ArtNumWrapper = styled.div`
//   display: flex;
//   align-items: flex-end;
//   ${marginMedia(0.8)}
// `;

const Cardlist = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: center;
  .card-detail {
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
  }
  .card-content {
    background-color: rgba(21, 178, 229, 0.06);
    border-radius: 6px;
    border: 1px solid #000000;
    padding: 10px;
    text-align: center;
    width: 174px;
    ${media('lg')}{
      width:40vw
    }
  }

  .card-content > p:nth-child(1) {
    color: #000000;
    font-size: 15px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-content > p:nth-child(2) {
    color: rgb(53, 56, 64);
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// const NumWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #fff;
//   box-shadow: 0px 7px 18px 0px #a2959d;
//   border-radius: 10px;
//   width: 800px;
//   ${paddingMedia(0.5, 0.5, 0.5, 0.5)}
// `;

const ItemWrapper = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: bold;
  color: #272270;
  p-align: center;
  :not(:last-of-type) {
    border-right: 1px dashed rgba(0, 0, 0, 0.1);
  }

  > label {
    display: block;
    color: ${colorPrimary};
    font-weight: normal;
    ${marginMedia(0.2)};
  }
`;

const GridStyle = styled.div`
  ${marginMedia(0,0,0.5,0.5)}
  background: #c7c7cc;
  display: row;
  border: 1px solid #979797;
  width: '1200px';
  justify-content: start;
  margin-bottom: 20px;
  .buy-button {
    background: #000;
    align-items: center;
    color: white;
    text-align: center;
    justify-content: center;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    border-radius: 10px;
  }
`;

const FitWrapper = styled.div`
  ${media('lg')}{
    display:none;
  }
`

const MbWrapper = styled.div`
  display:none;
  ${media('lg')}{
    display:block;

  }
`

const MbCollapse = styled.div`
  display:none;
  ${media('lg')}{
    display:block;
    ${marginMedia(0,0,0.5,0.5)}
    .addr{
      word-break:break-all;
    }
    .title{
      font-weight:bold;
    }
  }
`

// const Links = styled.div`
//   width: 100%;
//   ${paddingMedia(0, 0.2, 0.5, 0)}
//   > a {
//     margin-right: 20px;
//     :last-of-type(1) {
//       margin-right: 0;
//     }
//   }
// `;

const Item: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <ItemWrapper>
      <div>{children}</div>
      <label>{title}</label>
    </ItemWrapper>
  );
};

const Artdetail: React.FC = () => {
  const {
    params: { id }
  } = useRouteMatch<{ id: string }>();
  const api = useApi();
  const deployments = useDeployments();
  const [fetching, setFetching] = useState(false);
  const [loadStatus, setLoadData] = useState('Transfer');
  const [data, setData] = useState<Erc721DetailData>({
    id: 0,
    name: 'name',
    image: '',
    address: '',
    owner: '',
    backgroundColor: '',
    tokenId: '',
    description: '',
    rawMetadata: [],
    attributes: [],
    tokenUri: '',
    timeLastUpdated: '',
    stats: [],
    openseaFloorPrice: ''
  });
  const [odata, setOrderData] = useState<OrderData[]>([]);

  // data
  const [loading, setLoading] = useState(false);

  const [ldata, setListingData] = useState<Erc721ActivityListing[]>([]);
  const [hdata, setHistoryData] = useState<Erc721ActivityTrans[]>([]);
  const [sdata, setSaleData] = useState<Erc721ActivitySale[]>([]);

  // detail
  useEffect(() => {
    if (!id) return;
    setFetching(true);
    api
      ?.getDetail({
        id: id
      })
      .then((res) => {
        // @ts-ignore
        setData(res);
        // setTotal(res.page.total);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, id]);

  // order data

  useEffect(() => {
    if (!data) return;
    setFetching(true);
    api
      ?.getOrders({
        sell_token: data.address,
        sell_token_id: data.tokenId,
        owner: data.owner,
        status: OrderStatus.OPEN
      })
      .then((res) => {
        setOrderData(res.list);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, data]);

  // activity trans data
  const loadMoreData = (ttype: string) => {
    setLoading(true);
    if (!data) return;
    setFetching(true);
    setLoadData(ttype);

    if (ttype == 'List') {
      api
        ?.getActivityList({
          tokenId: data.tokenId,
          token: data.address
        })
        .then((res) => {
          // @ts-ignore
          setListingData(res.list);
          // setData(res);
        })
        .finally(() => {
          setFetching(false);
        });
    } else if (ttype == 'Transfer') {
      api
        ?.getActivityTrans({
          tokenId: data.tokenId,
          token: data.address
        })
        .then((res) => {
          //@ts-ignore
          setHistoryData(res.list);
          // setData(res);
        })
        .finally(() => {
          setFetching(false);
        });
    } else if (ttype == 'Sale') {
      api
        ?.getActivitySale({
          tokenId: data.tokenId,
          token: data.address
        })
        .then((res) => {
          // @ts-ignore
          setSaleData(res.list);
          // setData(res);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  };

  useEffect(() => {
    loadMoreData('Transfer');
  }, [api, data]);

  const ListingData = (item: any) => {
    return (
      <div>
        <p style={{ fontWeight: '700' }}>
          {loadStatus} &nbsp;&nbsp;
          <FormatBalance balance={item.item.buying} showSymbol />
        </p>
        <p>
          From ${item.item?.owner.substring(0, 6)} &nbsp;&nbsp; &nbsp; {returnTime(item.item.date)}
        </p>
        <Divider />
      </div>
    );
  };

  const CellList = (item: any) => {
    return (
      <div>
        <p style={{ fontWeight: '700' }}>{loadStatus}</p>
        <p>
          From ${item.item?.from.substring(0, 6)} &nbsp;&nbsp; To ${item.item?.to.substring(0, 6)}{' '}
          &nbsp; &nbsp;Block Height:{item.item.block}
        </p>
        <Divider />
      </div>
    );
  };

  const SaleList = (item: any, chainId: number) => {
    return (
      <div>
        <p style={{ fontWeight: '700' }}>
          {loadStatus} Price: {item.buyValue}
        </p>
        <p>
          From ${item.item?.from.substring(0, 6)} &nbsp;&nbsp; To $
          {item.item?.buyer.substring(0, 6)} &nbsp; &nbsp;{returnTime(item.item.date)} &nbsp; &nbsp;{' '}
          <a
            href={etherscan[chainId] + '/tx/' + item.item.transaction}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BranchesOutlined />
          </a>
        </p>
        <Divider />
      </div>
    );
  };

  return (
    <Wrapper>
      <Content>
        <FitWrapper>
          <Row>
            <Col span={12}>
              {/* <NftCard datas={data} /> */}
              <StyledImage alt={data.name} src={formatImage(data.image)} />
              <Collapse accordion defaultActiveKey={['2']} expandIconPosition="end">
                <Panel header="Properties" key="2">
                  <Cardlist>
                    {data?.attributes?.map((item, index) => {
                      return (
                        <div className="card-detail">
                          <Col key={index} span={8}>
                            <div className="card-content">
                              <p>{item.value}</p>
                              <p>{item.trait_type}</p>
                            </div>
                          </Col>
                        </div>
                      );
                    })}
                  </Cardlist>
                </Panel>
              </Collapse>

              <Collapse
                accordion
                defaultActiveKey={['1']}
                expandIconPosition="end"
                style={{ marginTop: 15 }}
              >
                <Panel header="Token detail" key="2">
                  <Row>
                    <p>{data.name}</p>
                    <p>{data.tokenId} </p>
                  </Row>
                  {/* <Row>
                    <p>Blockchain</p>
                    <p>ETH </p>
                  </Row> */}
                  <Row>
                    <p>Token Standard</p>
                    <p>ERC721 </p>
                  </Row>
                  <Divider />
                  <Row>
                    <p>Contract address</p>
                    <p>{data.address} </p>
                  </Row>
                  {/* <Row>
                    <p>Creator Rebate</p>
                    <p>0.5%</p>
                  </Row> */}
                </Panel>
              </Collapse>
            </Col>
            <Col>
              <StyledGrid>
                <div className="info-wrap">
                  <h2>{data.name}</h2>

                  <p color="#8e8f99">{data.description}</p>

                  <Row>
                    <Avatar
                      src={
                        <img
                          alt="avatar"
                          src="https://looksrare.mo.cloudinary.net/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8/0x44f70bb35a2e7ef9056d5ae4a9e107654e0625f5568524209d8345034fb32604?resource_type=image&f=auto&c=limit&w=1600&q=auto:best"
                        />
                      }
                    />
                    <Owners>
                      <p>
                        Owner <br />
                        {data.owner}
                      </p>
                    </Owners>
                  </Row>
                  <GridStyle>
                    <Card bordered={false}>
                      <Row>
                        <Col span={12}>
                          <p>Current Price</p>
                          <p>
                            <FormatBalance balance={data.stats?.price} showSymbol />
                          </p>
                        </Col>
                        <Col>
                          {' '}
                          {/* <div className="buy-button">Buy now</div> */}
                          {odata.length > 0 && <BuyNow order={odata[0]} dataImage={data.image} />}
                        </Col>
                      </Row>
                    </Card>
                  </GridStyle>

                  <Collapse accordion defaultActiveKey={['3']} expandIconPosition="end">
                    <Panel header="Activity" key="3">
                      <Tag
                        color={loadStatus === 'List' ? 'green' : 'default'}
                        onClick={() => loadMoreData('List')}
                      >
                        Listings
                      </Tag>
                      <Tag
                        color={loadStatus === 'Transfer' ? 'green' : 'default'}
                        onClick={() => loadMoreData('Transfer')}
                      >
                        Transfers
                      </Tag>
                      <Tag
                        color={loadStatus === 'Sale' ? 'green' : 'default'}
                        onClick={() => loadMoreData('Sale')}
                      >
                        Sales
                      </Tag>

                      <Divider />

                      <div
                        id="scrollableDiv"
                        style={{
                          height: 400,
                          overflow: 'auto',
                          padding: '0 16px'
                        }}
                      >
                        {loadStatus === 'List'
                          ? ldata.length !== 0
                            ? ldata.map((item, index) => <ListingData item={item} key={index} />)
                            : 'No Item to display'
                          : null}

                        {loadStatus === 'Transfer'
                          ? hdata.length !== 0
                            ? hdata.map((item, index) => <CellList item={item} key={index} />)
                            : 'No Item to display'
                          : null}

                        {loadStatus === 'Sale'
                          ? sdata.length !== 0
                            ? sdata.map((item, index) => <SaleList item={item} key={index} />)
                            : 'No Item to display'
                          : null}
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </StyledGrid>
            </Col>
          </Row>
        </FitWrapper>
        <MbWrapper>
          <StyledImage alt={data.name} src={formatImage(data.image)} />
          <div className='owner'>
            <Avatar
              src={
                <img
                  alt="avatar"
                  src="https://looksrare.mo.cloudinary.net/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8/0x44f70bb35a2e7ef9056d5ae4a9e107654e0625f5568524209d8345034fb32604?resource_type=image&f=auto&c=limit&w=1600&q=auto:best"
                />
              }
            />
            <Owners>
              <p>
                Owner <br />
                {data.owner?.substring(0,6)}
              </p>
            </Owners>
          </div>
          <GridStyle>
            <Card bordered={false}>
              <Row>
                <Col span={12}>
                  <p>Current Price</p>
                  <p>
                    <FormatBalance balance={data.stats?.price} showSymbol />
                  </p>
                </Col>
                <Col>
                  {' '}
                  {/* <div className="buy-button">Buy now</div> */}
                  {odata.length > 0 && <BuyNow order={odata[0]} dataImage={data.image} />}
                </Col>
              </Row>
            </Card>
          </GridStyle>
          <MbCollapse>
            <Collapse accordion defaultActiveKey={['2']} expandIconPosition="end">
              <Panel header="Properties" key="1">
                <Cardlist>
                  {data?.attributes?.map((item, index) => {
                    return (
                      <div className="card-detail">
                        <Col key={index} span={8}>
                          <div className="card-content">
                            <p>{item.value}</p>
                            <p>{item.trait_type}</p>
                          </div>
                        </Col>
                      </div>
                    );
                  })}
                </Cardlist>
              </Panel>
            </Collapse>
            <Collapse
                accordion
                defaultActiveKey={['1']}
                expandIconPosition="end"
                style={{ marginTop: 15 }}
              >
                <Panel header="Token detail" key="2">
                  <Row>
                    <p>{data.name}</p>
                    <p>{data.tokenId} </p>
                  </Row>
                  {/* <Row>
                    <p>Blockchain</p>
                    <p>ETH </p>
                  </Row> */}
                  <Row>
                    <p className='title'>Token Standard</p>
                    <p>ERC721 </p>
                  </Row>
                  <Divider />
                  <p className='title'>Contract address</p>
                  <p className='addr'>{data.address} </p>
                  {/* <Row>
                    <p>Creator Rebate</p>
                    <p>0.5%</p>
                  </Row> */}
                </Panel>
              </Collapse>
              <Collapse accordion defaultActiveKey={['3']} expandIconPosition="end" style={{ marginTop: 15 }}>
                <Panel header="Activity" key="3">
                  <Tag
                    color={loadStatus === 'List' ? 'green' : 'default'}
                    onClick={() => loadMoreData('List')}
                  >
                    Listings
                  </Tag>
                  <Tag
                    color={loadStatus === 'Transfer' ? 'green' : 'default'}
                    onClick={() => loadMoreData('Transfer')}
                  >
                    Transfers
                  </Tag>
                  <Tag
                    color={loadStatus === 'Sale' ? 'green' : 'default'}
                    onClick={() => loadMoreData('Sale')}
                  >
                    Sales
                  </Tag>

                  <Divider />

                  <div
                    id="scrollableDiv"
                    style={{
                      height: 400,
                      overflow: 'auto',
                      padding: '0 16px'
                    }}
                  >
                    {loadStatus === 'List'
                      ? ldata.length !== 0
                        ? ldata.map((item, index) => <ListingData item={item} key={index} />)
                        : 'No Item to display'
                      : null}

                    {loadStatus === 'Transfer'
                      ? hdata.length !== 0
                        ? hdata.map((item, index) => <CellList item={item} key={index} />)
                        : 'No Item to display'
                      : null}

                    {loadStatus === 'Sale'
                      ? sdata.length !== 0
                        ? sdata.map((item, index) => <SaleList item={item} key={index} />)
                        : 'No Item to display'
                      : null}
                  </div>
                </Panel>
              </Collapse>
          </MbCollapse>

        </MbWrapper>

        <Spin spinning={fetching} style={{ width: '100%' }} />
      </Content>
    </Wrapper>
  );
};

export default Artdetail;
