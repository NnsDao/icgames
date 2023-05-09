import { Web3Provider } from '@ethersproject/providers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any');

  library.pollingInterval = 3000;

  return library;
}
