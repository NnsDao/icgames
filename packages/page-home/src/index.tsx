import { CollectionData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';
import { Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Top from './Top';
import TopCollection from './TopCollection';
import Trending from './Trending';

const Wrapper = styled.div`
  width: 100%;
  background-size: 100% 686px;
  min-height: 100vh;
`;

const Home: React.FC = () => {
  const api = useApi();
  const [data, setData] = useState<CollectionData[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    api
      ?.getAllcollections({})
      .then((res) => {
        console.log(res.list);

        sortData(res.list);
        setData(res.list);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api]);

  const Item = useMemo(() => {
    return data.filter((item) => item.id == 144);
  }, [data]);

  const sortData = (listData: CollectionData[], rangeValue?: string) => {
    listData.sort((a, b) => {
      let _a, _b;
      if (rangeValue == '1') {
        // 7d
        _a = Number(a.openseaStats.seven_day_volume);
        _b = Number(b.openseaStats.seven_day_volume);
      } else {
        // 24h
        _a = Number(a.openseaStats.one_day_volume);
        _b = Number(b.openseaStats.one_day_volume);
      }
      return _b - _a;
    });
  };

  const selectChange = (value: string) => {
    // 24hours / 7 days change
    sortData(data, value);
  };

  return (
    <Wrapper>
      <Top data={Item[0]} />
      <Trending data={data} />
      <TopCollection data={data} onSelectChange={selectChange} />
      <Spin spinning={fetching} style={{ width: '100%' }} />
    </Wrapper>
  );
};

export default Home;
