import React, { useEffect, useRef, useState } from 'react';
import './../../EditOrganization.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DueDiligenceFormNrcSudanSchema } from '../../../../../formik-schemas';
import { Upload, message, Radio, Button as ButtonAntd, Typography, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from '../../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../../Components/UI/Button/enums';
import SelectComponent from '../../../../../Components/UI/Select/Select';
import { head, isEmpty, map, size } from 'lodash';
import { COUNTRIES } from '../../../../ProposeProject/countries';
import { organisationService } from '../../../../../services';
import { useSelector } from 'react-redux';
import { selectorPostCreateOrganisationErrors } from '../../../../../store/Organizations/selectors';
import {
  ALLOWED_FILES_UPLOAD,
  CHECKLIST_DUE_DILIGENCE,
  KEY_STAFF_NAMES,
  ROLES,
  TOAST_MESSAGES
} from '../../../../../config';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { DocumentUploaded, ListErrors } from '../../../../../Components/Shared';
import {
  ORG_COLLABORATE_WITH_ARMED_GROUPS_OPTIONS,
  TYPE_OF_ID_OPTIONS,
  YEARS_OPTIONS
} from '../../../../DueDiligence/data';
import { useParams } from 'react-router-dom';
import { selectorGetUser } from '../../../../../store/Auth/selectors';
import { useAppSelector } from '../../../../../store';
import { AuthWrapper } from '../../../../Global';
import { prefixS3Url } from '../../../../../utils';
import StaffForm from '../../../../../Components/StaffForm/StaffForm';
import ReferencesForm from '../../../../../Components/ReferencesForm/ReferencesForm';
const { Text } = Typography;

export const EditOrganizationNrcSudan: React.FC<{
  marketplace: string;
  organisationDetail: any;
}> = ({ marketplace, organisationDetail }) => {
  const { handleEditOrganization } = organisationService();

  const createOrganisationError = useSelector(selectorPostCreateOrganisationErrors);
  const orgKey = useParams<{ key: string }>()?.key;
  const user = useAppSelector(selectorGetUser);

  const formRef = useRef<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [orgImageFile, setOrgImageFile] = useState<UploadFile | undefined>(undefined);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const initFormValue = {
    organization_name: organisationDetail?.organization_name || '',
    organization_website: organisationDetail?.organization_website || '',
    head_name: organisationDetail?.head_name || '',
    head_email: organisationDetail?.head_email || '',
    head_role: organisationDetail?.head_role || '',
    digital_wallet_address: organisationDetail?.digital_wallet_address || '',
    brief_organization_overview: organisationDetail?.brief_organization_overview || '',
    organization_sector_description: organisationDetail?.organization_sector_description || '',
    organization_registered: organisationDetail?.organization_registered || false,
    registered_address: organisationDetail?.registered_address || '',
    registered_country: organisationDetail?.registered_country || '',
    registration_number: organisationDetail?.registration_number || '',
    vat_registration_number: organisationDetail?.vat_registration_number || '',
    iati_code: organisationDetail?.iati_code || '',
    non_registration_attestation_documents:
      organisationDetail?.non_registration_attestation_documents || [],
    removed_non_registration_attestation_documents: '',
    proofs_of_registration: [],
    removed_proofs_of_registration: '',
    has_other_founding_documents: organisationDetail?.has_other_founding_documents || false,
    other_founding_documents: [],
    removed_other_founding_documents: '',
    year_of_establishment: organisationDetail?.year_of_establishment || '',
    country_and_areas_of_activities: organisationDetail?.country_and_areas_of_activities || '',
    // major_income_sources_and_donors: organisationDetail?.major_income_sources_and_donors || '',
    annual_budget_usd: organisationDetail?.annual_budget_usd || '',
    top_five_donors: organisationDetail?.top_five_donors || '',
    other_financials_documents: [],
    removed_other_financials_documents: '',
    org_responsible_name: organisationDetail?.org_responsible_name || '',
    type_of_id_responsible_person: organisationDetail?.type_of_id_responsible_person || '',
    responsible_person_documents: [],
    removed_responsible_person_documents: '',
    responsible_person_other_documents:
      organisationDetail?.responsible_person_other_documents || '',
    removed_responsible_person_other_documents: '',
    has_other_person_manager_digital_wallet:
      organisationDetail?.has_other_person_manager_digital_wallet || false,
    other_person_manager_digital_wallet_documents:
      organisationDetail?.other_person_manager_digital_wallet_documents || [],
    removed_other_person_manager_digital_wallet_documents: '',
    letter_of_authorization_wallet_funds: [],
    removed_letter_of_authorization_wallet_funds: '',
    has_collaborated_with_armed_groups: organisationDetail?.has_collaborated_with_armed_groups,
    ways_of_cooperation_with_armed_groups:
      organisationDetail?.ways_of_cooperation_with_armed_groups,
    services_provided_to_armed_groups: organisationDetail?.services_provided_to_armed_groups,
    image: orgImageFile || null,
    facebook: organisationDetail?.social?.facebook || '',
    twitter: organisationDetail?.social?.twitter || '',
    telegram: organisationDetail?.social?.telegram || '',
    signal: organisationDetail?.social?.signal || '',
    due_diligence_checklist: size(organisationDetail?.due_diligence_checklist)
      ? map(organisationDetail?.due_diligence_checklist, (item) => {
          return item;
        })
      : [],
    key_staff: organisationDetail?.key_staff
      ? map(organisationDetail?.key_staff, (staffMember) => {
          return {
            type: staffMember.type || '',
            email: staffMember.email || '',
            first_name: staffMember.first_name || '',
            last_name: staffMember.last_name || '',
            possition: staffMember.possition || '',
            mobile_numbers: staffMember.mobile_numbers || '',
            dob: staffMember.dob ? new Date(staffMember.dob) : new Date()
          };
        })
      : Object.keys(KEY_STAFF_NAMES).map((staffType) => ({
          type: staffType,
          email: '',
          first_name: '',
          last_name: '',
          possition: '',
          mobile_numbers: '',
          dob: new Date()
        })),
    staff_members: map(organisationDetail?.staff_members, (staffMember) => {
      return {
        email: staffMember.email || '',
        first_name: staffMember.first_name || '',
        last_name: staffMember.last_name || '',
        possition: staffMember.possition || '',
        mobile_numbers: staffMember.mobile_numbers || '',
        dob: staffMember.dob ? new Date(staffMember.dob) : new Date()
      };
    }),
    organizational_chart: organisationDetail?.organizational_chart || [],
    removed_organizational_chart: '',
    number_of_paid_staff: organisationDetail?.number_of_paid_staff || 0,
    staff_provided_social_requirements:
      organisationDetail?.staff_provided_social_requirements || false,
    //
    bank_name: organisationDetail?.bank_name || '',
    bank_account_name: organisationDetail?.bank_account_name || '',
    bank_branch_name: organisationDetail?.bank_branch_name || '',
    bank_swift_code: organisationDetail?.bank_swift_code || '',
    bank_account_number: organisationDetail?.bank_account_number || '',
    bank_iban_code: organisationDetail?.bank_iban_code || '',

    number_of_contractors: organisationDetail?.number_of_contractors || '',
    number_of_volunteers: organisationDetail?.number_of_volunteers || '',

    references:
      organisationDetail?.references && !isEmpty(organisationDetail?.references)
        ? map(organisationDetail?.references, (item) => {
            return {
              reference_name: item?.reference_name || '',
              position: item?.position || '',
              organisation: item?.organisation || '',
              email: item?.email || '',
              mobile_number: item?.mobile_number || ''
            };
          })
        : [
            {
              reference_name: '',
              position: '',
              organisation: '',
              email: '',
              mobile_number: ''
            },
            {
              reference_name: '',
              position: '',
              organisation: '',
              email: '',
              mobile_number: ''
            }
          ]
  };

  useEffect(() => {
    if (isEmpty(organisationDetail)) return;
    setImageUrl(prefixS3Url(organisationDetail?.image?.original));
  }, [organisationDetail]);

  const countries = map(COUNTRIES, (el) => {
    return {
      value: el.country,
      label: el.country
    };
  });

  const handleBeforeUpload = (file: RcFile) => {
    const allowedFiles = ALLOWED_FILES_UPLOAD;
    const isAllowed = allowedFiles.includes(file.type);
    if (!isAllowed) {
      messageApi.open({
        type: 'error',
        content: TOAST_MESSAGES.organisation.error_allow_upload_file_type,
        duration: 5
      });
    }
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      messageApi.open({
        type: 'error',
        content: TOAST_MESSAGES.organisation.error_allow_upload_file_size,
        duration: 5
      });
    }
    return false;
  };

  const beforeUploadOrgImage = (file: RcFile) => {
    const allowedFiles = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const isAllowed = allowedFiles.includes(file.type);
    if (!isAllowed) {
      messageApi.open({
        type: 'error',
        content: TOAST_MESSAGES.project.error_allow_upload_file_type,
        duration: 5
      });
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      messageApi.open({
        type: 'error',
        content: TOAST_MESSAGES.project.error_allow_upload_file_size,
        duration: 5
      });
    }
    return isAllowed && isLt20M;
  };

  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleUploadImage = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file.originFileObj as RcFile, (url: any) => {
      setLoadingUpload(false);
      setImageUrl(url);
      setOrgImageFile(info.file.originFileObj);
    });
  };

  return (
    <AuthWrapper role={[ROLES.ADMIN, ROLES.ORG]}>
      {user?.role === ROLES.ADMIN ||
      (user?.role === ROLES.ORG &&
        user?.digital_wallet_address === organisationDetail?.digital_wallet_address) ? (
        <div className="due-diligence">
          <div className="container">
            <h2 className="due-diligence-title">Update Organisation</h2>
            <div className="due-diligence-form">
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={initFormValue}
                validationSchema={DueDiligenceFormNrcSudanSchema}
                onSubmit={(payload) => {
                  handleEditOrganization({
                    ...payload,
                    key: organisationDetail?.key,
                    marketplace,
                    image: orgImageFile
                  });
                }}>
                {(form) => {
                  const { values, isSubmitting, setFieldValue } = form;
                  return (
                    <Form className="due-diligence-form-wrapper">
                      <div className="form-section">
                        <h3 className="form-section-title">Basic Information</h3>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Organisation Name: </div>
                            <Field
                              name="organization_name"
                              type="text"
                              placeholder="Enter Organisation Name"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="organization_name"
                              className="error-message"
                              component="div"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">Organisation Website: </div>
                            <Field
                              name="organization_website"
                              type="text"
                              placeholder="http://"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="organization_website"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Your Name: </div>
                            <Field
                              name="head_name"
                              type="text"
                              placeholder="Enter Your Name"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="head_name"
                              className="error-message"
                              component="div"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">Your Email: </div>
                            <Field
                              name="head_email"
                              type="text"
                              placeholder="Enter Your Email"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="head_email"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Your Role: </div>
                            <Field
                              name="head_role"
                              type="text"
                              placeholder="Enter Your Role"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="head_role"
                              className="error-message"
                              component="div"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">Digital Wallet Address: </div>
                            <Field
                              name="digital_wallet_address"
                              type="text"
                              placeholder="Enter Your Wallet Address"
                              className="input-field"
                              disabled
                            />
                            <ErrorMessage
                              name="digital_wallet_address"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="item-input">
                          <div className="title-field">
                            {"Description of Main Sector(s) of the Organisation's Activities::"}
                          </div>
                          <Field
                            as="textarea"
                            name="organization_sector_description"
                            type="text"
                            placeholder="Enter brief description"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="organization_sector_description"
                            className="error-message"
                            component="div"
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">Brief Organization Overview: </div>
                          <p className="note">
                            Enter organisational mission or mandate in less than 100 words
                          </p>
                          <Field
                            as="textarea"
                            name="brief_organization_overview"
                            type="text"
                            placeholder="Enter brief description"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="brief_organization_overview"
                            className="error-message"
                            component="div"
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">Organisation Image:</div>
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="org-image-uploader"
                            beforeUpload={beforeUploadOrgImage}
                            showUploadList={false}
                            onChange={handleUploadImage}>
                            {imageUrl ? (
                              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </div>
                      </div>

                      {/* register info */}
                      {/* If Y, please submit proof of registration. If N, please complete non-registration attestation (will be a template that they should complete, sign, and submit) */}
                      <div className="form-section">
                        <h3 className="form-section-title">Registration Information</h3>
                        <div className="item-input">
                          <div className="title-field">Organisation Registered? </div>
                          <Radio.Group
                            onChange={() => {
                              setFieldValue(
                                `organization_registered`,
                                !values.organization_registered
                              );
                            }}
                            value={values.organization_registered}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>
                        {values.organization_registered ? (
                          <>
                            <div className="input-half">
                              <div className="item-input">
                                <div className="title-field">Registered Address: </div>
                                <Field
                                  name="registered_address"
                                  type="text"
                                  placeholder="Enter Registered Address"
                                  className="input-field"
                                />
                                <ErrorMessage
                                  name="registered_address"
                                  className="error-message"
                                  component="div"
                                />
                              </div>
                              <div className="item-input">
                                <div className="title-field">Registered Country: </div>
                                <SelectComponent
                                  options={countries}
                                  className="select-field"
                                  placeholder="Select country"
                                  allowClear
                                  onSelectFunc={(_, option) => {
                                    setFieldValue('registered_country', option.value);
                                  }}
                                  initialValue={values.registered_country}
                                />
                                <Field
                                  value={values.registered_country}
                                  name="registered_country"
                                  type="text"
                                  className="input-field hidden"
                                />
                                <ErrorMessage
                                  name="registered_country"
                                  className="error-message"
                                  component="div"
                                />
                              </div>
                              <div className="item-input">
                                <div className="title-field">Registration Number: </div>
                                <Field
                                  name="registration_number"
                                  type="text"
                                  placeholder="Enter Registration Number"
                                  className="input-field"
                                />
                                <ErrorMessage
                                  name="registration_number"
                                  className="error-message"
                                  component="div"
                                />
                              </div>

                              <div className="item-input">
                                <div className="title-field">VAT Registration Number: </div>
                                <Field
                                  name="vat_registration_number"
                                  type="text"
                                  placeholder="Enter VAT Registration Number"
                                  className="input-field"
                                />
                                <ErrorMessage
                                  name="vat_registration_number"
                                  className="error-message"
                                  component="div"
                                />
                              </div>

                              <div className="item-input">
                                <div className="title-field">IATI Code: </div>
                                <Field
                                  name="iati_code"
                                  type="text"
                                  placeholder="Enter IATI Code"
                                  className="input-field"
                                />
                                <ErrorMessage
                                  name="iati_code"
                                  className="error-message"
                                  component="div"
                                />
                              </div>
                            </div>
                            <div className="item-input">
                              {/* proofs_of_registration multiple  files */}
                              <div className="title-field">Proofs of Registration: </div>
                              <Upload
                                className="upload-input"
                                beforeUpload={handleBeforeUpload}
                                name="file"
                                multiple
                                maxCount={5}
                                onChange={(info) => {
                                  setFieldValue(
                                    'proofs_of_registration',
                                    info.fileList.map((p) => p.originFileObj)
                                  );
                                }}>
                                <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                              </Upload>
                              <DocumentUploaded
                                documents={organisationDetail?.proofs_of_registration}
                                onSetFieldValue={(value) => {
                                  setFieldValue('removed_proofs_of_registration', value?.join(','));
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="note">
                              Please submit your completed and signed non-registration attestation.
                            </p>
                            <div className="item-input">
                              <Upload
                                className="upload-input"
                                beforeUpload={handleBeforeUpload}
                                name="file"
                                multiple
                                maxCount={5}
                                onChange={(info) => {
                                  setFieldValue(
                                    'non_registration_attestation_documents',
                                    info.fileList.map((p) => p.originFileObj)
                                  );
                                }}>
                                <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                              </Upload>
                              <DocumentUploaded
                                documents={
                                  organisationDetail?.non_registration_attestation_documents
                                }
                                onSetFieldValue={(value) => {
                                  setFieldValue(
                                    'removed_non_registration_attestation_documents',
                                    value?.join(',')
                                  );
                                }}
                              />
                            </div>
                            <p className="note">
                              Do you have other founding documents such as founding charter,
                              constitution, articles of incorporation, or related documents?
                            </p>
                            <div className="item-input">
                              <Radio.Group
                                onChange={() => {
                                  setFieldValue(
                                    `has_other_founding_documents`,
                                    !values.has_other_founding_documents
                                  );
                                }}
                                value={values.has_other_founding_documents}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                              </Radio.Group>
                            </div>
                            {values.has_other_founding_documents && (
                              <>
                                <div className="item-input">
                                  <div className="title-field">
                                    Please submit other founding documents:{' '}
                                  </div>
                                  <Upload
                                    className="upload-input"
                                    beforeUpload={handleBeforeUpload}
                                    name="files"
                                    multiple
                                    maxCount={5}
                                    onChange={(info) => {
                                      setFieldValue(
                                        'other_founding_documents',
                                        info.fileList.map((p) => p.originFileObj)
                                      );
                                    }}>
                                    <ButtonAntd icon={<UploadOutlined />}>
                                      Click to Upload
                                    </ButtonAntd>
                                  </Upload>
                                  <DocumentUploaded
                                    documents={organisationDetail?.other_founding_documents}
                                    onSetFieldValue={(value) => {
                                      setFieldValue(
                                        'removed_other_founding_documents',
                                        value?.join(',')
                                      );
                                    }}
                                  />
                                  {/* <input type="file" onChange={e => setFileList(e.target.files)} accept='image/*' multiple /> */}
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {/* other info */}
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Year of establishment: </div>
                            <SelectComponent
                              options={YEARS_OPTIONS}
                              className="select-field"
                              placeholder="Select"
                              allowClear
                              initialValue={values.year_of_establishment}
                              onSelectFunc={(_, option) => {
                                setFieldValue('year_of_establishment', option.value);
                              }}
                            />
                            <Field
                              value={values.year_of_establishment}
                              name="year_of_establishment"
                              type="text"
                              className="input-field hidden"
                            />
                            <ErrorMessage
                              name="year_of_establishment"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="item-input">
                          <div className="title-field">Country and Areas of activities: </div>
                          <Field
                            as="textarea"
                            name="country_and_areas_of_activities"
                            type="text"
                            placeholder="Enter country and areas of activities"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="country_and_areas_of_activities"
                            className="error-message"
                            component="div"
                          />
                        </div>
                        {/* <div className="item-input">
                          <div className="title-field">Major income sources and donors: </div>
                          <Field
                            as="textarea"
                            name="major_income_sources_and_donors"
                            type="text"
                            placeholder="Enter major income sources and donors"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="major_income_sources_and_donors"
                            className="error-message"
                            component="div"
                          />
                        </div> */}
                      </div>

                      {/* financials */}
                      <div className="form-section">
                        <h3 className="form-section-title">Financial Information</h3>
                        <div className="item-input">
                          <div className="title-field">
                            Previous Financial Year Organisational Budget in USD:
                          </div>
                          <p className="note">
                            Enter approximate annual organisational budget in USD equivalent
                          </p>
                          <Field
                            as="textarea"
                            name="annual_budget_usd"
                            type="number"
                            placeholder="Enter approximate annual organisational budget in USD equivalent"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="annual_budget_usd"
                            className="error-message"
                            component="div"
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">
                            List of Top Five Donors in the Previous Financial Year:{' '}
                          </div>
                          <Field
                            as="textarea"
                            name="top_five_donors"
                            type="text"
                            placeholder="Enter top 5 donors"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="top_five_donors"
                            className="error-message"
                            component="div"
                          />
                        </div>
                        <div className="item-input">
                          <div className="title-field">
                            Name of the individual responsible for organisational finances:
                          </div>
                          <Field
                            name="org_responsible_name"
                            type="text"
                            placeholder="Enter name of the individual responsible for organisational finances"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="org_responsible_name"
                            className="error-message"
                            component="div"
                          />
                        </div>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Type of ID:</div>
                            <SelectComponent
                              options={TYPE_OF_ID_OPTIONS}
                              className="select-field"
                              placeholder="Select"
                              allowClear
                              initialValue={values.type_of_id_responsible_person}
                              onSelectFunc={(value) => {
                                setFieldValue('type_of_id_responsible_person', value);

                                if (value !== 'Other') {
                                  setFieldValue('responsible_person_other_documents', '');
                                }
                              }}
                            />
                            <Field
                              value={values.type_of_id_responsible_person}
                              name="type_of_id_responsible_person"
                              type="text"
                              className="input-field hidden"
                            />
                            <ErrorMessage
                              name="type_of_id_responsible_person"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        {values.type_of_id_responsible_person === 'Other' ? (
                          <div className="item-input">
                            <div className="title-field">
                              Indicate the other type of ID you would like to upload:
                            </div>
                            <Upload
                              className="upload-input"
                              beforeUpload={handleBeforeUpload}
                              name="files"
                              multiple
                              maxCount={5}
                              onChange={(info) => {
                                setFieldValue(
                                  'responsible_person_other_documents',
                                  info.fileList.map((p) => p.originFileObj)
                                );
                              }}>
                              <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                            </Upload>
                            <DocumentUploaded
                              documents={organisationDetail?.responsible_person_other_documents}
                              onSetFieldValue={(value) => {
                                setFieldValue(
                                  'removed_responsible_person_other_documents',
                                  value?.join(',')
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <div className="item-input">
                            <div className="title-field">
                              Upload copy of ID for individual responsible for organisations
                              finances:
                            </div>
                            <Upload
                              className="upload-input"
                              beforeUpload={handleBeforeUpload}
                              name="files"
                              multiple
                              maxCount={5}
                              onChange={(info) => {
                                setFieldValue(
                                  'responsible_person_documents',
                                  info.fileList.map((p) => p.originFileObj)
                                );
                              }}>
                              <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                            </Upload>
                            <DocumentUploaded
                              documents={organisationDetail?.responsible_person_documents}
                              onSetFieldValue={(value) => {
                                setFieldValue(
                                  'removed_responsible_person_documents',
                                  value?.join(',')
                                );
                              }}
                            />
                          </div>
                        )}

                        <div className="item-input">
                          <div className="title-field">
                            Is the individual managing your digital wallet someone different than
                            the individual responsible for organisational finances?{' '}
                          </div>
                          <Radio.Group
                            onChange={() => {
                              setFieldValue(
                                `has_other_person_manager_digital_wallet`,
                                !values.has_other_person_manager_digital_wallet
                              );
                            }}
                            value={values.has_other_person_manager_digital_wallet}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>

                        {values.has_other_person_manager_digital_wallet && (
                          <div className="item-input">
                            <div className="title-field">
                              {`Upload copy of ID for the individual managing the organisation's digital
                          wallet here:`}
                            </div>
                            <Upload
                              className="upload-input"
                              beforeUpload={handleBeforeUpload}
                              name="files"
                              multiple
                              maxCount={5}
                              onChange={(info) => {
                                setFieldValue(
                                  'other_person_manager_digital_wallet_documents',
                                  info.fileList.map((p) => p.originFileObj)
                                );
                              }}>
                              <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                            </Upload>
                            <DocumentUploaded
                              documents={
                                organisationDetail?.other_person_manager_digital_wallet_documents
                              }
                              onSetFieldValue={(value) => {
                                setFieldValue(
                                  'removed_other_person_manager_digital_wallet_documents',
                                  value?.join(',')
                                );
                              }}
                            />
                          </div>
                        )}

                        <div className="item-input">
                          <div className="title-field">
                            Please upload the letter of authorisation for the wallet you will use to
                            receive project funds, if you have it.
                          </div>
                          <Upload
                            className="upload-input"
                            beforeUpload={handleBeforeUpload}
                            name="file"
                            multiple
                            maxCount={5}
                            onChange={(info) => {
                              setFieldValue(
                                'letter_of_authorization_wallet_funds',
                                info.fileList.map((p) => p.originFileObj)
                              );
                            }}>
                            <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                          </Upload>
                          <DocumentUploaded
                            documents={organisationDetail?.letter_of_authorization_wallet_funds}
                            onSetFieldValue={(value) => {
                              setFieldValue(
                                'removed_letter_of_authorization_wallet_funds',
                                value?.join(',')
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Bank Details</h3>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Bank Name: </div>
                            <Field
                              name="bank_name"
                              type="text"
                              placeholder="Enter Bank Name"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="bank_name"
                              className="error-message"
                              component="div"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">Account Name: </div>
                            <Field
                              name="bank_account_name"
                              type="text"
                              placeholder="Enter Account Name"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="bank_account_name"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Branch Name: </div>
                            <Field
                              name="bank_branch_name"
                              type="text"
                              placeholder="Enter Branch Name"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="bank_branch_name"
                              className="error-message"
                              component="div"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">SWIFT CODE: </div>
                            <Field
                              name="bank_swift_code"
                              type="text"
                              placeholder="Enter SWIFT CODE"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="bank_swift_code"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">A/C No: </div>
                            <Field
                              name="bank_account_number"
                              type="text"
                              placeholder="Enter A/C No:"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="bank_account_number"
                              className="error-message"
                              component="div"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">IBAN CODE: </div>
                            <Field
                              name="bank_iban_code"
                              type="text"
                              placeholder="Enter IBAN CODE"
                              className="input-field"
                            />
                            <ErrorMessage
                              name="bank_iban_code"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Other</h3>
                        <div className="item-input">
                          <div className="title-field">Do you collaborate with armed groups: </div>
                          <Radio.Group
                            onChange={() => {
                              setFieldValue(
                                `has_collaborated_with_armed_groups`,
                                !values.has_collaborated_with_armed_groups
                              );
                            }}
                            value={values.has_collaborated_with_armed_groups}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>
                        {values.has_collaborated_with_armed_groups && (
                          <>
                            <div className="item-input">
                              <div className="title-field">
                                How do you collaborate with armed groups:
                              </div>
                              <SelectComponent
                                options={ORG_COLLABORATE_WITH_ARMED_GROUPS_OPTIONS}
                                className="select-field"
                                placeholder="Select"
                                allowClear
                                initialValue={values.ways_of_cooperation_with_armed_groups}
                                onSelectFunc={(_, option) => {
                                  setFieldValue(
                                    'ways_of_cooperation_with_armed_groups',
                                    option.value
                                  );
                                }}
                              />
                              <Field
                                as="textarea"
                                name="ways_of_cooperation_with_armed_groups"
                                type="text"
                                className="input-field hidden"
                              />
                              <ErrorMessage
                                name="ways_of_cooperation_with_armed_groups"
                                className="error-message"
                                component="div"
                              />
                            </div>
                            {values.ways_of_cooperation_with_armed_groups ===
                              head(ORG_COLLABORATE_WITH_ARMED_GROUPS_OPTIONS)?.value && (
                              <div className="item-input">
                                <div className="title-field">
                                  Please elaborate on what kinds of services you provide:{' '}
                                </div>

                                <Field
                                  as="textarea"
                                  name="services_provided_to_armed_groups"
                                  type="text"
                                  placeholder="Enter what kinds of services you provide"
                                  className="input-field"
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Checkboxes list */}
                      {user?.role === ROLES.ADMIN && (
                        <div className="form-section">
                          <h3 className="form-section-title">Due Diligence Checklist</h3>
                          <div className="item-input">
                            <Checkbox.Group
                              className="checklist"
                              options={CHECKLIST_DUE_DILIGENCE}
                              value={values.due_diligence_checklist}
                              onChange={(value: any) => {
                                setFieldValue('due_diligence_checklist', value);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* staff members */}
                      <div className="form-section">
                        <h3 className="form-section-title">Staffing Information</h3>
                        <div className="item-input">
                          <div className="title-field">
                            Please upload your organisational chart / organigram. The organigram
                            should show a clear governance and management structure with reporting
                            lines, roles and responsibilities, as well as to whom management, staff
                            and board are accountable
                          </div>
                          <Upload
                            className="upload-input"
                            beforeUpload={handleBeforeUpload}
                            name="file"
                            multiple
                            maxCount={5}
                            onChange={(info) => {
                              setFieldValue(
                                'organizational_chart',
                                info.fileList.map((p) => p.originFileObj)
                              );
                            }}>
                            <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                          </Upload>
                          <DocumentUploaded
                            documents={organisationDetail?.organizational_chart}
                            onSetFieldValue={(value) => {
                              setFieldValue('removed_organizational_chart', value?.join(','));
                            }}
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">Number of paid staff: </div>
                          <Field
                            name="number_of_paid_staff"
                            type="number"
                            placeholder="Number of paid staff"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="number_of_paid_staff"
                            className="error-message"
                            component="div"
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">
                            Number of contractors/service providers (FOP):
                          </div>
                          <Field
                            name="number_of_contractors"
                            type="number"
                            placeholder="Number of contractors/service providers (FOP)"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="number_of_contractors"
                            className="error-message"
                            component="div"
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">Number of volunteers: </div>
                          <Field
                            name="number_of_volunteers"
                            type="number"
                            placeholder="Number of volunteers"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="number_of_volunteers"
                            className="error-message"
                            component="div"
                          />
                        </div>

                        <div className="item-input">
                          <div className="title-field">
                            Does the organisation provide their staff with the minimum social
                            requirements?
                          </div>
                          <Radio.Group
                            onChange={() => {
                              setFieldValue(
                                `staff_provided_social_requirements`,
                                !values.staff_provided_social_requirements
                              );
                            }}
                            value={values.staff_provided_social_requirements}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Staff Members</h3>
                        <p className="note">
                          {`Please complete details for your organisation's key decision makers. List full legal names for all staff. Please note that Coala Pay and its due diligence partner, CertiK, will send an email to key decision makers for them to complete a Know Your Customer (KYC) and liveness check.`}
                        </p>
                        <p className="note">
                          {
                            "Please complete details for your organisation's key decision makers. Please note that Coala Pay and its due diligence partner, CertiK, will send an email to key decision makers for them to complete a Know Your Customer (KYC) and liveness check."
                          }
                        </p>
                        <StaffForm
                          form={form}
                          formKey="key_staff"
                          canAdd={false}
                          minimumEntries={3}
                          organisationDetail={organisationDetail}
                        />
                        <StaffForm
                          form={form}
                          formKey="staff_members"
                          canAdd={true}
                          minimumEntries={0}
                        />
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">References</h3>
                        <ReferencesForm form={form} formKey="references" canAdd={false} />
                      </div>

                      {/* social */}
                      <div className="form-section">
                        <h3 className="form-section-title">Socials</h3>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Facebook: </div>
                            <Field
                              name="facebook"
                              type="text"
                              placeholder="http://"
                              className="input-field"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">Twitter: </div>
                            <Field
                              name="twitter"
                              type="text"
                              placeholder="http://"
                              className="input-field"
                            />
                          </div>
                        </div>
                        <div className="input-half">
                          <div className="item-input">
                            <div className="title-field">Telegram: </div>
                            <Field
                              name="telegram"
                              type="text"
                              placeholder="http://"
                              className="input-field"
                            />
                          </div>
                          <div className="item-input">
                            <div className="title-field">Signal: </div>
                            <Field
                              name="signal"
                              type="text"
                              placeholder="http://"
                              className="input-field"
                            />
                          </div>
                        </div>
                      </div>

                      <ListErrors errors={createOrganisationError} />
                      <ListErrors
                        errors={`There is ${
                          Object.keys(form.errors).length
                        } error(s) in the form, please review`}
                      />

                      <Button
                        submit
                        className="submit-btn"
                        type={ButtonTypes.filled}
                        size={ButtonSizes.medium}
                        color={ButtonColors.white}
                        background={ButtonBackgrounds.black}
                        loading={isSubmitting}
                        disabled={isSubmitting}>
                        Submit Edit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          {contextHolder}
        </div>
      ) : (
        <div className="container">
          <Text type="danger">
            You are not admin or owner of this organisation so cannot access to this page
          </Text>
        </div>
      )}
    </AuthWrapper>
  );
};
