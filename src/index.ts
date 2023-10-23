import { app } from "./app/app";
import { MongoDb } from "./database/MongoDb";
import { cache } from "./database/cache";
import "dotenv/config";

const PORT = process.env.PORT || 7000;

const mongoDb = new MongoDb();

if (process.env.IS_TEST) {
  import("../src/mock/server").then((module) => {
    const { server } = module;
    server.listen(1000);
  });
} else {
  mongoDb
    .connect()
    .then(() => {
      app.listen(PORT, () => {
        cache.connect();
        console.log(`server running on: http://localhost:${PORT}`);
      });

      console.log("conectado ao banco de dados MongoDb");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
