import { useEffect } from 'react';

import { injected } from './connectors';
import useAuth from './useAuth';

export function useEagerConnect() {
  const { login } = useAuth();

  useEffect(() => {
    if (window.ethereum) {
      login(injected);
    }
  }, [login]);
}
