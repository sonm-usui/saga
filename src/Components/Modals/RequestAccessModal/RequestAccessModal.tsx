import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import closeIcon from '../../../assets/images/pngs/close.png';
import './RequestAccessModal.scss';
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
import { useAppDispatch, useAppSelector } from '../../../store';
import { ListErrors } from '../../Shared';
import { marketplaceAccessService } from '../../../services';
import { actionLeaveRequestAccess } from '../../../store/MarketplaceAccess/actions';
import { RequestAccessSchema } from '../../../formik-schemas/requestAccess.schema';
import {
  selectorGetListOptions,
  selectorPostRequestAccessErrors
} from '../../../store/MarketplaceAccess/selectors';
import SelectComponent from '../../UI/Select/Select';
import { selectorGetUser } from '../../../store/Auth/selectors';

interface RequestAccessModalProps {
  className?: string;
  onClose: () => void;
  fetchData?: () => void;
  requestData?: any;
}

interface IFormRequestAccess {
  marketplace: string;
}

const initFormValue: IFormRequestAccess = {
  marketplace: ''
};

const RequestAccessModal: React.FC<RequestAccessModalProps> = ({
  className = '',
  onClose,
  fetchData,
  requestData
}) => {
  const user = useAppSelector(selectorGetUser);
  const dispatch = useAppDispatch();
  const requestErrors = useSelector(selectorPostRequestAccessErrors);
  const { handleRequestAccess, getListOptionsByUser } = marketplaceAccessService();
  const optionsList = useSelector(selectorGetListOptions);

  useEffect(() => {
    return () => {
      dispatch(actionLeaveRequestAccess());
    };
  }, []);

  useEffect(() => {
    if (user) {
      getListOptionsByUser(requestData);
    }
  }, [user]);

  return (
    <div className="request-access-modal-wrapper">
      <Modal
        open
        onCancel={onClose}
        className={`request-access-modal ${className}`}
        footer={null}
        maskClosable={false}
        closeIcon={<img src={closeIcon} alt="close" />}>
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.sm}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="title text-center">
          Request Access
        </Typography>
        <div className="support-form">
          <Formik
            initialValues={initFormValue}
            validationSchema={RequestAccessSchema}
            onSubmit={(payload, { setSubmitting, resetForm }) => {
              handleRequestAccess({
                params: { ...payload, ...requestData },
                setSubmitting,
                resetForm,
                onClose,
                fetchData
              });
            }}>
            {({ values, isSubmitting, errors, setFieldValue }) => {
              return (
                <Form className="form-wrapper">
                  <div className="form">
                    <div className="item-input">
                      <div className="title-field">Marketplace: </div>
                      <SelectComponent
                        options={optionsList}
                        className="request-access-select"
                        placeholder="Select marketplace"
                        allowClear
                        showSearch={false}
                        initialValue={values?.marketplace}
                        onSelectFunc={(_, option) => {
                          setFieldValue('marketplace', option?.value);
                        }}
                      />
                      <Field
                        name="marketplace"
                        type="text"
                        placeholder="Your name"
                        value={values.marketplace}
                        className="input-field hidden"
                      />
                      <ErrorMessage name="marketplace" className="error-message" component="div" />
                    </div>
                    {requestErrors && <ListErrors errors={requestErrors} />}
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
      </Modal>
    </div>
  );
};

export default RequestAccessModal;
