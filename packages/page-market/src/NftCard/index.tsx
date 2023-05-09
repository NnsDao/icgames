import { Card } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { getIpfsUrl } from '@horse-racing/react-hooks/utils';
import { Erc721DetailData } from '@horse-racing/service/types';

import Image from './Image';
import InfoRow from './InfoRow';

interface datas {
  id: number;
  name: string;
  price?: number;
  image: string;
  address: string;
  owner: string;
  tokenId: string;
  description: string;
  attributes: [];
  metadataFetched: boolean;
  metadataRetry: number;
  collection: [];
  orders: [];
}

interface Props {
  datas: Erc721DetailData;
}

const Header = styled(InfoRow)`
  min-height: 28px;
`;

const StyledCard = styled(Card)`
  padding-top: 100%;
`;

const NftCard: React.FC<Erc721DetailData> = (props: Props) => {
  const { id, image, name } = props.datas;

  return (
    <Card bordered={false} style={{ width: 480, paddingTop: 120 }}>
      <NavLink to={`/nft-marketplace/${id}`}>
        <Image alt={name} src={getIpfsUrl(image)} />
        <p>
          <Header>
            <h1>
              <NavLink to={'/'}>{name}</NavLink>
            </h1>
          </Header>
        </p>
      </NavLink>
    </Card>
  );
};

export default NftCard;
