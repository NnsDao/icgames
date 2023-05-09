import { BigNumber } from '@ethersproject/bignumber';
import { ERC20 } from '@nft-market/contracts-core';
import { useEffect, useState } from 'react';

import { useApp } from '@horse-racing/react-components';
import { useWallet } from '@horse-racing/react-wallet';

export const useBalance = (account?: string | null): BigNumber => {
  const { library } = useWallet();
  const [balance, setBalance] = useState(BigNumber.from('0'));
  const { blockNumber } = useApp();

  useEffect(() => {
    if (account) {
      library
        ?.getBalance(account)
        .then((_balance) => setBalance(_balance))
        .catch(console.error);
    }
  }, [blockNumber, account, library]);

  return balance;
};

export const useErc20Balance = (address?: string | null, account?: string | null): BigNumber => {
  const { library } = useWallet();
  const [balance, setBalance] = useState(BigNumber.from('0'));
  const { blockNumber } = useApp();

  useEffect(() => {
    if (address && account && library) {
      const erc20 = new ERC20(address, library.getSigner());

      erc20
        .balanceOf(account)
        .then((value) => setBalance(value))
        .catch(console.error);
    }
  }, [blockNumber, account, address, library]);

  return balance;
};
