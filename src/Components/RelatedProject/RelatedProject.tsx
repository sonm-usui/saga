import React from 'react';
import './RelatedProject.scss';
import { Media } from '../UI/Media/Media';
import { Button, Typography } from '../UI';
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

import { isEmpty, map, replace } from 'lodash';
import { InformationTag } from '../UI/InformationTag/InformationTag';
import { NavLink } from 'react-router-dom';
import { AuthorBy } from '../UI/AuthorBy/AuthorBy';
import { IProjectItem } from '../../types/Projects.type';
import { appPaths } from '../../constants';
import { Skeleton } from 'antd';
import CalendarSvg from '../../assets/images/svgs/CalendarSvg';
import InfoHeaderSvg from '../../assets/images/svgs/InfoHeaderSvg';
import { DollarOutlined, GlobalOutlined } from '@ant-design/icons';
import LeafOrgSvg from '../../assets/images/svgs/LeafOrgSvg';
import { displayCountryAddress, monthDiff, replaceProjectType } from '../../utils';

interface RelatedProjectsProps {
  title?: string;
  className?: string;
  projects: IProjectItem[];
}

export const RelatedProject: React.FC<RelatedProjectsProps> = ({
  className = '',
  title,
  projects
}) => {
  const trimmedName = (name: string) => {
    if (name === undefined) {
      return '';
    }
    const words = name.split(/\s+/);
    if (words.length > 7) {
      return words.slice(0, 7).join(' ') + '...';
    } else {
      return name;
    }
  };

  return (
    <div className={`related-project ${className}`}>
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.xm2}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="related-project-title">
        {title}
      </Typography>

      <div className="related-project-list">
        {map(projects, (project) => (
          <div className="related-project-list-item" key={project?.key}>
            <NavLink
              to={replace(appPaths.projectDetail.path, ':id', project?.key)}
              key={project?.key}>
              <Media mediaType="image" src={project?.image?.original} solidColor="#4f50ff" />
              <div className="related-project-list-item-body">
                {!project?.key ? (
                  <Skeleton active />
                ) : (
                  <>
                    <Typography
                      font={TypographyFonts.agrandir}
                      size={TypographySizes.m}
                      color={TypographyColors.black}
                      weight={TypographyWeights.medium}
                      className="title">
                      {trimmedName(project?.name)}
                    </Typography>
                    <div className="description">
                      {project?.summary ? project?.summary : project?.description_english}
                    </div>
                    <div className="group-button">
                      <Button
                        type={ButtonTypes.filled}
                        size={ButtonSizes.smallMedium}
                        color={ButtonColors.black}
                        background={ButtonBackgrounds.green}
                        borderRadius={ButtonBorderRadius.br100}
                        className="btn-fund-now">
                        Fund:&nbsp;
                        <div className="price">
                          <span>$ {project?.fund_eth || 0} USD</span>
                        </div>
                      </Button>
                      {!isEmpty(project?.onchain_metadata?.funded_by) && (
                        <Button
                          type={ButtonTypes.filled}
                          size={ButtonSizes.smallMedium}
                          color={ButtonColors.black}
                          background={ButtonBackgrounds.green}
                          borderRadius={ButtonBorderRadius.br100}
                          className="btn-fund-now">
                          <DollarOutlined />
                          &nbsp;Funded
                        </Button>
                      )}
                    </div>

                    <div className="bottom-info">
                      <InformationTag>
                        <CalendarSvg />
                        {monthDiff(
                          project?.start_date,
                          project?.end_date,
                          project?.period_of_delivery
                        )}
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
                        <LeafOrgSvg /> {replaceProjectType(project?.type)}
                      </InformationTag>
                      {/* <InformationTag>
                        <EthereumSvg fill="#1D1B1E" /> {project?.onchain_metadata?.chain}
                      </InformationTag> */}
                      <InformationTag>
                        <AuthorBy organizationKey={project?.organization_key} size="medium" />
                      </InformationTag>
                    </div>
                  </>
                )}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
