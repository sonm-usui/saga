import * as Yup from 'yup';
import validator from 'validator';

export const ProposeProjectSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project name is required')
    .test('len', 'Maximum of 7 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 7;
    }),
  type: Yup.string()
    .required('Type of project is required')
    .test('len', 'Maximum of 3 options allowed.', (val) => {
      return val.split(',').length <= 3;
    }),
  country: Yup.string().required('Country is required'),
  periodOfdelivery: Yup.string().required('Period of Delivery is required').max(255),
  beneficiaries: Yup.number()
    .typeError('Only numbers are allowed')
    .required('Estimated Beneficiaries is required')
    .min(1),
  description: Yup.string()
    .required('Brief description: is required')
    .test('len', 'Maximum of 200 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 200;
    }),
  summary: Yup.string()
    .required('Summary description: is required')
    .test('len', 'Maximum of 50 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 50;
    }),
  cost: Yup.number().typeError('Only numbers are allowed').required('Cost is required').min(0.001),
  facebook: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  twitter: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  telegram: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  marketplace: Yup.string().required('Marketplace is required')
});

export const ProposeProjectUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project name is required')
    .test('len', 'Maximum of 7 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 7;
    }),
  type: Yup.string()
    .required('Type of project is required')
    .test('len', 'Maximum of 3 options allowed.', (val) => {
      return val.split(',').length <= 3;
    }),
  country: Yup.string().required('Country is required'),
  periodOfdelivery: Yup.string().required('Period of Delivery is required').max(255),
  beneficiaries: Yup.number()
    .typeError('Only numbers are allowed')
    .required('Estimated Beneficiaries is required')
    .min(1),
  description: Yup.string()
    .required('Brief description: is required')
    .test('len', 'Maximum of 200 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 200;
    }),
  summary: Yup.string()
    .required('Summary description: is required')
    .test('len', 'Maximum of 50 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 50;
    }),
  cost: Yup.number().typeError('Only numbers are allowed').required('Cost is required').min(0.001),
  token_id: Yup.number().typeError('Only numbers are allowed'),
  facebook: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  twitter: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  telegram: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  marketplace: Yup.string().required('Marketplace is required')
});

export const ProposeProjectNrcSudanSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project name is required')
    .test('len', 'Maximum of 7 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 7;
    }),
  type: Yup.string()
    .required('Type of project is required')
    .test('len', 'Maximum of 3 options allowed.', (val) => {
      return val.split(',').length <= 3;
    }),
  country: Yup.string().required('Country is required'),
  periodOfdelivery: Yup.string().required('Period of Delivery is required').max(255),
  beneficiaries: Yup.number()
    .typeError('Only numbers are allowed')
    .required('Estimated Beneficiaries is required')
    .min(1),
  description: Yup.string()
    .required('Brief description: is required')
    .test('len', 'Maximum of 200 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 200;
    }),
  summary: Yup.string()
    .required('Summary description: is required')
    .test('len', 'Maximum of 50 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 50;
    }),
  cost: Yup.number().typeError('Only numbers are allowed').required('Cost is required').min(0.001),
  marketplace: Yup.string().required('Marketplace is required'),
  //
  target_group: Yup.string().required('Target group is required'),
  project_goal: Yup.string().required('Project goal and objective is required'),
  key_activities: Yup.string().required('Key activities is required'),

  activity_reason_and_connection: Yup.string().required('This field is required'),
  supporting_evidence_and_collection_method: Yup.string().required('This field is required'),
  coordination_and_permissions: Yup.string().required('This field is required'),
  accountability_and_feedback: Yup.string().required('This field is required'),
  safety_and_risk_management: Yup.string().required('This field is required'),
  financial_management_experience: Yup.string().required('This field is required'),
  verification_of_results: Yup.string().required('This field is required'),
  support_needed_from_NRC: Yup.string().required('This field is required'),
  long_term_partnership_intent: Yup.string().required('This field is required'),
  budget: Yup.mixed().required('This field is required'),
  main_activities: Yup.array().of(
    Yup.object().shape({
      delivered_by: Yup.string().required('This field is required'),
      geo_location: Yup.string().required('This field is required'),
      inputs_required: Yup.string().required('This field is required'),
      number_of_supported: Yup.string().required('This field is required'),
      planned_activities: Yup.string().required('This field is required'),
      verification_means: Yup.string().required('This field is required'),
      when: Yup.string().required('This field is required'),
      // cost_usd: Yup.number().required('This field is required')
      cost_usd: Yup.string().required('This field is required')
    })
  )
});

export const ProposeProjectNrcSudanUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project name is required')
    .test('len', 'Maximum of 7 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 7;
    }),
  type: Yup.string()
    .required('Type of project is required')
    .test('len', 'Maximum of 3 options allowed.', (val) => {
      return val.split(',').length <= 3;
    }),
  country: Yup.string().required('Country is required'),
  periodOfdelivery: Yup.string().required('Period of Delivery is required').max(255),
  beneficiaries: Yup.number()
    .typeError('Only numbers are allowed')
    .required('Estimated Beneficiaries is required')
    .min(1),
  description: Yup.string()
    .required('Brief description: is required')
    .test('len', 'Maximum of 400 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 400;
    }),
  summary: Yup.string()
    .required('Summary description: is required')
    .test('len', 'Maximum of 50 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 50;
    }),
  cost: Yup.number().typeError('Only numbers are allowed').required('Cost is required').min(0.001),
  marketplace: Yup.string().required('Marketplace is required'),

  target_group: Yup.string().required('Target group is required'),
  project_goal: Yup.string().required('Project goal and objective is required'),
  key_activities: Yup.string().required('Key activities is required'),

  activity_reason_and_connection: Yup.string().required('This field is required'),
  supporting_evidence_and_collection_method: Yup.string().required('This field is required'),
  coordination_and_permissions: Yup.string().required('This field is required'),
  accountability_and_feedback: Yup.string().required('This field is required'),
  safety_and_risk_management: Yup.string().required('This field is required'),
  financial_management_experience: Yup.string().required('This field is required'),
  verification_of_results: Yup.string().required('This field is required'),
  support_needed_from_NRC: Yup.string().required('This field is required'),
  long_term_partnership_intent: Yup.string().required('This field is required'),
  budget: Yup.mixed().required('This field is required'),
  main_activities: Yup.array().of(
    Yup.object().shape({
      delivered_by: Yup.string().required('This field is required'),
      geo_location: Yup.string().required('This field is required'),
      inputs_required: Yup.string().required('This field is required'),
      number_of_supported: Yup.string().required('This field is required'),
      planned_activities: Yup.string().required('This field is required'),
      verification_means: Yup.string().required('This field is required'),
      when: Yup.string().required('This field is required'),
      cost_usd: Yup.number().required('This field is required')
    })
  )
});
