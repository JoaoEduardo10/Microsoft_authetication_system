import { CacheLocal, CacheDTO } from "../../src/database/cache";

describe("CacheLocal", () => {
  it("should create a user in cache memory", () => {
    const memoryCache = new CacheLocal();

    const key = JSON.stringify({
      id: "1234",
      name: "test",
      email: "test@gmail.com",
      jobTitle: "programador",
    });

    const user: CacheDTO = {
      key,
      valueId: "1234",
    };

    memoryCache.connect();

    const response = memoryCache.set(JSON.stringify(user), "1234");

    expect(response).toBe("ok");
  });

  it("should get all user in cache memory", () => {
    const memoryCache = new CacheLocal();

    const key = JSON.stringify({
      id: "1234",
      name: "test",
      email: "test@gmail.com",
      jobTitle: "programador",
    });

    const user: CacheDTO = {
      key,
      valueId: "1234",
    };

    memoryCache.connect();

    memoryCache.set(JSON.stringify(user), "1234");

    const response = memoryCache.findMany();

    expect(response.length).toBe(1);
  });

  it("should not catch all users for not being logged in", () => {
    const memoryCache = new CacheLocal();

    const response = memoryCache.findMany();

    expect(response).toBe("falha");
  });

  it("should return an error by tries to add a user already adding to memory", () => {
    const memoryCache = new CacheLocal();

    const key = JSON.stringify({
      id: "1234",
      name: "test",
      email: "test@gmail.com",
      jobTitle: "programador",
    });

    const user: CacheDTO = {
      key,
      valueId: "1234",
    };

    memoryCache.connect();

    memoryCache.set(JSON.stringify(user), "1234");

    const response = memoryCache.set(JSON.stringify(user), "1234");

    expect(response).toBe("falha");
  });

  it("should not create a user in the cache memory by this disconnected", () => {
    const memoryCache = new CacheLocal();

    const key = JSON.stringify({
      id: "1234",
      name: "test",
      email: "test@gmail.com",
      jobTitle: "programador",
    });

    const user: CacheDTO = {
      key,
      valueId: "1234",
    };

    const response = memoryCache.set(JSON.stringify(user), "1234");

    expect(response).toBe("falha");
  });

  it("should create a user in cache memory", () => {
    const memoryCache = new CacheLocal();

    const keyOne = JSON.stringify({
      id: "1234",
      name: "test",
      email: "test@gmail.com",
      jobTitle: "programador",
    });

    const userOne: CacheDTO = {
      key: keyOne,
      valueId: "1234",
    };

    const keyTwo = JSON.stringify({
      id: "12345",
      name: "test",
      email: "test@gmail.com",
      jobTitle: "programador",
    });

    const userTwo: CacheDTO = {
      key: keyTwo,
      valueId: "12345",
    };

    memoryCache.connect();

    memoryCache.set(JSON.stringify(userOne), "1234");
    memoryCache.set(JSON.stringify(userTwo), "12345");

    const getKeyOne = memoryCache.get("1234");
    const getKeytwo = memoryCache.get("12345");

    const new_getKeyOne = JSON.parse(getKeyOne) as CacheDTO;

    expect(new_getKeyOne.valueId).toBe("1234");

    const new_getKeyTwo = JSON.parse(getKeytwo) as CacheDTO;

    expect(new_getKeyTwo.valueId).toBe("12345");
  });

  it("should create a user in cache memory", () => {
    const memoryCache = new CacheLocal();

    memoryCache.connect();

    const response = memoryCache.get("1234");

    expect(response).toBe("falha");
  });

  it("should return an error by testing a user searches the Memorya cache without this connected", () => {
    const memoryCache = new CacheLocal();

    const response = memoryCache.get("1234");

    expect(response).toBe("falha");
  });
});
