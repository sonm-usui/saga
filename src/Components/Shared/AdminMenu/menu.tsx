import { appPaths } from '../../../constants';

interface IMenu {
  name: string;
  path: string;
}

export const MENUS: any = {
  ADMIN: [
    {
      name: 'Projects',
      path: appPaths.adminProjects.path
    },
    {
      name: 'Organisations',
      path: appPaths.adminOrganisations.path
    },
    {
      name: 'Donor Requests',
      path: appPaths.adminDonorsList.path
    }
  ],
  ORG: [
    {
      name: 'Projects',
      path: appPaths.adminProjects.path
    }
  ]
};
