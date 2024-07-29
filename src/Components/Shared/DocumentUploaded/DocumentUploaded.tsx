import React, { useEffect, useState } from 'react';
import './DocumentUploaded.scss';
import { IDocumentItem } from '../../../types/Common.type';
import { filter, map } from 'lodash';
import { DeleteOutlined } from '@ant-design/icons';

interface DocumentUploadedProps {
  documents: IDocumentItem[];
  className?: string;
  onSetFieldValue?: (value: string[]) => void;
  disabled?: boolean;
}

export const DocumentUploaded: React.FC<DocumentUploadedProps> = ({
  documents,
  className = '',
  onSetFieldValue,
  disabled = false
}) => {
  const [documentList, setDocumentList] = useState<IDocumentItem[]>(documents);
  const [removedDocuments, setRemovedDocuments] = useState<IDocumentItem[]>([]);

  useEffect(() => {
    setDocumentList(documents);
  }, [documents]);

  useEffect(() => {
    if (onSetFieldValue) {
      const documentKey = map(removedDocuments, (item: IDocumentItem) => item?.key);
      onSetFieldValue(documentKey);
    }
  }, [removedDocuments]);

  const handleRemoveDocument = (document: IDocumentItem) => {
    const newDocumentList = filter(
      documentList,
      (item: IDocumentItem) => item?.key !== document?.key
    );
    setDocumentList(newDocumentList);

    if (onSetFieldValue) {
      const _removeDocument = filter(
        documents,
        (item: IDocumentItem) => item?.key === document?.key
      );
      setRemovedDocuments([...removedDocuments, ..._removeDocument]);
    }
  };

  return (
    <div className={`document-uploaded ${className}`}>
      <div className="document-uploaded-title">Document Uploaded:</div>
      <div className="document-uploaded-list">
        {map(documentList, (item: IDocumentItem) => {
          return (
            <div className="document-uploaded-list-item" key={item?.key}>
              <a
                href={item?.location}
                target="_blank"
                rel="noopener noreferrer"
                className="document-uploaded-list-item-link">
                {item?.name}
              </a>
              {!disabled && (
                <DeleteOutlined
                  className="document-uploaded-list-item-icon"
                  onClick={() => handleRemoveDocument(item)}
                  disabled={disabled}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
