import React, { useEffect, useMemo, useState } from 'react';
import ArrowNext from '../../../../assets/images/svgs/ArrowNext';
import ArrowPrev from '../../../../assets/images/svgs/ArrowPrev';
import { InformationTag } from '../../../../Components/UI/InformationTag/InformationTag';
import { Media } from '../../../../Components/UI/Media/Media';
import {
  displayCountryAddress,
  generatorEtherscanLink,
  monthDiff,
  replaceProjectType
} from '../../../../utils';
import './Detail.scss';
import { find, isEmpty, size } from 'lodash';
import { Button, Typography } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonBorderRadius,
  ButtonColors,
  ButtonSizes,
  ButtonTypes,
  MarketPlaces
} from '../../../../Components/UI/Button/enums';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../../../Components/UI/Typography/enums';
import { IProjectItem } from '../../../../types/Projects.type';
import { Skeleton, Table, message } from 'antd';
import EthereumSvg from '../../../../assets/images/svgs/EthereumSvg';
import CalendarSvg from '../../../../assets/images/svgs/CalendarSvg';
import InfoHeaderSvg from '../../../../assets/images/svgs/InfoHeaderSvg';
import { DollarOutlined, GlobalOutlined } from '@ant-design/icons';
import LeafOrgSvg from '../../../../assets/images/svgs/LeafOrgSvg';
import { Link } from 'react-router-dom';
import { appPaths } from '../../../../constants';
import { APP_ENVIRONMENTS, FUNDING_TYPE } from '../../../../config';
import { CPAY_ABI } from '../../../../contract/coalaPayABI';
import { useSelector } from 'react-redux';
import { selectorGetUser } from '../../../../store/Auth/selectors';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { ERC20_ABI } from '../../../../contract/erc20ABI';
import SuccessModal from '../Modals/SuccessModal/SuccessModal';
import { UsdtSvg } from '../../../../assets/images/svgs/UsdtSvg';
import { formatUnits } from 'ethers/lib/utils';
import { MtnSvg } from '../../../../assets/images/svgs/MtnSvg';
import BuyProjectModal from '../Modals/BuyProjectModal/BuyProjectModal';
import BuyProjectModalDummy from '../Modals/BuyProjectModalDummy/BuyProjectModal';
import { DonorAcceptanceModal } from '../../../../Components/Modals/DonorAcceptanceModal/DonorAcceptanceModal';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface DetailsProps {
  detail: IProjectItem;
  related: IProjectItem[];
}

const { CPAY_CONTRACT, CPAY_SUDAN_CONTRACT, CPAY_PUBLIC_CONTRACT, RPC_URL, CHAIN_ID, CHAIN_NAME } =
  APP_ENVIRONMENTS;

const addressZero = '0x0000000000000000000000000000000000000000';

