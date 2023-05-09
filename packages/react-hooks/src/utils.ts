export const getIpfsUrl = (ipfs: string): string => {
  if (!ipfs.startsWith('ipfs://')) {
    return ipfs;
  }

  // return ipfs.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/')
  return ipfs.replace('ipfs://ipfs/', 'http://api.gaganft.vip/v1/upload/view?hash=');
};

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || 'condition is null');
  }
}

export const serialize = (obj: Record<string, any>): string => {
  if (!obj) {
    return '';
  }

  const keyArr: string[] = [];

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      keyArr.push(key);
    }
  });

  keyArr.sort((l, r) => (l > r ? 1 : -1));

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return keyArr.map((key) => key + '=' + obj[key]).join('&');
};
