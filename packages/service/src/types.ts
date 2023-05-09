import { AssetType } from '@nft-market/contracts-core/types';

export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export interface Config {
  method?: MethodType;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
  credentials?: 'omit' | 'same-origin' | 'include';
  mode?: 'navigate' | 'same-origin' | 'no-cors' | 'cors';
}

// Api response
export type ServerResponse<T> = T;

export type ServerListResponse<T> = {
  list: T[];
  pagination: IPaginationMeta;
};

export interface IPaginationOptions {
  /**
   * the amount of items to be requested per page
   */
  pageSize?: number;
  /**
   * the page that is requested
   */
  current?: number;
}
export interface IPaginationMeta {
  /**
   * the amount of items on this specific page
   */
  itemCount: number;
  /**
   * the total amount of items
   */
  total: number;
  /**
   * the amount of items that were requested per page
   */
  pageSize: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number;
  /**
   * the current page this paginator "points" to
   */
  current: number;
}

export type Erc721Data = {
  address: string;
  owner: string;
  tokenId: string;
  orders: OrderData[];
};

export enum OrderStatus {
  OPEN,
  COMPLETE,
  CANCEL
}

export type OrderData = {
  id: string;
  salt: string;
  owner: string;
  sellAssetToken: string;
  sellAssetTokenId: string;
  sellAssetType: AssetType;
  buyAssetToken: string;
  buyAssetTokenId: string;
  buyAssetType: AssetType;
  selling: string;
  buying: string;
  price: string;
  sold: string;
  status: OrderStatus;
  sellerFee: string;
  signature: string;
  createTime: string;
  updateTime: string;
};



export type OpenSeaData = {
  address: string;
  floor_price: string;
  market_cap: string;
  num_owners: string;
  one_day_average_price: string;
  one_day_sales: string;
  one_day_volume: string;
  one_day_volume_change: string;
  seven_day_average_price: string;
  seven_day_sales: string;
  seven_day_volume: string;
  seven_day_volume_change: string;
  total_average_price: string;
  total_minted: string;
  total_sales: string;
  total_supply: string;
  total_volume: string;
};
export type CollectionStats = {
  historyPrice: string;
  listing: number;
  floorPrice: string;
};
export type CollectionData = {
  tokenId:string;
  address: string;
  banner: string;
  description: string;
  discord: string;
  id: number;
  logo: string;
  name: string;
  owner: string;
  slug: string;
  twitter: string;
  totalCount: string;
  totalTransfers: string;
  website: string;
  percent?:string;
  stats: CollectionStats;
  openseaStats: OpenSeaData;
};

export type NObject = {
  [key: string]: [];
};

export type Erc721ListData = {
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
  collection: CollectionData[];
};
export type Erc721DetailStats = {
  historyPrice: [];
  onShelf: boolean;
  price: string;
};
export type Erc721DetailData = {
  id: number;
  name: string;
  image: string;
  address: string;
  owner: string;
  tokenId: string;
  description: string;
  backgroundColor: string;
  attributes: [];
  rawMetadata: [];
  stats: Erc721DetailStats;
  openseaFloorPrice: string;
  tokenUri: string;
  timeLastUpdated: string;
};

export type Erc721ActivityTrans = {
  from: string;
  to: string;
  date: number;
  transaction: string;
  orders: OrderData[];
};

export type Erc721ActivitySale = {
  from: string;
  buyer: string;
  sellAmount: string;
  date: number;
  buyValue: string;
  transaction: string;
  orders: OrderData[];
};

export type Erc721ActivityListing = {
  owner: string;
  buyer: string;
  selling: string;
  date: number;
  orders: OrderData[];
};
