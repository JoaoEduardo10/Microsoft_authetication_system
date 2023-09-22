import { MongoDeleteUserRepository } from "../../../src/app/repositories/user-permissions/delete-user-permissions/delete-user-permissions";
import { User } from "../../../src/app/models/User";

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

  it("shoul delete a user", async () => {
    const repository = new MongoDeleteUserRepository();

    await repository.delete(user.id);

    const userId = await User.findById(user.id);

    expect(userId).not.toBeTruthy();
  });
});
