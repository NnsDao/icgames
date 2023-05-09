import { InjectedConnector } from '@web3-react/injected-connector';

import { supportedChainIds } from '@horse-racing/app-config/constants'; // support chains

export const injected = new InjectedConnector({
  supportedChainIds
});
