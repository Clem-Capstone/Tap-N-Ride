import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface TopUpFormProps {}

const TopUpForm: React.FC<TopUpFormProps> = () => {
  const [cardId, setCardId] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');

  const handleTopUp = () => {
    if (!cardId || !amount || amount <= 0) {
      alert('Please enter a valid Card ID and Amount.');
      return;
    }
    // Implement the top-up logic here
    console.log('Top Up Details:', { cardId, amount });
    alert(`Successfully topped up card ${cardId} with amount ${amount}.`);

    // Reset form
    setCardId('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleTopUp();
        }}
      >
        <TextField
          label="Card ID"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || '')}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className="py-2 text-lg font-medium"
        >
          Top Up
        </Button>
      </form>
    </div>
  );
};

export default TopUpForm;
