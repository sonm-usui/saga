import React from 'react';
import { Tag } from 'antd';
import { STATUS } from '../config';
import { capitalize } from 'lodash';

export const useStatusTag = (status: string) => {
  switch (status) {
    case STATUS.PENDING:
      return <Tag color="processing">{capitalize(status)}</Tag>;

    case STATUS.PENDING_REVIEW:
      return <Tag color="warning">{capitalize(status).replace('_', ' ')}</Tag>;

    case STATUS.REJECTED:
      return <Tag color="error">{capitalize(status)}</Tag>;

    default:
      return <Tag color="success">{capitalize(status)}</Tag>;
  }
};
