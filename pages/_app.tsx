import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/common.scss'
import '../styles/global.scss'

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
        const userToken: any = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'));
        // Perform your authentication check here
        if (userToken && userToken.token) {
            // User is logged in
            router.push('/');
        } else {
            // User is not logged in, redirect to login page
            router.push('/auth/login');
        }
    }, []);

    return <Component {...pageProps} />
}

export default MyApp;
