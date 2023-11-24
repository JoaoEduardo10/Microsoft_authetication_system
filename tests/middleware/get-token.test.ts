import { describe, expect, it } from "vitest";
import { serverTest } from "../setup";

describe("get-token", () => {
  it("should not return a token by not adding the ID", async () => {
    const { body, statusCode } = await serverTest.get("/token/1234546");

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "rota invalida" });
  });
});
