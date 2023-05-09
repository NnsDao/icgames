import type { TransactionReceipt } from '@ethersproject/abstract-provider';
import type { BigNumber } from '@ethersproject/bignumber';

import { BlindBox, Horse } from '@nft-market/contracts-core';
import { Button } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { notifyError } from '@horse-racing/react-components/notifyError';
import { notifyTx } from '@horse-racing/react-components/notifyTx';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721Data } from '@horse-racing/service/types';

interface Props {
  erc721: Erc721Data;
}

const OpenWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.26);

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    background: url('/images/open-bg.gif') no-repeat;

    > img {
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: #000;
    }
  }
`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function parseReceipt(
  horse: Horse,
  receipt: TransactionReceipt
): Promise<{ tokenId: BigNumber; type: number } | void> {
  const horseInterface = horse.contract.interface;

  if (receipt.status !== 1) {
    throw new Error('transaction error');
  }

  let tokenId: BigNumber;

  for (const log of receipt.logs) {
    try {
      const address = log.address;

      if (address === horse.address) {
        const { args, name } = horseInterface.parseLog(log);

        if (name === 'Transfer') {
          tokenId = args.tokenId;

          await sleep(3000);
          const type = await horse.types(tokenId);

          return { type, tokenId };
        }
      } else {
        continue;
      }
    } catch {}
  }
}

const OnShelf: React.FC<Props> = ({ erc721: { tokenId } }) => {
  const [loading, setLoading] = useState(false);
  const deployments = useDeployments();
  const { chainId, library } = useWallet();
  const [animate, setAnimate] = useState({ visible: false, type: 0, opacity: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const blindBox = useMemo(
    () => deployments && library && new BlindBox(deployments.BlindBox, library.getSigner()),
    [deployments, library]
  );
  const horse = useMemo(
    () => deployments && library && new Horse(deployments.Horse, library.getSigner()),
    [deployments, library]
  );
  const open = useCallback(() => {
    if (!horse) return;

    setLoading(true);

    blindBox
      ?.open(tokenId)
      .then((tx) => tx.wait())
      .then((tx) => {
        if (tx && chainId) {
          notifyTx(tx, chainId);
        }

        return tx;
      })
      .then(async (tx) => {
        await Promise.all([
          new Promise((resolve) => {
            const image = new Image();

            image.onload = resolve;
            image.onerror = resolve;
            image.src = '/images/open-bg.gif';
          }),
          new Promise((resolve) => {
            const image = new Image();

            image.onload = resolve;
            image.onerror = resolve;
            image.src = '/horses/type_1.png';
          }),
          new Promise((resolve) => {
            const image = new Image();

            image.onload = resolve;
            image.onerror = resolve;
            image.src = '/horses/type_2.png';
          }),
          new Promise((resolve) => {
            const image = new Image();

            image.onload = resolve;
            image.onerror = resolve;
            image.src = '/horses/type_3.png';
          }),
          new Promise((resolve) => {
            const image = new Image();

            image.onload = resolve;
            image.onerror = resolve;
            image.src = '/horses/type_4.png';
          })
        ]);

        return tx;
      })
      .then((tx) => {
        return parseReceipt(horse, tx);
      })
      .then((res) => {
        if (res) {
          setAnimate({
            visible: true,
            type: res.type,
            opacity: 0
          });
          setTimeout(() => {
            setAnimate({
              visible: true,
              type: res.type,
              opacity: 1
            });
          }, 1000);
        }
      })
      .catch(notifyError)
      .finally(() => {
        setLoading(false);
      });
  }, [blindBox, chainId, horse, tokenId]);

  return (
    <>
      <Button loading={loading} onClick={open} type="primary">
        Open
      </Button>
      {animate.visible && (
        <OpenWrapper onClick={() => setAnimate({ visible: false, opacity: 0, type: 0 })}>
          <div>
            <img
              className="animate__animated animate__heartBeat animate__delay-1s"
              ref={imageRef}
              src={`/horses/type_${animate.type}.png`}
              style={{ opacity: animate.opacity }}
            />
          </div>
        </OpenWrapper>
      )}
    </>
  );
};

export default React.memo(OnShelf);
