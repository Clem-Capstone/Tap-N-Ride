import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  MenuItem,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import SideBar from './SideBar';
import Header from './Header';

const TopUp: React.FC = () => {
  const [cardId, setCardId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalTopUps, setTotalTopUps] = useState(0);
  const [todayTopUps, setTodayTopUps] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions/top-up');
      const fetchedTransactions = response.data;

      const today = new Date().toISOString().split('T')[0];
      const todayTransactions = fetchedTransactions.filter((txn: any) =>
        txn.createdAt.startsWith(today)
      );

      setTransactions(
        fetchedTransactions.map((txn: any, index: number) => ({
          id: index + 1,
          cardID: txn.cardID,
          amount: txn.amount,
          balance: txn.balance,
          createdAt: txn.createdAt,
        }))
      );

      setTotalTopUps(
        fetchedTransactions.reduce((sum: number, txn: any) => sum + txn.amount, 0)
      );
      setTodayTopUps(
        todayTransactions.reduce((sum: number, txn: any) => sum + txn.amount, 0)
      );
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTopUp = async () => {
    if (!cardId || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('/api/transactions/top-up', { cardID: cardId, amount: parseFloat(amount) });
      alert('Top-up successful!');
      setCardId('');
      setAmount('');
      fetchTransactions();
    } catch (error) {
      console.error('Error processing top-up:', error);
      alert('Failed to process top-up.');
    }
  };

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  const columns: GridColDef[] = [
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    { field: 'createdAt', headerName: 'Date', flex: 1 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={true} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => {}} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <Typography variant="h4" gutterBottom>
              Top-Up Management
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Top-Up Form
                    </Typography>
                    <form
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
                      />
                      <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <select
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                              onChange={(e) => handleQuickAmount(e.target.value)}
                            >
                              <option value="">Quick Amount</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="500">500</option>
                            </select>
                          ),
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Top Up
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Transaction Summary
                    </Typography>
                    <Typography>Total Top-Ups: {totalTopUps}</Typography>
                    <Typography>Today's Top-Ups: {todayTopUps}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Transactions
                    </Typography>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={transactions}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        autoHeight
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopUp;
