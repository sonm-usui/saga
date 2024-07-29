import path from 'path';

export const appPaths = {
  home: {
    path: '/'
  },
  about: {
    path: '/about'
  },
  projects: {
    path: '/projects'
  },
  projectDetail: {
    path: '/project/:id'
  },
  organizationDetails: {
    path: '/organization/:id'
  },
  organisationAdditional: {
    path: '/orgs/:key/additional'
  },
  organisationDocs: {
    path: '/orgs/:key/docs'
  },
  proposeProject: {
    path: '/propose-project/:marketplace'
  },
  dueDiligenceForm: {
    path: '/due-diligence-form/:marketplace'
  },
  adminOrganisations: {
    path: '/admin/organisations'
  },
  adminOrganisationsDetail: {
    path: '/admin/organisations/:key'
  },
  adminProjects: {
    path: '/admin/projects'
  },
  adminProjectDetail: {
    path: '/admin/project/:key'
  },
  adminEditProject: {
    path: '/admin/project/edit/:key'
  },
  adminCreateDonor: {
    path: '/admin/donor/create'
  },
  adminDonorsList: {
    path: '/admin/donor/list'
  },
  adminDonorsRequest: {
    path: '/admin/donor/request'
  },
  adminEditOrganization: {
    path: '/admin/organization/edit/:key'
  },
  manage: {
    path: '/manage'
  },
  marketplaceAccess: {
    path: '/marketplace-access'
  },
  chart: {
    path: '/chart'
  }
};
