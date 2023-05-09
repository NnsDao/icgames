import { getAddress } from '@ethersproject/address';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Grid } from '@horse-racing/react-components';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { CollectionData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

const Wrapper = styled.div`
  width: 100%;
  background-size: 100% 333px;
  min-height: 100vh;
  .empty {
    text-align: center;
    color: #aaa;
    ${marginMedia(1.5)}
  }
`;

const Content = styled.div`
  ${widthMedia()};
  margin: 0 auto;

  > .grid {
    margin-bottom: 40px;
    ${media('lg')} {
      ${paddingMedia(0, 0, 0.5, 0.5)}
    }
  }
`;

const CellStyle = styled.div`
  ${marginMedia(2)}
  position: relative;
  margin: 0 auto;
  border-radius: 8px;
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
      color: #000;
      font-weight: bold;
    }
    .art-num {
      color: #5f5f5f;
    }
  }
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

const Cell: React.FC<{ order: CollectionData }> = ({ order }) => {
  const { push } = useHistory();

  return (
    <CellStyle onClick={() => push(`/myCollection/${order.id}`)}>
      <div className="banner">
        <img src={order.banner} />
      </div>
      <div className="user-info">
        <img src={order.logo} />
      </div>
      <div className="bottom">
        <div className="bottom-title">{order.name}</div>
        <div className="art-num">{order.totalCount} Artworks</div>
      </div>
    </CellStyle>
  );
};

const Market: React.FC = () => {
  const api = useApi();
  const deployments = useDeployments();
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<CollectionData[]>([]);
  const { account, library } = useWallet();
  const [address, setAddress] = useState('');

  console.log(data, 28288282);

  useEffect(() => {
    setFetching(true);
    if (!deployments || !account) return;
    api
      ?.getAllcollections({
        owner: getAddress(account)
      })
      .then((res) => {
        setData(res.list);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, account, deployments]);

  return (
    <Wrapper>
      <Content>
        <SelectWrapper>
          <h1>My Collections</h1>
        </SelectWrapper>
        {data.length > 0 ? (
          <Grid className="grid" spans={[4, 3, 3, 2, 2, 1]}>
            {data.map((order, index) => (
              <Cell key={index} order={order} />
            ))}
          </Grid>
        ) : (
          <div className="empty">No Item to display</div>
        )}

        <Spin spinning={fetching} style={{ width: '100%' }} />
      </Content>
    </Wrapper>
  );
};

export default React.memo(Market);
