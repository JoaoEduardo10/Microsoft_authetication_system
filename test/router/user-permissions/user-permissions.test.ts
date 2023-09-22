import { createJwt } from "../../../src/app/helpers/jsonwebtoken";
import { User } from "../../../src/app/models/User";
import { serverTest } from "../../jest.setup";

describe("user-permissions", () => {
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
      typeGroup: "ADM",
    });

    await User.create({
      email: "test@gmail.com",
      name: "test",
      typeGroup: "ADM",
    });
  });

  it("should return all users", async () => {
    const { body, statusCode } = await serverTest
      .get("/all/users/permissions")
      .set("authorization", `${user.type} ${user.token}`);

    expect(statusCode).toBe(200);
    expect(body.users.length).toBe(2);
  });
});
