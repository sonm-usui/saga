import React, { useEffect, useState } from 'react';
import './ProjectDetail.scss';
import { NavLink, useParams } from 'react-router-dom';
import { projectsService } from '../../../services';
import { useSelector } from 'react-redux';
import {
  selectorAdminGetProjectDetail,
  selectorPutApproveProjectErrors,
  selectorPutRejectProjectErrors
} from '../../../store/Projects/selectors';
import { capitalize, isEmpty, map, replace } from 'lodash';
import { Button, Tag, Typography } from 'antd';
import { appPaths } from '../../../constants';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ROLES, STATUS, TYPE_MARKETPLACES } from '../../../config';
import moment from 'moment';
import { ListErrors } from '../../../Components/Shared';
import { AuthWrapper } from '../../Global';
import { prefixS3Url, replaceProjectType } from '../../../utils';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { getOrganizationDetail } from '../../../store/Organizations/actions';
import { IOrganizationItem } from '../../../types/Organizations.type';
import { MarketplaceAccess } from '../MarketplaceAccess/MarketplaceAccess';
import { MarketPlaces } from '../../../Components/UI/Button/enums';
const { Link } = Typography;

export const ProjectDetail: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const projectKey = useParams<{ key: string }>()?.key;
  const projectDetail = useSelector(selectorAdminGetProjectDetail);
  const { handleAdminGetProjectDetail, handleApproveProject, handleRejectProject } =
    projectsService();
  const approveErrors = useSelector(selectorPutApproveProjectErrors);
  const rejectErrors = useSelector(selectorPutRejectProjectErrors);

  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);
  const [organizationDetail, setOrganizationDetail] = useState<IOrganizationItem>();

  useEffect(() => {
    if (!projectKey || !user?.role) return;
    handleAdminGetProjectDetail(projectKey);
  }, [projectKey, user]);

  useEffect(() => {
    if (projectDetail.organization_key) {
      fetchOrganizationDetail();
    }
  }, [projectDetail]);

  const fetchOrganizationDetail = async () => {
    if (!projectDetail?.organization_key) return;
    const data = await getOrganizationDetail({ key: projectDetail?.organization_key });
    setOrganizationDetail(data);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case STATUS.PENDING:
        return <Tag color="processing">{capitalize(status)}</Tag>;

      case STATUS.PENDING_REVIEW:
        return <Tag color="warning">{capitalize(status).replace('_', ' ')}</Tag>;

      case STATUS.REJECTED:
        return <Tag color="error">{capitalize(status)}</Tag>;

      default:
        return <Tag color="success">{capitalize(status)}</Tag>;
    }
  };

  const approveProject = async () => {
    if (!projectKey) return;
    setLoadingApprove(true);
    await handleApproveProject(projectKey);
    setLoadingApprove(false);
  };

  const rejectProject = async () => {
    if (!projectKey) return;
    setLoadingReject(true);
    await handleRejectProject(projectKey);
    setLoadingReject(false);
  };

  return (
    <AuthWrapper role={[ROLES.ADMIN, ROLES.ORG]}>
      <div className="admin-project-detail">
        <div className="container">
          <Link
            href={appPaths.adminProjects.path}
            style={{ display: 'block', marginBottom: '12px' }}>
            <ArrowLeftOutlined /> Back to Projects
          </Link>
          <h1 className="title">Project Details</h1>
          <div className="detail">
            <div className="detail-item">
              <h3 className="title">Basic Information</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Project Name:</div>
                  <div className="item-value">{projectDetail?.name || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Organization Name:</div>
                  <div className="item-value">{organizationDetail?.organization_name || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Type of Project :</div>
                  <div className="item-value">
                    {replaceProjectType(projectDetail?.type) || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Country:</div>
                  <div className="item-value">{projectDetail?.country || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">State:</div>
                  <div className="item-value">{projectDetail?.state || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Township/city:</div>
                  <div className="item-value">{projectDetail?.township || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Period of Delivery:</div>
                  <div className="item-value">{projectDetail?.period_of_delivery || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Estimated Beneficiaries:</div>
                  <div className="item-value">{projectDetail?.estimated_beneficiaries || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Brief Description:</div>
                  <div className="item-value">{projectDetail?.description_english || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Summary Description:</div>
                  <div className="item-value">{projectDetail?.summary || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Cost:</div>
                  <div className="item-value">
                    {`${projectDetail?.onchain_metadata?.fund_eth ?? '--'} USD` || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Status: </div>
                  <div className="item-value">{renderStatus(projectDetail?.status) || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Created: </div>
                  <div className="item-value">
                    {moment(projectDetail?.created).local().format('DD-MM-YYYY HH:mm:ss') || '--'}
                  </div>
                </div>
                {projectDetail.marketplace !== MarketPlaces.NRC_SUDAN && (
                  <div className="content-item">
                    <div className="item-label">Signal: </div>
                    <div className="item-value">{projectDetail?.mobile_numbers || '--'}</div>
                  </div>
                )}
                <div className="content-item">
                  <div className="item-label">Token ID: </div>
                  <div className="item-value">{projectDetail?.token_id || '--'}</div>
                </div>
                {projectDetail.marketplace === MarketPlaces.NRC_SUDAN && (
                  <>
                    <div className="content-item">
                      <div className="item-label">Target group: </div>
                      <div className="item-value">{projectDetail?.target_group || '--'}</div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Project goal and objective: </div>
                      <div className="item-value">{projectDetail?.project_goal || '--'}</div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Key activities: </div>
                      <div className="item-value">{projectDetail?.key_activities || '--'}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Project Thumbnail:</div>
                  <div className="item-value">
                    {projectDetail?.image ? (
                      <img
                        src={prefixS3Url(projectDetail?.image?.original)}
                        alt="project-image"
                        style={{ maxWidth: '200px' }}
                      />
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Marketplace: </div>
                  <div className="item-value">
                    {TYPE_MARKETPLACES.find((el: any) => el.value === projectDetail?.marketplace)
                      ?.label || '--'}
                  </div>
                </div>
              </div>
            </div>
            {projectDetail.marketplace !== MarketPlaces.NRC_SUDAN && (
              <div className="detail-item">
                <h3 className="title">Socials:</h3>
                <div className="content">
                  <div className="content-item">
                    <div className="item-label">Facebook: </div>
                    <div className="item-value">{projectDetail?.social?.facebook || '--'}</div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Telegram: </div>
                    <div className="item-value">{projectDetail?.social?.telegram || '--'}</div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Twitter: </div>
                    <div className="item-value">{projectDetail?.social?.twitter || '--'}</div>
                  </div>
                </div>
              </div>
            )}

            {projectDetail.marketplace === MarketPlaces.NRC_SUDAN &&
              !isEmpty(projectDetail.main_activities) && (
                <div className="detail-item">
                  <h3 className="title">Planned activities:</h3>
                  {map(projectDetail.main_activities, (item: any, index: number) => (
                    <>
                      <div className="title-module">Activities {index + 1}</div>
                      <div className="content">
                        <div className="content-item">
                          <div className="item-label">List of planned activities: </div>
                          <div className="item-value">{item?.planned_activities || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">Precise Geographic Location: </div>
                          <div className="item-value">{item?.geo_location || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">When: </div>
                          <div className="item-value">{item?.when || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">Delivered by: </div>
                          <div className="item-value">{item?.delivered_by || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">Number of supported: </div>
                          <div className="item-value">{item?.number_of_supported || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">Inputs required: </div>
                          <div className="item-value">{item?.inputs_required || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">Means of verification: </div>
                          <div className="item-value">{item?.verification_means || '--'}</div>
                        </div>
                        <div className="content-item">
                          <div className="item-label">Cost USD: </div>
                          <div className="item-value">
                            {item?.cost_usd ? `${item?.cost_usd} USD` : '--'}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}

            {projectDetail.marketplace === MarketPlaces.NRC_SUDAN && (
              <div className="detail-item">
                <div className="content">
                  <div className="content-item">
                    <div className="item-label">Activity reason and connection: </div>
                    <div className="item-value">
                      {projectDetail?.activity_reason_and_connection || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Supporting evidence and collection method: </div>
                    <div className="item-value">
                      {projectDetail?.supporting_evidence_and_collection_method || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Coordination and permissions: </div>
                    <div className="item-value">
                      {projectDetail?.coordination_and_permissions || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Accountability and feedback: </div>
                    <div className="item-value">
                      {projectDetail?.accountability_and_feedback || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Safety and risk management: </div>
                    <div className="item-value">
                      {projectDetail?.safety_and_risk_management || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Financial management experience: </div>
                    <div className="item-value">
                      {projectDetail?.financial_management_experience || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Verification of results: </div>
                    <div className="item-value">
                      {projectDetail?.verification_of_results || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Support needed from NRC: </div>
                    <div className="item-value">
                      {projectDetail?.support_needed_from_NRC || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Long term partnership intent: </div>
                    <div className="item-value">
                      {projectDetail?.long_term_partnership_intent || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Budget: </div>
                    <div className="item-value">
                      {projectDetail?.budget ? (
                        <Link
                          target="blank"
                          href={projectDetail?.budget?.location}
                          style={{ display: 'block' }}>
                          {projectDetail?.budget?.name}
                        </Link>
                      ) : (
                        '--'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {approveErrors && <ListErrors errors={approveErrors} />}
            {rejectErrors && <ListErrors errors={rejectErrors} />}

            {(projectDetail?.status === STATUS.PENDING ||
              projectDetail?.status === STATUS.PENDING_REVIEW) &&
              user?.role === ROLES.ADMIN && (
                <div className="detail-footer">
                  <Button type="primary" onClick={approveProject} loading={loadingApprove}>
                    Approve
                  </Button>
                  <Button type="primary" danger onClick={rejectProject} loading={loadingReject}>
                    Reject
                  </Button>
                </div>
              )}
            {user?.role === ROLES.ADMIN ||
            (projectDetail?.status === STATUS.PENDING &&
              user?.organization_key === projectDetail?.organization_key) ? (
              <NavLink to={replace(appPaths.adminEditProject.path, ':key', projectDetail?.key)}>
                <Button danger>Edit Project</Button>
              </NavLink>
            ) : null}
          </div>
          <Link
            href={appPaths.adminProjects.path}
            style={{ display: 'block', marginBottom: '12px' }}>
            <ArrowLeftOutlined /> Back to Projects
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
};
