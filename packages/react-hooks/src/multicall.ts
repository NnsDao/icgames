import type { JsonRpcProvider } from '@ethersproject/providers';

import { Contract, Provider } from '@nft-market/contracts-core/ethers-multicall';

export function multicall(
  provider: JsonRpcProvider,
  calls: { address: string; abi: any; methodName: string; params?: any[] }[]
): Promise<any> {
  const ethcallProvider = new Provider(provider);

  return ethcallProvider.all(
    calls.map(({ abi, address, methodName, params }) => {
      const contract = new Contract(address, abi);

      return contract[methodName](...(params ?? []));
    })
  );
}
