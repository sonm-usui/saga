import React, { useEffect, useState } from 'react';
import { Flex, Modal, Spin, message } from 'antd';
import './BuyProjectModal.scss';
import closeIcon from '../../../../../assets/images/pngs/close.png';
import { Button } from '../../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../../Components/UI/Button/enums';
import { useAppDispatch } from '../../../../../store';
import { actionLeavePostPaymentProject } from '../../../../../store/Projects/actions';
import { useSelector } from 'react-redux';
import {
  selectorGetUserBalance,
  selectorGetUserBalanceLoading
} from '../../../../../store/Mastercard/selectors';
import { MtnSvg } from '../../../../../assets/images/svgs/MtnSvg';
import { truncateAddress } from '../../../../../utils';
import { mastercardService } from '../../../../../services';

interface ConfirmModalProps {
  className?: string;
  onClose: () => void;
  projectKey: string;
}

interface ExplorerHash {
  explorer: string;
  hash: string;
}

const ALIAS = 'coalapay-bank-alias1';

const BuyProjectModalDummy: React.FC<ConfirmModalProps> = ({
  className = '',
  onClose,
  projectKey = ''
}) => {
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState(1);
  const [contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const userBalance = useSelector(selectorGetUserBalance);
  const userBalanceLoading = useSelector(selectorGetUserBalanceLoading);
  const { handleGetUserBalance } = mastercardService();
  const [initialBalance, setInitialBalance] = useState(0);

  useEffect(() => {
    handleGetUserBalance(ALIAS);
  }, []);
  // const error = useSelector(selectorPostPaymentProjectErrors);

  useEffect(() => {
    if (userBalance && initialBalance === 0) {
      setInitialBalance(userBalance.balance);
    } else if (userBalance && initialBalance !== userBalance?.balance) {
      setCompleted(true);
    }
  }, [userBalance]);

  const fakeClick = () => {
    window.open('', '_blank', 'noopener,noreferrer');
    setStep(0);
    setCompleted(true);
  };

  return (
    <Modal
      open={true}
      onCancel={() => {
        onClose();
        setCompleted(false);
        setStep(1);
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
        {!completed && (
          <>
            <div className="amount">
              To complete your donation, please navigate to your bank account and add the following
              details
            </div>
            <div className="amount">
              <strong> Alias:</strong> HandsOnHK
            </div>

            <div className="amount">
              <strong> Donation Amount:</strong> 500 USD
            </div>

            <div className="amount">
              <strong> Your Balance:</strong>{' '}
              {userBalanceLoading ? (
                <Flex>
                  {' '}
                  <Spin size="small" />{' '}
                </Flex>
              ) : (
                `${userBalance?.balance} USD`
              )}
            </div>

            <p className="note">
              Once you have completed your payment, click the &quot;Claim NFT&quot; button below to
              mint your proof of funding NFT
            </p>

            <Button
              type={ButtonTypes.filled}
              size={ButtonSizes.smallMedium}
              color={ButtonColors.white}
              background={ButtonBackgrounds.orangeBold}
              loading={userBalanceLoading}
              onClick={() => handleGetUserBalance(ALIAS)}>
              Claim NFT
            </Button>
          </>
        )}

        {completed && (
          <div className="thank-you">
            <div className="success">Success!</div>
            <div className="tks-2">
              Thank you for your support. Your donation has been processed and a unique NFT has been
              minted to recognize your contribution.
            </div>
            <br />
            You can view your NFT here:
            <br />
            <a
              target="_blank"
              rel="noreferrer"
              href={
                'https://opensea.io/assets/ethereum/0xb92391af2c4d89b295695e0b95288dadec04fb4c/0'
              }>
              {truncateAddress({
                address: '0xb92391af2c4d89b295695e0b95288dadec04fb4c',
                countFirst: 8,
                countEnd: 8
              })}
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BuyProjectModalDummy;
