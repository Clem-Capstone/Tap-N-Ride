import mongoose from "mongoose";
import dotenv from "dotenv";
import Report from "../models/Report.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const locations = [
  "CAGAYAN",
  "PUERTO",
  "MAMBATANGAN",
  "HAITUAN",
  "LANAO",
  "ALA-E",
  "LONOCA",
  "SAN MIGUEL",
  "DALIRIG",
  "CR. DAMAY",
  "SAN VICENTE",
  "KISOL-ON",
  "CR. IMPASUG-ONG",
  "LA FORTUNA",
  "PANTULANAN",
  "IMPALUTAO",
  "ST. CALIX",
  "DAWINGAN",
  "PATPAT",
  "KALASUNGAY",
  "SUMIPONG",
  "MALAYBALAY",
  "CASISANG",
  "SAN JOSE",
  "LAGUITAS",
  "KIOCAB",
  "CR. AGLAYAN",
  "CABANGAHAN",
  "BANGCUD/NASULI",
  "DABONGDABONG",
  "BAGONTAAS",
  "VALENCIA",
  "LUMBO",
  "MUSUAN",
  "DOLOGON",
  "TUBIGON",
  "BAYABASON",
  "PANADTALAN",
  "MARAMAG",
  "CAMP 1",
  "SINANGUYAN",
  "DON CARLOS",
  "KITAOTAO",
  "LOURDES",
  "DANGCAGAN",
  "BARONGCOT",
  "KIBAWEE",
  "LABUAGON",
  "PARAGOPAK",
  "SPRING",
  "SAMPAGAR",
  "OLD DAMULOG",
  "DAMILOG",
  "BANBAN",
  "CUJUANGCO",
  "MOLETA",
  "CONCEPTION",
  "KALAW-KALAW",
  "MASIMAG",
  "KALUBIHON",
  "BOKBOK",
  "KIARA",
  "KADINGILAN",
];

const getRandomLocation = () =>
  locations[Math.floor(Math.random() * locations.length)];

const seedReports = async () => {
  try {
    await mongoose.connection.dropCollection("reports");
  } catch (error) {
    console.error("No existing reports collection to drop.");
  }

  const reports = Array.from({ length: 50 }, () => ({
    busNumber: Math.floor(Math.random() * 10000).toString(),
    driver: `Driver ${Math.floor(Math.random() * 100)}`,
    conductor: `Conductor ${Math.floor(Math.random() * 100)}`,
    passengerFrom: getRandomLocation(),
    from: getRandomLocation(),
    to: getRandomLocation(),
  }));

  try {
    await Report.insertMany(reports);
    console.log("Reports seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding reports failed:", error);
  }
};

seedReports();
