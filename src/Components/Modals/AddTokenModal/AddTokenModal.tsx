import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import closeIcon from '../../../assets/images/pngs/close.png';
import './AddTokenModal.scss';
import { Button, Typography } from '../../UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../UI/Typography/enums';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonSpinnerColors,
  ButtonTypes,
  MarketPlaces
} from '../../UI/Button/enums';
import { useAppDispatch, useAppSelector } from '../../../store';
import { actionLeaveRequestAccess } from '../../../store/MarketplaceAccess/actions';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { getOrganizationDetail } from '../../../store/Organizations/actions';
import { IOrganizationItem } from '../../../types/Organizations.type';
import { APP_ENVIRONMENTS } from '../../../config';
import { ethers } from 'ethers';
import { CPAY_ABI } from '../../../contract/coalaPayABI';
import { useWeb3React } from '@web3-react/core';
import { CPAY_ABI_2 } from '../../../contract/coalaPayABI2';
import { values } from 'lodash';
import { generatorEtherscanLink, truncateAddress } from '../../../utils';

interface AddTokenModalProps {
  className?: string;
  onClose: () => void;
  fetchData: () => void;
  projectDetail?: any;
}

const { CPAY_SUDAN_CONTRACT, CPAY_PUBLIC_CONTRACT, USDT_ADDRESS, RPC_URL } = APP_ENVIRONMENTS;

const AddTokenModal: React.FC<AddTokenModalProps> = ({
  className = '',
  onClose,
  fetchData,
  projectDetail
}) => {
  const user = useAppSelector(selectorGetUser);
  const { account, library, chainId } = useWeb3React();
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const dispatch = useAppDispatch();
  const [organizationDetail, setOrganizationDetail] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(actionLeaveRequestAccess());
    };
  }, []);

  useEffect(() => {
    if (projectDetail.organization_key) {
      fetchOrganizationDetail();
    }
  }, [projectDetail]);

  const fetchOrganizationDetail = async () => {
    const data = await getOrganizationDetail({ key: projectDetail?.organization_key });
    setOrganizationDetail(data);
  };

  const contractAddress = useMemo(() => {
    if (projectDetail?.marketplace === MarketPlaces.NRC_SUDAN) {
      return CPAY_SUDAN_CONTRACT;
    }
    if (projectDetail?.marketplace === MarketPlaces.PUBLIC) {
      return CPAY_PUBLIC_CONTRACT;
    }
    return '';
  }, [projectDetail]);

  const contractAddToken = useMemo(() => {
    return new ethers.Contract(contractAddress, CPAY_ABI_2, library?.getSigner());
  }, [contractAddress, library]);

  const addToken = async () => {
    try {
      setIsSubmitting(true);
      const etmGas = await contractAddToken.estimateGas.addToken(
        {
          receiver: organizationDetail?.digital_wallet_address,
          paymentToken: USDT_ADDRESS,
          price: Number(projectDetail?.fund_eth) * 1000000
        },
        projectDetail?.key,
        {
          from: account
        }
      );
      const receipt = await (
        await contractAddToken.addToken(
          {
            receiver: organizationDetail?.digital_wallet_address,
            paymentToken: USDT_ADDRESS,
            price: Number(projectDetail?.fund_eth) * 1000000
          },
          projectDetail?.key,
          {
            from: account,
            gasLimit: etmGas.mul(150).div(100)
          }
        )
      ).wait();

      console.log('receipt: ', receipt);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        fetchData();
      }, 5000);
    } catch (err) {
      setIsSubmitting(false);
      console.log('err: ', err);
    }
  };

  return (
    <div className="add-token-modal-wrapper">
      <Modal
        open
        onCancel={onClose}
        className={`add-token-modal ${className}`}
        footer={null}
        maskClosable={false}
        closeIcon={<img src={closeIcon} alt="close" />}>
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.sm}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="title text-center">
          Add Token
        </Typography>
        <div className="support-form">
          <p>
            Before adding a token for this project, please ensure that the following information is
            correct
          </p>

          <p>
            <strong>Marketplace:</strong>
            &nbsp;
            {projectDetail?.marketplace}
          </p>

          <p>
            <strong>Organisation Name:</strong>
            &nbsp;
            {organizationDetail?.organization_name}
          </p>

          <p>
            <strong>Project Name:</strong>
            &nbsp;
            {projectDetail?.name}
          </p>

          <p>
            <strong>Cost:</strong>
            &nbsp;
            {projectDetail?.fund_eth} USDT
          </p>

          <p>
            <strong>Recipient Address:</strong>
            &nbsp;
            <a
              href={generatorEtherscanLink({
                address: organizationDetail?.digital_wallet_address
              })}>
              {truncateAddress({
                address: organizationDetail?.digital_wallet_address,
                countFirst: 8,
                countEnd: 8
              })}
            </a>
          </p>

          <Button
            className="submit-btn"
            type={ButtonTypes.filled}
            size={ButtonSizes.medium}
            color={ButtonColors.white}
            background={ButtonBackgrounds.black}
            loading={isSubmitting}
            spinnerColor={ButtonSpinnerColors.white}
            disabled={isSubmitting}
            onClick={addToken}>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddTokenModal;
