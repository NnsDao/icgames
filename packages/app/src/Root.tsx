import React from 'react';

import { AppProvider, ScrollProvider } from '@horse-racing/react-components';
import GlobalStyle from '@horse-racing/react-components/style';
import { WalletProvider } from '@horse-racing/react-wallet';

import App from './App';

const Root: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ScrollProvider>
        <WalletProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </WalletProvider>
      </ScrollProvider>
    </>
  );
};

export default Root;
