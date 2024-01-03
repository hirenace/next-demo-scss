import { toast } from 'react-toastify';
import { createAxiosInstance } from './axios-instance';
const axiosInstance = createAxiosInstance(false);

//Fetch the product list
export const fetchProductData = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

//Add the product 
export const addProduct = async (body: any) => {
    try {
        const multipartAxiosInstance = createAxiosInstance(true); // Set flag to true for addProduct
        const response = await multipartAxiosInstance.post('/products/create', body);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

//Delete the product 
export const deleteProduct = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/products/delete/${id}`);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

//Get product with particular id
export const getParticularProduct = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response?.data?.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

//Edit product delete
export const editProduct = async (id: number, body: any) => {
    try {
        const multipartAxiosInstance = createAxiosInstance(true); // Set flag to true for addProduct
        const response = await multipartAxiosInstance.put(`/products/update`, body);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

//Delete the product image 
export const deleteImage = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/productImages/delete/${id}`);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

//Delete the product location 
export const deleteLocation = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/products/location/delete/${id}`);
        return response.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}

//Get the location list 
export const getLocation = async () => {
    try {
        const response = await axiosInstance.get(`/locations`);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}