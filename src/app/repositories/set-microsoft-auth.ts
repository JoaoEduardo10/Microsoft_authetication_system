import { cache } from "../../database/cache";
import { UserDTO } from "../interfaceDTO/user";
import { IMicrosoftAuthrepository } from "./protocols";

class RedisMicrosoftAuthRepository implements IMicrosoftAuthrepository {
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async set(user: UserDTO): Promise<void> {
    this.cache.set(JSON.stringify(user), user.id);
  }
}

export { RedisMicrosoftAuthRepository };
