import React from 'react';
import { ConfigProvider, Spin } from 'antd';

import './LoadingBox.scss';

interface LoadingBoxProps {
  className?: string;
  textLoading?: string;
  spinSize?: 'small' | 'default' | 'large';
  spinColor?: string;
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({
  className = '',
  textLoading = 'Loading...',
  spinSize = 'large',
  spinColor = '#1d1b1e'
}) => {
  return (
    <div className={`loading-box ${className}`}>
      <div className="loading-box-icon">
        <ConfigProvider
          theme={{
            components: {
              Spin: {
                colorPrimary: spinColor
              }
            }
          }}>
          <Spin size={spinSize} />
        </ConfigProvider>
      </div>
      <div className="loading-box-text">{textLoading}</div>
    </div>
  );
};
