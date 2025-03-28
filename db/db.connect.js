const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected successfully."))
    .catch((error) => console.error("Error in connecting: ", error));
};

module.exports = initializeDatabase;
