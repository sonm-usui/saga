import React, { useEffect, useRef, useState } from 'react';
import './../../DueDiligenceForm.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DueDiligenceFormPrivateSchema } from '../../../../formik-schemas';
import { Upload, message, Radio, Button as ButtonAntd, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/enums';
import SelectComponent from '../../../../Components/UI/Select/Select';
import {
  ORG_COLLABORATE_WITH_ARMED_GROUPS_OPTIONS,
  TYPE_OF_ID_OPTIONS,
  YEARS_OPTIONS
} from './../../data';
import { head, isEmpty, map, size } from 'lodash';
import { COUNTRIES } from '../../../ProposeProject/countries';
import { organisationService } from '../../../../services';
import { useSelector } from 'react-redux';
import { selectorPostCreateOrganisationErrors } from '../../../../store/Organizations/selectors';
import {
  ALLOWED_FILES_UPLOAD,
  CHECKLIST_DUE_DILIGENCE,
  KEY_STAFF_NAMES,
  ROLES,
  TOAST_MESSAGES
} from '../../../../config';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { ListErrors } from '../../../../Components/Shared';
import { PpModal } from '../../../../Components/Modals';
import { selectorGetUser } from '../../../../store/Auth/selectors';
import { useAppSelector } from '../../../../store';
import StaffForm from '../../../../Components/StaffForm/StaffForm';
import { StaffType } from '../../../../requests/Organizations/OrganizationsRequest.type';

export const DueDiligenceFormPrivate: React.FC<{ marketplace: string }> = ({ marketplace }) => {
  const { handleCreateOrganisation, createOrganisationSuccess } = organisationService();
  const createOrganisationError = useSelector(selectorPostCreateOrganisationErrors);
  const user = useAppSelector(selectorGetUser);

  const formRef = useRef<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [orgImageFile, setOrgImageFile] = useState<UploadFile | undefined>(undefined);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const initFormValue = {
    organization_name: '',
    organization_website: '',
    head_name: '',
    head_email: '',
    head_role: '',
    digital_wallet_address: '',
    brief_organization_overview: '',
    organization_sector_description: '',
    organization_registered: false,
    registered_address: '',
    registered_country: '',
    registration_number: '',
    vat_registration_number: '',
    iati_code: '',
    non_registration_attestation_documents: [],
    proofs_of_registration: [],
    has_other_founding_documents: false,
    other_founding_documents: [],
    year_of_establishment: '',
    country_and_areas_of_activities: '',
    // major_income_sources_and_donors: '',
    annual_budget_usd: undefined,
    top_five_donors: '',
    other_financials_documents: [],
    org_responsible_name: '',
    type_of_id_responsible_person: '',
    responsible_person_documents: [],
    responsible_person_other_documents: '',
    has_other_person_manager_digital_wallet: false,
    other_person_manager_digital_wallet_documents: [],
    letter_of_authorization_wallet_funds: [],
    has_collaborated_with_armed_groups: false,
    ways_of_cooperation_with_armed_groups: '',
    services_provided_to_armed_groups: '',
    image: orgImageFile || null,
    facebook: '',
    twitter: '',
    telegram: '',
    signal: '',
    due_diligence_checklist: [],
    staff_members: [],
    key_staff: Object.keys(KEY_STAFF_NAMES).map((staffType) => ({
      type: staffType as StaffType,
      email: '',
      first_name: '',
      last_name: '',
      possition: '',
      mobile_numbers: '',
      dob: new Date()
    })),
    organizational_chart: [],
    staff_provided_social_requirements: false,
    number_of_paid_staff: undefined
  };

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
    <div className="due-diligence">
      <div className="container">
        <h2 className="due-diligence-title">Due Diligence Form</h2>
        <div className="due-diligence-form">
          <Formik
            innerRef={formRef}
            enableReinitialize={false}
            initialValues={initFormValue}
            validationSchema={DueDiligenceFormPrivateSchema}
            onSubmit={(payload, { setSubmitting }) => {
              handleCreateOrganisation({
                params: { ...payload, marketplace, image: orgImageFile },
                setSubmitting
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
                        <ErrorMessage name="head_name" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Your Email: </div>
                        <Field
                          name="head_email"
                          type="text"
                          placeholder="Enter Your Email"
                          className="input-field"
                        />
                        <ErrorMessage name="head_email" className="error-message" component="div" />
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
                        <ErrorMessage name="head_role" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Digital Wallet Address: </div>
                        <Field
                          name="digital_wallet_address"
                          type="text"
                          placeholder="Enter Your Wallet Address"
                          className="input-field"
                        />
                        <ErrorMessage
                          name="digital_wallet_address"
                          className="error-message"
                          component="div"
                        />
                      </div>
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
                      <div className="title-field">
                        {"Description of Main Sector(s) of the Organisation's Activities:"}
                      </div>
                      <p className="note">Enter brief description in less than 100 words</p>
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
                      <div className="title-field">Organisation Image:</div>
                      <p className="note">
                        This could be your organisation’s logo or a photo that represents your work.
                        <br />
                        Organisations that include an image are more likely to receive funding.
                        <br />
                        <br />
                      </p>
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
                          setFieldValue(`organization_registered`, !values.organization_registered);
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
                                <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                              </Upload>
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
                      </div>
                    ) : (
                      <div className="item-input">
                        <div className="title-field">
                          Upload copy of ID for individual responsible for organisations finances:
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
                      </div>
                    )}

                    <div className="item-input">
                      <div className="title-field">
                        Is the individual managing your digital wallet someone different than the
                        individual responsible for organisational finances?{' '}
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
                            onSelectFunc={(_, option) => {
                              setFieldValue('ways_of_cooperation_with_armed_groups', option.value);
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

                  <div className="form-section">
                    <h3 className="form-section-title">Staffing Information</h3>

                    <div className="item-input">
                      <div className="title-field">
                        Please upload your organisational chart / organigram. The organigram should
                        show a clear governance and management structure with reporting lines, roles
                        and responsibilities, as well as to whom management, staff and board are
                        accountable:{' '}
                      </div>
                      <Upload
                        className="upload-input"
                        beforeUpload={handleBeforeUpload}
                        name="files"
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
                  {/* staff members */}

                  <div className="form-section">
                    <h3 className="form-section-title">Staff Members</h3>
                    <p className="note">
                      {
                        "Please complete details for your organisation's key decision makers. List full legal names for all staff. Please note that Coala Pay and its due diligence partner, CertiK, will send an email to key decision makers for them to complete a Know Your Customer (KYC) and liveness check."
                      }
                    </p>
                    <StaffForm form={form} formKey="key_staff" canAdd={false} minimumEntries={3} />
                    <p className="note">
                      {
                        'Please add key implementation staff members (e.g. Project Manager, HR Manager, Finance Manager, Logistics Manager, or equivalent)'
                      }
                    </p>
                    <StaffForm
                      form={form}
                      formKey="staff_members"
                      canAdd={true}
                      minimumEntries={0}
                    />
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
                        <ErrorMessage name="facebook" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Twitter: </div>
                        <Field
                          name="twitter"
                          type="text"
                          placeholder="http://"
                          className="input-field"
                        />
                        <ErrorMessage name="twitter" className="error-message" component="div" />
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
                        <ErrorMessage name="telegram" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Signal: </div>
                        <Field
                          name="signal"
                          type="text"
                          placeholder="http://"
                          className="input-field"
                        />
                        <ErrorMessage name="signal" className="error-message" component="div" />
                      </div>
                    </div>
                  </div>

                  <ListErrors errors={createOrganisationError} />
                  {!isEmpty(form.errors) && (
                    <ListErrors
                      errors={`There is ${
                        Object.keys(form.errors).length
                      } error(s) in the form, please review`}
                    />
                  )}

                  <Button
                    submit
                    className="submit-btn"
                    type={ButtonTypes.filled}
                    size={ButtonSizes.medium}
                    color={ButtonColors.white}
                    background={ButtonBackgrounds.black}
                    loading={isSubmitting}
                    disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {contextHolder}
      <PpModal />
    </div>
  );
};
