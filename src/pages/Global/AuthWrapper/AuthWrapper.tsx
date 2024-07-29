import React from 'react';
import './AuthWrapper.scss';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';

import { Typography } from 'antd';
import { includes } from 'lodash';
const { Text } = Typography;

interface AuthWrapperProps {
  children: React.ReactNode;
  role: string[];
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ role, children }) => {
  const user = useAppSelector(selectorGetUser);

  return (
    <>
      {!user?.role && (
        <div className="container">
          <Text type="danger">Please connect wallet.</Text>
        </div>
      )}
      {user?.loaded && !includes(role, user?.role) && (
        <div className="container">
          <Text type="danger">You are not authorized to access this page</Text>
        </div>
      )}
      {user?.loaded && includes(role, user?.role) && children}
    </>
  );
};
