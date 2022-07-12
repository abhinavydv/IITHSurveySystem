import express from "express";
import db from "./config/database.js";
import routes from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
try {
  await db.authenticate();
  console.log("Database connected...");
} catch (err) {
  console.log("Error connecting!");
}
app.use(
  cors({
    origin: ["http://localhost:3000", "http://172.16.1.139:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "aejrkfriyrqtl3ndufhruifhWEKFGUUy7tr454y8g5fyqoitfyix48ry137tp",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 100,
    },
  })
);

app.use(express.json());
app.use("/", routes);
app.listen(5000, () => console.log("Server listening on port 5000..."));
