import { beforeEach, describe, expect, it, vi } from "vitest";
import { serverTest } from "../setup";
import { cache } from "../../src/database/cache";
import { compareJwt } from "../../src/app/helpers/jsonwebtoken";

describe("get-token", () => {
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
  });

  it("should return token ", async () => {
    const { body, statusCode } = await serverTest.get(`/token/1234`);

    expect(statusCode).toBe(200);

    const token = compareJwt(body.token);

    expect(token?.id).toBeTruthy();
  });
});
