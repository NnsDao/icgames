import Countdown from 'antd/lib/statistic/Countdown';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonEnable, FormatBalance, useApp } from '@horse-racing/react-components';
import { notifyError } from '@horse-racing/react-components/notifyError';
import { notifyTx } from '@horse-racing/react-components/notifyTx';
import { colorPrimary } from '@horse-racing/react-components/style';
import media, {
  marginMedia,
  paddingMedia,
  widthMedia
} from '@horse-racing/react-components/style/media';
import { useBalance } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';

import InputAmount from './InputAmount';
import { useBlindBox } from './useBlindBox';
import { useCurrentTokenId } from './useCurrentTokenId';
import { usePoolInfo } from './usePoolInfo';

const Wrapper = styled.div`
  ${paddingMedia(2, 2)};

  background: url('/images/blind-box-bg.png') no-repeat;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  ${widthMedia()};
  margin: 0 auto;

  ${media('lg')} {
    display: block;
  }

  > img {
    width: 40%;

    ${media('lg')} {
      width: 66%;
      ${marginMedia(0, 0.5)};
    }
  }
`;

const Info = styled.div`
  width: 50%;

  ${media('lg')} {
    width: 100%;
  }

  > h3 {
    color: ${colorPrimary};
  }

  > div {
    ${marginMedia(0, 1)};
    ${paddingMedia(0.75, 0.75, 0.75, 0.75)};
    background: #1b0f05;
    border-radius: 10px;
    border: 1px solid #4d3608;

    > .ant-btn {
      ${marginMedia(1)}
      width: 220px;
    }
  }
`;

const names: Record<string, string> = {
  0: 'Genesis Ⅰ',
  1: 'Genesis ⅠⅠ',
  2: 'Genesis ⅠⅠⅠ'
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  ${marginMedia(0, 0.5)};

  font-size: 16px;

  :nth-last-child(1) {
    margin-bottom: 0;
  }

  > label {
    ${marginMedia(0, 0, 0, 0.5)};
    color: ${colorPrimary};
    font-size: 18px;
    font-weight: 600;
  }
`;

const Item: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <ItemWrapper>
      <label>{title}</label>
      <div>{children}</div>
    </ItemWrapper>
  );
};

const Detail: React.FC = () => {
  const {
    params: { pid }
  } = useRouteMatch<{ pid: string }>();

  const [amount, setAmount] = useState<string>('1');
  const [now, setNow] = useState(Date.now());
  const [buyed, setBuyed] = useState(0);
  const [loading, setLoading] = useState(false);
  const { blockNumber } = useApp();
  const { account, chainId } = useWallet();
  const poolInfo = usePoolInfo(pid);
  const currentTokenId = useCurrentTokenId();
  const blindBox = useBlindBox();
  const balance = useBalance(account);

  useEffect(() => {
    if (blindBox && account) {
      blindBox
        .getUserBuyed(pid, account)
        .then((data) => setBuyed(data.toNumber()))
        .catch(console.error);
    }
  }, [blockNumber, account, blindBox, pid]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const started = useMemo(() => {
    if (!poolInfo) return false;

    return now >= poolInfo.startTime.toNumber() * 1000;
  }, [now, poolInfo]);

  const [solded, total, soldout] = useMemo(() => {
    if (!poolInfo) return [0, 0, 0];

    switch (pid) {
      case '0':
        return [
          Math.max(0, Math.min(500, currentTokenId.toNumber() - 2500 - 1)),
          poolInfo.solds.toNumber() - 2500,
          currentTokenId.toNumber() > 3000
        ];

      case '1':
        return [
          Math.max(0, Math.min(1000, currentTokenId.toNumber() - 2000 - 1)),
          poolInfo.solds.toNumber() - 2000,
          currentTokenId.toNumber() > 3000
        ];

      case '2':
        // return [
        //   Math.max(0, Math.min(1000, currentTokenId.toNumber() - 3000 - 1)),
        //   poolInfo.solds.toNumber() - 3000,
        //   currentTokenId.toNumber() > 4000
        // ];

        return [1000, 1000, true];

      default:
        return [0, 0, 0];
    }
  }, [currentTokenId, pid, poolInfo]);

  const buy = useCallback(() => {
    if (blindBox) {
      setLoading(true);
      blindBox
        .buy(pid, amount)
        .then((tx) => tx.wait())
        .then((tx) => {
          notifyTx(tx, chainId as number);
        })
        .catch(notifyError)
        .finally(() => setLoading(false));
    }
  }, [amount, blindBox, chainId, pid]);

  return (
    <Wrapper>
      <Content>
        <img src="/images/blind-box.png" />
        <Info>
          <h3>{names[pid]}</h3>
          <div>
            <Item title="Price: ">
              <FormatBalance balance={poolInfo?.price} showSymbol />
            </Item>
            <Item title="Quantity: " />
            <InputAmount onChange={setAmount} value={amount} />
            {soldout ? (
              <ButtonEnable disabled>Sold out</ButtonEnable>
            ) : started ? (
              <ButtonEnable loading={loading} onClick={buy} type="primary">
                Buy
              </ButtonEnable>
            ) : (
              <ButtonEnable disabled>
                <Countdown format="HH:mm:ss" value={(poolInfo?.startTime.toNumber() ?? 0) * 1000} />
              </ButtonEnable>
            )}
            <p>
              Your balance: <FormatBalance balance={balance} showSymbol />
            </p>
          </div>
          <div>
            <Item title="Starting time: ">
              {moment((poolInfo?.startTime.toNumber() ?? 0) * 1000).format('YYYY/MM/DD HH:mm')}
              &nbsp;-&nbsp;
              {moment((poolInfo?.endTime.toNumber() ?? 0) * 1000).format('YYYY/MM/DD HH:mm')}
            </Item>
            <Item title="Limited purchase quantity: ">{buyed} / 5</Item>
            <Item title="The total amount: ">
              {solded} / {total}
            </Item>
          </div>
          <h6>Describe:</h6>
          <div>
            <h6>Probability of the following horses in this blind box:</h6>
            <Item title="Legendary Horse: ">2%</Item>
            <Item title="Epic Horse: ">10%</Item>
            <Item title="Rare Horse: ">25%</Item>
            <Item title="Normal Horse: ">63%</Item>
          </div>
        </Info>
      </Content>
    </Wrapper>
  );
};

export default Detail;
