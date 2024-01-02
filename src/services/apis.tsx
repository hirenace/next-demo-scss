import axios, { AxiosResponse } from 'axios';
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
export async function fetchProductData(): Promise<CustomResponse> {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        // Handle errors
        const customError: CustomError = {
            message: error.response?.data?.message || 'An error occurred',
        };
        throw customError;
    }
}

// Create a function that makes a POST request using the axiosInstance
export const addProduct = async (body: any): Promise<CustomResponse> => {
    try {
        const multipartAxiosInstance = createAxiosInstance(true); // Set flag to true for addProduct
        const response = await multipartAxiosInstance.post('/products/create', body);
        return response.data;
    } catch (error) {
        // Handle errors
        const customError: CustomError = {
            message: error.response?.data?.message || 'An error occurred',
        };
        throw customError;
    }
}

export const deleteProduct = async (id: number): Promise<CustomResponse> => {
    try {
        const response = await axiosInstance.delete(`/products/delete/${id}`);
        return response.data;
    } catch (error) {
        // Handle errors
        const customError: CustomError = {
            message: error.response?.data?.message || 'An error occurred',
        };
        throw customError;
    }
}

export const getParticularProduct = async (id: number): Promise<CustomResponse> => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response?.data?.data;
    } catch (error) {
        // Handle errors
        const customError: CustomError = {
            message: error.response?.data?.message || 'An error occurred',
        };
        throw customError;
    }
}

export const editProduct = async (id: number, body: any): Promise<CustomResponse> => {
    try {
        const multipartAxiosInstance = createAxiosInstance(true); // Set flag to true for addProduct
        const response = await multipartAxiosInstance.patch(`/products/edit/${id}`, body);
        return response.data;
    } catch (error) {
        // Handle errors
        const customError: CustomError = {
            message: error.response?.data?.message || 'An error occurred',
        };
        throw customError;
    }
}