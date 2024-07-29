import React, { useEffect } from 'react';
import './OrganisationAdditional.scss';
import { Details } from './Sections/Details/Details';
import { RelatedProject } from '../../Components/RelatedProject/RelatedProject';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectorGetOrganisationAdditional,
  selectorGetOrganisationAdditionalErrors
} from '../../store/Organizations/selectors';
import { actionGetProjectList, actionLeaveGetProjectList } from '../../store/Projects/actions';
import { PAGINATES, ROLES, STATUS } from '../../config';
import { selectorGetProjectsList } from '../../store/Projects/selectors';
import { selectorGetUser } from '../../store/Auth/selectors';
import { organisationService } from '../../services';
import { ListErrors } from '../../Components/Shared';
import { Additional } from './Sections/Aditional/Additional';
import { AuthWrapper } from '../Global';
import { lowerCase } from 'lodash';

export const OrganisationAdditional: React.FC = () => {
  const { key } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const nonce = urlSearchParams.get('nonce');
  const dispatch = useAppDispatch();
  const organisationAdditional = useAppSelector(selectorGetOrganisationAdditional);
  const getOrganisationAdditionalErrors = useAppSelector(selectorGetOrganisationAdditionalErrors);
  const projects = useAppSelector(selectorGetProjectsList);
  const user = useAppSelector(selectorGetUser);
  const { handleGetOrganisationAdditional } = organisationService();

  const fetchOrganisationAdditional = async () => {
    if (!key || !nonce) return;
    handleGetOrganisationAdditional({
      key,
      nonce
    });
  };

  const fetchRelatedProjects = async () => {
    if (!key) return;
    dispatch(
      actionGetProjectList({
        params: {
          page_size: PAGINATES.default.pageSize,
          page_index: PAGINATES.default.pageIndex,
          filter_organization_key: key,
          filter_status: `${lowerCase(STATUS.FUNDED)},${lowerCase(STATUS.APPROVED)}`
        }
      })
    );
    return () => {
      dispatch(actionLeaveGetProjectList());
    };
  };

  useEffect(() => {
    if (!user?.role) return;
    fetchOrganisationAdditional();
    fetchRelatedProjects();
  }, [key, user]);

  return (
    <AuthWrapper role={[ROLES.DONOR, ROLES.ADMIN]}>
      <div className="organisation-additional">
        <div className="container">
          {!getOrganisationAdditionalErrors ? (
            <>
              <Details detail={organisationAdditional} />
              <Additional organisationAdditional={organisationAdditional} />
              <RelatedProject
                title={`Other Projects by ${organisationAdditional?.organization_name}`}
                projects={projects?.items}
              />
            </>
          ) : (
            <ListErrors errors={getOrganisationAdditionalErrors} />
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};
