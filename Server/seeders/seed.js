import mongoose from "mongoose";
import dotenv from "dotenv";
import createAdmin from "../factories/adminFactory.js";
import createTransaction from "../factories/transactionFactory.js";
import Admin from "../models/Admin.js";
import Transaction from "../models/Transaction.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const admins = [];
    const transactions = [];

    for (let i = 0; i < 10; i++) {
      admins.push(createAdmin());
      transactions.push(createTransaction());
    }

    await Admin.insertMany(admins);
    await Transaction.insertMany(transactions);

    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
