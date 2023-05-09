import { BigNumber } from '@ethersproject/bignumber';
import { hexlify, hexZeroPad } from '@ethersproject/bytes';

export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const EMPTY_ADDRESS = hexZeroPad(hexlify(0), 20).toString();
export const UINT256_MAX = BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1));

export const ETHER = BigNumber.from('1000000000000000000'); // 1 eth
export const BN_TEN = BigNumber.from('10');
type CHAIN_ID = number;
// 按合约的地址部署主要号
export const TESTNET_CHAIN_ID: CHAIN_ID = 5;
export const MAINNET_CHAIN_ID: CHAIN_ID = 1;
export const supportedChainIds: number[] = [TESTNET_CHAIN_ID, MAINNET_CHAIN_ID];

export const defaultSymbol = 'ETH';
export const defaultWrapperSymbol = 'WETH';

// 修改
export const tokens = {
  weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
};

// 修改
export const etherscan: Record<number, string> = {
  [TESTNET_CHAIN_ID]: 'https://goerli.etherscan.io/',
  [MAINNET_CHAIN_ID]: 'https://snowtrace.io/'
};

// 服务的地址
export const serviceUrls: Record<number, string> = {
  // [TESTNET_CHAIN_ID]: 'https://testnet-api.horsefi.games',
  // [TESTNET_CHAIN_ID]: 'http://localhost:4000',
  [TESTNET_CHAIN_ID]: 'https://api.difyswap.com',
  [MAINNET_CHAIN_ID]: 'https://api-eth.difyswap.com'
};
