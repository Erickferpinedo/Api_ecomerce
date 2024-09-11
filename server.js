import  "dotenv/config";

import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(express.json());
connectDB();

//rutas
app.use(userRoutes);
app.use(authRoutes);

app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
