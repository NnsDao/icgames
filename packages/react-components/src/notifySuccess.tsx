import { notification } from 'antd';

export function notifySuccess(message?: string) {
  notification.success({ message: message || 'Success!' });
}
