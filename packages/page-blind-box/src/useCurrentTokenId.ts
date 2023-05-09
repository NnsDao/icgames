import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';

import { useApp } from '@horse-racing/react-components';

import { useBlindBox } from './useBlindBox';

export const useCurrentTokenId = (): BigNumber => {
  const [currentTokenId, setCurrentTokenId] = useState<BigNumber>(BigNumber.from('1'));
  const { blockNumber } = useApp();

  const blindBox = useBlindBox();

  useEffect(() => {
    if (blindBox) {
      blindBox.currentTokenId().then(setCurrentTokenId).catch(console.error);
    }
  }, [blockNumber, blindBox]);

  return currentTokenId;
};
