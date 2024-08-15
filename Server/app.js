import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import detectCardRoutes from './routes/detectCardRoutes.js'; 
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Public Routes
app.use("/api/admin", adminAuthRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Card Routes
app.use("api/detectCard", detectCardRoutes)

// Transaction Routes
app.use("/api/transactions", transactionRoutes);

// Report Routes
app.use("/api/reports", reportRoutes);

// Top-Up Route
app.post('/api/top-up', authMiddleware, async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.balance += parseFloat(amount);
      await user.save();
      res.json({ message: 'Balance topped up successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error topping up balance' });
  }
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// Catchall handler for any request that doesn't match above routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// Database Connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
