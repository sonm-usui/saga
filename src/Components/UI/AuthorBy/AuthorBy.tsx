import React, { useEffect, useState } from 'react';
import './AuthorBy.scss';
import { Link } from 'react-router-dom';
import { getOrganizationDetail } from '../../../store/Organizations/actions';
import { IOrganizationItem } from '../../../types/Organizations.type';
import { replace } from 'lodash';
import { appPaths } from '../../../constants';

interface AuthorByProps {
  className?: string;
  size?: 'default' | 'medium';
  organizationKey?: string;
}

export const AuthorBy: React.FC<AuthorByProps> = ({
  className = '',
  size = 'default',
  organizationKey
}) => {
  const [organizationDetail, setOrganizationDetail] = useState<IOrganizationItem>();

  const fetchOrganizationDetail = async () => {
    if (!organizationKey) return;
    const data = await getOrganizationDetail({ key: organizationKey });
    setOrganizationDetail(data);
  };

  useEffect(() => {
    fetchOrganizationDetail();
  }, [organizationKey]);

  return (
    <div className={`author-by ${size} ${className}`}>
      <div className="author-by-title">By: </div>
      <div className="author-by-content">
        <Link
          to={`${replace(appPaths.organizationDetails.path, ':id', organizationDetail?.key || '')}`}
          className="link">
          {organizationDetail?.organization_name}
        </Link>
      </div>
    </div>
  );
};
