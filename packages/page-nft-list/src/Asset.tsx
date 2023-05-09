import React, { useMemo } from 'react';
import styled from 'styled-components';

import { formatImage } from '@horse-racing/app-config/utils';
import { FormatBalance } from '@horse-racing/react-components';
import { colorPrimary } from '@horse-racing/react-components/style';
import { marginMedia, paddingMedia } from '@horse-racing/react-components/style/media';
import { useDeployments } from '@horse-racing/react-hooks';
import { useWallet } from '@horse-racing/react-wallet';
import { Erc721Data, Erc721DetailData, OrderStatus } from '@horse-racing/service/types';

import Open from './Open'; // blindbox
import Shelf from './Shelf'; // list delist
import Transfer from './Transfer';



const CellStyle = styled.div`
  position: relative;
  margin: 0 auto;
  box-shadow: 0px 5px 21px 0px #a2959d;
  border-radius: 10px;
  > .top {
    ${paddingMedia(0.3, 0.3, 0.35, 0.35)};
    color: #272270;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      color: #ff07ff;
    }
  }
  > img {
    width: 100%;
  }

  > .bottom {
    ${paddingMedia(0.4, 0.4, 0.4, 0.4)};
    text-align: center;
    margin: 0 auto;
    > .price {
      margin-bottom: 10px;
      color: #272270;
      font-weight: bold;

      img {
        width: 16px;
        margin-right: 8px;
      }
    }
  }
  .btn {
    ${marginMedia(0, 0, 0.5, 0.5)}
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
`;

interface Props {
  erc721: Erc721DetailData;
}

const Asset: React.FC<Props> = ({ erc721 }) => {
  const { account } = useWallet();
  const deployments = useDeployments();

  // const onShelfOrder = useMemo(() => {
  //   const orders = erc721.orders?.filter((order) => order.status === OrderStatus.OPEN);
  //   return orders.length > 0 ? orders[0] : null;
  // }, [erc721]);
  const onShelfOrder = useMemo(() => {
    return erc721.stats?.onShelf;
  }, [erc721]);

  return (
    <CellStyle>
      <div className="top">
        <span className="token-id">#{erc721.tokenId?.substring(0,5)}</span>
      </div>
      <img src={formatImage(erc721.image)} />
      <div className="bottom">
        <div className="price">{onShelfOrder ? 'Listed' : 'Not Listed'}</div>
        <div className="btn">
          {account === erc721.owner && (
            <>
              {deployments && <Shelf erc721={erc721} transferProxy={deployments.TransferProxy} />}
              {/* {deployments && erc721.address === deployments.BlindBox && <Open erc721={erc721} />} */}
              <Transfer erc721={erc721} />
            </>
          )}
        </div>
      </div>
    </CellStyle>
  );
};

export default React.memo(Asset);
