// validationSchema.ts
import * as yup from 'yup';

interface Location {
  name: string;
  price: number;
  quantity: number;
}

const productSchema = yup.object().shape({
  Name: yup.string().required('Product Name is required'),
  Type: yup.string().required('Product Type is required'),
  locations: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Location Name is required'),
      price: yup.number().required('Price is required').positive('Price must be positive'),
      quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
    })
  ),
});

export default productSchema;
