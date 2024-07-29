import { Badge, BadgeProps } from 'antd';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, BadgeProps {
  className?: string;
}

const BadgeComponent = (props: Props) => {
  const { children, ...badgeProps } = props;
  return <Badge {...badgeProps}>{children && children}</Badge>;
};

export default BadgeComponent;
