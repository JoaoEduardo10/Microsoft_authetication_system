import { createJwt } from "../../../src/app/helpers/jsonwebtoken";
import { User } from "../../../src/app/models/User";
import { serverTest } from "../../jest.setup";

describe("create-user-permission", () => {
  const user = {
    token: "",
    type: "",
  };

  beforeEach(async () => {
    await User.create({
      email: "test@gmail.com",
      typeGroup: "ADM",
      name: "test",
    });
  });

  user.type = process.env.TYPE_AUTHORIZATION || "";
  user.token = createJwt({
    email: "test@gmail.com",
    id: "1234",
    jobs: "TI",
    name: "test",
  });

  it("should create a user", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .set("authorization", `${user.type} ${user.token}`)
      .send({
        email: "test1@gmail.com",
        name: "test",
        typeGroup: "atendimento",
      });

    expect(body.user.id).toBeTruthy();
    expect(statusCode).toBe(201);
  });
});
