import React from 'react';
import ArrowNext from '../../../../assets/images/svgs/ArrowNext';
import ArrowPrev from '../../../../assets/images/svgs/ArrowPrev';
import { Media } from '../../../../Components/UI/Media/Media';
import './Detail.scss';
import { Button, Typography } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/enums';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../../../Components/UI/Typography/enums';
import { SocialList } from '../../../../Components';
import { IOrganizationItem } from '../../../../types/Organizations.type';
import { Skeleton } from 'antd';

interface DetailsProps {
  detail: IOrganizationItem;
}

export const Details: React.FC<DetailsProps> = ({ detail }) => {
  return (
    <div className="top-detail-org-add">
      <div className="top-detail-left">
        <div className="top-detail-left-thumbnail">
          <Media mediaType="image" src={detail?.image?.original} solidColor="#4f50ff" />
        </div>
      </div>
      <div className="top-detail-right">
        <div className="top-navigate">
          <div className="top-navigate-prev">
            <ArrowPrev className="top-navigate-icon" />
            <span>Back to search</span>
          </div>
          <div className="top-navigate-next">
            <span>Next Organisation</span>
            <ArrowNext className="top-navigate-icon" />
          </div>
        </div>
        {!detail?.organization_name ? (
          <Skeleton active />
        ) : (
          <>
            <Typography
              font={TypographyFonts.agrandir}
              size={TypographySizes.xm}
              color={TypographyColors.black}
              weight={TypographyWeights.medium}
              className="title">
              {detail?.organization_name}
            </Typography>
            <SocialList className="social-organization" socials={detail?.social} />

            <div className="description">{detail?.brief_organization_overview}</div>
          </>
        )}
      </div>
    </div>
  );
};
