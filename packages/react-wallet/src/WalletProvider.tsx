import type { JsonRpcProvider } from '@ethersproject/providers';
import type { Web3ReactContextInterface } from '@web3-react/core/dist/types';

import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import React from 'react';

import getLibrary from './getLibrary';

const WalletProvider: React.FC = ({ children }) => {
  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};

const useWallet = (): Web3ReactContextInterface<JsonRpcProvider> => {
  const wallet = useWeb3React();

  return wallet;
};

export { WalletProvider, useWallet };
