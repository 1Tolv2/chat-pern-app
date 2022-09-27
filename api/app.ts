import express, { Express, json } from "express";
import cors from "cors";
import { PORT, ALTER_DATABASE } from "./config/config";
import routes from "./routes/index";


const app: Express = express();
app.use(cors());
app.use(json());

app.use("/", routes);




app.listen(PORT, async () => {
  console.log(`Express server running on port: ${PORT}`);
});
