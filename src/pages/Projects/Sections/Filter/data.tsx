export interface IFilterItem {
  value: string | number;
  label: string;
  image?: React.ReactNode;
}
export interface IFilters {
  id: number;
  key: string;
  title: string;
  filters: IFilterItem[];
}

// export const FILTERS: IFilters[] = [
//   {
//     id: 1,
//     title: 'Project Type',
//     filters: [
//       { value: 'Education', label: 'Education' },
//       { value: 'Environmental protection & adaptation', label: 'Environmental' }
//     ]
//   },
//   {
//     id: 2,
//     title: 'Location',
//     filters: [
//       { value: 'Turkey', label: 'TURKEY', image: <TurkeySvg /> },
//       { value: 'Paraguay', label: 'PARAGUAY', image: <ParaguaySvg /> },
//       { value: 'Ukraine', label: 'UKRAINE', image: <UkraineSvg /> },
//       { value: 'Zambia', label: 'ZAMBIA', image: <ZambiaSvg /> },
//       { value: 'Yemen', label: 'YEMEN', image: <YemenSvg /> },
//       { value: 'Lebanon', label: 'LEBANON', image: <LebanonSvg /> }
//     ]
//   }
//   // {
//   //   id: 3,
//   //   title: 'Beneficiaries',
//   //   filters: [{ value: 'Beneficiaries 1', label: 'Beneficiaries 1' }]
//   // }
// ];

export const COUNTRIES = [
  { value: 'all', label: 'All' },
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Hong Kong', label: 'Hong Kong' }
];

export const PROJECT_TYPE_FILTERS = [
  {
    value: 'Cash programming',
    label: 'Cash programming'
  },
  {
    value: 'Conflict transformation & peacebuilding',
    label: 'Conflict transformation & peacebuilding'
  },
  {
    value: 'Democracy & elections',
    label: 'Democracy & elections'
  },
  {
    value: 'Education',
    label: 'Education'
  },
  {
    value: 'Environmental protection & adaptation',
    label: 'Environmental protection & adaptation'
  },
  {
    value: 'Food',
    label: 'Food'
  },
  {
    value: 'Health',
    label: 'Health'
  },
  {
    value: 'Infrastructure',
    label: 'Infrastructure'
  },
  {
    value: 'Livelihoods',
    label: 'Livelihoods'
  },
  {
    value: 'Mine action (removal & education)',
    label: 'Mine action (removal & education)'
  },
  {
    value: 'Protection / human rights',
    label: 'Protection / human rights'
  },
  {
    value: 'Shelter',
    label: 'Shelter'
  },
  {
    value: 'Sustainable agriculture',
    label: 'Sustainable agriculture'
  },
  {
    value: 'Technology',
    label: 'Technology'
  },
  {
    value: 'Water sanitation and hygiene (WASH)',
    label: 'Water, sanitation and hygiene (WASH)'
  },
  {
    value: 'Women & girls',
    label: 'Women & girls'
  },
  {
    value: 'Youth',
    label: 'Youth'
  }
];

export const BENEFICIARIES = [
  { value: 1, label: 'All' },
  { value: 2, label: '1-10,000' },
  { value: 3, label: '10,000-25,000' },
  { value: 4, label: '25,000-50,000' },
  { value: 5, label: '50,000+' }
];

export const PRICES = [
  { value: 1, label: 'All' },
  { value: 2, label: '1-10,000 USDT' },
  { value: 3, label: '10,000-50,000 USDT' },
  { value: 4, label: '50,000-100,000 USDT' },
  { value: 5, label: '100,000 USDT+' }
];

export const STATUS_FILTERS = [
  { value: 'funded,approved', label: 'All' },
  { value: 'FUNDED', label: 'Funded' },
  { value: 'APPROVED', label: 'Not Funded' }
];

export const FILTERS: IFilters[] = [
  {
    id: 1,
    key: 'filter_type',
    title: 'Project Type',
    filters: PROJECT_TYPE_FILTERS
  },
  {
    id: 2,
    key: 'filter_country',
    title: 'Location',
    filters: COUNTRIES
  },
  {
    id: 3,
    key: 'filter_estimated_beneficiaries',
    title: 'Beneficiaries',
    filters: BENEFICIARIES
  },
  {
    id: 3,
    key: 'filter_fund_eth',
    title: 'Price',
    filters: PRICES
  },
  {
    id: 4,
    key: 'filter_status',
    title: 'Status',
    filters: STATUS_FILTERS
  }
];

export const INITIAL_FILTERS = {
  filter_type: '',
  filter_country: 'all',
  filter_estimated_beneficiaries: 1,
  filter_fund_eth: 1,
  filter_status: 'funded,approved'
};
