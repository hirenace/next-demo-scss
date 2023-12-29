import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFullName } from '../../utils/function/common';
import CenteredButton from '../hoc/button';

const Header = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const userToken = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

        if (userToken) {
            const parsedToken = JSON.parse(userToken);

            if (parsedToken.token) {
                setUserName(getFullName(parsedToken));
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        router.push('/auth/login');
    };

    return (
        <header className={"header"}>
            <div className={"container"}>
                <h1 className={"title"}>Next.js With SCSS</h1>
                {userName !== null ? (
                    <div className={'user-info'}>
                        <span className={'welcome-message'}>Welcome, {userName}</span>
                        <CenteredButton
                            onClick={() => handleLogout()}
                            className={'centered-button logout-button'}
                            type={"button"}
                            buttonText={"Logout"}
                        />
                    </div>
                ) : (
                    <CenteredButton
                        className={'centered-button login-button'}
                        type={"button"}
                        buttonText={"Login"}
                    />

                )}
            </div>
        </header>
    );
};

export default Header;
