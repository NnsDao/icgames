import { Button, Input, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { ButtonEnable } from '@horse-racing/react-components';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721DetailData } from '@horse-racing/service/types';

const Wrapper = styled.div`
  .ant-btn {
    border: 0;
    color: #000;
    border-radius: 5px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    background: #d5ff40;
    ${marginMedia(0.2)};
  }
  > .ant-modal-close {
    color: #fff;
  }
  > .avator-write {
    display: flex;
    color: #000;
    justify-content: flex-end;
    > img {
      width: 26px;
      height: 26px;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.06);
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  width: 100%;

  margin: 0 auto;
  > .user-profile {
    font-family: 'MiSans';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    padding-top: 26px;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .ant-input {
    margin-top: 10px;
    border-radius: 5px;
    background: #737373;
    border: 1px solid #737373;
  }

  .price-input {
    margin-top: 32px;
    text-align: left;
    > label {
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    > .input-update {
      text-align: center;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > button {
        margin-top: 10px;
        color: #fff;
        background: #525252;
        margin-left: 10px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
  .profile-input {
    margin-top: 32px;
    text-align: left;
    > label {
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    > .profile-nft-update {
      text-align: center;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > img {
        width: 60px;
        height: 60px;
      }
      > .profile-nft {
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        align-items: left;
        margin-left: 16px;
        > .profile-nft-title {
          font-family: 'MiSans';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
        }
        .ant-input {
          width: 425px;
        }
        > .profile-nft-notice {
          padding-top: 10px;
          font-family: 'MiSans';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;
          letter-spacing: 0.5px;
          color: #737373;
        }
      }
      > button {
        color: #fff;
        background: #525252;
        margin-left: 10px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;

const ModalButtonStyle = styled.div`
  margin-top:20px;
  display:flex;
  justify-content: flex-end;
  .ant-btn{
    ${paddingMedia(0.35, 0.35, 0.5, 0.5)}
    line-height:1;
    height:auto;
    background: #D5FF40;
    border-radius: 40px;
    color:#000;
    :not(:last-of-type){
      background: #262626;
      border: 1px solid #525252;
      border-radius: 40px;
      ${marginMedia(0, 0, 0, 0.8)}
    }
  }
}
`;

interface Props {
  erc721: Erc721DetailData;
}

const MyAvatar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState<string>();
  const { chainId } = useWallet();
  const { account, library } = useWallet();

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => {
    setVisible(false);
    setTo('');
  }, []);

  return (
    <Wrapper>
      <Modal
        width={640}
        bodyStyle={{ background: '#262626' }}
        footer={null}
        maskClosable={false}
        onCancel={close}
        title={null}
        visible={visible}
      >
        <Content>
          <div className="user-profile">User Profile</div>
          <div className="price-input">
            <label>Nick Name</label>
            <div className="input-update">
              <Input onChange={(e) => setTo(e.target.value)} placeholder="nick name" value={to} />
              <Button shape="round" onClick={close} type="primary">
                Update
              </Button>
            </div>
          </div>

          <div className="profile-input">
            <label>Profile Photo</label>
            <div className="profile-nft-update">
              <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
              <div className="profile-nft">
                <div className="profile-nft-title"> NFT URL</div>
                <Input
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="please fill your NFT url address"
                  value={to}
                />
                <div className="profile-nft-notice"> What is an IC NFTs</div>
              </div>
              <Button shape="round" onClick={close} type="primary">
                Update
              </Button>
            </div>
          </div>

          <ModalButtonStyle>
            <Button shape="round" onClick={close} type="primary">
              CANCEL
            </Button>
            <ButtonEnable loading={loading} type="primary">
              CONFIRM
            </ButtonEnable>
          </ModalButtonStyle>
        </Content>
      </Modal>
      <div className="avator-write" onClick={open}>
        <img src={require('@horse-racing/app-config/assets/update.svg')} />
      </div>
    </Wrapper>
  );
};

export default React.memo(MyAvatar);
