import supertest from "supertest";
import { server } from "../src/mock/server";
import "dotenv/config";
import { MockMongo } from "./mock/MongoDb";

const serverTest = supertest(server);

const mockMongo = new MockMongo();

beforeAll(async () => {
  await mockMongo.connect();
});

afterEach(async () => {
  await mockMongo.clearDatabase();
});

afterAll(async () => {
  jest.clearAllMocks();
  await mockMongo.closeDatabase();
});

export { serverTest };
