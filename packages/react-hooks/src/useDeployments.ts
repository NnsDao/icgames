import { useMemo } from 'react';

import { deployments } from '@horse-racing/app-config';
import { useWallet } from '@horse-racing/react-wallet';

export const useDeployments = () => {
  const { chainId } = useWallet();

  return useMemo(() => {
    if (chainId) {
      return deployments[chainId] ?? null;
    }

    return null;
  }, [chainId]);
};
