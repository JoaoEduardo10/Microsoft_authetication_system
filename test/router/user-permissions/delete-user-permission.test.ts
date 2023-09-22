import { User } from "../../../src/app/models/User";
import { serverTest } from "../../jest.setup";

describe("delete-user-permission", () => {
  const user = {
    id: "",
  };

  beforeEach(async () => {
    const mongoUser = await User.create({
      email: "test10@gmail.com",
      name: "test10",
      typeGroup: "atendimento",
    });

    user.id = mongoUser._id.toHexString();
  });

  it("should delete a user", async () => {
    const { statusCode } = await serverTest.delete(
      `/delete/users/permission/${user.id}`
    );

    expect(statusCode).toBe(204);

    const userId = await User.findById(user.id);

    expect(userId).not.toBeTruthy();
  });
});
