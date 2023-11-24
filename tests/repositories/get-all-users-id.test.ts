import { beforeEach, describe, expect, it, vi } from "vitest";
import { CacheLocalGetAllUserIdsRepository } from "../../src/app/repositories/user/get-all-users-id/get-users-id";
import { cache } from "../../src/database/cache";

describe("get-users-id", () => {
  beforeEach(() => {
    cache.connect();
  });

  it("should return the ID of all users", async () => {
    const repository = new CacheLocalGetAllUserIdsRepository();

    vi.spyOn(cache, "findMany").mockReturnValue([
      {
        key: "test",
        valueId: "1234",
      },
      {
        key: "test2",
        valueId: "12342",
      },
      {
        key: "test3",
        valueId: "12343",
      },
    ]);

    const ids = await repository.get();

    expect(ids.length).toBe(3);
  });

  it("should not return the ID of all users", async () => {
    const repository = new CacheLocalGetAllUserIdsRepository();

    vi.spyOn(cache, "findMany").mockReturnValue("falha");

    try {
      const ids = await repository.get();

      expect(ids).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe("falha no banco");
    }
  });
});
