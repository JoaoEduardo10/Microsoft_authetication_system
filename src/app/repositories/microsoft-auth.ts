import { cache } from "../../database/cache";
import { UserDTO } from "../interfaceDTO/user";
import { IMicrosoftAuthrepository } from "./protocols";

class RedisMicrosoftAuthRepository implements IMicrosoftAuthrepository {
  private redis: typeof cache;

  constructor() {
    this.redis = cache;
  }

  async set(user: UserDTO): Promise<void> {
    await this.redis.set(JSON.stringify(user), user.id);
  }
}

export { RedisMicrosoftAuthRepository };
