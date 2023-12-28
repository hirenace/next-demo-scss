import React from 'react';
import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';

const Home = () => {
    return (
        <div className={'home-container'}>
            <Header />
            <main className={"main"}>
                <div className={'content-wrapper'}>
                    <div className={"card"}>
                        <h1 className={'card-title'}>Welcome to the Home Page</h1>
                        <p className={'card-text'}>Explore amazing content and discover new things!</p>
                        <p className={'card-footer'}>Thank You</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
