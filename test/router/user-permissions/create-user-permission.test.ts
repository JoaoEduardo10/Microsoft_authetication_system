import { serverTest } from "../../jest.setup";

describe("create-user-permission", () => {
  it("should create a user", async () => {
    const { body, statusCode } = await serverTest
      .post("/users/permissions")
      .send({
        email: "test1@gmail.com",
        name: "test",
        typeGroup: "atendimento",
      });

    expect(body.user.id).toBeTruthy();
    expect(statusCode).toBe(201);
  });
});
