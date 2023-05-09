import type { Interface } from '@ethersproject/abi';
import type { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';

import { callMethod } from '@nft-market/contracts-core/utils';
import { useCallback, useEffect, useState } from 'react';

import { abis } from '@horse-racing/app-config';
import { useApp } from '@horse-racing/react-components';
import { useWallet } from '@horse-racing/react-wallet';

import { useContract } from './useContract';

interface UseApprovalForAll {
  isApprovalForAll: boolean;
  getApproval: () => Promise<void>;
  setApprovalForAll: () => Promise<TransactionReceipt | undefined>;
}

export const useApprovalForAll = (
  address: string,
  operator: string,
  approved = true
): UseApprovalForAll => {
  const { account } = useWallet();
  const contract = useContract(address, abis.Approval as Interface);
  const [isApprovalForAll, setIsApprovalForAll] = useState(false);
  const { blockNumber } = useApp();

  const getApproval = useCallback(() => {
    if (contract) {
      return contract.isApprovedForAll(account, operator).then((value: boolean) => {
        setIsApprovalForAll(value);
      });
    }
  }, [account, contract, operator]);

  useEffect(() => {
    getApproval();
  }, [blockNumber, getApproval]);

  const setApprovalForAll = async () => {
    if (!contract) return;

    const transaction: TransactionResponse = await callMethod<TransactionResponse>(
      contract,
      'setApprovalForAll',
      [operator, approved]
    );

    const receipt = await transaction.wait();

    await getApproval();

    return receipt;
  };

  return {
    isApprovalForAll,
    getApproval,
    setApprovalForAll
  };
};
