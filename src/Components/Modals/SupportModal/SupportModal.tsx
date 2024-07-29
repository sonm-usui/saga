import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import closeIcon from '../../../assets/images/pngs/close.png';
import './SupportModal.scss';
import { Button, Typography } from '../../UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../UI/Typography/enums';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonSpinnerColors,
  ButtonTypes
} from '../../UI/Button/enums';
import { useSelector } from 'react-redux';
import { selectorPostSupportError } from '../../../store/Common/selectors';
import { useAppDispatch } from '../../../store';
import { actionLeavePostSupport, actionPostSupport } from '../../../store/Common/actions';
import { ListErrors } from '../../Shared';
import { SupportSchema } from '../../../formik-schemas/support.schema';

interface SurveyModalProps {
  className?: string;
  onClose: () => void;
}

interface IFormSurveyValue {
  email: string;
  message: string;
}

const initFormValue: IFormSurveyValue = {
  email: '',
  message: ''
};

const SupportModal: React.FC<SurveyModalProps> = ({ className = '', onClose }) => {
  const dispatch = useAppDispatch();
  const [supportSuccess, setSupportSuccess] = useState<boolean>(false);
  const supportErrors = useSelector(selectorPostSupportError);

  const handleSubmit = async (
    payload: any,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void
  ) => {
    const params = {
      email: payload.email,
      message: payload.message
    };
    dispatch(
      actionPostSupport({
        params,
        callback: (isSuccess) => {
          if (isSuccess) {
            setSubmitting(true);
            resetForm();
            setSupportSuccess(true);
          }
        }
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(actionLeavePostSupport());
    };
  }, []);

  return (
    <div className="support-modal-wrapper">
      <Modal
        open
        onCancel={onClose}
        className={`support-modal ${className}`}
        footer={null}
        maskClosable={false}
        closeIcon={<img src={closeIcon} alt="close" />}>
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.sm}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="title text-center">
          {supportSuccess ? 'Success!' : 'Need support?'}
        </Typography>
        {supportSuccess && (
          <Typography
            font={TypographyFonts.agrandir}
            size={TypographySizes.sm}
            color={TypographyColors.black}
            weight={TypographyWeights.medium}
            className="sub-title text-center">
            Someone from our team will be in touch with you shortly.
          </Typography>
        )}
        {!supportSuccess && (
          <div className="support-form">
            <div className="description">
              Submit this form and our team will reach out as soon as possible
            </div>
            <Formik
              initialValues={initFormValue}
              validationSchema={SupportSchema}
              onSubmit={(payload, { setSubmitting, resetForm }) => {
                handleSubmit(payload, setSubmitting, resetForm);
              }}>
              {({ isSubmitting, errors }) => {
                return (
                  <Form className="form-wrapper">
                    <div className="form">
                      <div className="item-input">
                        <div className="title-field">Your email: </div>
                        <Field
                          name="email"
                          type="text"
                          placeholder="Your email"
                          className={`input-field ${errors.email ? 'error' : ''}`}
                        />
                        <ErrorMessage name="email" className="error-message" component="div" />
                      </div>

                      <div className="item-input">
                        <div className="title-field">Message: </div>
                        <Field
                          name="message"
                          type="text"
                          as="textarea"
                          placeholder="Message"
                          className={`input-field ${errors.message ? 'error' : ''}`}
                        />
                        <ErrorMessage name="message" className="error-message" component="div" />
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
      </Modal>
    </div>
  );
};

export default SupportModal;
