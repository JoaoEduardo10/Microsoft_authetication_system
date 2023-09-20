/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequest } from "../../src/app/controllers/protocols";
import { UserTokenValidationController } from "../../src/app/controllers/user/user-token-validatio";
import { compareJwt, createJwt } from "../../src/app/helpers/jsonwebtoken";
import { UserMongoDTO } from "../../src/app/interfaceDTO/user";
import { User } from "../../src/app/models/User";
import { IUserTokenValidationrepository } from "../../src/app/repositories/user/user-token-validantion/protocols";

class MockUserTokenValidationrepository
  implements IUserTokenValidationrepository
{
  private users: UserMongoDTO[];

  constructor() {
    this.users = [];
  }

  set({ email, id, name, typeGroup }: UserMongoDTO) {
    const user = {
      id,
      email,
      name,
      typeGroup,
    };

    this.users.push(user);
  }

  async get(email: string): Promise<UserMongoDTO> {
    const user = this.users.find((user) => user.email == email);

    if (!user) {
      throw new Error("doidera");
    }

    return user;
  }
}

describe("user-toekn-validation", () => {
  const mockUserTokenValidationrepository =
    new MockUserTokenValidationrepository();

  const user: UserMongoDTO = {
    id: "",
    email: "",
    name: "",
    typeGroup: "ADM",
  };

  let actual_token = {};

  beforeEach(async () => {
    const new_user = await User.create({
      email: "test@gmail.com",
      name: "test",
      typeGroup: "ADM",
    });

    user.email = new_user.email;
    user.id = new_user._id.toHexString();
    user.name = new_user.name;
    user.typeGroup = new_user.typeGroup;

    const token = createJwt({
      jobs: user.typeGroup,
      email: "test@gmail.com",
      id: user.id,
      name: user.name,
    });

    const new_token = compareJwt(token)!;

    actual_token = new_token;
  });

  const mockReq: ApiRequest<any> = {
    headers: {
      email: "test@gmail.com",
    },
    body: {
      token: actual_token,
    },
  };

  it("should returns a database user with the status code", async () => {
    mockUserTokenValidationrepository.set({
      email: user.email,
      id: user.id,
      name: user.name,
      typeGroup: user.typeGroup,
    });

    const userTokenValidationController = new UserTokenValidationController(
      mockUserTokenValidationrepository
    );

    const { body, statusCode } = await userTokenValidationController.handle(
      mockReq
    );

    expect(body.typeGroup).toBe(user.typeGroup);

    expect(statusCode).toBe(200);
  });
});
