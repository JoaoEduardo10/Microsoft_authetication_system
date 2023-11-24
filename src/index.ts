import { app } from "./app/app";
import { cache } from "./database/cache";

const PORT = process.env.PORT || 7000;
const VERSION = process.env.VERSION || "/v0";

if (process.env.IS_TEST) {
  import("../src/mock/server").then((module) => {
    const { server } = module;
    server.listen(1000, () => console.log("servidor de test rodando"));
    console.log("aq");
  });
} else {
  app.listen(PORT, () => {
    cache.connect();
    console.log(`server running on: http://localhost:${PORT}${VERSION}`);
  });
}
