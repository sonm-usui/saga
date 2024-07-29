import * as Yup from 'yup';

export const RequestAccessSchema = Yup.object().shape({
  marketplace: Yup.string().required('Marketplace is required')
});
