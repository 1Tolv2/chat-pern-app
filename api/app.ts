import express, { Express, json } from "express";
import cors from 'cors'
import { PORT } from "./config/config";
import apiRouter from "./routes/index";
import { sequelize } from "./config/env/test";

const app: Express = express();
app.use(cors())
app.use(json())

app.use("/", apiRouter);

sequelize.sync({ alter: true }).then(() => {
  console.log("Finished synchronizing models");
  app.listen(PORT, () => {
    console.log(`Express server running on port: ${PORT}`);
  });
});
