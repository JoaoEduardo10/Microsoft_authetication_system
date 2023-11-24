import { describe, expect, it } from "vitest";
import { serverTest } from "../setup";

describe("authenticationMiddleware", () => {
  it("should return an error for not adding the authentication header", async () => {
    const { body, statusCode } = await serverTest.get("/users/123");

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Voçê não esta altenticado.!" });
  });

  it("should return an error for adding an invalid token type", async () => {
    const { body, statusCode } = await serverTest
      .get("/users/123")
      .set("Authorization", "aaa");

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Tipo de token invalido!" });
  });

  it("should return an error for adding an invalid token", async () => {
    const { body, statusCode } = await serverTest
      .get("/users/123")
      .set("Authorization", `${process.env.TYPE_AUTHORIZATION} test`);

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Não autorizado" });
  });
});
