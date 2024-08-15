import { faker } from "@faker-js/faker";
import Transaction from "../models/Transaction.js";

const createTransaction = () => {
  return new Transaction({
    userID: faker.datatype
      .number({ min: 1000000000, max: 9999999999 })
      .toString(), // 10 digit user ID
    cardID: faker.finance.creditCardNumber().replace(/-/g, "").slice(0, 12), // 12 digit card ID
    balance: parseFloat(faker.finance.amount(0, 1000, 2)), // Balance with up to 2 decimal places
    paymentAmount: parseFloat(faker.finance.amount(1, 500, 2)), // Payment amount with up to 2 decimal places
    createdAt: faker.date.recent(), // This can be handled by Mongoose automatically
  });
};

export default createTransaction;
