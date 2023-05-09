import type { Interface } from '@ethersproject/abi';

import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { useWallet } from '@horse-racing/react-wallet';
import { getContract } from '@horse-racing/react-wallet/utils';

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: Interface,
  withSignerIfPossible = true
): T | null {
  const { account, chainId, library } = useWallet();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !chainId || !library) return null;
    let address: string | undefined;

    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;

    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);

      return null;
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T;
}
