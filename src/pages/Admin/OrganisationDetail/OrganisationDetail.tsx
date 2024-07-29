import React, { useEffect, useMemo, useState } from 'react';
import './OrganisationDetail.scss';
import { NavLink, useParams } from 'react-router-dom';
import { organisationService } from '../../../services';
import { useSelector } from 'react-redux';
import {
  selectorAdminGetOrganisationDetail,
  selectorPutApproveOrganisationErrors,
  selectorPutRejectOrganisationErrors
} from '../../../store/Organizations/selectors';
import { capitalize, isEmpty, map, replace, size, startCase } from 'lodash';
import { Button, Tag, Typography } from 'antd';
import {
  KEY_STAFF_NAMES,
  KEY_STAFF_REQUIRING_IDENTIFICATION,
  ROLES,
  STATUS
} from '../../../config';
import moment from 'moment';
import { AdminMenu, ListErrors } from '../../../Components/Shared';
import { AuthWrapper } from '../../Global';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { prefixS3Url } from '../../../utils';
import { appPaths } from '../../../constants';
import { StaffType } from '../../../requests/Organizations/OrganizationsRequest.type';
import { MarketPlaces } from '../../../Components/UI/Button/enums';
const { Link } = Typography;

export const OrganisationDetail: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const organisationKey = useParams<{ key: string }>()?.key;
  const organisationDetail = useSelector(selectorAdminGetOrganisationDetail);
  const { handleAdminGetOrganisationsDetail, handleApproveOrganisation, handleRejectOrganisation } =
    organisationService();
  const approveErrors = useSelector(selectorPutApproveOrganisationErrors);
  const rejectErrors = useSelector(selectorPutRejectOrganisationErrors);

  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);

  useEffect(() => {
    if (!organisationKey || !user?.role) return;
    handleAdminGetOrganisationsDetail(organisationKey);
  }, [organisationKey, user]);

  const staffList = useMemo(() => {
    if (!isEmpty(organisationDetail)) {
      return [...organisationDetail.key_staff, ...organisationDetail.staff_members];
    }
    return [];
  }, [organisationDetail]);

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

  const handleApproveOrganisations = async () => {
    if (!organisationKey) return;
    setLoadingApprove(true);
    await handleApproveOrganisation(organisationKey);
    setLoadingApprove(false);
  };

  const handleRejectOrganisations = async () => {
    if (!organisationKey) return;
    setLoadingReject(true);
    await handleRejectOrganisation(organisationKey);
    setLoadingReject(false);
  };

  return (
    <AuthWrapper role={[ROLES.ADMIN, ROLES.ORG]}>
      <div className="admin-organisations-detail">
        <div className="container">
          <AdminMenu />
          <h1 className="title">Organisation Details</h1>
          <div className="detail">
            <div className="detail-item">
              <h3 className="title">Basic Information</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Marketplace:</div>
                  <div className="item-value">
                    {organisationDetail?.marketplace
                      ? startCase(
                          String(organisationDetail?.marketplace).replace('_', ' ').toLowerCase()
                        )
                      : '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Organisation Name:</div>
                  <div className="item-value">{organisationDetail?.organization_name || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Organisation Website:</div>
                  <div className="item-value">
                    {organisationDetail?.organization_website || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Head Name:</div>
                  <div className="item-value">{organisationDetail?.head_name || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Head Email:</div>
                  <div className="item-value">{organisationDetail?.head_email || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Head Role:</div>
                  <div className="item-value">{organisationDetail?.head_role || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Digital Wallet Address:</div>
                  <div className="item-value break-all">
                    {organisationDetail?.digital_wallet_address || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Brief Organisation Overview:</div>
                  <div className="item-value">
                    {organisationDetail?.brief_organization_overview || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">
                    {"Description of Main Sector(s) of the Organisation's Activities:"}
                  </div>
                  <div className="item-value">
                    {organisationDetail?.organization_sector_description || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Status: </div>
                  <div className="item-value">
                    {renderStatus(organisationDetail?.status) || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Created: </div>
                  <div className="item-value">
                    {moment(organisationDetail?.created).local().format('DD-MM-YYYY HH:mm:ss') ||
                      '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Organisation Image:</div>
                  <div className="item-value">
                    {organisationDetail?.image ? (
                      <img
                        src={prefixS3Url(organisationDetail?.image?.original)}
                        alt="project-image"
                        style={{ maxWidth: '200px' }}
                      />
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <h3 className="title">Registration Information</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Organisation registered:</div>
                  <div className="item-value">
                    {organisationDetail?.organization_registered ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Registered Address:</div>
                  <div className="item-value">{organisationDetail?.registered_address || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Registered Country:</div>
                  <div className="item-value">{organisationDetail?.registered_country || '--'}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">Registration Number:</div>
                  <div className="item-value">
                    {organisationDetail?.registration_number || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">VAT Registration Number:</div>
                  <div className="item-value">
                    {organisationDetail?.vat_registration_number || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">IATI Code:</div>
                  <div className="item-value">{organisationDetail?.iati_code || '--'}</div>
                </div>

                {/* documents */}
                <div className="content-item">
                  <div className="item-label">Proofs of Registration:</div>
                  <div className="item-value">
                    {size(organisationDetail?.proofs_of_registration) > 0 ? (
                      <>
                        {map(organisationDetail?.proofs_of_registration, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Non-Registration Attestation Documents:</div>
                  <div className="item-value">
                    {size(organisationDetail?.non_registration_attestation_documents) > 0 ? (
                      <>
                        {map(
                          organisationDetail?.non_registration_attestation_documents,
                          (el, index) => {
                            return (
                              <Link
                                target="blank"
                                href={el?.location}
                                style={{ display: 'block' }}
                                key={index}>
                                {el?.name}
                              </Link>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Year of establishment:</div>
                  <div className="item-value">
                    {organisationDetail?.year_of_establishment || '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Country and Areas of activities:</div>
                  <div className="item-value">
                    {organisationDetail?.country_and_areas_of_activities || '--'}
                  </div>
                </div>

                {/* <div className="content-item">
                  <div className="item-label">Major income sources and donors:</div>
                  <div className="item-value">
                    {organisationDetail?.major_income_sources_and_donors || '--'}
                  </div>
                </div> */}
              </div>
            </div>

            <div className="detail-item">
              <h3 className="title">Financial Information:</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Organisation have audited financials:</div>
                  <div className="item-value">
                    {organisationDetail?.has_organisation_audited_financials ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">
                    {"Organisation's most recent audited financials:"}
                  </div>
                  <div className="item-value">
                    {size(organisationDetail?.most_recent_audited_financials) > 0 ? (
                      <>
                        {map(organisationDetail?.most_recent_audited_financials, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Explain:</div>
                  <div className="item-value">
                    {organisationDetail?.explain_does_not_have_most_recently_audited_financials ||
                      '--'}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">
                    Previous Financial Year Organisational Budget in USD:
                  </div>
                  <div className="item-value">{organisationDetail?.annual_budget_usd}</div>
                </div>

                <div className="content-item">
                  <div className="item-label">
                    List of Top Five Donors in the Previous Financial Year:
                  </div>
                  <div className="item-value">{organisationDetail?.top_five_donors}</div>
                </div>
                <div className="content-item">
                  <div className="item-label">Other Financial Documents:</div>
                  <div className="item-value">
                    {size(organisationDetail?.other_financials_documents) > 0 ? (
                      <>
                        {map(organisationDetail?.other_financials_documents, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Organisation Responsible Name:</div>
                  <div className="item-value">
                    {organisationDetail?.org_responsible_name || '--'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Type of ID:</div>
                  <div className="item-value">
                    {organisationDetail?.type_of_id_responsible_person || '--'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Document of ID:</div>
                  <div className="item-value">
                    {size(organisationDetail?.responsible_person_documents) > 0 ? (
                      <>
                        {map(organisationDetail?.responsible_person_documents, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Organisation Responsible Person Other Documents:</div>
                  <div className="item-value">
                    {size(organisationDetail?.responsible_person_other_documents) > 0 ? (
                      <>
                        {map(
                          organisationDetail?.responsible_person_other_documents,
                          (el, index) => {
                            return (
                              <Link
                                target="blank"
                                href={el?.location}
                                style={{ display: 'block' }}
                                key={index}>
                                {el?.name}
                              </Link>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">
                    Individual managing your digital wallet is different than the individual
                    responsible for organisational finances:
                  </div>
                  <div className="item-value">
                    {organisationDetail?.has_other_person_manager_digital_wallet ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">
                    Personal documents of others managing digital wallets
                  </div>
                  <div className="item-value">
                    {size(organisationDetail?.other_person_manager_digital_wallet_documents) > 0 ? (
                      <>
                        {map(
                          organisationDetail?.other_person_manager_digital_wallet_documents,
                          (el, index) => {
                            return (
                              <Link
                                target="blank"
                                href={el?.location}
                                style={{ display: 'block' }}
                                key={index}>
                                {el?.name}
                              </Link>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Letter of authorization for manager wallet funds</div>
                  <div className="item-value">
                    {size(organisationDetail?.letter_of_authorization_wallet_funds) > 0 ? (
                      <>
                        {map(
                          organisationDetail?.letter_of_authorization_wallet_funds,
                          (el, index) => {
                            return (
                              <Link
                                target="blank"
                                href={el?.location}
                                style={{ display: 'block' }}
                                key={index}>
                                {el?.name}
                              </Link>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {organisationDetail?.marketplace === MarketPlaces.NRC_SUDAN && (
              <div className="detail-item">
                <h3 className="title">Bank Details:</h3>
                <div className="content">
                  <div className="content-item">
                    <div className="item-label">Bank Name:</div>
                    <div className="item-value">{organisationDetail?.bank_name || '--'}</div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Account Name:</div>
                    <div className="item-value">
                      {organisationDetail?.bank_account_name || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">Branch Name:</div>
                    <div className="item-value">{organisationDetail?.bank_branch_name || '--'}</div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">A/C No:</div>
                    <div className="item-value">
                      {organisationDetail?.bank_account_number || '--'}
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item-label">IBAN CODE:</div>
                    <div className="item-value">{organisationDetail?.bank_iban_code || '--'}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="detail-item">
              <h3 className="title">Other Information</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Other founding documents:</div>
                  <div className="item-value">
                    {organisationDetail?.has_other_founding_documents ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Other Documents:</div>
                  <div className="item-value">
                    {size(organisationDetail?.other_founding_documents) > 0 ? (
                      <>
                        {map(organisationDetail?.other_founding_documents, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Collaborate with armed groups:</div>
                  <div className="item-value">
                    {organisationDetail?.has_collaborated_with_armed_groups ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Ways of cooperation with armed groups:</div>
                  <div className="item-value">
                    {organisationDetail?.ways_of_cooperation_with_armed_groups || '--'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">Elaborate on the kinds of services you provide:</div>
                  <div className="item-value">
                    {organisationDetail?.services_provided_to_armed_groups || '--'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">
                    {"Organisation's most recent annual / impact report:"}
                  </div>
                  <div className="item-value">
                    {size(organisationDetail?.most_recent_annual_impact_report) > 0 ? (
                      <>
                        {map(organisationDetail?.most_recent_annual_impact_report, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <h3 className="title">Due Diligence Checklist</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label"></div>
                  {size(organisationDetail?.due_diligence_checklist) > 0 ? (
                    <>
                      {map(organisationDetail?.due_diligence_checklist, (el, index) => {
                        return (
                          <div className="item-value" key={index}>
                            {el}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>--</>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-item">
              <h3 className="title">Staffing Information</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Organisational Chart:</div>
                  <div className="item-value">
                    {size(organisationDetail?.organizational_chart) > 0 ? (
                      <>
                        {map(organisationDetail?.organizational_chart, (el, index) => {
                          return (
                            <Link
                              target="blank"
                              href={el?.location}
                              style={{ display: 'block' }}
                              key={index}>
                              {el?.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>--</>
                    )}
                  </div>
                </div>

                <div className="content-item">
                  <div className="item-label">Number of paid staff:</div>
                  <div className="item-value">
                    {organisationDetail?.number_of_paid_staff || '--'}
                  </div>
                </div>
                <div className="content-item">
                  <div className="item-label">
                    Does the organisation provide their staff with the minimum social requirements:
                  </div>
                  <div className="item-value">
                    {organisationDetail?.staff_provided_social_requirements || '--'}
                  </div>
                </div>
                {organisationDetail?.marketplace === MarketPlaces.NRC_SUDAN && (
                  <>
                    <div className="content-item">
                      <div className="item-label">
                        Number of contractors/service providers (FOP):
                      </div>
                      <div className="item-value">
                        {organisationDetail?.number_of_contractors || '--'}
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Number of volunteers:</div>
                      <div className="item-value">
                        {organisationDetail?.number_of_volunteers || '--'}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {map(staffList, (el, index) => {
              return (
                <div className="detail-item" key={index}>
                  <h3 className="title">
                    {el.type
                      ? KEY_STAFF_NAMES[el.type as StaffType]
                      : `Staff Members (${index + 1}):`}
                  </h3>
                  <div className="content">
                    <div className="content-item">
                      <div className="item-label">First Name:</div>
                      <div className="item-value">{el?.first_name || '--'}</div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Last Name:</div>
                      <div className="item-value">{el?.last_name || '--'}</div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Email:</div>
                      <div className="item-value">{el?.email || '--'}</div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Position:</div>
                      <div className="item-value">{el?.possition || '--'}</div>
                    </div>

                    <div className="content-item">
                      <div className="item-label">Mobile Number:</div>
                      <div className="item-value">{el?.mobile_numbers || '--'}</div>
                    </div>
                    <div className="content-item">
                      <div className="item-label">Date of Birth:</div>
                      <div className="item-value">
                        {el?.dob ? new Date(el.dob).toLocaleDateString() : '--'}
                      </div>
                    </div>
                    {KEY_STAFF_REQUIRING_IDENTIFICATION.includes(el.type as StaffType) && (
                      <div className="content-item">
                        <div className="item-label">Copy of National ID or Passport:</div>
                        <div className="item-value">
                          {size(el?.identification) > 0 ? (
                            <>
                              {map(el?.identification, (el, index) => {
                                return (
                                  <Link
                                    target="blank"
                                    href={el?.location}
                                    style={{ display: 'block' }}
                                    key={index}>
                                    {el?.name}
                                  </Link>
                                );
                              })}
                            </>
                          ) : (
                            <>--</>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {organisationDetail?.marketplace === MarketPlaces.NRC_SUDAN &&
              !isEmpty(organisationDetail.references) &&
              map(organisationDetail.references, (el, index) => {
                return (
                  <div className="detail-item" key={index}>
                    <h3 className="title">Reference {index + 1}</h3>
                    <div className="content">
                      <div className="content-item">
                        <div className="item-label">Name:</div>
                        <div className="item-value">{el?.reference_name || '--'}</div>
                      </div>
                      <div className="content-item">
                        <div className="item-label">Position:</div>
                        <div className="item-value">{el?.position || '--'}</div>
                      </div>
                      <div className="content-item">
                        <div className="item-label">Organisation:</div>
                        <div className="item-value">{el?.organisation || '--'}</div>
                      </div>
                      <div className="content-item">
                        <div className="item-label">Email:</div>
                        <div className="item-value">{el?.email || '--'}</div>
                      </div>

                      <div className="content-item">
                        <div className="item-label">Mobile Number:</div>
                        <div className="item-value">{el?.mobile_number || '--'}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

            <div className="detail-item">
              <h3 className="title">Socials:</h3>
              <div className="content">
                <div className="content-item">
                  <div className="item-label">Facebook: </div>
                  <div className="item-value">{organisationDetail?.social?.facebook || '--'}</div>
                </div>
                <div className="content-item">
                  <div className="item-label">Telegram: </div>
                  <div className="item-value">{organisationDetail?.social?.telegram || '--'}</div>
                </div>
                <div className="content-item">
                  <div className="item-label">Twitter: </div>
                  <div className="item-value">{organisationDetail?.social?.twitter || '--'}</div>
                </div>
                <div className="content-item">
                  <div className="item-label">Signal: </div>
                  <div className="item-value">{organisationDetail?.social?.signal || '--'}</div>
                </div>
              </div>
            </div>

            {approveErrors && <ListErrors errors={approveErrors} />}
            {rejectErrors && <ListErrors errors={rejectErrors} />}

            {(organisationDetail?.status === STATUS.PENDING ||
              organisationDetail?.status === STATUS.PENDING_REVIEW) &&
              user?.role === ROLES.ADMIN && (
                <div className="detail-footer">
                  <Button
                    type="primary"
                    onClick={handleApproveOrganisations}
                    loading={loadingApprove}>
                    Approve
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={handleRejectOrganisations}
                    loading={loadingReject}>
                    Reject
                  </Button>
                </div>
              )}
            {user?.role === ROLES.ADMIN ||
            user?.digital_wallet_address === organisationDetail?.digital_wallet_address ? (
              <NavLink
                to={replace(appPaths.adminEditOrganization.path, ':key', organisationDetail?.key)}>
                <Button danger>Edit Organisation</Button>
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};
