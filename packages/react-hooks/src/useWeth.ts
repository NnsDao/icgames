import type { TransactionResponse } from '@ethersproject/providers';

import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';

import { tokens } from '@horse-racing/app-config/constants';
import { useWallet } from '@horse-racing/react-wallet';

import { assert } from './utils';

const abi = [
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  }
];

export const useWethDepositCallback = (): {
  deposit: (amount: BigNumber) => Promise<TransactionResponse>;
} => {
  const { active, library } = useWallet();

  // amount unit is wei
  const deposit = async (amount: BigNumber) => {
    assert(active);
    assert(library);

    const contract = new Contract(tokens.weth, abi, library.getSigner());

    const transaction: TransactionResponse = await contract.deposit({
      value: amount
    });

    return transaction;
  };

  return { deposit };
};

// amount unit is eth
export const useWethWithdrawCallback = (): {
  withdraw: (amount: BigNumber) => Promise<TransactionResponse>;
} => {
  const { active, library } = useWallet();

  // amount unit is wei
  const withdraw = async (amount: BigNumber) => {
    assert(active);
    assert(library);

    const contract = new Contract(tokens.weth, abi, library.getSigner());

    const transaction: TransactionResponse = await contract.withdraw(amount);

    return transaction;
  };

  return { withdraw };
};
