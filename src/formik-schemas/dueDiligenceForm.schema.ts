import * as Yup from 'yup';
import validator from 'validator';

export const DueDiligenceFormPrivateSchema = Yup.object().shape({
  organization_name: Yup.string().required('Organisation name is required').max(255),
  organization_website: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  head_name: Yup.string().required('Name is required').max(255),
  head_email: Yup.string().email('Invalid email address format').required('Email is required'),
  head_role: Yup.string().required('Role is required').max(255),
  digital_wallet_address: Yup.string().required('Wallet address is required').max(42),
  brief_organization_overview: Yup.string()
    .required('Brief organization overview is required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    }),
  organization_sector_description: Yup.string()
    .required('Description Required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    }),
  registered_address: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered address  is required').max(42)
  }),
  registered_country: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered country  is required').max(255)
  }),
  year_of_establishment: Yup.string().required('Year of establishment is required').max(255),
  country_and_areas_of_activities: Yup.string()
    .required('Country and areas of activities is required')
    .max(255),
  // major_income_sources_and_donors: Yup.string()
  //   .required('Major income sources and donors is required')
  //   .max(255),
  staff_members: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  key_staff: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  org_responsible_name: Yup.string()
    .required('Name of the individual responsible for organisational finances is required')
    .max(255),
  type_of_id_responsible_person: Yup.string().required('Type of ID is required').max(255),
  facebook: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  twitter: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  telegram: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  signal: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  top_five_donors: Yup.string().required('This field is required'),
  annual_budget_usd: Yup.number().required('Annual budget must be a number'),
  organizational_chart: Yup.array().of(Yup.mixed().required('Organisational chart is required')),
  number_of_paid_staff: Yup.number().required('Number of paid staff is required'),
  staff_provided_social_requirements: Yup.boolean().required('This field is required')
});

export const DueDiligenceFormPublicSchema = Yup.object().shape({
  organization_name: Yup.string().required('Organisation name is required').max(255),
  organization_website: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  head_name: Yup.string().required('Name is required').max(255),
  head_email: Yup.string().email('Invalid email address format').required('Email is required'),
  head_role: Yup.string().required('Role is required').max(255),
  digital_wallet_address: Yup.string().required('Wallet address is required').max(42),
  brief_organization_overview: Yup.string()
    .required('Brief organization overview is required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    }),
  registered_address: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered address  is required').max(42)
  }),
  registered_country: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered country  is required').max(255)
  }),
  year_of_establishment: Yup.string().required('Year of establishment is required').max(255),
  country_and_areas_of_activities: Yup.string()
    .required('Country and areas of activities is required')
    .max(255),
  // major_income_sources_and_donors: Yup.string()
  //   .required('Major income sources and donors is required')
  //   .max(255),
  staff_members: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  key_staff: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  org_responsible_name: Yup.string()
    .required('Name of the individual responsible for organisational finances is required')
    .max(255),
  type_of_id_responsible_person: Yup.string().required('Type of ID is required').max(255),
  facebook: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  twitter: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  telegram: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  signal: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  top_five_donors: Yup.string().required('This field is required'),
  annual_budget_usd: Yup.number().required('Annual budget must be a number'),
  organizational_chart: Yup.array().of(Yup.mixed().required('Organisational chart is required')),
  number_of_paid_staff: Yup.number().required('Number of paid staff is required'),
  staff_provided_social_requirements: Yup.boolean().required('This field is required')
});

export const DueDiligenceFormNrcSudanSchema = Yup.object().shape({
  organization_name: Yup.string().required('Organisation name is required').max(255),
  organization_website: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  head_name: Yup.string().required('Name is required').max(255),
  head_email: Yup.string().email('Invalid email address format').required('Email is required'),
  head_role: Yup.string().required('Role is required').max(255),
  digital_wallet_address: Yup.string().required('Wallet address is required').max(42),
  brief_organization_overview: Yup.string()
    .required('Brief organization overview is required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    }),
  organization_sector_description: Yup.string()
    .required('Description Required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    }),
  registered_address: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered address  is required').max(42)
  }),
  registered_country: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered country  is required').max(255)
  }),
  year_of_establishment: Yup.string().required('Year of establishment is required').max(255),
  country_and_areas_of_activities: Yup.string()
    .required('Country and areas of activities is required')
    .max(255),
  // major_income_sources_and_donors: Yup.string()
  //   .required('Major income sources and donors is required')
  //   .max(255),
  staff_members: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  key_staff: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  org_responsible_name: Yup.string()
    .required('Name of the individual responsible for organisational finances is required')
    .max(255),
  type_of_id_responsible_person: Yup.string().required('Type of ID is required').max(255),
  facebook: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  twitter: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  telegram: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  signal: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  top_five_donors: Yup.string().required('This field is required'),
  annual_budget_usd: Yup.number().required('Annual budget must be a number'),
  organizational_chart: Yup.array().of(Yup.mixed().required('Organisational chart is required')),
  number_of_paid_staff: Yup.number().required('Number of paid staff is required'),
  staff_provided_social_requirements: Yup.boolean().required('This field is required'),
  //
  bank_name: Yup.string(),
  bank_account_name: Yup.string(),
  bank_branch_name: Yup.string(),
  bank_swift_code: Yup.string(),
  bank_account_number: Yup.string(),
  bank_iban_code: Yup.string(),

  references: Yup.array().of(
    Yup.object().shape({
      reference_name: Yup.string().max(255),
      position: Yup.string().max(255),
      organisation: Yup.string().max(255),
      email: Yup.string().email('Invalid email address format'),
      mobile_number: Yup.string().max(255)
    })
  )
});

// Mexico
export const DueDiligenceFormMexicoSchema = Yup.object().shape({
  organization_name: Yup.string().required('Organisation name is required').max(255),
  organization_website: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  head_name: Yup.string().required('Name is required').max(255),
  head_email: Yup.string().email('Invalid email address format').required('Email is required'),
  head_role: Yup.string().required('Role is required').max(255),
  digital_wallet_address: Yup.string().required('Wallet address is required').max(42),
  brief_organization_overview: Yup.string()
    .required('Brief organization overview is required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    }),
  registered_country: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Registered country  is required').max(255)
  }),
  year_of_establishment: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Year of establishment is required').max(42)
  }),
  country_and_areas_of_activities: Yup.string().when('organization_registered', {
    is: true,
    then: (schema) => schema.required('Country and areas of activities is required').max(255)
  }),
  staff_members: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  key_staff: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email address format').required('Email is required'),
      first_name: Yup.string().required('First name is required').max(255),
      last_name: Yup.string().required('Last name is required').max(255),
      possition: Yup.string().required('Position is required').max(255),
      mobile_numbers: Yup.string().required('Mobile number is required').max(255),
      dob: Yup.date().required('DOB is required')
    })
  ),
  org_responsible_name: Yup.string().max(255),
  type_of_id_responsible_person: Yup.string().required('Type of ID is required').max(255),
  facebook: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  twitter: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  telegram: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  signal: Yup.string().test('len', 'Url is incorrect', (val) => {
    return !val || validator.isURL(val);
  }),
  annual_budget_usd: Yup.number().required('Annual budget must be a number'),
  organizational_chart: Yup.array().of(Yup.mixed().required('Organisational chart is required')),
  number_of_paid_staff: Yup.number().required('Number of paid staff is required'),
  staff_provided_social_requirements: Yup.boolean().required('This field is required')
});
