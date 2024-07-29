import React, { useEffect } from 'react';
import './EditOrganization.scss';

import { isEmpty } from 'lodash';
import { organisationService } from '../../../services';
import { useSelector } from 'react-redux';
import { selectorAdminGetOrganisationDetail } from '../../../store/Organizations/selectors';
import { useParams } from 'react-router-dom';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { useAppSelector } from '../../../store';
import { EditOrganizationPublic } from './Sections/EditOrganizationPublic/EditOrganizationPublic';
import { EditOrganizationPrivate } from './Sections/EditOrganizationPrivate/EditOrganizationPrivate';
import { MarketPlaces } from '../../../Components/UI/Button/enums';
import { EditOrganizationNrcSudan } from './Sections/EditOrganizationNrcSudan/EditOrganizationNrcSudan';
import { EditOrganizationMexico } from './Sections/EditOrganizationMexico/EditOrganizationMexico';

export const EditOrganization: React.FC = () => {
  const { handleAdminGetOrganisationsDetail } = organisationService();

  const organisationDetail = useSelector(selectorAdminGetOrganisationDetail);
  const orgKey = useParams<{ key: string }>()?.key;
  const user = useAppSelector(selectorGetUser);

  useEffect(() => {
    if (!orgKey || !user?.role) return;
    handleAdminGetOrganisationsDetail(orgKey);
  }, [orgKey, user]);

  useEffect(() => {
    if (isEmpty(organisationDetail)) return;
  }, [organisationDetail]);

  return organisationDetail?.marketplace?.toUpperCase() === MarketPlaces.PUBLIC ? (
    <EditOrganizationPublic
      marketplace={organisationDetail?.marketplace?.toUpperCase()}
      organisationDetail={organisationDetail}
    />
  ) : organisationDetail?.marketplace?.toUpperCase() === MarketPlaces.MEXICO ? (
    <EditOrganizationMexico
      marketplace={organisationDetail?.marketplace?.toUpperCase()}
      organisationDetail={organisationDetail}
    />
  ) : organisationDetail?.marketplace?.toUpperCase() === MarketPlaces.NRC_SUDAN ? (
    <EditOrganizationNrcSudan
      marketplace={organisationDetail?.marketplace?.toUpperCase()}
      organisationDetail={organisationDetail}
    />
  ) : (
    <EditOrganizationPrivate
      marketplace={organisationDetail?.marketplace?.toUpperCase()}
      organisationDetail={organisationDetail}
    />
  );
};
