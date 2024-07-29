import React from 'react';
import { Typography } from '../UI';
import {
  TypographyColors,
  TypographyFonts,
  TypographySizes,
  TypographyWeights
} from '../UI/Typography/enums';
import { map } from 'lodash';

import './DuaChecklist.scss';
import CheckedSvg from '../../assets/images/svgs/CheckedSvg';
import { CHECKLIST_DUE_DILIGENCE } from '../../config';
interface DuaChecklistProps {
  className?: string;
  title: string;
  description?: string | React.ReactNode;
  checklist?: string[];
}

const DuaChecklist: React.FC<DuaChecklistProps> = ({
  title,
  description = '',
  className = '',
  checklist = []
}) => {
  return (
    <div className={`dua-checklist ${className}`}>
      <Typography
        font={TypographyFonts.agrandir}
        size={TypographySizes.m2}
        color={TypographyColors.black}
        weight={TypographyWeights.medium}
        className="title">
        {title}
      </Typography>

      <div className="description">{description}</div>

      <div className="checklist">
        {map(CHECKLIST_DUE_DILIGENCE, (item: string, index) => {
          return checklist?.includes(item) ? (
            <div className="checklist-item" key={index}>
              <div className="checklist-item-box">
                <CheckedSvg className="checklist-item-box-inner" />
              </div>
              <span className="checklist-item-box-text">{item}</span>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
};
export default DuaChecklist;
