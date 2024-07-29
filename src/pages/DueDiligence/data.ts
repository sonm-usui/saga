import { map } from 'lodash';

export const POSITION_OPTIONS = [
  {
    value: 'Manager',
    label: 'Manager'
  },
  {
    value: 'Team Leader',
    label: 'Team Leader'
  },
  {
    value: 'Assistant Manager',
    label: 'Assistant Manager'
  },
  {
    value: 'Supervisor',
    label: 'Supervisor'
  },
  {
    value: 'Staff',
    label: 'Staff'
  },
  {
    value: 'Other',
    label: 'Other'
  }
];

export const GENDER_OPTIONS = [
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  }
];

export const ORG_COLLABORATE_WITH_ARMED_GROUPS_OPTIONS = [
  {
    value: 'Provide them with services',
    label: 'Provide them with services'
  },
  {
    value: 'Provide them with funding',
    label: 'Provide them with funding'
  },
  {
    value: 'Collaborate for access',
    label: 'Collaborate for access'
  }
];

export const YEARS_OPTIONS = map(Array(50), (_, index) => {
  return {
    value: new Date().getFullYear() - index,
    label: new Date().getFullYear() - index
  };
});

export const TYPE_OF_ID_OPTIONS = [
  {
    value: 'Passport',
    label: 'Passport'
  },
  {
    value: 'Driving License',
    label: 'Driving License'
  },
  {
    value: 'National ID Card',
    label: 'National ID Card'
  },
  {
    value: 'Other',
    label: 'Other'
  }
];
