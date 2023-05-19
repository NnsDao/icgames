import React from 'react';

import { createClient } from '@connect2ic/core';
import { AstroX, ICX, InternetIdentity, NFID } from '@connect2ic/core/providers';
import '@connect2ic/core/style.css';
import { Connect2ICProvider } from '@connect2ic/react';
import { AppProvider, ScrollProvider } from '@horse-racing/react-components';
import GlobalStyle from '@horse-racing/react-components/style';

import App from './App';

const Root: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ScrollProvider>
        <AppProvider>
          <Connect2ICProvider client={client}>
            <App />
          </Connect2ICProvider>
        </AppProvider>
      </ScrollProvider>
    </>
  );
};

console.log('agent', navigator.userAgent);
const client = createClient({
  // providers: defaultProviders,
  providers: [
    (window as any).icx
      ? new ICX({
          // providerUrl: "https://ccmhe-vqaaa-aaaai-acmoq-cai.raw.ic0.app/",
          // providerUrl: "http://localhost:8080/",
          delegationModes: ['global'],
          customDomain: 'http://localhost:3008'
        })
      : new AstroX({
          // providerUrl: "https://ccmhe-vqaaa-aaaai-acmoq-cai.raw.ic0.app/",
          // providerUrl: "https://63k2f-nyaaa-aaaah-aakla-cai.raw.ic0.app/",
          providerUrl: 'http://localhost:3000',
          delegationModes: ['global'],
          customDomain: 'http://localhost:3008'
        }),
    // new PlugWallet(),
    new InternetIdentity(),
    new NFID()
  ],
  globalProviderConfig: {
    // appId:'kokoko',
    // host: 'http://localhost:3001',
    // dev: import.meta.env.DEV,
    dev: true,
    // ledgerCanisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    // ledgerHost: "http://localhost:8000",
    // whitelist: ["ryjl3-tyaaa-aaaaa-aaaba-cai"],
    // delegationModes:['global'],
    whitelist: ['qhbym-qaaaa-aaaaa-aaafq-cai']
  }
});

export default Root;
