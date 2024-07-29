import React from 'react';
import CalendarSvg from '../../assets/images/svgs/CalendarSvg';
import InfoHeaderSvg from '../../assets/images/svgs/InfoHeaderSvg';
import LogoSmallSvg from '../../assets/images/svgs/LogoSmallSvg';
import CircleIcon from '../../Components/UI/CircleIcon/CircleIcon';
import { ParaguaySmallSvg } from './images/svgs';
import RectangleSvg from './images/svgs/RectangleSvg';
import RoundSvg from './images/svgs/RoundSvg';
import SquareSvg from './images/svgs/SquareSvg';
import TriangleSvg from './images/svgs/TriangleSvg';

export const LIST_PROJECT = [
  {
    id: 1,
    image: '#F39A00',
    title: 'School Repair in Northern Shan',
    description:
      'Ongoing military bombardments have destroyed 42 educational facilities in our area. We need to rebuild for our youth to continue learning.',
    fund: '1.5 Eth',
    info: [
      {
        title: <CalendarSvg />,
        value: 'March - May 2023'
      },
      {
        title: <ParaguaySmallSvg />,
        value: 'Thai-Burma Border'
      },
      {
        title: <InfoHeaderSvg fill="black" />,
        value: 'x 5,500'
      },
      {
        title: (
          <div>
            <SquareSvg />
            <RoundSvg />
            <TriangleSvg />
          </div>
        ),
        value: 'Education'
      },
      {
        title: (
          <div>
            <SquareSvg />
            <RectangleSvg />
          </div>
        ),
        value: 'Medical'
      },
      {
        title: 'By:',
        value: (
          <div className="info-project-organization">
            <CircleIcon className="info-project-organization-icon">
              <LogoSmallSvg />
            </CircleIcon>
            <span className="info-project-organization-name">The NSSYN</span>
          </div>
        )
      }
    ]
  },
  {
    id: 2,
    image: '#4F50FF',
    title: 'Rebuild the Local Dock',
    description:
      'Ongoing military bombardments have destroyed 42 educational facilities in our area. We need to rebuild for our youth to continue learning.',
    fund: '1.5 Eth',
    info: [
      {
        title: <CalendarSvg />,
        value: 'March - May 2023'
      },
      {
        title: <ParaguaySmallSvg />,
        value: 'Zambia'
      },
      {
        title: <InfoHeaderSvg fill="black" />,
        value: 'x 5,500'
      },
      {
        title: (
          <div>
            <SquareSvg />
            <RoundSvg />
            <TriangleSvg />
          </div>
        ),
        value: 'Education'
      },
      {
        title: (
          <div>
            <SquareSvg />
            <RectangleSvg />
          </div>
        ),
        value: 'Medical'
      },
      {
        title: 'By:',
        value: (
          <div className="info-project-organization">
            <CircleIcon className="info-project-organization-icon">
              <LogoSmallSvg />
            </CircleIcon>
            <span className="info-project-organization-name">The NSSYN</span>
          </div>
        )
      }
    ]
  },
  {
    id: 3,
    image: '#1D1B1E',
    title: 'Build a Weaving Workshop',
    description:
      'Ongoing military bombardments have destroyed 42 educational facilities in our area. We need to rebuild for our youth to continue learning.',
    fund: '1.5 Eth',
    info: [
      {
        title: <CalendarSvg />,
        value: 'March - May 2023'
      },
      {
        title: <ParaguaySmallSvg />,
        value: 'Paraguay'
      },
      {
        title: <InfoHeaderSvg fill="black" />,
        value: 'x 5,500'
      },
      {
        title: (
          <div>
            <SquareSvg />
            <RoundSvg />
            <TriangleSvg />
          </div>
        ),
        value: 'Education'
      },

      {
        title: (
          <div>
            <SquareSvg />
            <RectangleSvg />
          </div>
        ),
        value: 'Medical'
      },
      {
        title: 'By:',
        value: (
          <div className="info-project-organization">
            <CircleIcon className="info-project-organization-icon">
              <LogoSmallSvg />
            </CircleIcon>
            <span className="info-project-organization-name">The NSSYN</span>
          </div>
        )
      }
    ]
  }
];

export interface IProjectItem {
  image: string;
  title: string;
  description: string;
  fund: string;
  info: Array<IItemInfo>;
}

export interface IItemInfo {
  title: React.ReactNode | string;
  value: React.ReactNode | string;
}
