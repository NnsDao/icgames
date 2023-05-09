import { Exchange } from '@nft-market/contracts-core';
import { Button } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { notifyError } from '@horse-racing/react-components/notifyError';
import { notifyTx } from '@horse-racing/react-components/notifyTx';
import { marginMedia } from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721DetailData, OrderData, OrderStatus } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

const Wrapper = styled.div`
  .ant-btn {
    border-radius: 5px;
    background: linear-gradient(140deg, #000000 0%, #3a4fe7 100%);
    ${marginMedia(0.2)};
  }
`;

interface Props {
  erc721: Erc721DetailData;
  transferProxy: string;
}

const OnShelf: React.FC<Props> = ({ erc721, transferProxy }) => {
  const deployments = useDeployments();
  const { account, chainId, library } = useWallet();
  const [loading, setLoading] = useState(false);
  const [odata, setOrderData] = useState<OrderData[]>([]);
  const api = useApi();

  useEffect(() => {
    if (!erc721) return;
    api
      ?.getOrders({
        sell_token: erc721.address,
        sell_token_id: erc721.tokenId,
        owner: erc721.owner,
        status: OrderStatus.OPEN
      })
      .then((res) => {
        setOrderData(res.list);
      })
      .finally(() => {});
  }, [api, erc721]);

  const exchange = useMemo(
    () =>
      deployments &&
      library &&
      new Exchange(deployments.Exchange, transferProxy, library, undefined, account),
    [account, deployments, library, transferProxy]
  );

  const cancel = useCallback(() => {
    setLoading(true);

    return (
      odata[0] &&
      chainId &&
      exchange
        ?.cancel({
          salt: odata[0].salt,
          owner: odata[0].owner,
          sellAsset: {
            token: odata[0].sellAssetToken,
            tokenId: odata[0].sellAssetTokenId,
            assetType: odata[0].sellAssetType
          },
          buyAsset: {
            token: odata[0].buyAssetToken,
            tokenId: odata[0].buyAssetTokenId,
            assetType: odata[0].buyAssetType
          }
        })
        .then((tx) => tx.wait())
        .then((tx) => notifyTx(tx, chainId))
        .catch(notifyError)
        .finally(() => setLoading(false))
    );
  }, [chainId, exchange, odata]);

  return (
    <Wrapper>
      <Button loading={loading} onClick={cancel} type="primary">
        Cancel Listing
      </Button>
    </Wrapper>
  );
};

export default React.memo(OnShelf);
