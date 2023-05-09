import React, { useMemo } from 'react';

import { Erc721DetailData, Erc721ListData, OrderStatus } from '@horse-racing/service/types';

import OffShelf from './OffShelf';
import OnShelf from './OnShelf';

interface Props {
  erc721: Erc721DetailData;
  transferProxy: string;
}

const Shelf: React.FC<Props> = ({ erc721, transferProxy }) => {

  const onShelfOrder = useMemo(() => {
    return erc721.stats?.onShelf;
  }, [erc721]);

  if (onShelfOrder) {
    return <OffShelf erc721={erc721} transferProxy={transferProxy} />;
  } else {
    return <OnShelf erc721={erc721} transferProxy={transferProxy} />;
  }
};

export default React.memo(Shelf);
