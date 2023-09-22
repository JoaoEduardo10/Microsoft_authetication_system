import { UserMongoDTO } from "../../../src/app/interfaceDTO/user";
import {
  ICreateUserPemissionDTO,
  ICreateUserPemissionRepository,
} from "../../../src/app/repositories/user-permissions/create-user-permissions/protocols";
import { v4 as uuid } from "uuid";
import { ApiRequest } from "../../../src/app/controllers/protocols";
import { CreateUserPermissionController } from "../../../src/app/controllers/user-permissions/create-user-permission";

class MockCreateUserPermissionRepository
  implements ICreateUserPemissionRepository
{
  private users: UserMongoDTO[];

  constructor() {
    this.users = [];
  }

  async create(params: ICreateUserPemissionDTO): Promise<UserMongoDTO> {
    const { email, name, typeGroup } = params;

    this.users.push({ email, id: uuid(), name, typeGroup });

    const user = this.users.find((user) => user.email == email);

    if (!user) {
      throw new Error("não foi possivel criar o usuários");
    }

    return user;
  }
}

const mockReq: ApiRequest<ICreateUserPemissionDTO> = {
  body: {
    email: "test2@gmail.com",
    name: "test2",
    typeGroup: "financeiro",
  },
};

describe("create-user-permission", () => {
  it("should create a user with status code 201", async () => {
    const repositry = new MockCreateUserPermissionRepository();
    const controller = new CreateUserPermissionController(repositry);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(body.id).toBeTruthy();
    expect(statusCode).toBe(201);
  });
});
