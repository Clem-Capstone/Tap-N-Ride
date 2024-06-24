import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Resolve __dirname for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// Public Routes
app.use('/api/admin', adminAuthRoutes);

// Protected Routes
app.use('/api/users', authMiddleware, userRoutes);

// Serve static files from the React app
app.use(express.static(join(__dirname, '..', 'client', 'dist')));

// Catchall handler for any request that doesn't match above routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Database Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
