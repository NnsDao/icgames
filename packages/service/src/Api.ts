import type {
  CollectionData,
  Config,
  Erc721Data,
  Erc721DetailData,
  IPaginationOptions,
  NObject,
  OrderData,
  OrderStatus,
  ServerListResponse,
  ServerResponse
} from './types';

import { getPodcastActor } from '../actor';

import { SequenceOrderType } from '@nft-market/contracts-core/types';

import { combineConfig, combineURL, Request } from './request';

export class Api extends Request {
  constructor(baseURL: string, config: Config = {}) {
    super(
      combineURL(baseURL),
      combineConfig(config, {
        mode: 'cors'
      })
    );
  }
  // 没用
  getErc721List(params: { address: string }): Promise<ServerListResponse<Erc721Data>> {
    return this.get('/erc721/list', {
      params
    });
  }

  postOrder(body: { order: SequenceOrderType; signature: string }): Promise<ServerResponse<null>> {
    return this.post('/order', {
      body
    });
  }

  getOrders(
    params?: {
      sell_token?: string;
      sell_token_id?: string;
      owner?: string;
      status?: OrderStatus;
      sort_by?: string;
      order_by?: string;
    } & IPaginationOptions
  ): Promise<ServerListResponse<OrderData>> {
    return this.get('/orders', {
      params
    });
  }

  getAllcollections(params: { owner?: string }): Promise<ServerListResponse<CollectionData>> {
    return this.get('/collections', { params });
  }

  getCollections(params: { id: string }): Promise<ServerResponse<CollectionData>> {
    return this.get(`/collections/${params.id}`);
  }

  getCollectionsAttr(params: { id: string }): Promise<ServerResponse<NObject>> {
    return this.get(`/collections/${params.id}/attributes`);
  }

  getErc721(
    params: { address: string; owner?: string } & IPaginationOptions
  ): Promise<ServerListResponse<Erc721DetailData>> {
    return this.get('/erc721', {
      params
    });
  }

  // detail
  getDetail(params: { id: string }): Promise<ServerResponse<Erc721DetailData>> {
    return this.get(`/erc721/${params.id}`, {
      params
    });
  }

  // activity
  getActivityTrans(params: {
    tokenId: string;
    token: string;
  }): Promise<ServerListResponse<OrderData>> {
    return this.get('/activity/transfers/', {
      params
    });
  }

  getActivityList(params: {
    tokenId: string;
    token: string;
  }): Promise<ServerListResponse<OrderData>> {
    return this.get('/activity/listing/', {
      params
    });
  }

  getActivitySale(params: {
    tokenId: string;
    token: string;
  }): Promise<ServerListResponse<OrderData>> {
    return this.get('/activity/sale/', {
      params
    });
  }

  // /orders/:id/buyer_fee

  getOrderFee(params: {
    id: string;
  }): Promise<ServerResponse<{ buyerFee: string; signature: string }>> {
    return this.get(`/orders/${params.id}/buyer_fee`);
  }

  // get game list
  get_canister_status = async (cid: string, arg1) => {
    const actor = await getPodcastActor(cid, true);
    const res = await actor.get_canister_status(arg1);
    console.log('get_canister_status', res);
    if ('Ok' in res) {
      return res.Ok;
    }
    return Promise.reject([]);
  };
}
