import { faker } from "@faker-js/faker";
import Transaction from "../models/Transaction.js";

const createTransaction = () => {
  return new Transaction({
    userID: faker.datatype
      .number({ min: 1000000000, max: 9999999999 })
      .toString(), // 10 digit user ID
    cardID: faker.finance.creditCardNumber().replace(/-/g, "").slice(0, 12), // 12 digit card ID
    balance: faker.finance.amount(),
    paymentAmount: faker.finance.amount(),
    createdAt: faker.date.recent(),
  });
};

export default createTransaction;
