import { MAINNET_CHAIN_ID, TESTNET_CHAIN_ID } from './constants';

export const deployments = {
  [TESTNET_CHAIN_ID]: {
    TransferProxy: '0x0E5961eb731D44522d304d68B4EF82873d6ae8Ca',
    ERC20TransferProxy: '0xb9FC3E9b4DD9AD11bd3B49446b9399b0d17b0585',
    Exchange: '0x93EF716c517E36706CFb59Dbf161D1edd739ebB0'
  },
  [MAINNET_CHAIN_ID]: {
    TransferProxy: '0xC8101cc7298FfCc4C36cB2D27ced45ADe1D78E3B',
    ERC20TransferProxy: '0xa901c780BcC897cd1B15D78890C0fc31FE4dD5b2',
    Exchange: '0x0cF927e17A3172d231D138D7ca37d4B04EB83ac5'
  }
};
