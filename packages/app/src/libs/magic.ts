import { Magic } from 'magic-sdk';

// Initialize the Magic instance
//@ts-ignore
export const magic = new Magic('pk_live_C320FB37387740B2', {
  network: {
    rpcUrl: 'https://polygon-rpc.com/',
    chainId: 137
  }

  // {
  //   rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
  //   chainId: 11155111
  // }
});
