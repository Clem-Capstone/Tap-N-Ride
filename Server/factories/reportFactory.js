import { faker } from "@faker-js/faker";
import Report from "../models/Report.js";

const createReport = () => {
  return new Report({
    busNumber: faker.vehicle.vrm(),
    driver: faker.name.fullName(),
    conductor: faker.name.fullName(),
    passengerFrom: faker.random.word(),
    from: faker.address.city(),
    to: faker.address.city(),
  });
};

export default createReport;
