import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DueDiligenceFormPublic } from './Sections/DueDiligenceFormPublic/DueDiligenceFormPublic';
import { DueDiligenceFormPrivate } from './Sections/DueDiligenceFormPrivate/DueDiligenceFormPrivate';
import { appPaths } from '../../constants';
import { find } from 'lodash';
import { TYPE_MARKETPLACES } from '../../config';
import { MarketPlaces } from '../../Components/UI/Button/enums';
import { DueDiligenceFormNrcSudan } from './Sections/DueDiligenceFormNrcSudan/DueDiligenceFormNrcSudan';
import { DueDiligenceFormMexico } from './Sections/DueDiligenceFormMexico/DueDiligenceFormMexico';

export const DueDiligenceForm: React.FC = () => {
  const navigate = useNavigate();
  const marketplace = useParams<{ marketplace: string }>()?.marketplace;

  useEffect(() => {
    const findMarketplace = find(
      TYPE_MARKETPLACES,
      (item: any) => item.value === marketplace?.toUpperCase()
    );
    if (!findMarketplace) {
      navigate(appPaths.home.path);
    }
  }, [marketplace]);

  return marketplace?.toUpperCase() === MarketPlaces.PUBLIC ? (
    <DueDiligenceFormPublic marketplace={marketplace?.toUpperCase() || ''} />
  ) : marketplace?.toUpperCase() === MarketPlaces.NRC_SUDAN ? (
    <DueDiligenceFormNrcSudan marketplace={marketplace?.toUpperCase() || ''} />
  ) : marketplace?.toUpperCase() === MarketPlaces.MEXICO ? (
    <DueDiligenceFormMexico marketplace={marketplace?.toUpperCase() || ''} />
  ) : (
    <DueDiligenceFormPrivate marketplace={marketplace?.toUpperCase() || ''} />
  );
};
