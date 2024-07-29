import React, { PropsWithChildren } from 'react';
import './CircleIcon.scss';

interface IProps extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {}

const CircleIcon = (props: IProps) => {
  const { children, className, ...divProps } = props;
  return (
    <div className={`circle-icon ${className || ''}`} {...divProps}>
      {children || ''}
    </div>
  );
};

export default CircleIcon;
