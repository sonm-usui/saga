import React, { useRef } from 'react';
import './CreateDonor.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RegisterDonorSchema } from '../../../../formik-schemas';
import { Button } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/enums';
import { AuthWrapper } from '../../../Global';
import { ROLES } from '../../../../config';
import { usersService } from '../../../../services/Users/users.service';
import { useAppSelector } from '../../../../store';
import { selectorGetUser } from '../../../../store/Auth/selectors';
import { selectorAdminCreateUserErrors } from '../../../../store/Users/selectors';
import { ListErrors } from '../../../../Components/Shared';
import { appPaths } from '../../../../constants';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
const { Link } = Typography;

export const CreateDonor: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const { handleCreateUser } = usersService();
  const createUserErrors = useAppSelector(selectorAdminCreateUserErrors);
  const formRef = useRef<any>(null);

  const initFormValue = {
    name: '',
    email: '',
    physical_address: '',
    digital_wallet_address: user.digital_wallet_address || '',
    organization: ''
  };

  return (
    <AuthWrapper role={[ROLES.ADMIN]}>
      <div className="create-donor">
        <div className="container">
          <Link
            href={appPaths.adminDonorsList.path}
            style={{ display: 'block', marginBottom: '12px' }}>
            <ArrowLeftOutlined /> Back to Donors List
          </Link>

          <Formik
            initialValues={initFormValue}
            validationSchema={RegisterDonorSchema}
            innerRef={formRef}
            onSubmit={(payload, { setSubmitting, resetForm }) => {
              const params = {
                ...payload,
                role: ROLES.DONOR
              };
              handleCreateUser({
                params,
                setSubmitting,
                resetForm
              });
            }}>
            {({ isSubmitting }) => (
              <Form className="form-group">
                <h1 className="title">Create Donor Account</h1>
                <div className="form">
                  <div className="item-input">
                    <div className="title-field">Name: </div>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      className="input-field"
                    />
                    <ErrorMessage name="name" className="error-message" component="div" />
                  </div>

                  <div className="item-input">
                    <div className="title-field">Email: </div>
                    <Field
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      className="input-field"
                    />
                    <ErrorMessage name="email" className="error-message" component="div" />
                  </div>

                  <div className="item-input">
                    <div className="title-field">Address: </div>
                    <Field
                      name="physical_address"
                      type="text"
                      placeholder="Enter address"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="physical_address"
                      className="error-message"
                      component="div"
                    />
                  </div>

                  <div className="item-input">
                    <div className="title-field">Digital Wallet Address: </div>
                    <Field
                      name="digital_wallet_address"
                      type="text"
                      placeholder="Enter digital wallet address"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="digital_wallet_address"
                      className="error-message"
                      component="div"
                    />
                  </div>

                  <div className="item-input">
                    <div className="title-field">Organisation: </div>
                    <Field
                      name="organization"
                      type="text"
                      placeholder="Enter organisation"
                      className="input-field"
                    />
                    <ErrorMessage name="organization" className="error-message" component="div" />
                  </div>

                  {createUserErrors && <ListErrors errors={createUserErrors} />}

                  <Button
                    submit
                    className="btn-create-donor"
                    type={ButtonTypes.filled}
                    size={ButtonSizes.medium}
                    color={ButtonColors.white}
                    background={ButtonBackgrounds.black}
                    loading={isSubmitting}
                    disabled={isSubmitting}>
                    Create
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};
