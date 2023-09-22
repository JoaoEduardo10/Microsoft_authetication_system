import { User } from "../../../src/app/models/User";
import { MongoGetAllUserPermission } from "../../../src/app/repositories/user-permissions/getAll-user-permission/getAll-user-permissions";

describe("get-user-permission", () => {
  beforeEach(async () => {
    await User.create({
      email: "test1@gmail.com",
      name: "test1",
      typeGroup: "atendimento",
    });

    await User.create({
      email: "test1@gmail.com",
      name: "test2",
      typeGroup: "ADM",
    });
  });

  it("should get all users", async () => {
    const repository = new MongoGetAllUserPermission();

    const users = await repository.get();

    expect(users.length).toBe(2);
  });
});
