import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

import { etherscan, MAINNET_CHAIN_ID } from '@horse-racing/app-config/constants';

export const setupNetwork = async () => {
  const provider = window.ethereum;

  if (provider) {
    const chainId = MAINNET_CHAIN_ID;

    try {
      await provider.request?.({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: [etherscan[MAINNET_CHAIN_ID]]
          }
        ]
      });

      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);

      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");

    return false;
  }
};

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connector: AbstractConnector) => {
      activate(connector, undefined, true).catch(async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();

          if (hasSetup) {
            activate(connector);
          }
        }
      });
    },
    [activate]
  );

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
