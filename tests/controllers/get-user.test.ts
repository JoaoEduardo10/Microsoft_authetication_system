import { describe, expect, it } from "vitest";
import { ApiRequest } from "../../src/app/controllers/protocols";
import { GetUserController } from "../../src/app/controllers/user/get-user";
import {
  IGetUserRepository,
  IGetUserResponse,
} from "../../src/app/repositories/user/get-user/protocols";

class MockGetUserRepository implements IGetUserRepository {
  private users: IGetUserResponse[];

  constructor() {
    this.users = [
      {
        key: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          jobTitle: "Software Engineer",
        },
        valueId: "1",
      },
      {
        key: {
          id: "2",
          name: "Jane Doe",
          email: "jane@example.com",
          jobTitle: "Product Manager",
        },
        valueId: "2",
      },
    ];
  }

  private get_user_for_id({ id }: { id: string }) {
    const user = this.users.find((user) => user.valueId == id);

    if (!user) {
      throw new Error("Não existe esse usuário");
    }

    return user;
  }

  async get(params: { id: string }): Promise<IGetUserResponse> {
    const { id } = params;

    const user = this.get_user_for_id({ id });

    return user;
  }
}

const req: ApiRequest<unknown> = {
  params: {
    id: "1",
  },
};

const req_two: ApiRequest<unknown> = {};

describe("get-user", () => {
  it("should get user for id", async () => {
    const repository = new MockGetUserRepository();

    const controller = new GetUserController(repository);

    const { body, statusCode } = await controller.handle(req);

    expect(body.id).toBeTruthy();
    expect(statusCode).toBe(200);
  });

  it("should not get user for id", async () => {
    const repository = new MockGetUserRepository();

    const controller = new GetUserController(repository);

    try {
      const { body } = await controller.handle(req_two);

      expect(body.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        "Não foi possvel carrage o usuário"
      );
    }
  });
});
