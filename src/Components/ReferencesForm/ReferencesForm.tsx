import { DatePicker, Divider, Upload, message, Button as ButtonAntd } from 'antd';
import dayjs from 'dayjs';
import { FieldArray, Field, ErrorMessage, FormikProps } from 'formik';
import { map, size } from 'lodash';
import { ButtonTypes, ButtonSizes, ButtonColors, ButtonBackgrounds } from '../UI/Button/enums';
import PhoneInput from 'react-phone-number-input';

import { Button } from '../UI';
import { KEY_STAFF_NAMES, KEY_STAFF_REQUIRING_IDENTIFICATION, TOAST_MESSAGES } from '../../config';
import { StaffType } from '../../requests/Organizations/OrganizationsRequest.type';
import { RcFile, UploadFile } from 'antd/es/upload';

interface ReferencesFormProps {
  form: FormikProps<any>;
  formKey: string;
  canAdd: boolean;
}
const ReferencesForm = ({ form, formKey, canAdd }: ReferencesFormProps) => {
  const { values, setFieldValue } = form;

  return (
    <FieldArray name={formKey}>
      {({ push }) => (
        <>
          {map(values[formKey] as any[], (_, index) => {
            return (
              <div className="staff-member" key={index}>
                <h3 className="form-section-title">
                  {values[formKey][index].type
                    ? KEY_STAFF_NAMES[values[formKey][index].type as StaffType]
                    : `Reference ${index + 1}`}
                </h3>

                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">Name: </div>
                    <Field
                      name={`${formKey}.${index}.reference_name`}
                      type="text"
                      placeholder="Enter Name"
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.reference_name`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="item-input">
                    <div className="title-field">Position: </div>
                    <Field
                      name={`${formKey}.${index}.position`}
                      type="text"
                      placeholder="Enter Position"
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.position`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>
                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">Organisation:</div>
                    <Field
                      name={`${formKey}.${index}.organisation`}
                      type="text"
                      className="input-field"
                      placeholder="Enter Organisation"
                      // value={values[formKey][index].organisation}
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.organisation`}
                      className="error-message"
                      component="div"
                    />
                  </div>

                  <div className="item-input">
                    <div className="title-field">Email: </div>
                    <Field
                      name={`${formKey}.${index}.email`}
                      type="text"
                      placeholder="Enter Email"
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.email`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>

                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">Mobile Number: </div>
                    <PhoneInput
                      value={values[formKey][index].mobile_number}
                      defaultCountry="MM"
                      placeholder="Enter Mobile Number"
                      international
                      className="input-field mobile-number-field"
                      onChange={(e) => setFieldValue(`${formKey}.${index}.mobile_number`, e)}
                    />
                    <Field
                      name={`${formKey}.${index}.mobile_number`}
                      type="text"
                      placeholder="Enter Mobile Number"
                      className="input-field hidden"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.mobile_number`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>

                <Divider />
              </div>
            );
          })}
          {canAdd && (
            <Button
              type={ButtonTypes.filled}
              size={ButtonSizes.smallMedium}
              background={ButtonBackgrounds.black}
              color={ButtonColors.white}
              onClick={() => {
                if (size(values[formKey]) < 10 && canAdd) {
                  push({
                    reference_name: '',
                    position: '',
                    organisation: '',
                    email: '',
                    mobile_number: ''
                  });
                }
              }}>
              + Add reference
            </Button>
          )}
        </>
      )}
    </FieldArray>
  );
};

export default ReferencesForm;
