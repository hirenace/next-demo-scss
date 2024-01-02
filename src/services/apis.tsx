import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { createAxiosInstance } from './axios-instance';
const axiosInstance = createAxiosInstance(false);
// Define a custom interface for your API response data
interface ApiResponse {
    data: any; // Adjust this based on your actual API response structure
}

// Define a custom type for the response data
type CustomResponse<T = ApiResponse> = AxiosResponse<T>;

// Define a custom type for the error response data
interface CustomError {
    message: string;
}

// Create a function that makes a GET request using the axiosInstance
export const fetchProductData = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}

// Create a function that makes a POST request using the axiosInstance
export const addProduct = async (body: any) => {
    try {
        const multipartAxiosInstance = createAxiosInstance(true); // Set flag to true for addProduct
        const response = await multipartAxiosInstance.post('/products/create', body);
        return response.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}

export const deleteProduct = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/products/delete/${id}`);
        return response.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}

export const getParticularProduct = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response?.data?.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}

export const editProduct = async (id: number, body: any) => {
    try {
        const multipartAxiosInstance = createAxiosInstance(true); // Set flag to true for addProduct
        const response = await multipartAxiosInstance.put(`/products/update`, body);
        return response.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}

export const deleteImage = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/productImages/delete/${id}`);
        return response.data;
    } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message)
    }
}