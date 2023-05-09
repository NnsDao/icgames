import { formatImage } from '@horse-racing/app-config/utils';
import { Exchange } from '@nft-market/contracts-core';
import { Order } from '@nft-market/contracts-core/Order';
import { Button, Modal } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ButtonEnable, FormatBalance } from '@horse-racing/react-components';
import { notifyError } from '@horse-racing/react-components/notifyError';
import { notifyTx } from '@horse-racing/react-components/notifyTx';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { OrderData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

const Wrapper = styled.div`
  .ant-btn {
    border-radius: 5px;
    background: linear-gradient(140deg, #000000 0%, #3a4fe7 100%);
    ${marginMedia(0.2)};
  }
`;

const Content = styled.div`
  margin: 0 auto;
  text-align: center;
  .ant-input {
    background-color: transparent !important;
    color: #fff !important;
  }

  > .item {
    margin-bottom: 20px;
  }

  h1 {
    color: #272270;
    font-size: 24px;
    margin-bottom: 10px;
  }
  img {
    width: 210px;
    margin-bottom: 20px;
  }
  p {
    margin: 5px 0;
    color: #9595a2;
    font-size: 14px;
  }
  .tip {
    color: #000000;
    font-size: 18px;
    font-weight: bold;
  }
  .price {
    font-weight: bold;
    color: #03c08f;
    font-size: 36px;
  }
  .btn {
    margin-top: 20px;
    .ant-btn {
      ${paddingMedia(0.35, 0.35, 0.5, 0.5)}
      line-height:1;
      height: auto;
      :not(:last-of-type) {
        border-color: #f4f4f4;
        background-color: #f4f4f4;
        ${marginMedia(0, 0, 0, 0.8)}
      }
    }
  }
`;

interface Props {
  order: OrderData;
  dataImage: string;
}

const BuyNow: React.FC<Props> = ({ order, dataImage }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { account, chainId, library } = useWallet();
  const deployments = useDeployments();
  const api = useApi();

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  console.log(order, 82828828282828);

  const exchange = useMemo(
    () =>
      deployments &&
      library &&
      new Exchange(deployments.Exchange, deployments.TransferProxy, library, undefined, account),
    [account, deployments, library]
  );

  const buy = useCallback(
    async (data: OrderData) => {
      if (!account || !chainId || !api) return;

      const order = Order.parse({
        key: {
          salt: data.salt,
          owner: data.owner,
          sellAsset: {
            token: data.sellAssetToken,
            tokenId: data.sellAssetTokenId,
            assetType: data.sellAssetType
          },
          buyAsset: {
            token: data.buyAssetToken,
            tokenId: data.buyAssetTokenId,
            assetType: data.buyAssetType
          }
        },
        buying: data.buying,
        selling: data.selling,
        sellerFee: data.sellerFee
      });

      setLoading(true);

      const { buyerFee, signature } = await api.getOrderFee({ id: data.id });

      return exchange
        ?.exchange(order, data.signature, buyerFee, signature, 1, account)
        .then((tx) => tx.wait())
        .then((tx) => notifyTx(tx, chainId))
        .catch(notifyError)
        .finally(() => setLoading(false));
    },
    [account, api, chainId, exchange]
  );

  return (
    <Wrapper>
      <Modal
        closable={false}
        footer={null}
        maskClosable={false}
        open={visible}
        title={null}
        width={650}
      >
        <Content>
          <h1>You are about to make a purchase!</h1>
          <img src={formatImage(dataImage)} />
          <p>You are about to purchase this NFT from your connected wallet for:</p>
          <div className="price">
            <FormatBalance balance={order.price} showSymbol />
          </div>
          <p>This process may take a minute to process.</p>
          <div className="tip">Are you sure you want to continue?</div>
          <div className="btn">
            <Button ghost onClick={close} type="primary">
              CANCEL
            </Button>
            <ButtonEnable loading={loading} onClick={() => buy(order)} type="primary">
              CONFIRM
            </ButtonEnable>
          </div>
        </Content>
      </Modal>
      <Button onClick={open} type="primary">
        Buy Now
      </Button>
    </Wrapper>
  );
};

export default React.memo(BuyNow);