export const Details: React.FC<DetailsProps> = ({ detail, related }) => {
  const [fundingType, setFundingType] = useState<FUNDING_TYPE>();

  const user = useSelector(selectorGetUser);

  const [nextKey, setNextKey] = useState('');
  const [tokenMinted, setTokenMinted] = useState(true);
  const [loadingFund, setLoadingFund] = useState(true);
  const { account, library, chainId } = useWeb3React();
  const [txnHash, setTxnHash] = useState('');
  const [fundMtnOpen, setFundMtnOpen] = useState(false);

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const contractAddress = useMemo(() => {
    if (detail?.marketplace === MarketPlaces.NRC_SUDAN) {
      return CPAY_SUDAN_CONTRACT;
    }
    if (detail?.marketplace === MarketPlaces.PUBLIC) {
      return CPAY_PUBLIC_CONTRACT;
    }
    return CPAY_CONTRACT;
  }, [detail]);

  const contractCPAYRead = useMemo(() => {
    return new ethers.Contract(contractAddress, CPAY_ABI, provider);
  }, [contractAddress]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isEmpty(detail)) {
        try {
          const tokenInfo = await contractCPAYRead.getTokenInfo(detail?.token_id);
          const price = tokenInfo[0][2];
          const fee = tokenInfo[1];
          const totalPrice = BigInt(price) + BigInt(fee);
          const totalWithFee = parseFloat(formatUnits(totalPrice, 6));
          const userWallet = user.digital_wallet_address;

          const additionalInfo = {
            token: detail?.token_id
          };

          const globalBlockConfig = {
            initPage: 'payments',
            partner: 'coalaPay',
            sourceAmount: totalWithFee,
            sourceCurrency: 'USDT',
            defaultConvertCurrency: 'USDT',
            destination: 'Wallet',
            isSmartContract: true,
            userWalletAddress: userWallet,
            additionalInfo: btoa(JSON.stringify(additionalInfo)),
            payNowCompanyName: 'Coala Pay',
            isPayNow: true,
            destinationWallet: contractAddress
          };
          window.startIframe(globalBlockConfig);
        } catch (error) {
          console.error('Failed to fetch token info:', error);
        }
      }
    };

    fetchData();
  }, [detail]);

  useEffect(() => {
    if (detail && size(related)) {
      const ascRelated = [...related].reverse();
      if (size(ascRelated) === 1) {
        return setNextKey(ascRelated[0]?.key);
      }
      if (new Date(detail?.created) < new Date(ascRelated[0]?.created)) {
        return setNextKey(ascRelated[0]?.key);
      }
      if (new Date(detail?.created) > new Date(related[0]?.created)) {
        return setNextKey(ascRelated[0]?.key);
      }
      const itemFind = find(ascRelated, (item, index) => {
        if (
          index > 0 &&
          new Date(detail?.created) > new Date(ascRelated[index - 1]?.created) &&
          new Date(detail?.created) < new Date(ascRelated[index]?.created)
        ) {
          return true;
        }
        return false;
      });
      setNextKey(itemFind?.key || '');
    }
  }, [detail, related]);

  const checkMinted = async () => {
    try {
      const owner = await contractCPAYRead.ownerOf(detail?.token_id);
      setLoadingFund(false);
      if (owner) {
        setTokenMinted(true);
      } else {
        setTokenMinted(false);
      }
    } catch (error: any) {
      setLoadingFund(false);
      setTokenMinted(false);
    }
  };

  useEffect(() => {
    if (detail?.token_id || detail?.token_id === 0) {
      checkMinted();
    }
  }, [detail]);

  const fundFromWallet = async () => {
    if (!account || !user?.digital_wallet_address) return;
    try {
      if (chainId !== CHAIN_ID) {
        return message.error(`Please connect ${CHAIN_NAME}`);
      }
      setLoadingFund(true);
      const tokenId = detail.token_id;
      const contractCPAYWrite = new ethers.Contract(
        contractAddress,
        CPAY_ABI,
        library?.getSigner()
      );
      const tokenInfo = await contractCPAYRead.getTokenInfo(detail?.token_id);
      if (!tokenInfo) {
        return message.error('Error!');
      }

      const paymentToken = tokenInfo[0][1];
      const price = tokenInfo[0][2];
      const fee = tokenInfo[1];
      const totalPrice = BigInt(price) + BigInt(fee);
      let receipt;

      if (paymentToken === addressZero) {
        const etmGas = await contractCPAYRead.estimateGas.mint(
          user.digital_wallet_address,
          tokenId,
          {
            from: account,
            value: totalPrice
          }
        );
        receipt = await (
          await contractCPAYWrite.mint(user.digital_wallet_address, tokenId, {
            from: account,
            value: totalPrice,
            gasLimit: etmGas.mul(150).div(100)
          })
        ).wait();
      } else {
        const erc20Address = tokenInfo[0][1];
        const contractErc20Read = new ethers.Contract(erc20Address, ERC20_ABI, provider);
        const contractErc20Write = new ethers.Contract(
          erc20Address,
          ERC20_ABI,
          library?.getSigner()
        );
        const balanceErc20 = await contractErc20Read.balanceOf(account);
        if (Number(balanceErc20) < Number(totalPrice)) {
          setLoadingFund(false);
          return message.error('Not enough balance');
        }
        const allowance = await contractErc20Read.allowance(account, contractAddress);
        if (Number(allowance) < Number(totalPrice)) {
          const etmApprove = await contractErc20Write.estimateGas.approve(
            contractAddress,
            totalPrice
          );

          await (
            await contractErc20Write.approve(contractAddress, totalPrice, {
              from: account,
              gasLimit: etmApprove.mul(150).div(100)
            })
          ).wait();
        }
        const etmGasMint = await contractCPAYRead.estimateGas.mint(
          user.digital_wallet_address,
          tokenId,
          {
            from: account
          }
        );
        receipt = await (
          await contractCPAYWrite.mint(user.digital_wallet_address, tokenId, {
            from: account,
            gasLimit: etmGasMint.mul(150).div(100)
          })
        ).wait();
      }
      setTxnHash(receipt.transactionHash);
      setTokenMinted(true);
      setLoadingFund(false);
      message.success('Fund Success!');
    } catch (error: any) {
      message.error('Fund Error!');
      setLoadingFund(false);
    }
  };

  const onFundWithBankAaccountClick = () => {
    window.showPopupGbe();
  };

  const promptFunding = (fundingType: FUNDING_TYPE) => {
    setFundingType(fundingType);
  };

  const handleDonorAcceptance = () => {
    switch (fundingType) {
      case 'GLOBAL_BLOCK':
        onFundWithBankAaccountClick();
        break;
      case 'MTN':
        setFundMtnOpen(true);
        break;
      case 'WALLET':
        fundFromWallet();
        break;
      default:
        break;
    }
    setFundingType(undefined);
  };

  interface DataType {
    cost_usd: number;
    delivered_by: string;
    geo_location: string;
    inputs_required: string;
    number_of_supported: string | number;
    planned_activities: string;
    verification_means: string;
    when: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Planned activities',
      dataIndex: 'planned_activities',
      key: 'planned_activities',
      ellipsis: true
    },
    {
      title: 'Cost USD',
      dataIndex: 'cost_usd',
      key: 'cost_usd',
      ellipsis: true
    },
    {
      title: 'Delivered by',
      dataIndex: 'delivered_by',
      key: 'delivered_by',
      ellipsis: true
    },
    {
      title: 'Geo location',
      dataIndex: 'geo_location',
      key: 'geo_location',
      ellipsis: true
    },
    {
      title: 'Inputs required',
      dataIndex: 'inputs_required',
      key: 'inputs_required',
      ellipsis: true
    },
    {
      title: 'Number of supported',
      dataIndex: 'number_of_supported',
      key: 'number_of_supported',
      ellipsis: true
    },

    {
      title: 'Verification means',
      dataIndex: 'verification_means',
      key: 'verification_means',
      ellipsis: true
    },
    {
      title: 'When',
      dataIndex: 'when',
      key: 'when',
      ellipsis: true
    }
  ];

  return (
    <>
      <div
        className={`top-detail ${
          detail?.marketplace !== MarketPlaces.NRC_SUDAN || isEmpty(detail?.main_activities)
            ? 'border-bottom'
            : ''
        }`}>
        <div className="top-detail-left">
          <div className="top-detail-left-thumbnail">
            <Media mediaType="image" src={detail?.image?.original} solidColor="#fe9800" />
          </div>
        </div>
        <div className="top-detail-right">
          <div className="top-navigate">
            <Link to={appPaths.projects.path} className="top-navigate-prev">
              <ArrowPrev className="top-navigate-icon" />
              <span>Back to search</span>
            </Link>
            <Link
              to={nextKey && appPaths.projectDetail.path.replace(':id', nextKey)}
              className="top-navigate-next">
              <span>Next project</span>
              <ArrowNext className="top-navigate-icon" />
            </Link>
          </div>
          {!detail?.name ? (
            <Skeleton active />
          ) : (
            <>
              <Typography
                font={TypographyFonts.agrandir}
                size={TypographySizes.xm}
                color={TypographyColors.black}
                weight={TypographyWeights.medium}
                className="title">
                {detail?.name}
              </Typography>
              <a
                className="contract-link"
                href={generatorEtherscanLink({
                  address: contractAddress
                })}
                target="_blank"
                rel="noopener noreferrer">
                <span>Contract:</span>&nbsp;
                <span>{contractAddress}</span>
              </a>

              <div className="description">{detail?.description_english}</div>

              <div className="price-and-fund">
                <div className="price">
                  <UsdtSvg className="usdt" /> {detail?.fund_eth || 0} USDT
                  <div className="total">
                    Total with processing fee - ${Number(detail?.fund_eth || 0) * 1.05} USDT
                  </div>
                </div>
                <div className="group-fund">
                  {detail?.onchain_metadata?.funded_by ? (
                    <Button
                      type={ButtonTypes.filled}
                      size={ButtonSizes.smallMedium}
                      color={ButtonColors.black}
                      background={ButtonBackgrounds.green}
                      borderRadius={ButtonBorderRadius.br100}
                      className="btn-funded">
                      <DollarOutlined />
                      &nbsp;Funded
                    </Button>
                  ) : (
                    <>
                      <Button
                        type={ButtonTypes.filled}
                        size={ButtonSizes.small}
                        color={ButtonColors.white}
                        background={ButtonBackgrounds.black}
                        className="btn-fund-wallet"
                        disabled={
                          tokenMinted ||
                          loadingFund ||
                          (!detail?.token_id && detail?.token_id !== 0)
                        }
                        loading={loadingFund}
                        onClick={() => promptFunding('WALLET')}>
                        <EthereumSvg /> Fund from wallet
                      </Button>
                      <Button
                        type={ButtonTypes.filled}
                        size={ButtonSizes.small}
                        color={ButtonColors.white}
                        background={ButtonBackgrounds.black}
                        className="btn-fund-mtn"
                        onClick={() => promptFunding('GLOBAL_BLOCK')}>
                        Fund from bank account
                      </Button>
                    </>
                  )}

                  {/* <Button
                    type={ButtonTypes.filled}
                    size={ButtonSizes.small}
                    color={ButtonColors.white}
                    background={ButtonBackgrounds.black}
                    className="btn-fund-mtn"
                    onClick={() => promptFunding('MTN')}>
                    <MtnSvg /> Fund with MTN
                  </Button> */}
                </div>
              </div>

              <div className="bottom-tags">
                <InformationTag type="filled">
                  <CalendarSvg />
                  {monthDiff(detail?.start_date, detail?.end_date, detail?.period_of_delivery)}
                </InformationTag>
                <InformationTag type="filled">
                  <InfoHeaderSvg fill="#1D1B1E" />
                  {detail?.estimated_beneficiaries}
                </InformationTag>
                <InformationTag type="filled">
                  <GlobalOutlined />{' '}
                  {displayCountryAddress(detail?.country, detail?.state, detail?.township)}
                </InformationTag>
                <InformationTag type="filled">
                  <LeafOrgSvg /> {replaceProjectType(detail?.type)}
                </InformationTag>
                {/* <InformationTag type="filled">
                $ {detail?.estimated_beneficiaries || 0} GBP
              </InformationTag> */}
              </div>
            </>
          )}
        </div>

        <SuccessModal
          isOpen={!!txnHash}
          onClose={() => setTxnHash('')}
          className="success-modal"
          projectName={detail.name}
          txnHash={txnHash}
        />
        {fundMtnOpen && (
          <BuyProjectModalDummy
            onClose={() => setFundMtnOpen(false)}
            projectKey={detail?.key}
            className="payment-modal"
          />
        )}
        <DonorAcceptanceModal
          isOpen={!!fundingType}
          onAccept={handleDonorAcceptance}
          onDeny={() => setFundingType(undefined)}
        />
      </div>
      {detail?.marketplace === MarketPlaces.NRC_SUDAN && !isEmpty(detail?.main_activities) && (
        <div className="table-activities">
          <Table
            columns={columns}
            dataSource={detail?.main_activities}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 1300 }}
          />
        </div>
      )}
    </>
  );
};
