import { createJwt } from "../../../src/app/helpers/jsonwebtoken";
import { User } from "../../../src/app/models/User";
import { serverTest } from "../../jest.setup";

describe("create-user-permission", () => {
  const user = {
    token: "",
    type: "",
  };

  user.type = process.env.TYPE_AUTHORIZATION || "";
  user.token = createJwt({
    email: "test@gmail.com",
    id: "1234",
    jobs: "TI",
    name: "test",
  });

  beforeEach(async () => {
    await User.create({
      email: "test1@gmail.com",
      name: "test1",
      typeGroup: "atendimento",
    });

    await User.create({
      email: "test@gmail.com",
      typeGroup: "ADM",
      name: "test",
    });
  });

  it("should retona an error po does not adding the email to the body", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${user.type} ${user.token}`);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "adicione o email" });
  });

  it("should retona an error po does not adding the name to the body", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${user.type} ${user.token}`)
      .send({
        email: "test1@gmail.com",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "adicione o nome" });
  });

  it("should retona an error po does not adding the name to the body", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${user.type} ${user.token}`)
      .send({
        email: "test1@gmail.com",
        name: "test",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "adicione o tipo do grupo" });
  });

  it("this should return an error for not adding an invalid typeGroup to the body", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${user.type} ${user.token}`)
      .send({
        email: "test1@gmail.com",
        name: "test",
        typeGroup: "testgroup",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "tipo de grupo invalido" });
  });

  it("should return an error by by creating a permission to a user who already has it", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${user.type} ${user.token}`)
      .send({
        email: "test1@gmail.com",
        name: "test",
        typeGroup: "atendimento",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "este usuário já tem uma permição" });
  });
});
