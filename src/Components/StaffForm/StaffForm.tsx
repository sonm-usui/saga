import { DatePicker, Divider, Upload, message, Button as ButtonAntd } from 'antd';
import dayjs from 'dayjs';
import { FieldArray, Field, ErrorMessage, FormikProps } from 'formik';
import { map, size } from 'lodash';
import { ButtonTypes, ButtonSizes, ButtonColors, ButtonBackgrounds } from '../UI/Button/enums';
import PhoneInput from 'react-phone-number-input';

import { Button } from '../../Components/UI';
import {
  ALLOWED_FILES_UPLOAD,
  KEY_STAFF_NAMES,
  KEY_STAFF_REQUIRING_IDENTIFICATION,
  TOAST_MESSAGES
} from '../../config';
import { StaffType } from '../../requests/Organizations/OrganizationsRequest.type';
import { RcFile } from 'antd/es/upload';
import { DocumentUploaded } from '../Shared';

interface StaffFormProps {
  form: FormikProps<any>;
  formKey: string;
  minimumEntries: number;
  canAdd: boolean;
  organisationDetail?: any;
}
const StaffForm = ({
  form,
  formKey,
  minimumEntries,
  canAdd,
  organisationDetail
}: StaffFormProps) => {
  const { values, setFieldValue } = form;
  const [messageApi] = message.useMessage();

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

  const handleFileUploadChange = (info: any, key: string, type: string) => {
    setFieldValue(key, info.fileList);
    if (type === StaffType.CEO) {
      setFieldValue(
        'identification_ceo',
        info.fileList.map((p: any) => p.originFileObj)
      );
    }
    if (type === StaffType.CFO) {
      setFieldValue(
        'identification_cfo',
        info.fileList.map((p: any) => p.originFileObj)
      );
    }
    if (type === StaffType.CHAIR) {
      setFieldValue(
        'identification_chair',
        info.fileList.map((p: any) => p.originFileObj)
      );
    }
  };

  return (
    <FieldArray name={formKey}>
      {({ push, remove }) => (
        <>
          {map(values[formKey] as any[], (_, index) => {
            return (
              <div className="staff-member" key={index}>
                <h3 className="form-section-title">
                  {values[formKey][index].type
                    ? KEY_STAFF_NAMES[values[formKey][index].type as StaffType]
                    : `Members ${index + 1}`}
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

                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">First / Given Name(s): </div>
                    <Field
                      name={`${formKey}.${index}.first_name`}
                      type="text"
                      placeholder="Enter First / Given Name(s)"
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.first_name`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="item-input">
                    <div className="title-field">Surname / Family / Last Name(s): </div>
                    <Field
                      name={`${formKey}.${index}.last_name`}
                      type="text"
                      placeholder="Enter Surname / Family / Last Name(s)"
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.last_name`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>

                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">Email Address: </div>
                    <Field
                      name={`${formKey}.${index}.email`}
                      type="text"
                      placeholder="Enter Email Address"
                      className="input-field"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.email`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="item-input">
                    <div className="title-field">Position :</div>
                    <Field
                      name={`${formKey}.${index}.possition`}
                      type="text"
                      className="input-field"
                      placeholder="Enter Position"
                      value={values[formKey][index].possition}
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.possition`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>

                <div className="input-half">
                  <div className="item-input">
                    <div className="title-field">Mobile Number: </div>
                    <PhoneInput
                      value={values[formKey][index].mobile_numbers}
                      defaultCountry="MM"
                      placeholder="Enter Mobile Number"
                      international
                      className="input-field mobile-number-field"
                      onChange={(e) => setFieldValue(`${formKey}.${index}.mobile_numbers`, e)}
                    />
                    <Field
                      name={`${formKey}.${index}.mobile_numbers`}
                      type="text"
                      placeholder="Enter Mobile Number"
                      className="input-field hidden"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.mobile_numbers`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="item-input">
                    <div className="title-field">Date of Birth: </div>
                    <DatePicker
                      className="input-field"
                      defaultValue={dayjs(values[formKey][index].dob)}
                      onChange={(date) => {
                        setFieldValue(`${formKey}.${index}.dob`, date);
                      }}
                    />
                    <Field
                      name={`${formKey}.${index}.dob`}
                      type="date"
                      placeholder="Enter date of birth"
                      className="input-field hidden"
                    />
                    <ErrorMessage
                      name={`${formKey}.${index}.dob`}
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>
                {KEY_STAFF_REQUIRING_IDENTIFICATION.includes(
                  values[formKey][index].type as StaffType
                ) && (
                  <div className="item-input">
                    <div className="title-field">Copy of National ID or Passport: </div>
                    <Upload
                      disabled={false}
                      className="upload-input"
                      beforeUpload={handleBeforeUpload}
                      name="file"
                      multiple
                      maxCount={5}
                      // fileList={(values[formKey][index].identification as UploadFile[]) || []}
                      onChange={(value) =>
                        handleFileUploadChange(
                          value,
                          `${formKey}.${index}.identification`,
                          values[formKey][index].type
                        )
                      }>
                      <ButtonAntd>Click to Upload</ButtonAntd>
                    </Upload>
                    {organisationDetail?.[formKey] && (
                      <DocumentUploaded
                        documents={organisationDetail?.[formKey][index]?.identification || []}
                        onSetFieldValue={(value) => {
                          setFieldValue(
                            `removed_identification_${values[formKey][index].type}`,
                            value?.join(',')
                          );
                        }}
                      />
                    )}
                  </div>
                )}

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
                    email: '',
                    first_name: '',
                    last_name: '',
                    possition: '',
                    mobile_numbers: '',
                    dob: undefined
                  });
                }
              }}>
              + Add member
            </Button>
          )}
        </>
      )}
    </FieldArray>
  );
};

export default StaffForm;
