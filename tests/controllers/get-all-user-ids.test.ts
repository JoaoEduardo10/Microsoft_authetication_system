import { describe, expect, it } from "vitest";
import { ApiRequest } from "../../src/app/controllers/protocols";
import { IGetAllUserIdsRepository } from "../../src/app/repositories/user/get-all-users-id/protocols";
import { GetAllUserIdsController } from "../../src/app/controllers/user/get-all-users-ids";

class MockGetUserIdsRepository implements IGetAllUserIdsRepository {
  private users: string[];

  constructor() {
    this.users = ["1", "2"];
  }

  async get(): Promise<string[]> {
    return this.users;
  }
}

const req: ApiRequest<unknown> = {};

describe("get-all-user-ids", () => {
  it("should return all user IDs", async () => {
    const repository = new MockGetUserIdsRepository();

    const controller = new GetAllUserIdsController(repository);

    const { body, statusCode } = await controller.handle(req);

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
