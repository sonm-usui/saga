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

interface ActivityFormProps {
  form: FormikProps<any>;
  formKey: string;
  minimumEntries: number;
  canAdd: boolean;
}
const ActivityForm = ({ form, formKey, minimumEntries, canAdd }: ActivityFormProps) => {
  const { values, setFieldValue } = form;

  return (
    <FieldArray name={formKey}>
      {({ push, remove }) => (
        <>
          {map(values[formKey] as any[], (_, index) => {
            return (
              <div className="activity" key={index}>
                <h3 className="form-section-title">
                  {values[formKey][index].type
                    ? KEY_STAFF_NAMES[values[formKey][index].type as StaffType]
                    : `Activities ${index + 1}`}
                  {index > minimumEntries - 1 && (
                    <Button
                      type={ButtonTypes.outlined}
                      size={ButtonSizes.small}
                      color={ButtonColors.black}
                      onClick={() => remove(index)}>
                      Remove
                    </Button>
                  )}
                </h3>

                <div className="item-input">
                  <div className="title-field">Enter planned activities: </div>
                  <Field
                    as="textarea"
                    name={`${formKey}.${index}.planned_activities`}
                    type="text"
                    placeholder="Enter planned activities"
                    className="input-field"
                  />
                  <ErrorMessage
                    name={`${formKey}.${index}.planned_activities`}
                    className="error-message"
                    component="div"
                  />
                </div>
                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">Precise Geographic Location: </div>
                    <Field
                      name={`${formKey}.${index}.geo_location`}
                      type="text"
                      placeholder="Enter Precise Geographic Location "
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.geo_location`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="item-input">
                    <div className="title-field">When? </div>
                    <Field
                      name={`${formKey}.${index}.when`}
                      type="text"
                      placeholder=""
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.when`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>
                <div className="item-input">
                  <div className="title-field">
                    Enter the person(s) who will deliver this activity{' '}
                  </div>
                  <Field
                    name={`${formKey}.${index}.delivered_by`}
                    type="text"
                    placeholder="Enter the person(s) who will deliver this activity"
                    className="input-field"
                  />
                  <ErrorMessage
                    name={`${formKey}.${index}.delivered_by`}
                    className="error-message"
                    component="div"
                  />
                </div>
                <div className="item-input">
                  <div className="title-field">
                    Number of people to be supported with the activity:
                  </div>
                  <Field
                    name={`${formKey}.${index}.number_of_supported`}
                    type="text"
                    placeholder="Enter number of people to be supported with the activity"
                    className="input-field"
                  />
                  <ErrorMessage
                    name={`${formKey}.${index}.number_of_supported`}
                    className="error-message"
                    component="div"
                  />
                </div>
                <div className="item-input">
                  <div className="title-field">
                    Inputs required - what do you need to complete this activity?
                  </div>
                  <Field
                    as="textarea"
                    name={`${formKey}.${index}.inputs_required`}
                    type="text"
                    placeholder="Enter inputs required"
                    className="input-field"
                  />
                  <ErrorMessage
                    name={`${formKey}.${index}.inputs_required`}
                    className="error-message"
                    component="div"
                  />
                </div>
                <div className="item-input">
                  <div className="title-field">
                    Means of verification - what evidence will you provide to show your
                    achievements?
                  </div>
                  <Field
                    as="textarea"
                    name={`${formKey}.${index}.verification_means`}
                    type="text"
                    placeholder="Enter means of verification"
                    className="input-field"
                  />
                  <ErrorMessage
                    name={`${formKey}.${index}.verification_means`}
                    className="error-message"
                    component="div"
                  />
                </div>
                <div className="item-input">
                  <div className="title-field">Cost USD: </div>
                  <Field
                    name={`${formKey}.${index}.cost_usd`}
                    type="number"
                    placeholder="Enter Cost USDT"
                    className="input-field"
                  />
                  <ErrorMessage
                    name={`${formKey}.${index}.cost_usd`}
                    className="error-message"
                    component="div"
                  />
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
                    delivered_by: '',
                    geo_location: '',
                    inputs_required: '',
                    number_of_supported: '',
                    planned_activities: '',
                    verification_means: '',
                    when: '',
                    cost_usd: ''
                  });
                }
              }}>
              + Add Activity
            </Button>
          )}
        </>
      )}
    </FieldArray>
  );
};

export default ActivityForm;
