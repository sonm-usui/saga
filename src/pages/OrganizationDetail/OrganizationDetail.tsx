import React, { useEffect, useState } from 'react';
import './OrganizationDetail.scss';
import { Details } from './Sections/Details/Details';
import { RelatedProject } from '../../Components/RelatedProject/RelatedProject';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  actionGetOrganizationDetail,
  actionLeaveGetOrganizationDetail
} from '../../store/Organizations/actions';
import { selectorGetOrganizationDetail } from '../../store/Organizations/selectors';
import { actionGetProjectList, actionLeaveGetProjectList } from '../../store/Projects/actions';
import { PAGINATES, STATUS } from '../../config';
import { selectorGetProjectsList } from '../../store/Projects/selectors';
import { DuaChecklist, Existing } from '../../Components';
import RequestAdditional from '../ProjectDetail/Sections/Modals/RequestAdditional/RequestAdditional';
import { lowerCase } from 'lodash';

export const OrganizationDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const organizationDetail = useAppSelector(selectorGetOrganizationDetail);
  const projects = useAppSelector(selectorGetProjectsList);
  const [isOpenRequestAdditional, setIsOpenRequestAdditional] = useState(false);

  const fetchOrganizationDetail = async () => {
    if (!id) return;
    dispatch(
      actionGetOrganizationDetail({
        params: {
          key: id
        }
      })
    );
    return () => {
      dispatch(actionLeaveGetOrganizationDetail());
    };
  };

  const fetchRelatedProjects = async () => {
    if (!id) return;
    dispatch(
      actionGetProjectList({
        params: {
          page_size: PAGINATES.default.pageSize,
          page_index: PAGINATES.default.pageIndex,
          filter_organization_key: id,
          filter_status: `${lowerCase(STATUS.FUNDED)},${lowerCase(STATUS.APPROVED)}`
        }
      })
    );
    return () => {
      dispatch(actionLeaveGetProjectList());
    };
  };

  useEffect(() => {
    fetchOrganizationDetail();
    fetchRelatedProjects();
  }, [id]);

  return (
    <div className="organization-detail">
      <div className="container">
        <Details detail={organizationDetail} />
        <div className="organization-detail-middle">
          <div className="box dd-checklist">
            {/* TODO: API add dua checklist description */}
            <DuaChecklist
              title="Due Diligence Checklist"
              description={
                <>
                  {`${organizationDetail?.organization_name} have completed the following due dilligence processes. If you'd like you can`}{' '}
                  <span
                    className="text-link cursor"
                    onClick={() => setIsOpenRequestAdditional(true)}>
                    request to see the documents.
                  </span>
                </>
              }
              checklist={organizationDetail.due_diligence_checklist}
            />
          </div>
          <div className="box supporters">
            {/* TODO: API add Existing data */}
            {/* <Existing
              title="Existing Donors"
              description="The projects listed on Coala Pay are supported by an amazing community who continue to
            grow this platform. Give them some props."
            /> */}
          </div>
        </div>
        <RelatedProject
          title={`Other Projects by ${organizationDetail?.organization_name}`}
          projects={projects?.items}
        />
      </div>
      {isOpenRequestAdditional && (
        <RequestAdditional
          isOpen={true}
          onClose={() => setIsOpenRequestAdditional(false)}
          organisationKey={organizationDetail?.key}
          className="request-additional-modal"
        />
      )}
    </div>
  );
};
