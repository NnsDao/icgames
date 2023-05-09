import { CallError, OutOfGasError } from '@nft-market/contracts-core/errors';
import { notification } from 'antd';

export function notifyError(error: any) {
  if (error instanceof CallError) {
    notification.error({ message: error.message, description: error.reason });
  } else if (error instanceof OutOfGasError) {
    notification.error({ message: error.message });
  } else {
    notification.error({ message: error?.message || 'Unknown error.' });
  }
}
