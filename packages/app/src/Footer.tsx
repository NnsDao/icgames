import { Divider, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { mediaLinks } from '@horse-racing/app-config/links';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';

const Wrapper = styled.div`
  ${marginMedia(2)}
  background-color: #000;
`;

const Content = styled.div`
  ${paddingMedia(1, 1)}
  .divider {
    border-top: 1px solid #222628;
  }
`;

const Subscribe = styled.div`
  margin: 0 auto;
  ${widthMedia()}
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media('lg')} {
    display: block;
  }
  .label {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    ${media('lg')} {
      font-size: 18px;
      text-align: center;
      margin: 0 auto;
      display: block;
    }
  }
  .ant-input-group-wrapper {
    width: 40%;

    ${media('lg')} {
      ${paddingMedia(1, 0, 0.5, 0.5)}
      width:100%;
      display: block;
      margin: 0 auto;
    }
  }
  .ant-input-group-addon {
    border: 1px solid #fff;
    border-radius: 0px 4px 4px 0px;
    background-color: transparent;
    img {
      display: block;
      width: 30px;
    }
    &:hover {
      cursor: pointer;
      background-color: #fff;
      img {
        filter: brightness(0);
      }
    }
  }
  .ant-input {
    height: 50px;
    font-size: 20px;
    ${paddingMedia(0, 0, 0.5, 0.5)}
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 4px 0 0 4px;
    color: #fff;
    border-right: 0;
    ::placeholder {
      color: #5f5f5f;
      font-size: 14px;
    }
  }
`;

const InfoWrapper = styled.div`
  margin: 0 auto;
  ${widthMedia()}
  display: flex;
  justify-content: space-between;
  ${marginMedia(1.5)}
  color:#fff;
  font-size: 16px;
  ${media('lg')} {
    ${marginMedia(0, 0, 0.5, 0.5)}
    font-size: 12px;
    display: block;
  }
  .logo {
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 65px;
      height: auto;
      display: block;
    }
    .logo-name {
      font-weight: bold;
      line-height: 65px;
      font-size: 24px;
      margin-left: 15px;
    }
  }
  .intro {
    ${marginMedia(1)}
  }
  .copyright {
    ${marginMedia(1.6)}
    color:#5f5f5f;
    font-size: 16px;
    ${media('lg')} {
      margin-top: 100px;
    }
  }
`;

const Links = styled.div`
  ${media('lg')} {
    margin-top: -110px;
  }
  .icon {
    display: inline-block;
    width: 44px;
    height: 44px;
    background: #222628;
    border-radius: 22px;
    ${marginMedia(0, 0, 0.2, 0.2)}
    text-align:center;
    line-height: 44px;
    &:nth-last-of-type(1) {
      margin-right: 0;
    }
    &:hover {
      background: #fff;
      img {
        filter: brightness(0);
      }
    }
    ${media('lg')} {
      ${marginMedia(0, 0, 0, 0.5)}
    }
    img {
      width: 32px;
    }
  }
  .icon:nth-of-type(2),
  .icon:nth-of-type(3) {
    img {
      width: auto;
    }
  }

  .link {
    text-align: right;
    ${media('lg')} {
      text-align: left;
    }
    a {
      display: inline-block;
      color: #fff;
      font-size: 16px;
      ${marginMedia(0.8, 0.8, 0.4, 0.4)}
      &:nth-last-of-type(1) {
        margin-right: 4px;
      }
      &:hover {
        opacity: 0.6;
      }
      ${media('lg')} {
        ${marginMedia(0, 0, 0, 2)}
      }
    }
  }
`;

const Footer: React.FC = () => {
  const [enter, setEnter] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const menuLink = [
    {
      to: '/explore',
      title: 'Explore',
      open: true
    },
    {
      to: '/rank',
      title: 'Ranking',
      open: true
    }
  ];

  const _onClick = (e: React.MouseEvent, to: string, open: boolean) => {
    if (!open) {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      message.info({ icon: ' ', content: 'Coming Soon' });

      return;
    }

    if (to.startsWith('http')) {
      e.preventDefault();
      window.open(to);
    }
  };

  const submit = () => {
    setValue('');
    message.info({ icon: ' ', content: 'Submit Success !' });
  };

  return (
    <Wrapper>
      <Content>
        <Subscribe>
          <span className="label">{enter ? 'SUBSCRIBE' : 'SUBSCRIBE'}</span>
          <Input
            addonAfter={<img onClick={submit} src="/images/arrow.svg" />}
            onBlur={() => {
              setEnter(false);
            }}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => {
              setEnter(true);
            }}
            placeholder="Your email address"
            value={value}
          />
        </Subscribe>
        <Divider className="divider" />
        <InfoWrapper>
          <div className="info">
            <div className="logo">
              <img src="/images/icgames-logo.svg" />
            </div>
            <div className="intro">Discover Your favorite web3 Game on ICgames.</div>
            <div className="copyright">© 2021 - 2023 ICgames</div>
          </div>
          <Links>
            {mediaLinks.map(({ icon, open, to }, index) => (
              <a
                className="icon"
                href={to}
                key={index}
                onClick={(e) => _onClick(e, to, open)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={icon} />
              </a>
            ))}
            <div className="link">
              {menuLink.map(({ open, title, to }, index) => (
                <Link
                  key={index}
                  onClick={(e) => _onClick(e, to, open)}
                  style={{ cursor: !open ? 'not-allowed' : undefined }}
                  to={to}
                >
                  {title}
                </Link>
              ))}
            </div>
          </Links>
        </InfoWrapper>
      </Content>
    </Wrapper>
  );
};

export default Footer;