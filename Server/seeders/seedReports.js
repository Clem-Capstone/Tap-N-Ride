// seedReports.js
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Report from "../models/Report.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed:", err));

const locations = [
  { area: "CAGAYAN", km: 0 },
  { area: "PUERTO", km: 13 },
  { area: "MAMBATANGAN", km: 20 },
  { area: "MALITUBOG", km: 24 },
  { area: "ALA-E", km: 26 },
  { area: "LONOCA", km: 27 },
  { area: "SAN MIGUEL", km: 31 },
  { area: "DICLUM", km: 35 },
  { area: "MANOLO FORTICH", km: 36 },
  { area: "CR. GABOK", km: 37 },
  { area: "MANGIMA", km: 40 },
  { area: "DALIRIG", km: 45 },
  { area: "MALUKO", km: 51 },
  { area: "CR. DAMAY", km: 56 },
  { area: "SAN VICENTE", km: 57 },
  { area: "KISIKOS", km: 60 },
  { area: "CR. IMPASUG-ONG", km: 64 },
  { area: "LA FORTUNA", km: 69 },
  { area: "PANTULAN", km: 71 },
  { area: "IMPALUTO", km: 74 },
  { area: "STO. CRISTO", km: 78 },
  { area: "DALWANGAN", km: 80 },
  { area: "PATPAT", km: 84 },
  { area: "KALASUNGAY", km: 89 },
  { area: "SUMPONG", km: 90 },
  { area: "MALAYBALAY", km: 94 },
  { area: "CASISANG", km: 97 },
  { area: "SAN JOSE", km: 99 },
  { area: "LAGUITAS", km: 100 },
  { area: "KIOCAB", km: 103 },
  { area: "AGLAYAN", km: 105 },
  { area: "CABANGAHAN", km: 109 },
  { area: "BANGCUD/NASULI", km: 112 },
  { area: "DABONGDABONG", km: 115 },
  { area: "BAGONTAAS", km: 119 },
  { area: "VALENCIA", km: 121 },
  { area: "LUMBO", km: 125 },
  { area: "MUSUAN", km: 132 },
  { area: "DOLOGON", km: 134 },
  { area: "TUBIGON", km: 137 },
  { area: "BAYABASON", km: 138 },
  { area: "PANADALAN", km: 142 },
  { area: "MARAMAG", km: 147 },
  { area: "CAMP 1", km: 151 },
  { area: "SINANGUYAN", km: 153 },
  { area: "DON CARLOS", km: 156 },
  { area: "KITAOTAO", km: 162 },
  { area: "LOURDES", km: 165 },
  { area: "DANGCAGAN", km: 167 },
  { area: "BARONGCOT", km: 170 },
  { area: "KIBAW", km: 173 },
  { area: "LABUAGON", km: 175 },
  { area: "PARAGOPAK", km: 176 },
  { area: "SPRING", km: 178 },
  { area: "SAMPAGAR", km: 179 },
  { area: "OLD DAMULOG", km: 183 },
  { area: "DAMULOG", km: 186 },
];

const seedReports = async () => {
  try {
    await Report.deleteMany();

    const reports = [];

    for (let i = 0; i < 10; i++) {
      const fromLocation =
        locations[Math.floor(Math.random() * locations.length)];
      const toLocation =
        locations[Math.floor(Math.random() * locations.length)];
      reports.push({
        busNumber: faker.vehicle.vrm(),
        driver: faker.name.fullName(),
        conductor: faker.name.fullName(),
        passengerFrom: faker.name.fullName(),
        from: fromLocation.area,
        to: toLocation.area,
      });
    }

    await Report.insertMany(reports);
    console.log("Reports seeded successfully!");
  } catch (error) {
    console.error("Seeding reports failed:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedReports();
