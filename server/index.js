import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js";

// imports routes
import botRouter from "./router/botRouter.js";
import tokenRouter from "./router/tokenRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api", botRouter);
app.use("/api", tokenRouter);
connectDB();

// start server
const port = 3001;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
