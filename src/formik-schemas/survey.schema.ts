import * as Yup from 'yup';

export const SurveySchema1 = Yup.object().shape({
  name: Yup.string().required('Name is required').max(255),
  investorType: Yup.string().required('Investor type is required').max(255),
  email: Yup.string().email('Invalid email address format').required('Email is required')
});

export const SurveySchema2 = Yup.object().shape({
  name: Yup.string().required('Name is required').max(255),
  role: Yup.string().required('Role is required').max(255),
  companyName: Yup.string().required('Company name is required').max(255),
  companyWebsite: Yup.string().required('Company website is required').max(255),
  etaMonthlyTxnVol: Yup.string().required('Estimate volume is required').max(255),
  email: Yup.string().email('Invalid email address format').required('Email is required')
});

export const SurveySchema3 = Yup.object().shape({
  name: Yup.string().required('Name is required').max(255),
  role: Yup.string().required('Role is required').max(255),
  companyName: Yup.string().required('Company name is required').max(255),
  companyWebsite: Yup.string().required('Company website is required').max(255),
  email: Yup.string().email('Invalid email address format').required('Email is required')
});

export const SurveySchema4 = Yup.object().shape({
  name: Yup.string().required('Name is required').max(255),
  role: Yup.string().required('Role is required').max(255),
  organizationName: Yup.string().required('Organization name is required').max(255),
  organizationWebsite: Yup.string().required('Organization website is required').max(255),
  email: Yup.string().email('Invalid email address format').required('Email is required')
});
