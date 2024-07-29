import * as Yup from 'yup';

export const SupportSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address format').required('Email is required'),
  message: Yup.string()
    .required('Message is required')
    .test('len', 'Maximum of 100 words allowed.', (val) => {
      return val.replaceAll('\n', ' ').split(' ').length <= 100;
    })
});
