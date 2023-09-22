/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDeleteUserPermissions } from "../../../src/app/repositories/user-permissions/delete-user-permissions/protocols";
import { DeleteUserPermissionController } from "../../../src/app/controllers/user-permissions/delete-user-permission";
import { ApiRequest } from "../../../src/app/controllers/protocols";
import { UserMongoDTO } from "../../../src/app/interfaceDTO/user";

class MockDeleteUserRepository implements IDeleteUserPermissions {
  private users: UserMongoDTO[];

  constructor() {
    this.users = [
      {
        email: "test1@gmail.com",
        id: "12345",
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

  async delete(id: string): Promise<void> {
    const user = this.users.find((user) => user.id == id);

    if (!user) {
      throw new Error("id invalido");
    }
  }
}

const mockReq: ApiRequest<any> = {
  params: {
    userId: "12345",
  },
};

describe("delete-user-permisssion", () => {
  it("should delete a user", async () => {
    const repository = new MockDeleteUserRepository();
    const controller = new DeleteUserPermissionController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(body).toEqual({});
    expect(statusCode).toBe(204);
  });
});
