/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../../src/app/models/User";
import { MongoCreateUserPermissionRepository } from "../../../src/app/repositories/user-permissions/create-user-permissions/create-user-permissions";

describe("create-user-permission", () => {
  it("should create a user", async () => {
    const repository = new MongoCreateUserPermissionRepository();

    const user = await repository.create({
      email: "test40@gmail.com",
      name: "test10",
      typeGroup: "ADM",
    });

    expect(user).toBeTruthy();
  });

  it("should not create a user", async () => {
    try {
      const repository = new MongoCreateUserPermissionRepository();

      jest.spyOn(User, "create").mockReturnValue(null as any);

      const user = await repository.create({
        email: "test40@gmail.com",
        name: "test10",
        typeGroup: "ADM",
      });

      expect(user).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();
      expect((error as Error).message).toEqual(
        "Não foi possivel criar o usuário"
      );
    }
  });
});
