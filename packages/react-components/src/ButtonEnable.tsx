import { Button, ButtonProps } from 'antd';
import React, { useCallback } from 'react';

import { useWallet } from '@horse-racing/react-wallet';
import { injected } from '@horse-racing/react-wallet/connectors';
import useAuth from '@horse-racing/react-wallet/useAuth';

const ButtonEnable: React.FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  const { login } = useAuth();
  const { active } = useWallet();

  const onClick = useCallback(() => {
    login(injected);
  }, [login]);

  return (
    <>
      {active ? (
        <Button {...props}>{children}</Button>
      ) : (
        <Button {...props} onClick={onClick}>
          {'Connect Wallet'}
        </Button>
      )}
    </>
  );
};

export default React.memo<typeof ButtonEnable>(ButtonEnable);
