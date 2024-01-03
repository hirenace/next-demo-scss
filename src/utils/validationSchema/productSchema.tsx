// Validation rules for product details

import * as yup from 'yup';

const productSchema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  productType: yup.string().required('Product Type is required'),
  locations: yup.array().of(
    yup.object().shape({
      location_id: yup.string().required('Location Name is required'),
      price: yup.number().required('Price is required').positive('Price must be positive'),
      quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
    })
  ),
});

export default productSchema;
