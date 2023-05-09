import { parseEther } from '@ethersproject/units';
import { Exchange } from '@nft-market/contracts-core';
import { AssetType } from '@nft-market/contracts-core/types';
import { Button, Input, Modal } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ButtonEnable } from '@horse-racing/react-components';
import { notifyError } from '@horse-racing/react-components/notifyError';
import { notifySuccess } from '@horse-racing/react-components/notifySuccess';
import { notifyTx } from '@horse-racing/react-components/notifyTx';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { useApprovalForAll, useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721DetailData } from '@horse-racing/service/types';
import { useApi } from '@horse-racing/service/useApi';

const Wrapper = styled.div`
  .ant-btn {
    min-width:90px;
    border-radius: 5px;
    background: linear-gradient(140deg, #000000 0%, #3a4fe7 100%);
    ${marginMedia(0.2)};
  }
`;

const Content = styled.div`
  text-align: center;
  width: 72%;
  margin: 0 auto;
  h5 {
    color: #642b4f;
    font-size: 24px;
  }
  > p {
    margin: 30px 0;
    color: #a2959d;
    font-size: 14px;
  }
  .tip {
    background: rgba(255, 158, 158, 0.1);
    color: #fa6400;
    padding: 8px;

    img {
      width: 15px;
      display: inline-block;
      vertical-align: top;
      margin: 3px 3px 0 0;
    }
    > div {
      text-align: left;
      width: 88%;
      font-size: 13px;
      display: inline-block;
    }
  }
  .ant-input {
    margin-top: 10px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid #979797;
  }
  .price-input {
    margin-top: 50px;
    text-align: left;
    > label {
      color: #a2959d;
      font-size: 14px;
    }
  }
`;

const ModalButtonStyle = styled.div`
  margin-top:20px;
  .ant-btn{
    ${paddingMedia(0.35, 0.35, 0.5, 0.5)}
    line-height:1;
    height:auto;
    :not(:last-of-type){
      border-color:#F4F4F4;
      background-color:#F4F4F4;
      ${marginMedia(0, 0, 0, 0.8)}
    }
  }
}
`;

interface Props {
  // erc721: Erc721Data;
  erc721: Erc721DetailData;
  transferProxy: string;
}

const OnShelf: React.FC<Props> = ({ erc721: { address, tokenId }, transferProxy }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const { isApprovalForAll, setApprovalForAll } = useApprovalForAll(address, transferProxy);
  const deployments = useDeployments();
  const { chainId, library } = useWallet();
  const api = useApi();

  const exchange = useMemo(
    () => deployments && library && new Exchange(deployments.Exchange, transferProxy, library),
    [deployments, library, transferProxy]
  );

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => {
    setVisible(false);
    setPrice('');
  }, []);

  const approve = useCallback(() => {
    setLoading(true);
    return setApprovalForAll()
      .then((tx) => {
        if (tx && chainId) {
          notifyTx(tx, chainId);
        }
      })
      .catch(notifyError)
      .finally(() => {
        setLoading(false);
      });
  }, [chainId, setApprovalForAll]);

  const signAndSell = useCallback(() => {
    setLoading(true);

    return exchange
      ?.sellWithEth(
        {
          token: address,
          tokenId,
          assetType: AssetType.ERC721
        },
        1,
        parseEther(price),
        150
      )
      .then(({ order, signature }) => {
        return api?.postOrder({
          order: order.sequence(),
          signature
        });
      })
      .then(() => {
        notifySuccess();
        setVisible(false);
      })
      .catch(notifyError)
      .finally(() => {
        setPrice('');
        setLoading(false);
      });
  }, [api, exchange, price, address, tokenId]);

  return (
    <Wrapper>
      <Modal
        closable={false}
        footer={null}
        maskClosable={false}
        onCancel={close}
        title={null}
        visible={visible}
      >
        <Content>
          <h5>Marketplace Listing</h5>
          <p>
            Please enter a price below to create a new marketplace listing. Once you save the
            listing, it becomes available to the public.
          </p>
          <div className="tip">
            <img src="/images/tips.png" />
            <div>
              3.5% of the sale price will be deducted once sold. This is made of up a 2.5% Royalty
              fee for the Creators, and a 1% Marketplace fee
            </div>
          </div>
          <div className="price-input">
            <label>Listing price in ETH</label>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Input price"
              value={price}
            />
          </div>
          <ModalButtonStyle>
            <Button ghost onClick={close} type="primary">
              CANCEL
            </Button>
            <ButtonEnable disabled={!price} loading={loading} onClick={signAndSell} type="primary">
              CONFIRM
            </ButtonEnable>
          </ModalButtonStyle>
        </Content>
      </Modal>
      {isApprovalForAll ? (
        <Button onClick={open} type="primary">
          Sell
        </Button>
        ) : (
        <ButtonEnable loading={loading} onClick={approve} type="primary">
          Approve
        </ButtonEnable>
      )}
    </Wrapper>
  );
};

export default React.memo(OnShelf);
