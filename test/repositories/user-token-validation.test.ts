import { User } from "../../src/app/models/User";
import { UserTokenValidationRepositor } from "../../src/app/repositories/user/user-token-validantion/user-token-validation";

describe("user-token-validation", () => {
  const user = {
    email: "",
  };

  beforeEach(async () => {
    const new_user = await User.create({
      email: "test@gmail.com",
      name: "test",
      typeGroup: "ADM",
    });

    user.email = new_user.email;
  });

  it("should return a user", async () => {
    const mongoUserTokenValidationrepository =
      new UserTokenValidationRepositor();

    const get_user = await mongoUserTokenValidationrepository.get(user.email);

    expect(get_user.email).toBe(user.email);
  });

  it("should not return a user", async () => {
    try {
      const mongoUserTokenValidationrepository =
        new UserTokenValidationRepositor();

      const get_user = await mongoUserTokenValidationrepository.get("test");

      expect(get_user.email).not.toBe(user.email);
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toEqual("Não autorizado!");
    }
  });
});
