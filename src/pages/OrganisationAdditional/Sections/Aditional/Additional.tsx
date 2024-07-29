import React from 'react';
import './Additional.scss';
import moment from 'moment';
import { map, size } from 'lodash';
import { Typography } from 'antd';
import { useStatusTag } from '../../../../hook';

const { Link } = Typography;

interface AdditionalProps {
  organisationAdditional: any;
}

export const Additional: React.FC<AdditionalProps> = ({ organisationAdditional }) => {
  return (
    <div className="additional">
      <h1 className="title">Organisation Details</h1>
      <div className="detail">
        <div className="detail-item">
          <h3 className="title">Basic Information</h3>
          <div className="content">
            <div className="content-item">
              <div className="item-label">Organisation Name:</div>
              <div className="item-value">{organisationAdditional?.organization_name || '--'}</div>
            </div>

            <div className="content-item">
              <div className="item-label">Organisation Website:</div>
              <div className="item-value">
                {organisationAdditional?.organization_website || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">Head Name:</div>
              <div className="item-value">{organisationAdditional?.head_name || '--'}</div>
            </div>

            <div className="content-item">
              <div className="item-label">Head Email:</div>
              <div className="item-value">{organisationAdditional?.head_email || '--'}</div>
            </div>

            <div className="content-item">
              <div className="item-label">Head Role:</div>
              <div className="item-value">{organisationAdditional?.head_role || '--'}</div>
            </div>

            <div className="content-item">
              <div className="item-label">Digital Wallet Address:</div>
              <div className="item-value">
                {organisationAdditional?.digital_wallet_address || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">Brief Organization Overview:</div>
              <div className="item-value">
                {organisationAdditional?.brief_organization_overview || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">
                {"Description of Main Sector(s) of the Organisation's Activities:"}
              </div>
              <div className="item-value">
                {organisationAdditional?.organization_sector_description || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">Status: </div>
              <div className="item-value">
                {useStatusTag(organisationAdditional?.status) || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">Created: </div>
              <div className="item-value">
                {moment(organisationAdditional?.created).local().format('DD-MM-YYYY HH:mm:ss') ||
                  '--'}
              </div>
            </div>
          </div>
        </div>

        <div className="detail-item">
          <h3 className="title">Registration Information</h3>
          <div className="content">
            <div className="content-item">
              <div className="item-label">Registered Address:</div>
              <div className="item-value">{organisationAdditional?.registered_address || '--'}</div>
            </div>

            <div className="content-item">
              <div className="item-label">Registered Country:</div>
              <div className="item-value">{organisationAdditional?.registered_country || '--'}</div>
            </div>

            <div className="content-item">
              <div className="item-label">Registration Number:</div>
              <div className="item-value">
                {organisationAdditional?.registration_number || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">VAT Registration Number:</div>
              <div className="item-value">
                {organisationAdditional?.vat_registration_number || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">IATI Code:</div>
              <div className="item-value">{organisationAdditional?.iati_code || '--'}</div>
            </div>

            {/* documents */}
            <div className="content-item">
              <div className="item-label">Proofs of Registration:</div>
              <div className="item-value">
                {size(organisationAdditional?.proofs_of_registration) > 0 ? (
                  <>
                    {map(organisationAdditional?.proofs_of_registration, (el, index) => {
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
                {size(organisationAdditional?.non_registration_attestation_documents) > 0 ? (
                  <>
                    {map(
                      organisationAdditional?.non_registration_attestation_documents,
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
                {organisationAdditional?.year_of_establishment || '--'}
              </div>
            </div>

            <div className="content-item">
              <div className="item-label">Country and Areas of activities:</div>
              <div className="item-value">
                {organisationAdditional?.country_and_areas_of_activities || '--'}
              </div>
            </div>

            {/* <div className="content-item">
              <div className="item-label">Major income sources and donors:</div>
              <div className="item-value">
                {organisationAdditional?.major_income_sources_and_donors || '--'}
              </div>
            </div> */}
          </div>
        </div>

        <div className="detail-item">
          <h3 className="title">Financial Information:</h3>
          <div className="content">
            <div className="content-item">
              <div className="item-label">Other Financial Documents:</div>
              <div className="item-value">
                {size(organisationAdditional?.other_financials_documents) > 0 ? (
                  <>
                    {map(organisationAdditional?.other_financials_documents, (el, index) => {
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
              <div className="item-label">Organization Responsible Name:</div>
              <div className="item-value">
                {organisationAdditional?.org_responsible_name || '--'}
              </div>
            </div>
            <div className="content-item">
              <div className="item-label">Type of ID:</div>
              <div className="item-value">
                {organisationAdditional?.type_of_id_responsible_person || '--'}
              </div>
            </div>
            <div className="content-item">
              <div className="item-label">Document of ID:</div>
              <div className="item-value">
                {size(organisationAdditional?.responsible_person_documents) > 0 ? (
                  <>
                    {map(organisationAdditional?.responsible_person_documents, (el, index) => {
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
                {size(organisationAdditional?.responsible_person_other_documents) > 0 ? (
                  <>
                    {map(
                      organisationAdditional?.responsible_person_other_documents,
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
                Personal documents of others managing digital wallets
              </div>
              <div className="item-value">
                {size(organisationAdditional?.other_person_manager_digital_wallet_documents) > 0 ? (
                  <>
                    {map(
                      organisationAdditional?.other_person_manager_digital_wallet_documents,
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
                {size(organisationAdditional?.letter_of_authorization_wallet_funds) > 0 ? (
                  <>
                    {map(
                      organisationAdditional?.letter_of_authorization_wallet_funds,
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

        <div className="detail-item">
          <h3 className="title">Other Information</h3>
          <div className="content">
            <div className="content-item">
              <div className="item-label">Other Documents:</div>
              <div className="item-value">
                {size(organisationAdditional?.other_founding_documents) > 0 ? (
                  <>
                    {map(organisationAdditional?.other_founding_documents, (el, index) => {
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
          <h3 className="title">Staffing Information</h3>
          <div className="content">
            <div className="content-item">
              <div className="item-label">Organisational Chart:</div>
              <div className="item-value">
                {size(organisationAdditional?.organizational_chart) > 0 ? (
                  <>
                    {map(organisationAdditional?.organizational_chart, (el, index) => {
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
                {organisationAdditional?.number_of_paid_staff || '--'}
              </div>
            </div>
            <div className="content-item">
              <div className="item-label">
                Does the organisation provide their staff with the minimum social requirements:
              </div>
              <div className="item-value">
                {organisationAdditional?.staff_provided_social_requirements || '--'}
              </div>
            </div>
          </div>
        </div>

        {size(organisationAdditional?.staff_members) > 0 ? (
          <>
            {map(organisationAdditional?.staff_members, (el, index) => {
              return (
                <div className="detail-item" key={index}>
                  <h3 className="title">{`Staff Members (${index + 1}):`}</h3>
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
                        {el?.dob ? new Date(el?.dob).toLocaleDateString() : '--'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}

        <div className="detail-item">
          <h3 className="title">Socials:</h3>
          <div className="content">
            <div className="content-item">
              <div className="item-label">Facebook: </div>
              <div className="item-value">{organisationAdditional?.social?.facebook || '--'}</div>
            </div>
            <div className="content-item">
              <div className="item-label">Telegram: </div>
              <div className="item-value">{organisationAdditional?.social?.telegram || '--'}</div>
            </div>
            <div className="content-item">
              <div className="item-label">Twitter: </div>
              <div className="item-value">{organisationAdditional?.social?.twitter || '--'}</div>
            </div>
            <div className="content-item">
              <div className="item-label">Signal: </div>
              <div className="item-value">{organisationAdditional?.social?.signal || '--'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
