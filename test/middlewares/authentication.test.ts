import { serverTest } from "../jest.setup";

describe("authentication", () => {
  it("should return an error for not adding an authorization header", async () => {
    const { body, statusCode } = await serverTest.post(
      "/user/token/validation"
    );

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Voçê não esta altenticado.!" });
  });

  it("should return an error for sending a wrong authorization type", async () => {
    const { body, statusCode } = await serverTest
      .post("/user/token/validation")
      .set("Authorization", "Interativa");

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Tipo de token invalido!" });
  });

  it("This should return an error for not sending a valid token", async () => {
    const { body, statusCode } = await serverTest
      .post("/user/token/validation")
      .set("Authorization", `${process.env.TYPE_AUTHORIZATION} 24hd892djdx8a`);

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Não autorizado" });
  });
});
