import React from 'react';
import './InformationTag.scss';

interface InformationTagProps {
  className?: string;
  children: React.ReactNode;
  type?: 'filled' | 'outlined';
  onClick?: () => void;
}

export const InformationTag: React.FC<InformationTagProps> = ({
  className = '',
  children,
  type = '',
  onClick
}) => {
  return (
    <div className={`information-tag ${className} ${type}`} onClick={onClick}>
      {children}
    </div>
  );
};
