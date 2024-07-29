import * as Yup from 'yup';

export const RegisterDonorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(255),
  email: Yup.string().email('Invalid email address format').required('Email is required').max(255),
  physical_address: Yup.string().required('Address is required').max(255),
  digital_wallet_address: Yup.string().required('Digital wallet address is required').max(42)
});
