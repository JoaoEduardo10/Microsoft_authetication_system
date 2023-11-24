import { beforeEach, describe, expect, it, vi } from "vitest";
import { CacheLocalGetUserRepository } from "../../src/app/repositories/user/get-user/get-user";
import { cache } from "../../src/database/cache";

describe("get-user", () => {
  beforeEach(() => {
    cache.connect();
  });

  it("should get a user with id", async () => {
    const repository = new CacheLocalGetUserRepository();

    const mock_user = {
      key: JSON.stringify({
        email: "test@interativabr.com.br",
        id: "1234",
        jobTitle: "programador",
        name: "test",
      }),
      valueId: "1234",
    };

    vi.spyOn(cache, "get").mockReturnValue(JSON.stringify(mock_user));

    const user = await repository.get({ id: "1234" });

    expect(user.key.id).toBeTruthy();
  });

  it("should not get a user with id", async () => {
    const repository = new CacheLocalGetUserRepository();

    vi.spyOn(cache, "get").mockReturnValue("falha");

    try {
      const user = await repository.get({ id: "1234" });

      expect(user.key.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        "Não foi possivel buscar o usuário"
      );
    }
  });
});
