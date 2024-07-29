import React, { useEffect, useRef, useState } from 'react';
import './../ProposeProject.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DatePicker, Upload, message, Button as ButtonAntd } from 'antd';
import { ProposeProjectNrcSudanSchema } from '../../../formik-schemas';
import SelectComponent from '../../../Components/UI/Select/Select';
import { TYPE_OF_OBJECT_OPTIONS } from './../data';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../Components/UI/Button/enums';
import { Button } from '../../../Components/UI';
import { map, size } from 'lodash';
import { COUNTRIES } from './../countries';
import { PreviewProjectModal } from '../../../Components/Modals';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useSelector } from 'react-redux';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { ALLOWED_FILES_UPLOAD, ROLES, TOAST_MESSAGES } from '../../../config';
import dayjs from 'dayjs';
import PhoneInput from 'react-phone-number-input';
import StaffForm from '../../../Components/StaffForm/StaffForm';
import ActivityForm from '../../../Components/ActivityForm/ActivityForm';

const { RangePicker } = DatePicker;

export const ProposeProjectNrcSudan: React.FC<{ marketplace: string }> = ({ marketplace }) => {
  const defaultSelected = {
    value: '',
    label: ''
  };
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [countriesOptions, setCountriesOptions] = useState<object[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(defaultSelected);
  const [selectedState, setSelectedState] = useState<string[]>([]);
  const [dataPreview, setDataPreview] = useState<object>({});
  const [openModalPreview, setOpenModalPreview] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [projectImageFile, setProjectImageFile] = useState<UploadFile | undefined>(undefined);
  const statesOptions = useRef<object[]>([]);

  // use for default date range picker
  const defaultStartDate = dayjs().startOf('month');
  const defaultEndDate = defaultStartDate.clone().endOf('month').add(3, 'month');
  const [defaultPeriod, setDefaultPeriod] = useState([defaultStartDate, defaultEndDate]);

  const user = useSelector(selectorGetUser);
  const formRef = useRef<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const initFormValue = {
    name: '',
    type: '',
    country: '',
    state: '',
    township: '',
    periodOfdelivery: `${defaultStartDate.format('MMM-YYYY')} - ${defaultEndDate.format(
      'MMM-YYYY'
    )}`,
    description: '',
    summary: '',
    beneficiaries: '',
    cost: '',
    start_date: defaultStartDate.toISOString(),
    end_date: defaultEndDate.toISOString(),
    marketplace: marketplace,

    //
    target_group: '',
    project_goal: '',
    key_activities: '',

    main_activities: [
      {
        delivered_by: '',
        geo_location: '',
        inputs_required: '',
        number_of_supported: '',
        planned_activities: '',
        verification_means: '',
        when: '',
        cost_usd: ''
      },
      {
        delivered_by: '',
        geo_location: '',
        inputs_required: '',
        number_of_supported: '',
        planned_activities: '',
        verification_means: '',
        when: '',
        cost_usd: ''
      }
    ],

    activity_reason_and_connection: '',
    supporting_evidence_and_collection_method: '',
    coordination_and_permissions: '',
    accountability_and_feedback: '',
    safety_and_risk_management: '',
    financial_management_experience: '',
    verification_of_results: '',
    support_needed_from_NRC: '',
    long_term_partnership_intent: '',

    budget: ''
  };

  const handleSubmit = (payload: any) => {
    setDataPreview(payload);
    setOpenModalPreview(true);
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

  const beforeUpload = (file: RcFile) => {
    const allowedFiles = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
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

  const handleUploadImage = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file.originFileObj as RcFile, (url: any) => {
      setLoadingUpload(false);
      setImageUrl(url);
      setProjectImageFile(info.file.originFileObj);
    });
  };

  useEffect(() => {
    const countries = map(COUNTRIES, (el) => {
      return {
        value: el.country,
        label: el.country
      };
    });
    setCountriesOptions(countries);
  }, []);

  useEffect(() => {
    if (!selectedCountry?.value) return;
    const country = COUNTRIES.find((el: any) => el.country === selectedCountry?.value);
    const _statesOptions = map(country.states, (state) => {
      return {
        value: state,
        label: state
      };
    });
    statesOptions.current = _statesOptions;
  }, [selectedCountry]);

  useEffect(() => {
    formRef.current?.setFieldValue('type', projectTypes.join(', '));
  }, [projectTypes]);

  useEffect(() => {
    formRef.current?.setFieldValue('state', selectedState.join(', '));
  }, [selectedState]);

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

  return (
    <>
      <div className="propose-project">
        <div className="container">
          <h3 className="propose-project-title">
            Propose a <span>project!</span>
          </h3>

          <div className="propose-project-form">
            <Formik
              innerRef={formRef}
              enableReinitialize
              initialValues={initFormValue}
              validationSchema={ProposeProjectNrcSudanSchema}
              onSubmit={(payload) => {
                handleSubmit(payload);
              }}>
              {(form) => {
                const { values, setFieldValue } = form;
                return (
                  <Form className="propose-project-form-wrapper">
                    <div className="input-half">
                      <div className="item-input">
                        <div className="title-field">Project Name: </div>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Project Name"
                          className="input-field"
                        />
                        <ErrorMessage name="name" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Type of Project :</div>
                        <SelectComponent
                          mode="multiple"
                          options={TYPE_OF_OBJECT_OPTIONS}
                          className="propose-project-select"
                          placeholder="Select type"
                          allowClear
                          onSelectFunc={(value) => {
                            setProjectTypes([...projectTypes, value]);
                          }}
                          onDeselect={(value) => {
                            setProjectTypes(projectTypes.filter((el) => el !== value));
                          }}
                        />
                        <Field
                          name="type"
                          type="text"
                          className="input-field hidden"
                          value={values.type}
                        />
                        <ErrorMessage name="type" className="error-message" component="div" />
                      </div>
                    </div>

                    <div className="input-half">
                      <div className="item-input">
                        <div className="title-field">Country: </div>
                        <SelectComponent
                          options={countriesOptions}
                          defaultValue={selectedCountry}
                          className="propose-project-select"
                          placeholder="Select country"
                          allowClear
                          showSearch={true}
                          onSelectFunc={(_, option) => {
                            setSelectedCountry(option);
                            setSelectedState([]);
                            setFieldValue('country', option?.value);
                          }}
                        />
                        <Field
                          name="country"
                          type="text"
                          placeholder="Your name"
                          value={values.country}
                          className="input-field hidden"
                        />
                        <ErrorMessage name="country" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">State: </div>
                        <SelectComponent
                          mode="multiple"
                          key={selectedCountry?.value}
                          options={statesOptions?.current}
                          defaultValue={selectedState}
                          className="propose-project-select"
                          placeholder="Select state"
                          allowClear
                          onSelectFunc={(value) => {
                            setSelectedState([...selectedState, value]);
                          }}
                          onDeselect={(value) => {
                            setSelectedState(selectedState.filter((el) => el !== value));
                          }}
                        />
                        <Field
                          name="state"
                          type="text"
                          className="input-field hidden"
                          values={values.state}
                        />
                        <ErrorMessage name="state" className="error-message" component="div" />
                      </div>
                    </div>

                    <div className="item-input">
                      <div className="title-field">Township/city: </div>
                      <Field
                        name="township"
                        type="text"
                        placeholder="Enter township"
                        className="input-field"
                      />
                    </div>

                    <div className="input-half">
                      <div className="item-input">
                        <div className="title-field">Period of Delivery: </div>
                        <RangePicker
                          format={'MMM-YYYY'}
                          picker="month"
                          className="input-field"
                          defaultValue={[defaultPeriod[0], defaultPeriod[1]]}
                          onChange={(dates, dateString) => {
                            setFieldValue('periodOfdelivery', dateString.join(' - '));
                            setFieldValue('start_date', dates?.[0]?.startOf('month').toISOString());
                            setFieldValue('end_date', dates?.[1]?.endOf('month').toISOString());
                          }}
                        />
                        <Field
                          name="periodOfdelivery"
                          type="text"
                          className="input-field hidden"
                          value={values.periodOfdelivery}
                        />
                        <ErrorMessage
                          name="periodOfdelivery"
                          className="error-message"
                          component="div"
                        />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Estimated Beneficiaries: </div>
                        <Field
                          name="beneficiaries"
                          type="number"
                          placeholder="Number of beneficiaries"
                          className="input-field"
                        />
                        <ErrorMessage
                          name="beneficiaries"
                          className="error-message"
                          component="div"
                        />
                      </div>
                    </div>

                    <div className="item-input">
                      <div className="title-field">Brief Description: </div>
                      <Field
                        as="textarea"
                        name="description"
                        type="text"
                        placeholder="Enter a short description of your project goal (maximum 400 words)"
                        className="input-field brief-description"
                      />
                      <ErrorMessage name="description" className="error-message" component="div" />
                    </div>

                    <div className="item-input">
                      <div className="title-field">Summary Description: </div>
                      <Field
                        as="textarea"
                        name="summary"
                        type="text"
                        placeholder="Please describe your project in one sentence. Maximum of 50 words"
                        className="input-field summary-description"
                      />
                      <ErrorMessage name="summary" className="error-message" component="div" />
                    </div>

                    <div className="item-input">
                      <div className="title-field">Cost (USD): </div>
                      <Field
                        name="cost"
                        type="number"
                        placeholder="Enter cost"
                        className="input-field"
                      />
                      <ErrorMessage name="cost" className="error-message" component="div" />
                    </div>

                    {user?.role === ROLES.ADMIN && (
                      <div className="item-input">
                        <div className="title-field">Project Thumbnail:</div>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          beforeUpload={beforeUpload}
                          showUploadList={false}
                          onChange={handleUploadImage}>
                          {imageUrl ? (
                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </div>
                    )}

                    <div className="item-input">
                      <div className="title-field">Target group: </div>
                      <Field
                        as="textarea"
                        name="target_group"
                        type="text"
                        placeholder="Briefly describe the target group, any vulnerabilities, their location"
                        className="input-field brief-description"
                      />
                      <ErrorMessage name="target_group" className="error-message" component="div" />
                    </div>

                    <div className="item-input">
                      <div className="title-field">Project goal and objective: </div>
                      <Field
                        as="textarea"
                        name="project_goal"
                        type="text"
                        placeholder="What are you trying to achieve and why are you doing this, what do you anticipate will be the short and long-term impacts?  "
                        className="input-field brief-description"
                      />
                      <ErrorMessage name="project_goal" className="error-message" component="div" />
                    </div>

                    <div className="item-input">
                      <div className="title-field">Key activities: </div>
                      <Field
                        as="textarea"
                        name="key_activities"
                        type="text"
                        placeholder="Topline activities linked to the objective of the project"
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="key_activities"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="title-section">
                      Main Activities<div className="note">Enter planned activities.</div>
                    </div>
                    <ActivityForm
                      form={form}
                      formKey="main_activities"
                      canAdd={true}
                      minimumEntries={0}
                    />

                    {/*  */}

                    <div className="title-section">
                      Please answer the following questions in as much detail as possible
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        Why have you chosen this activity and what connection do you have with the
                        intended recipients?:
                      </div>
                      <Field
                        as="textarea"
                        name="activity_reason_and_connection"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="activity_reason_and_connection"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        What information or evidence do you have that supports the needs you have
                        identified? And how this information was gathered?
                      </div>
                      <Field
                        as="textarea"
                        name="supporting_evidence_and_collection_method"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="supporting_evidence_and_collection_method"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        Is this initiative coordinated with other interventions and actors in your
                        area including local government? Have you secured any permissions necessary
                        to complete your activities?
                      </div>
                      <Field
                        as="textarea"
                        name="coordination_and_permissions"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="coordination_and_permissions"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        How will you ensure accountability to the affected population, how will
                        beneficiaries be involved in designing and delivering activities? How will
                        you seek feedback on the activities that you are delivering?
                      </div>
                      <Field
                        as="textarea"
                        name="accountability_and_feedback"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="accountability_and_feedback"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        What safety and security measures have been considered to protect all
                        project’s participants? How will you manage any risks?
                      </div>
                      <Field
                        as="textarea"
                        name="safety_and_risk_management"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="safety_and_risk_management"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        Do you have experience with financial management and financial reporting?
                        Please explain how the FMG/D will be managed.
                      </div>
                      <Field
                        as="textarea"
                        name="financial_management_experience"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="financial_management_experience"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        How will you show that the activities you propose have been completed and
                        your results achieved? What Means of Verification will you provide? (N.B.
                        these will be included in the Agreement and NRC can provide suggested
                        options for you to consider)
                      </div>
                      <Field
                        as="textarea"
                        name="verification_of_results"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="verification_of_results"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        Is there any support (e.g. new technical skills, temporary use of equipment,
                        connections or introductions, management capacity) you will need from NRC to
                        implement this project? If yes, please specify.
                      </div>
                      <Field
                        as="textarea"
                        name="support_needed_from_NRC"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="support_needed_from_NRC"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">
                        Are you aiming to use the FMG/D as a pilot for a longer-term partnership
                        with NRC?
                      </div>
                      <Field
                        as="textarea"
                        name="long_term_partnership_intent"
                        type="text"
                        placeholder=""
                        className="input-field brief-description"
                      />
                      <ErrorMessage
                        name="long_term_partnership_intent"
                        className="error-message"
                        component="div"
                      />
                    </div>

                    <div className="item-input">
                      <div className="title-field">Budget:</div>
                      <div className="note">Please upload the line item budget for this grant.</div>
                      <Upload
                        className="upload-input"
                        beforeUpload={handleBeforeUpload}
                        name="files"
                        multiple
                        maxCount={1}
                        onChange={(info) => {
                          setFieldValue(
                            'budget',
                            size(info.fileList) ? info.fileList[0].originFileObj : ''
                          );
                        }}>
                        <ButtonAntd icon={<UploadOutlined />}>Click to Upload</ButtonAntd>
                      </Upload>
                      <ErrorMessage name="budget" className="error-message" component="div" />
                    </div>

                    {!user?.digital_wallet_address && (
                      <div className="error-message">Please connect wallet and login first</div>
                    )}

                    <Button
                      submit
                      className="submit-btn"
                      type={ButtonTypes.filled}
                      size={ButtonSizes.medium}
                      color={ButtonColors.purple}
                      background={ButtonBackgrounds.white}
                      disabled={!user?.digital_wallet_address}>
                      Save & Preview
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <PreviewProjectModal
        projects={{ ...dataPreview, imageUrl, projectImageFile }}
        isOpen={openModalPreview}
        onClose={() => setOpenModalPreview(false)}
        formRef={formRef}
      />
      {contextHolder}
    </>
  );
};
