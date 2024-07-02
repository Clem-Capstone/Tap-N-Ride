import "dotenv/config"; // Import and configure dotenv at the top
import mongoose from "mongoose";
import createTransaction from "../factories/transactionFactory.js";
import Transaction from "../models/Transaction.js";

const mongoUri = process.env.MONGODB_URI;

console.log(`Mongo URI: ${mongoUri}`); // This should print your MongoDB URI

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    seedDatabase();
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

const seedDatabase = async () => {
  try {
    await Transaction.deleteMany(); // Clear existing transactions
    const transactions = [];

    for (let i = 0; i < 10; i++) {
      transactions.push(createTransaction());
    }

    await Transaction.insertMany(transactions);
    console.log("Transactions seeded successfully!");
  } catch (error) {
    console.error("Seeding transactions failed:", error.message);
  } finally {
    mongoose.connection.close();
  }
};
