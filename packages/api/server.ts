import { server } from "./app";
import { PORT, POSTGRES_URL } from "./config/config";
import { handleDBSetup } from "./controllers/db";

server.listen(PORT, async () => {
  await handleDBSetup();

  console.info(`Express server running on port: ${PORT}`);
});
