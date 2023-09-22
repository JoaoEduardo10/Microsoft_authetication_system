import { User } from "../../../src/app/models/User";
import { serverTest } from "../../jest.setup";

describe("user-permissions", () => {
  beforeEach(async () => {
    await User.create({
      email: "test1@gmail.com",
      name: "test1",
      typeGroup: "ADM",
    });

    await User.create({
      email: "test2@gmail.com",
      name: "test2",
      typeGroup: "ADM",
    });
  });

  it("should return all users", async () => {
    const { body, statusCode } = await serverTest.get("/all/users/permissions");

    expect(statusCode).toBe(200);
    expect(body.users.length).toBe(2);
  });
});
