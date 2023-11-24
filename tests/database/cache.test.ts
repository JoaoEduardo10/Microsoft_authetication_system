import { describe, expect, it } from "vitest";
import { CacheLocal } from "../../src/database/cache";

describe("cache", () => {
  it("should add user in memory cache ", () => {
    const cache = new CacheLocal();

    cache.connect();

    const isUser = cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    expect(isUser).toBe("ok");
  });

  it("should not add a user for not connecting", () => {
    const cache = new CacheLocal();

    const isUser = cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    expect(isUser).toBe("falha");
  });

  it("should not add a user for the sake of adding them twice", () => {
    const cache = new CacheLocal();

    cache.connect();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUser = cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    expect(isUser).toBe("falha");
  });

  it("should get a user in memory cache", () => {
    const cache = new CacheLocal();

    cache.connect();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUser = JSON.parse(cache.get("1234"));

    expect(isUser).toBeTruthy();

    const user = JSON.parse(isUser.key);

    expect(user.id).toBeTruthy();
  });

  it("should return an error for not being connected", () => {
    const cache = new CacheLocal();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUser = cache.get("1234");

    expect(isUser).toBe("falha");
  });

  it("should return an error for adding an invalid ID ", () => {
    const cache = new CacheLocal();

    cache.connect();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUser = cache.get("12345");

    expect(isUser).toBe("falha");
  });

  it("should return all users of the cache memory", () => {
    const cache = new CacheLocal();

    cache.connect();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "12345",
        jobs: "programador",
      }),
      valueId: "12345",
    });

    const allUser = cache.findMany();

    expect(allUser.length).toBe(2);
  });

  it("should not return all users from the cache because it is not connected", () => {
    const cache = new CacheLocal();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "12345",
        jobs: "programador",
      }),
      valueId: "12345",
    });

    const allUser = cache.findMany();

    expect(allUser).toBe("falha");
  });

  it("should delete the user successfully because they are not logged in", () => {
    const cache = new CacheLocal();

    cache.connect();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUserDeleted = cache.delete("1234");

    expect(isUserDeleted).toBe("ok");
  });

  it("should not delete the user successfully because it does not exist in the memory cache", () => {
    const cache = new CacheLocal();

    cache.connect();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUserDeleted = cache.delete("12345");

    expect(isUserDeleted).toBe("falha");
  });

  it("should not delete the user successfully because they are not logged in", () => {
    const cache = new CacheLocal();

    cache.set({
      key: JSON.stringify({
        name: "test",
        id: "1234",
        jobs: "programador",
      }),
      valueId: "1234",
    });

    const isUserDeleted = cache.delete("1234");

    expect(isUserDeleted).toBe("falha");
  });
});
