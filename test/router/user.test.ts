import { createJwt } from "../../src/app/helpers/jsonwebtoken";
import { User } from "../../src/app/models/User";
import { serverTest } from "../jest.setup";

describe("user", () => {
  const user = {
    id: "",
    email: "",
    name: "",
    jobs: "",
  };

  const data = {
    token: "",
  };

  beforeEach(async () => {
    const new_user = await User.create({
      email: "test@gmail.com",
      name: "test",
      typeGroup: "ADM",
    });

    user.email = new_user.email;
    user.id = new_user._id.toHexString();
    user.jobs = new_user.typeGroup;

    const token = createJwt(user);

    data.token = token;
  });

  it("should validate the user's token", async () => {
    const { body, statusCode } = await serverTest
      .post("/user/token/validation")
      .set("Authorization", `${process.env.TYPE_AUTHORIZATION} ${data.token}`);

    expect(statusCode).toBe(200);
    expect(body.user).toBeTruthy();
  });
});
