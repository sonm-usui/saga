import React, { useMemo } from 'react';
import InfoHeaderSvg from '../../../assets/images/svgs/InfoHeaderSvg';
import CalendarSvg from '../../../assets/images/svgs/CalendarSvg';
import EducationOrgSvg from '../../../assets/images/svgs/EducationOrgSvg';
import LeafOrgSvg from '../../../assets/images/svgs/LeafOrgSvg';
import ThaiBurmaSvg from '../../../assets/images/svgs/location/ThaiBurmaSvg';
import { ITag } from '../../../types/Common.type';

interface TagIconProps {
  className?: string;
  tag: ITag;
  iconColor?: string;
}

export const TagIcon: React.FC<TagIconProps> = ({ className = '', tag, iconColor = '#1D1B1E' }) => {
  // TODO: check tags key by category
  const renderTagIcon = useMemo(() => {
    switch (tag?.key as any) {
      case 'persons':
        return <InfoHeaderSvg fill={iconColor} className={className} />;

      case 'time':
        return <CalendarSvg fill={iconColor} className={className} />;

      case 'branch':
        return <EducationOrgSvg fill={iconColor} className={className} />;

      case 'environment':
        return <LeafOrgSvg fill={iconColor} className={className} />;

      case 'location':
        return <ThaiBurmaSvg fill={iconColor} className={className} />;

      default:
        break;
    }
  }, [tag]);
  return <>{renderTagIcon}</>;
};
