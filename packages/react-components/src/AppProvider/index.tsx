import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useDebounce, useIsWindowVisible } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';

export interface AppState {
  blockNumber?: number;
}

const AppContext = createContext<AppState>({});

export const AppProvider: React.FC = ({ children }) => {
  const { chainId, library } = useWallet();
  const [blockNumber, setBlockNumber] = useState<number>();
  const windowVisible = useIsWindowVisible();

  const blockNumberCallback = useCallback((_blockNumber: number) => {
    setBlockNumber((oldBlockNumber) => Math.max(_blockNumber, oldBlockNumber || 0));
  }, []);

  useEffect(() => {
    if (!library || !chainId || !windowVisible) return;

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));

    library.on('block', blockNumberCallback);

    return () => {
      library.off('block', blockNumberCallback);
    };
  }, [blockNumberCallback, chainId, library, windowVisible]);

  return (
    <AppContext.Provider value={{ blockNumber: useDebounce(blockNumber, 100) }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppState => {
  return useContext(AppContext);
};
