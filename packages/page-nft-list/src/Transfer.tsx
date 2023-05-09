import { ERC721 } from '@nft-market/contracts-core';
import { Button, Input, Modal } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ButtonEnable } from '@horse-racing/react-components';
import { notifyError } from '@horse-racing/react-components/notifyError';
import { notifyTx } from '@horse-racing/react-components/notifyTx';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721DetailData } from '@horse-racing/service/types';

const Wrapper = styled.div`
  .ant-btn {
    border: 0;
    font-size: 16px;
    border: 0;
    color: #000;
    border-radius: 5px;
    color: #fff;
    background: rgba(22, 22, 23, 0.8);
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
  erc721: Erc721DetailData;
}

const Transfer: React.FC<Props> = ({ erc721: { address, tokenId } }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState<string>();
  const { chainId } = useWallet();
  const { account, library } = useWallet();
  const erc721 = useMemo(
    () => (library ? new ERC721(address, library.getSigner()) : null),
    [address, library]
  );

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => {
    setVisible(false);
    setTo('');
  }, []);
  const transfer = useCallback(() => {
    if (!account || !erc721 || !to) return;

    setLoading(true);

    return erc721
      .transferFrom(account, to, tokenId)
      .then((tx) => tx.wait())
      .then((tx) => {
        if (tx && chainId) {
          notifyTx(tx, chainId);
        }
      })
      .catch(notifyError)
      .finally(() => {
        setTo('');
        setLoading(false);
      });
  }, [account, chainId, erc721, to, tokenId]);

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
          <h5>Transfer NFT</h5>
          <p>Please enter the address you want to send the NFT to.</p>
          <div className="tip">
            <img src="/images/tips.png" />
            <div>Beware, not all wallets support all tokens.</div>
          </div>
          <div className="price-input">
            <label>Address to send to</label>
            <Input onChange={(e) => setTo(e.target.value)} placeholder="Input" value={to} />
          </div>
          <ModalButtonStyle>
            <Button ghost onClick={close} type="primary">
              CANCEL
            </Button>
            <ButtonEnable loading={loading} onClick={transfer} type="primary">
              CONFIRM
            </ButtonEnable>
          </ModalButtonStyle>
        </Content>
      </Modal>
      <Button onClick={open} type="primary">
        Transfer
      </Button>
    </Wrapper>
  );
};

export default React.memo(Transfer);
