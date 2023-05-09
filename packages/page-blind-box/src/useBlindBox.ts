import { BlindBox } from '@nft-market/contracts-core';
import { useMemo } from 'react';

import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';

export const useBlindBox = (): BlindBox | null => {
  const deployments = useDeployments();
  const { library } = useWallet();

  return useMemo(() => {
    if (deployments?.BlindBox && library) {
      return new BlindBox(deployments.BlindBox, library.getSigner());
    }

    return null;
  }, [deployments?.BlindBox, library]);
};
