import '@connect2ic/core/style.css';
import { ConnectDialog, useClient, useConnect, useWallet } from '@connect2ic/react';
import { shortPrincipal } from '@horse-racing/app-config/utils';
import ConnectButton from './components/ConnectButton';
import DisconnectButton from './components/DisconnectButton';
import WalletDetail from './components/WalletDetail';

import { useUser } from './context/UserContext';

import { colorPrimary } from '@horse-racing/react-components/style';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { Dropdown, Menu, message } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { _SERVICE as exampleService } from '../candid/example';
// @ts-ignore
import { idlFactory as exampleIdl } from '../candid/example.idl.js';

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
    z-index:100000;
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
  display: flex;
  flex: 1;
  .dialog-styles {
    height: 900px;
    margint-top: 50%;
  }
`;

const ButtonLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 8px 10px;
  border-radius: 30px;
  border: 1px solid ${colorPrimary};
  cursor: pointer;

  > a img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
  > a span {
    color: #fff;
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

interface HeaderWalletProps {
  onFilterChange: (newFilter: string) => void;
}

const HeaderWallet: React.FC<HeaderWalletProps> = ({ onFilterChange }) => {
  // ic
  const { isConnected, activeProvider, principal } = useConnect();
  const client = useClient();
  const [wallet] = useWallet();
  const [balance, setBalance] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);
  const [accountID, setAccount] = useState('');
  // const [newActor, setNewActor] = useState<ActorSubclass<exampleService>>()

  // magic
  const { user } = useUser();
  console.log(user, 393920202020202);

  useEffect(() => {
    if (isConnected) {
      console.log('activeProvider', wallet?.principal);
      console.log('accountID', accountID);
    }
    console.log(user, 787878787878);
    if (user) {
      console.log(user, 90909);
    }
  }, [isConnected, user]);

  const createActor = async (values: { canisterId: string }) => {
    setLoading(true);
    // @ts-ignore
    const { value: actor } = await activeProvider.createActor<exampleService>(
      values.canisterId,
      exampleIdl
    );
    // setNewActor(actor)
    console.log('actor', actor);
    const result1 = await actor.created_apps();
    console.log('result1', result1);
    setLoading(false);
  };

  // ic end

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
  }, [isConnected]);

  const HeaderLink: React.FC<{ link: LinkType }> = ({ link: { children, open, title, to } }) => {
    const { disconnect } = useConnect();

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
          disconnect();
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
        trigger={['hover']}
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

  if (isConnected && principal) {
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
              <img src={require('@horse-racing/app-config/assets/dfinity.svg')} />
              <span>{shortPrincipal(principal)}</span>
            </a>
          </Address>
        </Dropdown>
      </Account>
    );
  }

  return (
    <Wrapper>
      {/* magic */}

      <ButtonLogin>
        {isConnected ? (
          ''
        ) : !user ? (
          <ConnectButton />
        ) : (
          <>
            <WalletDetail />
            <DisconnectButton />
          </>
        )}
      </ButtonLogin>
      <Content>
        <ConnectDialog />
      </Content>
    </Wrapper>
  );
};

export default HeaderWallet;
