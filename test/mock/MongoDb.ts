import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../src/app/models/User";

const mongod = MongoMemoryServer.create();
export class MockMongo {
  async connect() {
    const uri = (await mongod).getUri();

    await mongoose.connect(uri);
  }

  async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await mongod).stop();
  }

  async clearDatabase() {
    await User.deleteMany();
  }
}
