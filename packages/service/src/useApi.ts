import { useMemo } from 'react';

import { serviceUrls } from '@horse-racing/app-config/constants';
import { useWallet } from '@horse-racing/react-wallet';

import { Api } from '.';

export const useApi = (): Api | null => {
  const { chainId } = useWallet();

  const base = useMemo(() => (chainId ? serviceUrls[chainId] : serviceUrls[1]), [chainId]);

  const api = useMemo(() => {
    return base ? new Api(base, {}) : null;
  }, [base]);

  return api;
};
