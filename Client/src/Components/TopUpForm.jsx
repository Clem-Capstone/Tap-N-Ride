import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './css/topupForm.css';

const TopUpForm = () => {
    const [cardId, setCardId] = useState('');
    const [amount, setAmount] = useState('');

    const handleTopUp = () => {
        // Implement the top-up logic here
        console.log('Top Up', { cardId, amount });
    };

    return (
        <div className="top-up-form-container">
            <form className="top-up-form" onSubmit={(e) => { e.preventDefault(); handleTopUp(); }}>
                <TextField
                    label="Card ID"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        style: { color: 'black' },
                    }}
                    InputProps={{
                        style: { color: 'black' },
                    }}
                />
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        style: { color: 'black' },
                    }}
                    InputProps={{
                        style: { color: 'black' },
                    }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Top Up
                </Button>
            </form>
        </div>
    );
};

export default TopUpForm;
