import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import closeIcon from '../../../assets/images/pngs/close.png';

import './SurveyForm.scss';
import { useSelector } from 'react-redux';
import { SurveySchema1, SurveySchema2, SurveySchema3, SurveySchema4 } from '../../formik-schemas';
import { useAppDispatch } from '../../store';
import { actionPostSurvey, actionLeavePostSurvey } from '../../store/Common/actions';
import { selectorPostSurveyError } from '../../store/Common/selectors';
import { ListErrors } from '../Shared';
import {
  ButtonTypes,
  ButtonSizes,
  ButtonColors,
  ButtonBackgrounds,
  ButtonSpinnerColors
} from '../UI/Button/enums';
import SelectComponent from '../UI/Select/Select';
import {
  TypographyFonts,
  TypographySizes,
  TypographyColors,
  TypographyWeights
} from '../UI/Typography/enums';
import { DATA } from './data';
import { Button, Typography } from '../UI';

interface SurveyFormProps {
  className?: string;
}

interface IFormSurveyValue {
  name: string;
  role: string;
  investorType: string;
  companyName: string;
  companyWebsite: string;
  organizationName: string;
  organizationWebsite: string;
  etaMonthlyTxnVol: string;
  email: string;
}

const initFormValue: IFormSurveyValue = {
  name: '',
  role: '',
  investorType: '',
  companyName: '',
  companyWebsite: '',
  organizationName: '',
  organizationWebsite: '',
  etaMonthlyTxnVol: '',
  email: ''
};

