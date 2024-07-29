import React from 'react';
import './ItemProject.scss';
import { Media } from '../UI/Media/Media';
import { Button, TagIcon, Typography } from '../UI';
import {
  ButtonBackgrounds,
  ButtonBorderRadius,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../UI/Button/enums';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../UI/Typography/enums';
import EthereumSvg from '../../assets/images/svgs/EthereumSvg';
import { InformationTag } from '../UI/InformationTag/InformationTag';
import { AuthorBy } from '../UI/AuthorBy/AuthorBy';
import { IProjectItem } from '../../types/Projects.type';
import CalendarSvg from '../../assets/images/svgs/CalendarSvg';
import InfoHeaderSvg from '../../assets/images/svgs/InfoHeaderSvg';
import { GlobalOutlined } from '@ant-design/icons';
import LeafOrgSvg from '../../assets/images/svgs/LeafOrgSvg';
import { convertGbpToEth, displayCountryAddress } from '../../utils';

interface ItemProjectProps {
  className?: string;
  project: IProjectItem;
}

const ItemProject: React.FC<ItemProjectProps> = ({ className = '', project }) => {
  return (
    <div className={`item-project ${className}`}>
      <Media mediaType="image" src={project?.image?.original} solidColor="#4f50ff" />
      <div className="item-project-content">
        <Typography
          font={TypographyFonts.agrandir}
          size={TypographySizes.m2}
          color={TypographyColors.black}
          weight={TypographyWeights.medium}
          className="title">
          {project?.name}
        </Typography>
        <div className="description">
          {project?.summary ? project?.summary : project?.description_english}
        </div>
        <Button
          type={ButtonTypes.filled}
          size={ButtonSizes.smallMedium}
          color={ButtonColors.black}
          background={ButtonBackgrounds.green}
          borderRadius={ButtonBorderRadius.br100}
          className="btn-fund-now">
          Fund:&nbsp;&nbsp;
          <div className="price">
            <span>$ {project?.fund_eth || 0} USD </span>
          </div>
        </Button>

        <div className="bottom-info">
          <InformationTag>
            <CalendarSvg />
            {project?.period_of_delivery}
          </InformationTag>
          <InformationTag>
            <InfoHeaderSvg fill="#1D1B1E" />
            {project?.estimated_beneficiaries}
          </InformationTag>
          <InformationTag>
            <GlobalOutlined />{' '}
            {displayCountryAddress(project?.country, project?.state, project?.township)}
          </InformationTag>
          <InformationTag>
            <LeafOrgSvg /> {project?.type}
          </InformationTag>
          <InformationTag>
            <AuthorBy organizationKey={project?.organization_key} size="medium" />
          </InformationTag>
        </div>
      </div>
    </div>
  );
};

export default ItemProject;
