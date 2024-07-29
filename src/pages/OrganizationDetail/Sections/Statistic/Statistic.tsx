import React from 'react';
import './Statistic.scss';
import { Typography } from '../../../../Components/UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../../../Components/UI/Typography/enums';
import { map } from 'lodash';
import EthereumSvg from '../../../../assets/images/svgs/EthereumSvg';
interface StatisticItem {
  beneficiaries: string;
  compared_traditional_funders: string;
  total_volume_eth: string;
  usd_value: string;
}
interface StatisticProps {
  statistics: StatisticItem;
}

const STATISTICS_TITLE: any = {
  beneficiaries: 'beneficiaries',
  compared_traditional_funders: 'compared to traditional funders',
  total_volume_eth: 'total volume',
  usd_value: 'usd value'
};

export const Statistic: React.FC<StatisticProps> = ({ statistics }) => {
  return (
    <div className="statistic">
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.m2}
        color={TypographyColors.black}
        weight={TypographyWeights.bold}
        className="statistic-title">
        Impact to Date
      </Typography>
      <div className="statistic-list">
        {map(statistics, (value, key) => {
          return (
            <div className="statistic-list-item" key={key}>
              <div
                className={`statistic-list-item-value ${
                  key === 'compared_traditional_funders' ? 'active' : ''
                }`}>
                {value}
                {key === 'compared_traditional_funders' && <span className="percentage">%</span>}
              </div>
              <div
                className={`statistic-list-item-title ${
                  key === 'total_volume_eth' ? 'active' : ''
                }`}>
                {STATISTICS_TITLE[key]}
              </div>
              {key === 'total_volume_eth' && (
                <div className="currency">
                  <EthereumSvg fill="#B2FF00" />
                  ETH
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
