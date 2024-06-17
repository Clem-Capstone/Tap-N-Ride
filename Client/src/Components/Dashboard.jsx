import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users?page=${page}&limit=10`);
        setUsers(response.data.docs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h1 style={styles.header}>Dashboard</h1>
        {users && users.length > 0 ? (
          <div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.pagination}>
              <button onClick={handlePreviousPage} disabled={page === 1} style={styles.button}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={page === totalPages} style={styles.button}>
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  th: {
    border: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Dashboard;
