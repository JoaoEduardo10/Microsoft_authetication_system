import { createJwt } from "../../../src/app/helpers/jsonwebtoken";
import { User } from "../../../src/app/models/User";
import { serverTest } from "../../jest.setup";

describe("delete-user-permission", () => {
  const user = {
    token: "",
    type: "",
    id: "",
  };

  user.type = process.env.TYPE_AUTHORIZATION || "";
  user.token = createJwt({
    email: "test@gmail.com",
    id: "1234",
    jobs: "TI",
    name: "test",
  });

  beforeEach(async () => {
    const mongoUser = await User.create({
      email: "test10@gmail.com",
      name: "test10",
      typeGroup: "atendimento",
    });

    await User.create({
      email: "test@gmail.com",
      typeGroup: "ADM",
      name: "test",
    });

    user.id = mongoUser._id.toHexString();
  });

  it("should delete a user", async () => {
    const { statusCode } = await serverTest
      .delete(`/delete/users/permission/${user.id}`)
      .set("authorization", `${user.type} ${user.token}`);

    expect(statusCode).toBe(204);

    const userId = await User.findById(user.id);

    expect(userId).not.toBeTruthy();
  });
});
