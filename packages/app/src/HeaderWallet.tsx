import { UnsupportedChainIdError } from '@web3-react/core';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { colorPrimary } from '@horse-racing/react-components/style';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { useWallet } from '@horse-racing/react-wallet';
import { injected } from '@horse-racing/react-wallet/connectors';
import { shortenAddress } from '@horse-racing/react-wallet/utils';

const Wrapper = styled.div`
  .ant-btn{
    font-size:16px;
    line-height:1;
    height:34px;
    border:0;
    background: rgba(22, 22, 23, .8);
    ${paddingMedia(0.1, 0.1, 0.6, 0.6)}
    &:hover{
      opacity: 0.6;
    }
  }
  .login-modal{
    z-index:1000;
    .ant-modal-content{
        border-radius: 20px;
        height:280px;
        background: rgba(22, 22, 23, .8);
      }
    }
    .ant-modal-close-x {
      color: white;
    }
  }
`;

const Content = styled.div`
  text-align:center;
  margin:0 auto;
  margin-top:30px;

  h1{
    font-size:32px;
    color:#fff;
    font-weight:normal;
  }
  button{
    font-size:16px;
    margin-top:30px;
    ${paddingMedia(0.4, 0.4)}
    line-height:1;
    height:auto;
    width:300px;
    img{
      margin-right:5px;
    }
    &:focus,
    &:active,
    &:hover{
      background: rgba(22, 22, 23, .8);
      opacity:0.6;
    }
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 8px 10px;

  border-radius: 30px;
  border: 1px solid ${colorPrimary};

  cursor: pointer;

  > img {
    width: 18px;
    margin-right: 8px;
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 10px;
  background-color: ${colorPrimary};
  border-radius: 30px;
  cursor: pointer;
`;

const Account = styled.div`
  display: flex;
  align-center: center;
  .wallet img {
    ${marginMedia(0, 0, 0.5)}
    width:35px;
  }
`;

const MenuChange = styled(Menu)`
  ${paddingMedia(0.2, 0.2, 0.2, 0.2)}
  border-radius: 6px;
  box-shadow: 0px 8px 16px 0px rgba(162, 149, 157, 0.47);
  .ant-dropdown-menu-item {
    color: #000000;
  }
`;

const MenuWallet = styled(Menu)`
  ${paddingMedia(0.2, 0.2, 0.2, 0.2)}
  width:200px;
  border-radius: 6px;
  box-shadow: 0px 8px 16px 0px rgba(162, 149, 157, 0.47);
  right: 0;
  h5 {
    color: #000000;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  > div {
    color: #1e1e1e;
    img {
      width: 40px;
      margin-right: 10px;
    }
  }
  .num {
    text-align: center;
    font-weight: bold;
    margin: 10px 0;
  }
`;

type LinkType = {
  title: string;
  to: string;
  open: boolean;
  children?: LinkType[];
};

const HeaderLink: React.FC<{ link: LinkType }> = ({ link: { children, open, title, to } }) => {
  const { deactivate } = useWallet();

  const _onClick = useCallback(
    (e: React.MouseEvent) => {
      if (!open) {
        e.preventDefault();
        message.info({ icon: ' ', content: 'Coming Soon' });

        return;
      }

      if (to.startsWith('http')) {
        e.preventDefault();

        window.location.href = to;
      }

      if (to == 'Logout') {
        e.preventDefault();
        deactivate();
      }
    },
    [open, to]
  );

  return children ? (
    <Dropdown
      overlay={
        <Menu>
          {children.map((link, index) => (
            <Menu.Item key={String(index) + 'sub'}>
              <HeaderLink link={link} />
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={['click']}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {title}
      </a>
    </Dropdown>
  ) : (
    <Link onClick={_onClick} style={{ cursor: !open ? 'not-allowed' : undefined }} to={to}>
      {title}
    </Link>
  );
};

interface HeaderWalletProps {
  onFilterChange: (newFilter: string) => void;
}

const HeaderWallet: React.FC<HeaderWalletProps> = ({ onFilterChange }) => {
  const [visible, setVisible] = useState(false);
  const { account, activate, active, error } = useWallet();
  const { pathname } = useLocation();

  // artwork reverse
  const walletImg = useMemo(() => {
    return pathname.indexOf('artworks') == -1 ? '/images/wallet.png' : '/images/wallet.png';
  }, [pathname]);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    onFilterChange(visible ? 'none' : 'blur(10px)');
  }, [visible]);
  const links = useMemo((): LinkType[] => {
    return [
      {
        title: 'My Collections',
        to: '/myCollection',
        open: true
      },
      {
        title: 'Logout',
        to: 'Logout',
        open: true
      }
    ];
  }, [account]);

  if (error instanceof UnsupportedChainIdError) {
    return <Error>Network Error</Error>;
  }

  if (active && account) {
    return (
      <Account>
        <Dropdown
          overlay={
            <MenuChange>
              {links.map((link, index) => (
                <Menu.Item key={String(index) + 'sub'}>
                  <HeaderLink link={link} />
                </Menu.Item>
              ))}
            </MenuChange>
          }
          trigger={['click']}
        >
          <Address>
            <a onClick={(e) => e.preventDefault()}>
              <img src={require('@horse-racing/app-config/assets/metamask.svg')} />
              {shortenAddress(account)}
            </a>
          </Address>
        </Dropdown>
        {/* <Dropdown
          overlay={
            <MenuWallet>
              <h5>My Wallet</h5>
              <div>
                <img src="/images/favicon.png" />
                {shortenAddress(account)}
              </div>
            </MenuWallet>
          }
          placement="bottomCenter"
          trigger={['click']}
        >
          <div className="wallet">
            <img src={walletImg} />
          </div>
        </Dropdown> */}
      </Account>
    );
  }

  return (
    <Wrapper>
      <Modal
        closable
        footer={null}
        getContainer={false}
        maskStyle={{ background: '#0f2' }}
        onCancel={close}
        open={visible}
        title={null}
        wrapClassName="login-modal"
      >
        <Content>
          <h1>Connect Wallet</h1>
          <Button
            onClick={() => {
              close();
              activate(injected).catch(console.error);
            }}
            shape="round"
            style={{ background: 'white' }}
            type="ghost"
          >
            <img src={require('@horse-racing/app-config/assets/metamask.svg')} />
            <span>MetaMask</span>
          </Button>
        </Content>
      </Modal>
      <Button onClick={open} type="primary">
        Connect
      </Button>
    </Wrapper>
  );
};

export default HeaderWallet;
