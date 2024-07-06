import React from 'react';
import Header from './Header'; 
import SideBar from './SideBar'; 
import TopUpForm from './TopUpForm';
import './css/topup.css';

const TopUp = () => {
    return (
        <>
            <Header />
            <SideBar />
            <div className="top-up-page">
                <TopUpForm />
            </div>
        </>
    );
};

export default TopUp;
