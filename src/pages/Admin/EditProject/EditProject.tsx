import React, { useEffect } from 'react';
import './EditProject.scss';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectorAdminGetProjectDetail } from '../../../store/Projects/selectors';
import { projectsService } from '../../../services';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { MarketPlaces } from '../../../Components/UI/Button/enums';
import { EditProjectNrcSudan } from './Sections/EditProjectNrcSudan/EditProjectNrcSudan';
import { EditProjectNormal } from './Sections/EditProjectNormal/EditProjectNormal';

export const EditProject: React.FC = () => {
  const user = useSelector(selectorGetUser);
  const projectKey = useParams<{ key: string }>()?.key;
  const projectDetail = useSelector(selectorAdminGetProjectDetail);
  const { handleAdminGetProjectDetail } = projectsService();

  useEffect(() => {
    if (!projectKey || !user?.role) return;
    handleAdminGetProjectDetail(projectKey);
  }, [projectKey, user]);

  return projectDetail?.marketplace === MarketPlaces.NRC_SUDAN ? (
    <EditProjectNrcSudan projectDetail={projectDetail} projectKey={projectKey || ''} />
  ) : (
    <EditProjectNormal projectDetail={projectDetail} projectKey={projectKey || ''} />
  );
};
