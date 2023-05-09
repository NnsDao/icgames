import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';

const OrderMore: React.FC = () => {
  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key="0">Share</Menu.Item>
        <Menu.Item key="1">Report</Menu.Item>
      </Menu>
    );
  }, []);

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <a onClick={(e) => e.preventDefault()} style={{ color: '#333' }}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

export default React.memo(OrderMore);
