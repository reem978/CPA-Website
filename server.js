const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const Consultation = require("./Consultation");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Northline CPA & Advisory API is running.");
});

app.post("/api/consultations", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await Consultation.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      message: "Consultation request received successfully."
    });
  } catch (error) {
    console.error("Error saving consultation:", error);

    res.status(500).json({
      message: "Failed to save consultation."
    });
  }
});
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000
})
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
