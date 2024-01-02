import axios, { AxiosInstance } from 'axios';

interface AxiosInstanceConfig {
    baseURL: string;
    headers: {
        'Content-Type': string;
        'Authorization'?: string;
    };
}

const userToken: any = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

export const createAxiosInstance = (useMultipart: boolean): AxiosInstance => {
    const config: AxiosInstanceConfig = {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '', // Set a base URL for all requests
        headers: {
            'Content-Type': useMultipart ? 'multipart/form-data' : 'application/json', // Set common headers
            'Authorization': userToken ? `Bearer ${userToken.token}` : '', // Set authorization header if needed
        },
        // You can add more configuration options as needed
    };

    const axiosInstance: AxiosInstance = axios.create(config);

    return axiosInstance;
};


