import { beforeEach, describe, expect, it, vi } from "vitest";
import { serverTest } from "../setup";
import { cache } from "../../src/database/cache";

describe("get-all-user-ids", () => {
  beforeEach(() => {
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
  });

  it("should return all ids", async () => {
    const { body, statusCode } = await serverTest.get("/users");

    expect(statusCode).toBe(200);
    expect(body.ids.length).toBe(3);
  });
});
