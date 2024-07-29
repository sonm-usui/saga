import HouseSvg from '../../../../assets/images/svgs/HouseSvg';
import { appPaths } from '../../../../constants';

export const PUBLIC_MENU_HEADER = [
  {
    value: '',
    path: '',
    image: <HouseSvg />
  },
  {
    value: 'About Us',
    path: appPaths.about.path,
    image: ''
  },
  {
    value: 'Register',
    path: '',
    image: ''
  }
];

export const ADMIN_MENU_HEADER = [
  {
    value: '',
    path: '',
    image: <HouseSvg />
  },
  {
    value: 'marketplace',
    path: appPaths.projects.path,
    image: ''
  },
  {
    value: 'dashboard',
    path: appPaths.adminOrganisations.path,
    image: ''
  },
  {
    value: 'about us',
    path: appPaths.about.path,
    image: ''
  }
];

export const ORG_MENU_HEADER = [
  {
    value: '',
    path: '',
    image: <HouseSvg />
  },
  {
    value: 'dashboard',
    path: appPaths.adminOrganisationsDetail.path,
    image: ''
  },
  {
    value: 'manage funds',
    path: appPaths.manage.path,
    image: ''
  },
  {
    value: 'about us',
    path: appPaths.about.path,
    image: ''
  }
];

export const DONOR_MENU_HEADER = [
  {
    value: '',
    path: '',
    image: <HouseSvg />
  },
  {
    value: 'dashboard',
    path: appPaths.marketplaceAccess.path,
    image: ''
  },
  {
    value: 'marketplace',
    path: appPaths.projects.path,
    image: ''
  },
  {
    value: 'about us',
    path: appPaths.about.path,
    image: ''
  }
  // {
  //   value: 'request access',
  //   path: appPaths.marketplaceAccess.path,
  //   image: ''
  // }
];
