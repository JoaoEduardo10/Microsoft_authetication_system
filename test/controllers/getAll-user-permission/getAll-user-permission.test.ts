import { UserMongoDTO } from "../../../src/app/interfaceDTO/user";
import { IGetAllUserPermissions } from "../.././../src/app/repositories/user-permissions/getAll-user-permission/protocols";
import { GetAllUserPermissionController } from "../../../src/app/controllers/user-permissions/getAll-user-permission";

class MockGetAllUserRepository implements IGetAllUserPermissions {
  private users: UserMongoDTO[];

  constructor() {
    this.users = [
      {
        email: "test1@gmail.com",
        id: "1234",
        name: "test1",
        typeGroup: "ADM",
      },
      {
        email: "test2@gmail.com",
        id: "1234",
        name: "test2",
        typeGroup: "financeiro",
      },
    ];
  }

  async get(): Promise<UserMongoDTO[]> {
    return this.users;
  }
}

const mockReq = {
  body: {},
};

describe("getAll-user-permission", () => {
  it("should return users with code status 200", async () => {
    const repository = new MockGetAllUserRepository();
    const controller = new GetAllUserPermissionController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
