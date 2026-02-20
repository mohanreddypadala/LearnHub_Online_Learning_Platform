const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();        // 1️⃣ Load env
connectDB();            // 2️⃣ Connect DB

const app = express();

app.use(cors());
app.use(express.json());

// temporary test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/users", require("./routers/userRoutes"));

app.use("/api/admin", require("./routers/adminRoutes"));

app.use("/api/users", require("./routers/userRoutes"));

const path = require("path");

app.use(
  "/videos",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/users", require("./routers/userRoutes"));
