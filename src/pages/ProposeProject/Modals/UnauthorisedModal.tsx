import React from 'react';
import { Modal } from 'antd';
import closeIcon from '../../../assets/images/pngs/close.png';
import './UnauthorisedModal.scss';
import { Button, Typography } from '../../../Components/UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../../Components/UI/Typography/enums';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../Components/UI/Button/enums';

interface UnauthorisedModalProps {
  className?: string;
  onClose: () => void;
}

const UnauthorisedModal: React.FC<UnauthorisedModalProps> = ({ className = '', onClose }) => {
  return (
    <div>
      <Modal
        open
        onCancel={onClose}
        className={`unauthorised-modal ${className}`}
        footer={null}
        maskClosable={false}
        closeIcon={<img src={closeIcon} alt="close" />}>
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.sm}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="title text-center">
          Unauthorised
        </Typography>
        <div className="support-form">
          <p>You are unauthorised to view this page</p>

          <Button
            className="submit-btn"
            type={ButtonTypes.filled}
            size={ButtonSizes.medium}
            color={ButtonColors.white}
            background={ButtonBackgrounds.black}
            onClick={onClose}>
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UnauthorisedModal;
