import React from 'react';
import { Modal } from 'antd';
import './ConfirmModal.scss';
import closeIcon from '../../../../../assets/images/pngs/close.png';
import { Button, Typography } from '../../../../../Components/UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../../../../Components/UI/Typography/enums';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../../Components/UI/Button/enums';
import EthereumSvg from '../../../../../assets/images/svgs/EthereumSvg';

interface ConfirmModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ className = '', isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      className={className}
      footer={null}
      maskClosable={false}
      closeIcon={<img src={closeIcon} alt="close" />}>
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.xm2}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="title text-center">
        Be a part of making <br /> real change happen in <br /> Northern Shan.
      </Typography>
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.s}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="text text-center">
        The purchase price is <EthereumSvg fill="#1d1b1e" />
        &nbsp;1.5ETH <br /> <span className="text-highlight-green">95.98%</span> of this will go
        directly to the beneficiaries. Your effort is appreciated by the whole community.
      </Typography>
      <div className="box-wrap d-flex flex-column align-items-center gap-16">
        <Button
          type={ButtonTypes.filled}
          size={ButtonSizes.smallMedium}
          color={ButtonColors.white}
          background={ButtonBackgrounds.black}>
          Confirm funding
        </Button>
        <Typography
          font={TypographyFonts.agrandir}
          color={TypographyColors.gray}
          weight={TypographyWeights.medium}
          className="cursor-pointer"
          onClick={onClose}>
          {`i've changed my mind, cancel!`}
        </Typography>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
