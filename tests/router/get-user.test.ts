import { beforeEach, describe, expect, it, vi } from "vitest";
import { cache } from "../../src/database/cache";
import { serverTest } from "../setup";
import { createJwt } from "../../src/app/helpers/jsonwebtoken";

describe("get-user", () => {
  const user = {
    token: "",
  };

  beforeEach(async () => {
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

    user.token = createJwt({
      email: "test@interativabr.com.br",
      id: "1234",
      jobs: "programador",
      name: "test",
    });
  });

  it("should return user", async () => {
    const { body, statusCode } = await serverTest
      .get("/users/1234")
      .set("Authorization", `${process.env.TYPE_AUTHORIZATION} ${user.token}`);

    expect(statusCode).toBe(200);
    expect(body.user.id).toBe("1234");
  });
});
