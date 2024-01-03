import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/global.scss'
const MyApp = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <ToastContainer position="top-right" autoClose={2000} />
            <Component {...pageProps} />
        </React.Fragment>
    )
}

export default MyApp;
