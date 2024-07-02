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
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Public Routes
app.use("/api/admin", adminAuthRoutes);

// Protected Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportRoutes);
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
