import "vitest";
import "dotenv/config";
import supertest from "supertest";
process.env.IS_TEST = "TRUE";
import { server } from "../src/mock/server";

const serverTest = supertest(server);

export { serverTest };
