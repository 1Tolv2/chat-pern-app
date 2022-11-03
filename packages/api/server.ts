import { server } from "./app";
import { PORT } from "./config/config";
import { handleDBSetup } from "./controllers/db";

server.listen(PORT, async () => {
  try {
    await handleDBSetup();
  } catch (err) {
    console.error("No database connection");
  }
  console.info(`Express server running on port: ${PORT}`);
});
