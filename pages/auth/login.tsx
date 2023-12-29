// Login.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import globalMessages from '../../src/utils/globalization';
import CenteredInput from '../../src/components/hoc/input';
import CenteredButton from '../../src/components/hoc/button';

const Login = () => {
    const [allValue, setAllValue] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const router = useRouter();

    // Destructuring object
    const { title, username_placeholder, password_placeholder, login_button_text } = globalMessages?.login_form;

    const userToken: any | null = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

    if (userToken && !userToken?.token) {
        return router.push('/auth/login');
    }

    useEffect(() => {
        // Check for the authorization token in localStorage
        if (userToken) {
            router.push('/');
        }
    }, []);

    const handle = {
        onChangeField: (value: any, name: any) => {
            setAllValue((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        },
        login: async () => {
            try {
                const response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: allValue?.username,
                        password: allValue?.password,
                        expiresInMins: 60,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    // Redirect to the home page after successful login
                    localStorage.setItem('user', JSON.stringify(data));
                    router.push('/');
                } else {
                    setError(data.message || 'Login failed.');
                }
            } catch (error) {
                setError('Login failed. Please try again.');
            }
        },
    };

    return (
        <div className={'login-container'}>
            <div className={'login-form'}>
                <h1 className={'form-title'}>{title}</h1>
                <div className="flex items-center justify-center centered-container">
                    <CenteredInput
                        type="text"
                        placeholder={username_placeholder}
                        name={'username'}
                        value={allValue?.username}
                        onChange={(e) => handle.onChangeField(e.target.value, 'username')}
                        className={'centered-input'}
                    />
                </div>
                <div className="centered-container flex items-center justify-center">
                    <CenteredInput
                        type="password"
                        name={'password'}
                        placeholder={password_placeholder}
                        value={allValue?.password}
                        onChange={(e) => handle.onChangeField(e.target.value, 'password')}
                        className={'centered-input'}
                    />
                </div>
                <CenteredButton
                    onClick={() => handle.login()}
                    className={'centered-button'}
                    type={"button"}
                    buttonText={login_button_text}
                />

                {error && (
                    <p role="alert" className={'error-message'}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
