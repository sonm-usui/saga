import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import './RequestAdditional.scss';
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
import { organisationService } from '../../../../../services';
import { useAppSelector } from '../../../../../store';
import { selectorPostDonorRequestAdditionalErrors } from '../../../../../store/Organizations/selectors';
import { ListErrors } from '../../../../../Components/Shared';

interface RequestAdditionalProps {
  className?: string;
  isOpen: boolean;
  organisationKey: string;
  onClose: () => void;
}

const STEP = {
  initial: 'initial',
  success: 'success'
};

const RequestAdditional: React.FC<RequestAdditionalProps> = ({
  className = '',
  organisationKey,
  isOpen,
  onClose
}) => {
  const { handleDonorRequestAdditional } = organisationService();
  const donorRequestAdditionalErrors = useAppSelector(selectorPostDonorRequestAdditionalErrors);

  const [step, setStep] = useState(STEP.initial);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const donorRequestAdditional = async () => {
    if (!organisationKey) return;
    setLoadingRequest(true);
    await handleDonorRequestAdditional({
      key: organisationKey,
      onSuccess: () => {
        setStep(STEP.success);
      }
    });
    setLoadingRequest(false);
  };

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
        {step === STEP.success ? 'Request submitted' : 'Request to see documents'}
      </Typography>
      {step === STEP.initial && (
        <>
          <Typography
            font={TypographyFonts.agrandir}
            size={TypographySizes.s}
            color={TypographyColors.black}
            weight={TypographyWeights.medium}
            className="text text-center">
            Sit tight! The local partner needs to review your request. You’ll get a notification
            when they’ve approved it.
          </Typography>
          <div className="box-wrap d-flex flex-column align-items-center gap-16">
            {donorRequestAdditionalErrors && (
              <div className="error-message mb-10">{donorRequestAdditionalErrors}</div>
            )}
            <Button
              type={ButtonTypes.filled}
              size={ButtonSizes.smallMedium}
              color={ButtonColors.white}
              background={ButtonBackgrounds.black}
              loading={loadingRequest}
              onClick={donorRequestAdditional}>
              Yes, submit my request
            </Button>
            <Typography
              font={TypographyFonts.agrandir}
              color={TypographyColors.gray}
              weight={TypographyWeights.medium}
              className="cursor-pointer"
              onClick={onClose}>
              {`I've changed my mind, cancel!`}
            </Typography>
          </div>
        </>
      )}
      {step === STEP.success && (
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.s}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="text text-center">
          Your request has been successfully submitted
        </Typography>
      )}
    </Modal>
  );
};

export default RequestAdditional;
