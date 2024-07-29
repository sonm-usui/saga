import React, { useState } from 'react';
import { Modal } from 'antd';
import './DonorAcceptanceModal.scss';
import { ButtonBackgrounds, ButtonColors, ButtonSizes, ButtonTypes } from '../../UI/Button/enums';
import { Button } from '../../UI';

interface DonorAcceptanceModalProps {
  onAccept: () => void;
  onDeny: () => void;
  isOpen: boolean;
}

export const DonorAcceptanceModal: React.FC<DonorAcceptanceModalProps> = ({
  onAccept,
  onDeny,
  isOpen
}) => {
  return (
    <Modal open={isOpen} footer={null} onCancel={onDeny} maskClosable={false} className="pp-modal">
      <h3 className="title text-center">Donor Terms of Service</h3>
      <p className="description">
        By funding this activity, the donor assumes full responsibility of the smart contract and
        all its contents. Coala Pay bears no responsibility for the transaction
      </p>
      <p className="description">
        {`By proceeding with your donation, you agree to indemnify and hold harmless Coala Pay and its
        affiliates, officers, agents, employees, and partners from any claim or demand, including
        reasonable attorneys' fees, made by any third party due to or arising out of your use of
        Coala Pay's services, your violation of these terms, or your violation of any rights of
        another. Coala Pay does not warrant or assume any legal liability for the accuracy,
        completeness, or usefulness of any information, product, or process disclosed.`}
      </p>
      <div className="modal-footer">
        <Button
          type={ButtonTypes.filled}
          size={ButtonSizes.small}
          color={ButtonColors.white}
          background={ButtonBackgrounds.black}
          onClick={onAccept}>
          Agree
        </Button>
        <Button
          type={ButtonTypes.outlined}
          size={ButtonSizes.small}
          color={ButtonColors.black}
          onClick={onDeny}>
          Deny
        </Button>
      </div>
    </Modal>
  );
};
