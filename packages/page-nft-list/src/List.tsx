import { getAddress } from '@ethersproject/address';
import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { Grid } from '@horse-racing/react-components';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721DetailData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

import Asset from './Asset';

const Wrapper = styled.div`
  width: 100%;
  background-size: 100% 333px;
  min-height: 100vh;
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

const SelectWrapper = styled.div`
  ${paddingMedia(3.5)}
  margin: 0 auto;
  text-align: center;

  h1 {
    color: #000;
    font-size: 38px;
    span {
      background: rgba(22, 22, 23, 0.8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    ${media('lg')} {
      font-size: 20px;
      margin-bottom: 0;
      ${marginMedia(0, 0, 0.5, 0.5)}
    }
  }
  .ant-btn {
    ${marginMedia(0.5, 1, 0, 0.4)}
    font-size:16px;
    height: 46px;
    border: 0;
    color: #fff;
    border-radius: 2px;
    ${paddingMedia(0, 0, 1.6, 1.6)}
    &:hover {
      opacity: 0.6;
    }
  }
`;

const List: React.FC = () => {
  const {
    params: { id }
  } = useRouteMatch<{ id: string }>();
  const api = useApi();
  const deployments = useDeployments();
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  // const [list, setList] = useState<(Erc721Data & { type?: number })[]>([]);
  const [list, setList] = useState<Erc721DetailData[]>([]);
  const [fetching, setFetching] = useState(false);
  const { account, library } = useWallet();
  const { push } = useHistory();

  // useEffect(() => {
  //   if (library && deployments && account)  {
  //     setFetching(true);
  //     api
  //       ?.getErc721List({
  //         address: address || undefined
  //       })
  //       .then((res) => res.list)
  //       .then((list: (Erc721Data & { type?: number })[]) => {
  //         const calls: {
  //           address: string;
  //           abi: any;
  //           methodName: string;
  //           params?: any[];
  //           index: number;
  //         }[] = [];

  //         list.forEach(({ address, tokenId }, index) => {
  //           if (address === deployments.Horse) {
  //             calls.push({
  //               address,
  //               abi: abis.Horse,
  //               methodName: 'types',
  //               params: [tokenId],
  //               index
  //             });
  //           }
  //         });

  //         if (calls.length > 0) {
  //           multicall(library, calls)
  //             .then((results: number[]) => {
  //               results.forEach((result, index) => {
  //                 list[calls[index].index].type = result;
  //               });
  //             })
  //             .finally(() => {
  //               setList(list);
  //             });
  //         } else {
  //           setList(list);
  //         }
  //       })
  //       .catch(console.error)
  //       .finally(() => setFetching(false));
  //   }
  // }, [account, api, address, library, deployments]);
  useEffect(() => {
    setFetching(true);
    api
      ?.getCollections({
        id: id
      })
      .then((res) => {
        setTitle(res.name);
        setAddress(res.address);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [api, id]);

  useEffect(() => {
    if (!library || !deployments || !account || !address) return;
    setFetching(true);
    api
      ?.getErc721({
        owner: getAddress(account),
        address: address
      })
      .then((res) => {
        setList(res.list);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [account, api, address, library, deployments]);

  return (
    <Spin spinning={fetching}>
      <Wrapper>
        <Content>
          <SelectWrapper>
            <h1>
              My NFTs: <span>{title}</span>
            </h1>
            <Button onClick={() => push('/myCollection')} type="primary">
              GO TO PROFILE
            </Button>
          </SelectWrapper>
          <Grid className="grid" spans={[5, 4, 3, 2, 2, 1]}>
            {list.map((erc721, index) => (
              <Asset erc721={erc721} key={index} />
            ))}
          </Grid>
        </Content>
      </Wrapper>
    </Spin>
  );
};

export default React.memo(List);
