import type { Interface } from '@ethersproject/abi';
import type { TransactionResponse } from '@ethersproject/providers';

import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { abis } from '@horse-racing/app-config';
import { UINT256_MAX } from '@horse-racing/app-config/constants';
import { useApp } from '@horse-racing/react-components';
import { useWallet } from '@horse-racing/react-wallet';

import { useContract } from './useContract';

interface UseApprove {
  allowance: BigNumber;
  isApproved: boolean;
  approve: () => Promise<TransactionResponse | undefined>;
}

export const useApprove = (
  address: string,
  spender: string,
  amount = UINT256_MAX.div(BigNumber.from(2))
): UseApprove => {
  const { account } = useWallet();
  const contract = useContract(address, abis.ERC20 as Interface);
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from('0'));
  const { blockNumber } = useApp();

  const isApproved = useMemo(() => allowance.gte(amount), [allowance, amount]);

  useEffect(() => {
    if (!contract) return;

    contract.allowance(account, spender).then((_allowance: BigNumber) => {
      setAllowance(_allowance);
    });
  }, [account, blockNumber, contract, spender]);

  const approve = useCallback(async () => {
    if (!contract) return;

    const transaction: TransactionResponse = await contract.approve(spender, UINT256_MAX);

    await transaction.wait();

    return transaction;
  }, [contract, spender]);

  return {
    allowance,
    isApproved,
    approve
  };
};
