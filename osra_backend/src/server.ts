import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db";
import authRoutes from "./src/routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