interface ISelectOption {
  value: string;
  label: string;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<ISelectOption>({
    value: '',
    label: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surveySuccess, setSurveySuccess] = useState<boolean>(false);
  const surveyErrors = useSelector(selectorPostSurveyError);

  const schemas = useMemo(() => {
    switch (selected.value) {
      case '1':
        return SurveySchema1;
      case '2':
        return SurveySchema2;
      case '3':
        return SurveySchema3;

      default:
        return SurveySchema4;
    }
  }, [selected.value]);

  const handleSubmit = async (
    payload: any,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void
  ) => {
    const params = {
      option: Number(selected.value),
      name: payload.name,
      email: payload.email,
      investor_type: payload.investorType,
      role: payload.role,
      company_name: payload.companyName,
      company_website: payload.companyWebsite,
      est_txn_month_volume: payload.etaMonthlyTxnVol,
      organisation_name: payload.organizationName,
      organisation_website: payload.organizationWebsite
    };
    setIsLoading(true);
    dispatch(
      actionPostSurvey({
        params,
        callback: (isSuccess) => {
          if (isSuccess) {
            setIsLoading(false);
            setSubmitting(true);
            resetForm();
            setSurveySuccess(true);
          }
        }
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(actionLeavePostSurvey());
    };
  }, []);

  return (
    <div className="survey-form-wrapper">
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.sm}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="title text-center">
        {surveySuccess ? 'Success!' : 'Tell us about you:'}
      </Typography>

      {surveySuccess && (
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.sm}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="title text-center">
          Thank you for the survey
        </Typography>
      )}

      {!surveySuccess && (
        <>
          <SelectComponent
            options={DATA}
            className="survey-select"
            placeholder="Select..."
            allowClear
            disabled={isLoading}
            onSelectFunc={(_, option) => {
              setSelected({ ...option, value: option.value.toString() });
            }}
          />

          {selected.value && (
            <div className="survey-form">
              {DATA[Number(selected.value) - 1]?.description && (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: DATA[Number(selected.value) - 1]?.description
                  }}
                />
              )}
              <Formik
                initialValues={initFormValue}
                validationSchema={schemas}
                onSubmit={(payload, { setSubmitting, resetForm }) => {
                  handleSubmit(payload, setSubmitting, resetForm);
                }}>
                {({ isSubmitting, errors }) => {
                  return (
                    <Form className="form-wrapper">
                      <div className="form">
                        <div className="item-input">
                          <div className="title-field">Name: </div>
                          <Field
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className={`input-field ${errors.name ? 'error' : ''}`}
                          />
                          <ErrorMessage name="name" className="error-message" component="div" />
                        </div>

                        {selected.value !== '1' && (
                          <div className="item-input">
                            <div className="title-field">Role: </div>
                            <Field
                              name="role"
                              type="text"
                              placeholder="Role"
                              className={`input-field ${errors.role ? 'error' : ''}`}
                            />
                            <ErrorMessage name="role" className="error-message" component="div" />
                          </div>
                        )}

                        {selected.value === '1' && (
                          <div className="item-input">
                            <div className="title-field">Investor type: </div>
                            <Field
                              name="investorType"
                              type="text"
                              placeholder="Angle, VC, Other"
                              className={`input-field ${errors.investorType ? 'error' : ''}`}
                            />
                            <ErrorMessage
                              name="investorType"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        )}
                        {(selected.value === '2' || selected.value === '3') && (
                          <>
                            <div className="item-input">
                              <div className="title-field">Company name: </div>
                              <Field
                                name="companyName"
                                type="text"
                                placeholder="Company Name"
                                className={`input-field ${errors.companyName ? 'error' : ''}`}
                              />
                              <ErrorMessage
                                name="companyName"
                                className="error-message"
                                component="div"
                              />
                            </div>
                            <div className="item-input">
                              <div className="title-field">Company website: </div>
                              <Field
                                name="companyWebsite"
                                type="text"
                                placeholder="Company Website"
                                className={`input-field ${errors.companyWebsite ? 'error' : ''}`}
                              />
                              <ErrorMessage
                                name="companyWebsite"
                                className="error-message"
                                component="div"
                              />
                            </div>
                          </>
                        )}

                        {selected.value === '2' && (
                          <div className="item-input">
                            <div className="title-field">Estimate volume: </div>
                            <Field
                              name="etaMonthlyTxnVol"
                              type="text"
                              placeholder="Estimate monthly transaction vol"
                              className={`input-field ${errors.etaMonthlyTxnVol ? 'error' : ''}`}
                            />
                            <ErrorMessage
                              name="etaMonthlyTxnVol"
                              className="error-message"
                              component="div"
                            />
                          </div>
                        )}

                        {(selected.value === '4' ||
                          selected.value === '5' ||
                          selected.value === '6') && (
                          <>
                            <div className="item-input">
                              <div className="title-field">Organisation Name: </div>
                              <Field
                                name="organizationName"
                                type="text"
                                placeholder="Organisation Name"
                                className={`input-field ${errors.organizationName ? 'error' : ''}`}
                              />
                              <ErrorMessage
                                name="organizationName"
                                className="error-message"
                                component="div"
                              />
                            </div>
                            <div className="item-input">
                              <div className="title-field">Organisation Website: </div>
                              <Field
                                name="organizationWebsite"
                                type="text"
                                placeholder="Organisation Website"
                                className={`input-field ${
                                  errors.organizationWebsite ? 'error' : ''
                                }`}
                              />
                              <ErrorMessage
                                name="organizationWebsite"
                                className="error-message"
                                component="div"
                              />
                            </div>
                          </>
                        )}
                        <div className="item-input">
                          <div className="title-field">Your email: </div>
                          <Field
                            name="email"
                            type="text"
                            placeholder="Your email"
                            className={`input-field ${errors.name ? 'error' : ''}`}
                          />
                          <ErrorMessage name="email" className="error-message" component="div" />
                        </div>
                      </div>
                      <ListErrors errors={errors} />
                      <Button
                        submit
                        className="submit-btn"
                        type={ButtonTypes.filled}
                        size={ButtonSizes.medium}
                        color={ButtonColors.white}
                        background={ButtonBackgrounds.black}
                        loading={isSubmitting}
                        spinnerColor={ButtonSpinnerColors.white}
                        disabled={isSubmitting}>
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SurveyForm;
