import { cache } from "../../../database/cache";
import { UserDTO } from "../../interfaceDTO/user";
import { ICreateMicrosoftAuthrepository } from "./protocols";

class RedisSetMicrosoftAuthRepository
  implements ICreateMicrosoftAuthrepository
{
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async create(user: UserDTO): Promise<void> {
    this.cache.set(JSON.stringify(user), user.id);
  }
}

export { RedisSetMicrosoftAuthRepository };
