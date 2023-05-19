import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Dropdown, Menu, message } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useHeaderContext } from '@horse-racing/react-components';
import media, { marginMedia, widthMedia } from '@horse-racing/react-components/style/media';

import HeaderWallet from './HeaderWallet';

const Wrapper = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  background: ${(props) => props.color};
  backdrop-filter: ${(props) => props.backdropFilter};
  z-index: 999;
`;

const Content = styled.div`
  ${widthMedia()}
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .mb-menu {
    display: none;
    ${media('lg')} {
      ${marginMedia(0, 0, 0, 1.5)}
      display: flex;
      align-items: center;
      > span {
        ${marginMedia(0, 0, 0.5, 0)}
      }
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  ${media('lg')} {
    display: none;
  }

  > a {
    ${marginMedia(0, 0, 0, 1.4)};
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: normal;
    &:hover {
      font-weight: bold;
      background: #fff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const LogoWrapper = styled.div`
  color: ${(props) => props.color};
  width: 146px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  img {
    width: 140px;
    height: auto;
  }
  .logo-name {
    font-weight: bold;
    line-height: 65px;
    font-size: 30px;
    margin-left: 15px;
  }
  ${media('sm')} {
    width: 45px;
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: 70% !important;
  }

  .ant-menu {
    background-color: transparent;
  }
  .ant-menu-title-content {
    color: #fff;
  }

  .ant-drawer-content {
    background-color: #000;
  }
  .ant-drawer-header {
    border-bottom-color: #464646;
  }
  .ant-drawer-body {
    padding: 0;
  }
`;

type LinkType = {
  title: string;
  to: string;
  open: boolean;
  children?: LinkType[];
};

interface ContainerProps {
  backdropFilter: string;
}

const HeaderLink: React.FC<{ link: LinkType }> = ({ link: { children, open, title, to } }) => {
  const _onClick = useCallback(
    (e: React.MouseEvent) => {
      if (!open) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        message.info({ icon: ' ', content: 'Coming Soon' });

        return;
      }

      if (to.startsWith('http')) {
        e.preventDefault();

        window.location.href = to;
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
        {title} <DownOutlined />
      </a>
    </Dropdown>
  ) : (
    <Link onClick={_onClick} style={{ cursor: !open ? 'not-allowed' : undefined }} to={to}>
      {title}
    </Link>
  );
};

const HeaderMbLink: React.FC<{ link: LinkType; onClose: () => void }> = ({
  link: { children, open, title, to },
  onClose,
  ...props
}) => {
  const { push } = useHistory();

  const _onClick = useCallback(() => {
    if (!open) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      message.info({ icon: ' ', content: 'Coming Soon' });
      onClose();

      return;
    }

    onClose();

    if (to.startsWith('http')) {
      window.location.href = to;
    } else {
      push(to);
    }
  }, [onClose, open, push, to]);

  return children ? (
    <Menu.SubMenu {...props} title={title}>
      {children.map((link, index) => (
        <HeaderMbLink
          key={String(index) + link.to + link.title + '-sub'}
          link={link}
          onClose={onClose}
        />
      ))}
    </Menu.SubMenu>
  ) : (
    <Menu.Item {...props} onClick={_onClick} style={{ color: '#000' }}>
      {title}
    </Menu.Item>
  );
};

const Header: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { backdropFilter, setBackdropFilter } = useHeaderContext();
  // const [backdropFilter, setBackdropFilter] = useState("blur(10px)");

  // const { backdropFilter } = useHeaderContext();
  // const backdropFilter = sessionStorage.getItem('backdropFilter')

  // artwork reverse
  useMemo(() => {
    return pathname.indexOf('artworks') === -1 ? setReverse(false) : setReverse(true);
  }, [pathname]);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const links = useMemo((): LinkType[] => {
    return [
      {
        title: 'Ranking',
        to: '/rank',
        open: true
      },
      {
        title: 'Explore',
        to: '/explore',
        open: true
      },
      {
        title: 'Builder',
        to: '/create',
        open: true
      }
      // {
      //   title: 'Launchpad',
      //   to: '/',
      //   open: false
      // }
    ];
  }, []);

  const handleClick = (val: string) => {
    console.log(val, 2929296666);

    setBackdropFilter(val);
  };

  return (
    <Wrapper backdropFilter={backdropFilter} color={reverse ? '#fff' : 'transparent'}>
      <Content>
        <Link to="/">
          <LogoWrapper>
            <img src="/images/icgame-logo.svg" />
            {/* <p className="logo-name"></p> */}
          </LogoWrapper>
        </Link>
        <Nav>
          {links.map((link, index) => (
            <HeaderLink key={index} link={link} />
          ))}
          <HeaderWallet onFilterChange={handleClick} />
        </Nav>
        <div className="mb-menu">
          <HeaderWallet onFilterChange={handleClick} />
          <span onClick={open}>
            <MenuOutlined />
          </span>
        </div>
      </Content>
      <StyledDrawer
        closable
        headerStyle={{ backgroundColor: '#131313' }}
        onClose={() => setVisible(false)}
        placement="right"
        title={<div />}
        visible={visible}
      >
        <Menu
          defaultOpenKeys={Array.from({ length: links.length }).map((_, index) => String(index))}
          mode="inline"
          theme="dark"
        >
          {links.map((link, index) => (
            <HeaderMbLink key={index} link={link} onClose={close} />
          ))}
        </Menu>
      </StyledDrawer>
    </Wrapper>
  );
};

export default Header;
