import { server } from "./app";
import { PORT, POSTGRES_URL } from "./config/config";
import { connectToDatabase } from "./models";
import { handleDBSetup } from "./controllers/db";

server.listen(PORT, async () => {
  try {
    await connectToDatabase(POSTGRES_URL);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error connecting to Postgres: ${err.message}`);
    }
  }
  await handleDBSetup();

  console.log(`Express server running on port: ${PORT}`);
});
