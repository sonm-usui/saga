import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import './BuyProjectModal.scss';
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
import { ethers } from 'ethers';
import { APP_ENVIRONMENTS } from '../../../../../config';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  actionGetOperatorAddress,
  actionLeaveGetOperatorAddressProject,
  actionLeavePostPaymentProject,
  actionPostPayment
} from '../../../../../store/Projects/actions';
import {
  selectorGetOperaAddress,
  selectorPostPaymentProject,
  selectorPostPaymentProjectErrors
} from '../../../../../store/Projects/selectors';
import { useSelector } from 'react-redux';
import { selectorGetUser } from '../../../../../store/Auth/selectors';
import { MtnSvg } from '../../../../../assets/images/svgs/MtnSvg';
import { truncateAddress } from '../../../../../utils';
import { WhiteListFundProject } from '../../../../../contract/whitelistFundProject';
import { connectEthereumProvider } from '../../../../../utils/ethereum';

interface ConfirmModalProps {
  className?: string;
  onClose: () => void;
  projectKey: string;
}

interface ExplorerHash {
  explorer: string;
  hash: string;
}

const BuyProjectModal: React.FC<ConfirmModalProps> = ({
  className = '',
  onClose,
  projectKey = ''
}) => {
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const providerEth = connectEthereumProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    APP_ENVIRONMENTS.CONTRACT_ADDRESS_MTN,
    APP_ENVIRONMENTS.ABI_ARRAY_MTN,
    signer
  );
  const user = useAppSelector(selectorGetUser);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completeTxnPayment, setCompleteTxnPayment] = useState(false);
  const [completeTxnNft, setCompleteNftTxnNft] = useState(false);
  const [step, setStep] = useState(1);
  const [auth, setAuth] = useState(false);
  const [dataTxn, setDataTxn] = useState({
    issue_nft: { explorer: '', hash: '' },
    payment: { explorer: '', hash: '' }
  });
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const operatorAddress = useSelector(selectorGetOperaAddress);
  const { issue_nft, payment }: { issue_nft: ExplorerHash; payment: ExplorerHash } = useSelector(
    selectorPostPaymentProject
  );
  const error = useSelector(selectorPostPaymentProjectErrors);
  const getOperaAddress = async () => {
    dispatch(actionGetOperatorAddress({ key: projectKey }));
    return () => {
      dispatch(actionLeaveGetOperatorAddressProject());
    };
  };
  const postPaymentProject = async () => {
    dispatch(
      actionPostPayment({
        key: projectKey,
        callback: (isSuccess) => {
          //
        }
      })
    );
    return () => {
      dispatch(actionLeavePostPaymentProject());
    };
  };
  useEffect(() => {
    if (projectKey) {
      getOperaAddress();
    }
  }, [projectKey]);

  const refundProject = async () => {
    if (!user || !user?.digital_wallet_address) return;
    try {
      setLoading(true);
      const txn = await contract.approve(
        operatorAddress?.address,
        ethers.utils.parseUnits('50', 18),
        {
          from: user?.digital_wallet_address,
          value: 0
        }
      );
      await txn.wait(1);
      postPaymentProject();
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (payment && issue_nft) {
      setDataTxn({
        payment: {
          explorer: payment?.explorer,
          hash: payment?.hash
        },
        issue_nft: {
          explorer: issue_nft?.explorer,
          hash: issue_nft?.hash
        }
      });
    }
  }, [payment, issue_nft]);

  useEffect(() => {
    if (error) {
      setLoading(false);
      messageApi.open({
        type: 'error',
        content: error,
        duration: 5
      });
    }
  }, [error]);

  const checkAuth = () => {
    const check = WhiteListFundProject.find(
      (item: any) => item?.address?.toLowerCase() === user?.digital_wallet_address?.toLowerCase()
    );
    if (check) {
      messageApi.open({
        type: 'success',
        content: 'Successfully Verified',
        duration: 2
      });
      setAuth(true);
    } else {
      setAuth(false);
      setStep(2);
    }
  };

  const getTxnReceiptPayment = async () => {
    if (dataTxn?.payment?.hash) {
      const data = await provider.getTransactionReceipt(dataTxn?.payment?.hash);
      if (data?.confirmations > 0 && data?.status === 1) {
        setCompleteTxnPayment(true);
      } else {
        setCompleteTxnPayment(false);
      }
    }
  };

  const getTxnReceipNft = async () => {
    if (dataTxn?.issue_nft?.hash) {
      const data = await providerEth.getTransactionReceipt(dataTxn?.issue_nft?.hash);
      if (data?.confirmations > 0 && data?.status === 1) {
        setCompleteNftTxnNft(true);
      } else {
        setCompleteNftTxnNft(false);
      }
    }
  };

  useEffect(() => {
    let interval: any;
    if (dataTxn && !completeTxnPayment) {
      interval = setInterval(() => {
        getTxnReceiptPayment();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dataTxn, completeTxnPayment]);

  useEffect(() => {
    let interval: any;
    if (dataTxn && !completeTxnNft) {
      interval = setInterval(() => {
        getTxnReceipNft();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dataTxn]);

  useEffect(() => {
    if (completeTxnPayment && completeTxnNft) {
      setTimeout(() => {
        setCompleted(true);
        setLoading(false);
      }, 2000);
    }
  }, [completeTxnPayment, completeTxnNft]);

  return (
    <Modal
      open={true}
      onCancel={() => {
        onClose();
        setCompleted(false);
        setLoading(false);
        setCompleteNftTxnNft(false);
        setCompleteTxnPayment(false);
        setStep(1);
        setAuth(false);
        setDataTxn({
          issue_nft: { explorer: '', hash: '' },
          payment: { explorer: '', hash: '' }
        });
        dispatch(actionLeavePostPaymentProject());
      }}
      className={className}
      footer={null}
      maskClosable={false}
      closeIcon={<img src={closeIcon} alt="close" />}>
      <div className="box-wrap d-flex flex-column align-items-center gap-16">
        <div className="title">
          <MtnSvg /> MTN
        </div>
        {!auth && step === 1 && (
          <Button
            type={ButtonTypes.filled}
            size={ButtonSizes.smallMedium}
            color={ButtonColors.white}
            background={ButtonBackgrounds.orangeBold}
            onClick={checkAuth}>
            Verify MTN Wallet
          </Button>
        )}
        {!auth && step === 2 && <div className="not-auth">Wallet not authorised</div>}
        {auth &&
          (!completed ? (
            <>
              <div className="amount">
                Amount: <span>50 USD</span>
              </div>
              <Button
                type={ButtonTypes.filled}
                size={ButtonSizes.smallMedium}
                color={ButtonColors.white}
                background={ButtonBackgrounds.orangeBold}
                onClick={refundProject}
                disabled={loading}>
                {loading ? 'Processing...' : 'Process Payment'}
              </Button>
              {loading && (
                <>
                  {!dataTxn?.payment?.hash && (
                    <div className="text-progress">1. submitting transaction...</div>
                  )}
                  {dataTxn?.payment?.hash && (
                    <div className="text-progress">
                      1. transaction processed <br />
                      <a target="_blank" rel="noreferrer" href={dataTxn?.payment?.explorer}>
                        {truncateAddress({
                          address: dataTxn?.payment?.hash,
                          countFirst: 8,
                          countEnd: 8
                        })}
                      </a>
                      <br />
                      <br />
                      {!completeTxnNft ? '2. issuing NFT' : '2. NFT transaction processed'}
                      <br />
                      <a target="_blank" rel="noreferrer" href={dataTxn?.issue_nft?.explorer}>
                        {truncateAddress({
                          address: dataTxn?.issue_nft?.hash,
                          countFirst: 8,
                          countEnd: 8
                        })}
                      </a>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="thank-you">
              <div className="success">Success!</div>
              <div className="tks-2">Thank you very much for your generosity.</div>
              <br />
              1. USD transaction <br />
              <a target="_blank" rel="noreferrer" href={dataTxn?.payment?.explorer}>
                {truncateAddress({
                  address: dataTxn?.payment?.hash,
                  countFirst: 8,
                  countEnd: 8
                })}
              </a>
              <br />
              <br />
              2. NFT transaction
              <br />
              <a target="_blank" rel="noreferrer" href={dataTxn?.issue_nft?.explorer}>
                {truncateAddress({
                  address: dataTxn?.issue_nft?.hash,
                  countFirst: 8,
                  countEnd: 8
                })}
              </a>
            </div>
          ))}
      </div>
      {contextHolder}
    </Modal>
  );
};

export default BuyProjectModal;
