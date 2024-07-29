import React from 'react';
import { Typography } from '../UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../UI/Typography/enums';
import { Avatar } from '../UI/Avatar/Avatar';
import { faker } from '@faker-js/faker';
import { map, trim } from 'lodash';
import MercyCorps from '../../assets/images/ExistingSupporters/MercyCorps.png';
import MastercardFoundation from '../../assets/images/ExistingSupporters/MastercardFoundation.png';
import ChristianDior from '../../assets/images/ExistingSupporters/ChristianDior.png';
import HewlettPackardFoundation from '../../assets/images/ExistingSupporters/HewlettPackardFoundation.png';
import SearchForCommonGround from '../../assets/images/ExistingSupporters/SearchForCommonGround.png';
import NorwegianRefugeeCounsel from '../../assets/images/ExistingSupporters/NorwegianRefugeeCounsel.png';
import DanishRefugeeCounsel from '../../assets/images/ExistingSupporters/DanishRefugeeCounsel.png';
import SaveTheChildren from '../../assets/images/ExistingSupporters/SaveTheChildren.png';

import './Existing.scss';

interface IItem {
  image: string;
  link?: string;
}

interface ExistingProps {
  className?: string;
  title: string;
  description?: string;
  existingList?: IItem[];
  existingDonors?: string;
}

const Existing: React.FC<ExistingProps> = ({
  title,
  description = '',
  className = '',
  existingDonors = ''
}) => {
  const Supporters = existingDonors?.split(',');
  // const Supporters = [
  //   'Mercy Corps',
  //   'Mastercard Foundation',
  //   'Christian Dior',
  //   'Hewlett Packard Foundation',
  //   'Search For Common Ground',
  //   'Norwegian Refugee Counsel',
  //   'Danish Refugee Counsel',
  //   'Save the Children'
  // ];

  const getImg = (type: string) => {
    switch (type.trim()) {
      case 'Mercy Corps':
        return MercyCorps;
      case 'Mastercard Foundation':
        return MastercardFoundation;
      case 'Christian Dior':
        return ChristianDior;
      case 'Hewlett Packard Foundation':
        return HewlettPackardFoundation;
      case 'Search For Common Ground':
        return SearchForCommonGround;
      case 'Norwegian Refugee Counsel':
        return NorwegianRefugeeCounsel;
      case 'Danish Refugee Counsel':
        return DanishRefugeeCounsel;
      case 'Save the Children':
        return SaveTheChildren;
      default:
        return '';
    }
  };

  return (
    <div className={`existing-box ${className}`}>
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.m2}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="title">
        {title}
      </Typography>

      <div className="description" dangerouslySetInnerHTML={{ __html: description }} />

      <div className="list">
        {map(Supporters, (item, index) => {
          return <Avatar key={index} src={getImg(item)} avatarType="image" className="user" />;
        })}
      </div>
    </div>
  );
};
export default Existing;
