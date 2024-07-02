import { faker } from "@faker-js/faker";
import Transaction from "../models/Transaction";

const createTransaction = () => {
  return new Transaction({
    userID: faker.random.uuid(),
    cardID: faker.random.uuid(),
    balance: faker.finance.amount(),
    amount: faker.finance.amount(),
    type: faker.random.arrayElement(["Credit", "Debit"]),
    status: faker.random.arrayElement(["Completed", "Pending"]),
    description: faker.lorem.sentence(),
    date: faker.date.recent(),
  });
};

export default createTransaction;
