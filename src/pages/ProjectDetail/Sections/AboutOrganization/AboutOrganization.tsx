import React, { useState } from 'react';
import './AboutOrganization.scss';
import { Button, Typography } from '../../../../Components/UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../../../../Components/UI/Typography/enums';
import { Link } from 'react-router-dom';
import { replace } from 'lodash';
import { appPaths } from '../../../../constants';
import SuccessModal from '../Modals/SuccessModal/SuccessModal';
import { IOrganizationItem } from '../../../../types/Organizations.type';
import { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../Components/UI/Button/enums';
import { DuaChecklist, Existing, SocialList } from '../../../../Components';
import RequestAdditional from '../Modals/RequestAdditional/RequestAdditional';
import ConfirmModal from '../Modals/ConfirmModal/ConfirmModal';

interface AboutOrganizationProps {
  organization: IOrganizationItem;
  existingDonors?: string;
}

export const AboutOrganization: React.FC<AboutOrganizationProps> = ({
  organization,
  existingDonors
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenRequestAdditional, setIsOpenRequestAdditional] = useState(false);

  return (
    <>
      <div className="about-organization">
        <div className="about-organization-top">
          <div className="section-name">
            <div className="section-name-right">
              <Typography
                font={TypographyFonts.agrandir}
                size={TypographySizes.m2}
                color={TypographyColors.black}
                weight={TypographyWeights.medium}
                className="title">
                About {organization?.organization_name}
              </Typography>
              <SocialList socials={organization?.social} />
            </div>
          </div>
          <div className="description">{organization?.brief_organization_overview}</div>
          <div className="bottom-buttons">
            <Link to={replace(appPaths.organizationDetails.path, ':id', organization?.key)}>
              <Button
                type={ButtonTypes.outlined}
                size={ButtonSizes.smallMedium}
                color={ButtonColors.black}>
                view organisation profile
              </Button>
            </Link>
            {/* <Button
              type={ButtonTypes.filled}
              size={ButtonSizes.smallMedium}
              color={ButtonColors.white}
              background={ButtonBackgrounds.black}
              onClick={() => setIsModalOpen(true)}>
              myanmar situation report
            </Button> */}
          </div>
        </div>
        <div className="about-organization-bottom">
          <div className="box dd-checklist">
            {/* TODO: API add dua checklist description */}
            <DuaChecklist
              title="Due Diligence Checklist"
              description={
                <>
                  {`${organization?.organization_name} have completed the following due dilligence processes. If you'd like you can`}{' '}
                  <span
                    className="text-link cursor"
                    onClick={() => setIsOpenRequestAdditional(true)}>
                    request to see the documents.
                  </span>
                </>
              }
              checklist={organization?.due_diligence_checklist}
            />
          </div>
          <div className="box supporters">
            <Existing title="Existing Donors" existingDonors={existingDonors} />
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="confirm-modal"
      />
      {isOpenRequestAdditional && (
        <RequestAdditional
          isOpen={true}
          onClose={() => setIsOpenRequestAdditional(false)}
          organisationKey={organization?.key}
          className="request-additional-modal"
        />
      )}
    </>
  );
};
