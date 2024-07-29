import React, { useEffect, useState } from 'react';
import './ProjectDetail.scss';
import { Details } from './Sections/Details/Details';
import { AboutOrganization } from './Sections/AboutOrganization/AboutOrganization';
import { RelatedProject } from '../../Components/RelatedProject/RelatedProject';
import { useParams } from 'react-router-dom';
import {
  actionGetProjectDetail,
  actionGetRelatedProjects,
  actionLeaveGetProjectDetail,
  actionLeaveGetRelatedProjects
} from '../../store/Projects/actions';
import { useSelector } from 'react-redux';
import {
  selectorGetProjectDetail,
  selectorGetRelatedProjects
} from '../../store/Projects/selectors';
import { useAppDispatch } from '../../store';
import { getOrganizationDetail } from '../../store/Organizations/actions';
import { AuthWrapper } from '../Global';
import { ROLES } from '../../config';
import BuyProjectModal from './Sections/Modals/BuyProjectModal/BuyProjectModal';

export const ProjectDetail: React.FC = () => {
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [organizationDetail, setOrganizationDetail] = useState(undefined);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const projectDetail = useSelector(selectorGetProjectDetail);
  const relatedProjects = useSelector(selectorGetRelatedProjects);

  const fetchProjectDetail = async () => {
    if (!id) return;
    dispatch(
      actionGetProjectDetail({
        params: {
          key: id
        }
      })
    );
    return () => {
      dispatch(actionLeaveGetProjectDetail());
    };
  };

  const fetchOrganizationDetail = async () => {
    if (!projectDetail?.organization_key) return;
    const data = await getOrganizationDetail({ key: projectDetail?.organization_key });
    setOrganizationDetail(data);
  };

  const fetchRelatedProjects = async () => {
    if (!id) return;
    dispatch(
      actionGetRelatedProjects({
        params: {
          key: id
        }
      })
    );
    return () => {
      dispatch(actionLeaveGetRelatedProjects());
    };
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  useEffect(() => {
    fetchOrganizationDetail();
    fetchRelatedProjects();
  }, [projectDetail]);

  return (
    <AuthWrapper role={[ROLES.ADMIN, ROLES.ORG, ROLES.DONOR]}>
      <div className="project-detail">
        <div className="container">
          <Details related={relatedProjects} detail={projectDetail} />
          {organizationDetail && (
            <AboutOrganization
              organization={organizationDetail}
              existingDonors={projectDetail?.existing_donors}
            />
          )}
          <RelatedProject projects={relatedProjects} title="Related Activities" />
        </div>
      </div>
      {isOpenBuy && (
        <BuyProjectModal
          onClose={() => setIsOpenBuy(false)}
          projectKey={projectDetail?.key}
          className="payment-modal"
        />
      )}
    </AuthWrapper>
  );
};
