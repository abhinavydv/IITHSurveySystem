import express from "express";
import db from "./config/database.js";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
try {
  await db.authenticate();
  console.log("Database connected...");
} catch (err) {
  console.log("Error connecting!");
}
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.listen(5000, () => console.log("Server listening on port 5000..."));
