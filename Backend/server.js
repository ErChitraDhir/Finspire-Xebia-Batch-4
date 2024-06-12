const express = require("express");
const { mongoose } = require("mongoose");

const customerRoutes = require("./routes/customerRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected...");
} catch (error) {
  console.log(error);
}

app.use("/customer", customerRoutes);

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
