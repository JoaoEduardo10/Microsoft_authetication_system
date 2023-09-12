import { app } from "./app/app";
import { MongoDb } from "./database/MongoDb";
import { cache } from "./database/cache";
import { server } from "../src/mock/server";

const PORT = process.env.PORT || 7000;

const mongoDb = new MongoDb();

mongoDb.connect().then(() => {
  app.listen(PORT, () => {
    cache.connect();
    console.log(`server running on: http://localhost:${PORT}`);
  });

  console.log("connectado ao banco de dados mongoDb");
});

// para testes

const isTest = process.env.IS_TEST;

if (isTest) {
  server.listen(1000);
}
