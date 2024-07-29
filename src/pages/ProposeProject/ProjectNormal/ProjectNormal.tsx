import React, { useEffect, useRef, useState } from 'react';
import './../ProposeProject.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DatePicker, Upload, message } from 'antd';
import { ProposeProjectSchema } from '../../../formik-schemas';
import SelectComponent from '../../../Components/UI/Select/Select';
import { TYPE_OF_OBJECT_OPTIONS } from './../data';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../Components/UI/Button/enums';
import { Button } from '../../../Components/UI';
import { map } from 'lodash';
import { COUNTRIES } from './../countries';
import { PreviewProjectModal } from '../../../Components/Modals';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useSelector } from 'react-redux';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { ROLES, TOAST_MESSAGES } from '../../../config';
import dayjs from 'dayjs';
import PhoneInput from 'react-phone-number-input';

const { RangePicker } = DatePicker;

export const ProposeProjectNormal: React.FC<{ marketplace: string }> = ({ marketplace }) => {
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
    facebook: '',
    twitter: '',
    telegram: '',
    mobile_numbers: '',
    start_date: defaultStartDate.toISOString(),
    end_date: defaultEndDate.toISOString(),
    marketplace: marketplace
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
              validationSchema={ProposeProjectSchema}
              onSubmit={(payload) => {
                handleSubmit(payload);
              }}>
              {({ values, setFieldValue }) => {
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
                        placeholder="Enter a short description of your project goals and activities (maximum 400 words)."
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

                    <div className="input-half">
                      <div className="item-input">
                        <div className="title-field">Facebook:</div>
                        <Field
                          name="facebook"
                          type="text"
                          placeholder="https://"
                          className="input-field"
                        />
                        <ErrorMessage name="facebook" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Telegram: </div>
                        <Field
                          name="telegram"
                          type="text"
                          placeholder="https://"
                          className="input-field"
                        />
                        <ErrorMessage name="telegram" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Twitter: </div>
                        <Field
                          name="twitter"
                          type="text"
                          placeholder="https://"
                          className="input-field"
                        />
                        <ErrorMessage name="twitter" className="error-message" component="div" />
                      </div>
                      <div className="item-input">
                        <div className="title-field">Signal: </div>
                        <PhoneInput
                          value={values.mobile_numbers}
                          defaultCountry="MM"
                          placeholder="Enter Mobile Number"
                          international
                          className="input-field mobile-number-field"
                          onChange={(e) => setFieldValue('mobile_numbers', e)}
                        />
                        <Field
                          name="mobile_numbers"
                          type="text"
                          placeholder="Enter Mobile Number"
                          className="input-field hidden"
                        />
                        <ErrorMessage
                          name="mobile_numbers"
                          className="error-message"
                          component="div"
                        />
                      </div>
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
