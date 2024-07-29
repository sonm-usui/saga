import './OrganizationDocs.scss';
import DocumentUploader from '../../Components/DocumentUploader/DocumentUploader';
import ORG_DOCS from '../../constants/org-documents';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { selectorGetUser } from '../../store/Auth/selectors';
import { marketplaceAccessService, organisationService } from '../../services';
import { useSelector } from 'react-redux';
import {
  selectorGetOrganisationDocuments,
  selectorOrganisationDocumentsLoading
} from '../../store/Organizations/selectors';
import { IOrganizationDocument } from '../../types/Organizations.type';
import { Affix, Card, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ROLES, TOAST_MESSAGES } from '../../config';
import { selectorGetListMarketplaceApprove } from '../../store/MarketplaceAccess/selectors';
import { find } from 'lodash';
import { MarketPlaces } from '../../Components/UI/Button/enums';

const OrganizationDocs = () => {
  const navigate = useNavigate();
  const orgKey = useParams<{ key: string }>()?.key;
  const user = useAppSelector(selectorGetUser);
  const { handleGetOrganisationDocuments } = organisationService();
  const organisationDocuments = useSelector(selectorGetOrganisationDocuments);
  const loading = useSelector(selectorOrganisationDocumentsLoading);
  const listMarketplace = useSelector(selectorGetListMarketplaceApprove);
  const { getListMarketplaceApprove } = marketplaceAccessService();

  useEffect(() => {
    if (user && user?.role === ROLES.ORG && user?.organization_key) {
      getListMarketplaceApprove();
    }
  }, [user]);

  useEffect(() => {
    if (
      listMarketplace &&
      !find(listMarketplace, (item) => item.value === MarketPlaces.NRC_SUDAN)
    ) {
      return navigate('/');
    }
  }, [listMarketplace]);

  useEffect(() => {
    if (!orgKey || !user?.role) return;
    handleGetOrganisationDocuments({ key: orgKey });
  }, [orgKey, user]);

  useEffect(() => {
    Modal.info({
      title: 'Info',
      content: TOAST_MESSAGES.organisation.on_enter_docs
    });
  }, []);

  return (
    <div className="org-docs">
      <div className="container">
        <h3 className="propose-project-title">Documents</h3>
        {!loading && organisationDocuments && (
          <>
            {Object.keys(ORG_DOCS).map((key) => (
              <div key={key} className="doc-item">
                <DocumentUploader
                  documentType={ORG_DOCS[key]}
                  orgKey={orgKey!}
                  initialValues={organisationDocuments?.find(
                    (doc: IOrganizationDocument) => doc.document_type === key
                  )}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrganizationDocs;
