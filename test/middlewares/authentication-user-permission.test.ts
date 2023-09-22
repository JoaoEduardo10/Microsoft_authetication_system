import { createJwt } from "../../src/app/helpers/jsonwebtoken";
import { User } from "../../src/app/models/User";
import { serverTest } from "../jest.setup";

describe("authentication-user-permission", () => {
  it("should return an error for not adding an authorization header", async () => {
    const { body, statusCode } = await serverTest.post("/users/permissions");

    expect(body).toEqual({ error: "Voçê não esta altenticado.!" });
    expect(statusCode).toBe(401);
  });

  it("should return an error by adding an invalid type", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", "test");

    expect(body).toEqual({ error: "Tipo de token invalido!" });
    expect(statusCode).toBe(401);
  });

  it("should return an error by sending an invalid token", async () => {
    const type = process.env.TYPE_AUTHORIZATION;

    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${type} sxaxa4211.2xs`);

    expect(body).toEqual({ error: "Não autorizado" });
    expect(statusCode).toBe(401);
  });

  it("should return an error by sending an invalid token", async () => {
    const type = process.env.TYPE_AUTHORIZATION;
    const token_from_an_unregistered_user = createJwt({
      email: "test33@gmail.com",
      id: "1234",
      jobs: "test",
      name: "test",
    });

    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${type} ${token_from_an_unregistered_user}`);

    expect(body).toEqual({ error: "Não autorizado" });
    expect(statusCode).toBe(401);
  });

  it("should return an error by sending an invalid token", async () => {
    await User.create({
      email: "test33@gmail.com",
      name: "test",
      typeGroup: "atendimento",
    });
    const type = process.env.TYPE_AUTHORIZATION;
    const token = createJwt({
      email: "test33@gmail.com",
      id: "1234",
      jobs: "test",
      name: "test",
    });

    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${type} ${token}`);

    expect(body).toEqual({ error: "Não autorizado" });
    expect(statusCode).toBe(401);
  });
});
