import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './PpModal.scss';
import { ButtonBackgrounds, ButtonColors, ButtonSizes, ButtonTypes } from '../../UI/Button/enums';
import { Button } from '../../UI';
import { useNavigate } from 'react-router-dom';
import { APP_ENVIRONMENTS } from '../../../config';

const DOCUMENTS = {
  privacyPolicy: 'https://dqau8nydkhd30.cloudfront.net/static/Privacy_policy.pdf',
  legalProcessingTerms:
    'https://coala-assets.s3.ap-southeast-1.amazonaws.com/static/May_2024_version_Legal_processing_terms_TOS.pdf',
  localStoragePolicy: 'https://dqau8nydkhd30.cloudfront.net/static/Localstorage_policy.pdf'
};

export const PpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAgree = () => {
    localStorage.setItem('PRIVACY_POLICY_AGREED', APP_ENVIRONMENTS.PRIVACY_POLICY_VERSION);
    setIsOpen(false);
  };

  const handleDeny = () => {
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const isAgreed =
      localStorage.getItem('PRIVACY_POLICY_AGREED') === APP_ENVIRONMENTS.PRIVACY_POLICY_VERSION;
    if (!isAgreed) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Modal
      open={isOpen}
      footer={null}
      onCancel={handleDeny}
      maskClosable={false}
      className="pp-modal">
      <h3 className="title text-center">
        Accept Privacy Policy and <br /> Terms of Service
      </h3>
      <p className="description">
        Please read carefully and confirm that you have agreed to the <br />
        <a
          href={DOCUMENTS.privacyPolicy}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href={DOCUMENTS.legalProcessingTerms}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link">
          Legal Processing Terms
        </a>{' '}
        and our{' '}
        <a
          href={DOCUMENTS.localStoragePolicy}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link">
          Local Storage Policy
        </a>{' '}
        . By clicking accept or continuing to use our site, you agree to our Privacy Policy and
        Legal processing terms and for the use of cookies and other similar technologies.
      </p>
      <div className="modal-footer">
        <Button
          type={ButtonTypes.filled}
          size={ButtonSizes.small}
          color={ButtonColors.white}
          background={ButtonBackgrounds.black}
          onClick={handleAgree}>
          Agree
        </Button>
        <Button
          type={ButtonTypes.outlined}
          size={ButtonSizes.small}
          color={ButtonColors.black}
          onClick={handleDeny}>
          Deny
        </Button>
      </div>
    </Modal>
  );
};
