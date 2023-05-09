import type { Pool } from '@nft-market/contracts-core';

import { useEffect, useState } from 'react';

import { useApp } from '@horse-racing/react-components';

import { useBlindBox } from './useBlindBox';

export const usePoolInfo = (pid: number | string): Pool | null => {
  const [poolInfo, setPoolInfo] = useState<Pool | null>(null);
  const { blockNumber } = useApp();

  const blindBox = useBlindBox();

  useEffect(() => {
    if (blindBox) {
      blindBox.poolInfo(pid).then(setPoolInfo).catch(console.error);
    } else {
      setPoolInfo(null);
    }
  }, [blockNumber, blindBox, pid]);

  return poolInfo;
};
