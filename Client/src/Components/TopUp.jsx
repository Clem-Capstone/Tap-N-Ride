import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Header from './Header'; // Make sure you import the header
import SideBar from './SideBar'; // Make sure you import the sidebar
import './css/topup.css';

const TopUp = () => {
    const [cardId, setCardId] = useState('');
    const [amount, setAmount] = useState('');

    const handleTopUp = () => {
        // Implement the top-up logic here
        console.log('Top Up', { cardId, amount });
    };

    return (
        <>
         <Header />
         <SideBar />
        <div className="top-up-container">
            <h1>Top Up</h1>
            <form className="top-up-form" onSubmit={(e) => { e.preventDefault(); handleTopUp(); }}>
                <TextField
                    label="Card ID"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Top Up
                </Button>
            </form>
        </div>
        </>
    );
};

export default TopUp;
