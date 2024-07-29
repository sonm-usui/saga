import './DocumentUploader.scss';
import {
  Radio,
  Upload,
  Button as ButtonAntd,
  Input,
  Divider,
  message,
  Spin,
  Tag,
  Flex
} from 'antd';
import { IDocumentType } from '../../types/Common.type';
import { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { ALLOWED_FILES_UPLOAD, TOAST_MESSAGES } from '../../config';
import { organisationService } from '../../services';
import { IPutOrganisationDocument } from '../../requests/Organizations/OrganizationsRequest.type';
import { DocumentUploaded } from '../Shared';
import { IOrganizationDocument } from '../../types/Organizations.type';
import { useSelector } from 'react-redux';
import {
  selectorOrganisationDocumentLoading,
  selectorOrganisationDocumentResponse
} from '../../store/Organizations/selectors';
import { RootState } from '../../store';

interface DocumentUploaderProps {
  documentType: IDocumentType;
  orgKey: string;
  initialValues?: IOrganizationDocument;
  className?: string;
}

const DocumentUploader = ({
  orgKey,
  initialValues,
  className,
  documentType
}: DocumentUploaderProps) => {
  const { handleUpdateOrganisationDocument } = organisationService();
  const [complete, setComplete] = useState(!!initialValues?.key);
  const [isEditing, setIsEditing] = useState(false);
  const [existingDocuments, setExistingDocuments] = useState<any[]>([]);
  const [formValue, setFormValue] = useState<IPutOrganisationDocument>({
    response_value: initialValues?.response_value || false,
    response_text: initialValues?.response_text || '',
    documents: [],
    organization_key: orgKey,
    document_type: documentType.key,
    removed_documents: []
  });
  const [messageApi] = message.useMessage();
  const organisationDocument = useSelector((state: RootState) =>
    selectorOrganisationDocumentResponse(state, documentType.key)
  );
  const loading = useSelector((state: RootState) =>
    selectorOrganisationDocumentLoading(state, documentType.key)
  );

  useEffect(() => {
    if (initialValues) {
      resetValues(initialValues);
    }
  }, [initialValues]);

  useEffect(() => {
    if (organisationDocument && isEditing) {
      setComplete(true);
      resetValues(organisationDocument);
      setIsEditing(false);
      message.success(`${documentType.title} successfully updated`);
    }
  }, [organisationDocument]);

  const resetValues = (values: IOrganizationDocument) => {
    setFormValue({
      response_value: values.response_value,
      response_text: values.response_text,
      documents: [],
      organization_key: orgKey,
      document_type: documentType.key,
      removed_documents: []
    });
    setExistingDocuments(values.documents);
  };

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

  const handleFormValueChange = (key: string, value: any) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFileUploadChange = (info: any) => {
    setFormValue((prev) => ({
      ...prev,
      documents: info.fileList
    }));
  };

  const handleSave = async () => await handleUpdateOrganisationDocument(formValue);

  return (
    <div className="document-uploader">
      <div className="document-uploader-header">
        <Flex gap={10}>
          <h3 className="form-section-title">{documentType.title}</h3>
          {!complete && (
            <div>
              <Tag color="red" icon={<ExclamationCircleOutlined />} className="tag">
                Incomplete
              </Tag>
            </div>
          )}
        </Flex>
        {!isEditing ? (
          <ButtonAntd type="primary" onClick={() => setIsEditing(true)}>
            Edit
          </ButtonAntd>
        ) : (
          <>
            {loading ? (
              <Spin />
            ) : (
              <div className="button-container">
                <ButtonAntd type="primary" onClick={handleSave}>
                  Save
                </ButtonAntd>
                <ButtonAntd onClick={() => setIsEditing(false)} type="primary" danger>
                  Cancel
                </ButtonAntd>
              </div>
            )}
          </>
        )}
      </div>
      <p className="note">{documentType.description}</p>
      <div className="item-input">
        <Radio.Group
          disabled={!isEditing}
          onChange={() => handleFormValueChange('response_value', !formValue.response_value)}
          value={formValue.response_value}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </div>

      <p className="note">
        {formValue.response_value ? documentType.yesText : documentType.noText}
      </p>

      <div className="item-input">
        <div className="title-field">Response: </div>
        <Input
          disabled={!isEditing}
          name="township"
          type="text"
          placeholder="Enter your response"
          className="input-field"
          onChange={(e) => handleFormValueChange('response_text', e.target.value)}
          value={formValue.response_text}
        />
      </div>

      {!documentType.uploadDisabled && formValue.response_value && (
        <>
          <div className="item-input">
            <div className="title-field">Upload: </div>
            <Upload
              disabled={!isEditing}
              className="upload-input"
              beforeUpload={handleBeforeUpload}
              name="file"
              multiple
              maxCount={5}
              fileList={formValue.documents || []}
              onChange={handleFileUploadChange}>
              <ButtonAntd disabled={!isEditing} icon={<UploadOutlined />}>
                Click to Upload
              </ButtonAntd>
            </Upload>
          </div>

          <DocumentUploaded
            documents={existingDocuments}
            disabled={!isEditing}
            onSetFieldValue={(value) =>
              setFormValue((prev) => ({ ...prev, removed_documents: value }))
            }
          />
        </>
      )}
      <Divider />
    </div>
  );
};

export default DocumentUploader;
