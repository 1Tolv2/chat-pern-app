import { server } from "./app";
import { PORT } from "./config/config";

server.listen(PORT, async () => {
  console.log(`Express server running on port: ${PORT}`);
});
