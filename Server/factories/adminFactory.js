import { faker } from "@faker-js/faker";
import Admin from "../models/Admin";

const createAdmin = () => {
  return new Admin({
    name: faker.name.findName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(), // You may want to hash this if needed
  });
};

export default createAdmin;
