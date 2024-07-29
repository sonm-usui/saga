import React from 'react';
import { Modal } from 'antd';
import './SuccessModal.scss';
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
import { generatorEtherscanLink, truncateAddress } from '../../../../../utils';

interface SuccessModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  txnHash: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  className = '',
  isOpen,
  onClose,
  projectName,
  txnHash
}) => {
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
        Thanks for funding {projectName}
      </Typography>
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.s}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="text text-center">
        <>
          {`Need to know more about your impact? Email evaluation@coalapay.org to request pricing.`}
          <br />
          <br />
          {`View your Proof of Funding NFT here:`}
          <br />
          <a
            href={generatorEtherscanLink({ transactionHash: txnHash })}
            target="_blank"
            rel="noopener noreferrer">
            <span className="text-link cursor">
              {generatorEtherscanLink({
                transactionHash: truncateAddress({ address: txnHash, countEnd: 8, countFirst: 8 })
              })}
            </span>
          </a>
        </>
      </Typography>
      <div className="box-wrap d-flex flex-column align-items-center gap-16">
        <div className="wrap-buttons d-flex flex-column-reverse align-items-center gap-16">
          <Button
            type={ButtonTypes.filled}
            size={ButtonSizes.smallMedium}
            color={ButtonColors.white}
            background={ButtonBackgrounds.black}
            onClick={onClose}
            className="btn-yes">
            {`Close`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
