import type { TransactionReceipt } from '@ethersproject/abstract-provider';

import { notification } from 'antd';
import React from 'react';

import { etherscan } from '@horse-racing/app-config/constants';

export function notifyTx(tx: TransactionReceipt, chainId: number) {
  if (tx.status === 1) {
    notification.success({
      message: (
        <>
          Transaction success, view on scan{' '}
          <a
            href={etherscan[chainId] + '/tx/' + tx.transactionHash}
            rel="noopener noreferrer"
            target="_blank"
          >
            {tx.transactionHash}
          </a>
        </>
      )
    });
  } else {
    notification.error({
      message: (
        <>
          Transaction failed, view on scan{' '}
          <a
            href={etherscan[chainId] + '/tx/' + tx.transactionHash}
            rel="noopener noreferrer"
            target="_blank"
          >
            {tx.transactionHash}
          </a>
        </>
      )
    });
  }
}
