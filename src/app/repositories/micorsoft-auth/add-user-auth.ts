import { cache } from "../../../database/cache";
import { UserDTO } from "../../interfaceDTO/user";
import { IAddUserAuthRepository } from "./protocols";

class CacheLocalAddUserAuthRepository implements IAddUserAuthRepository {
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async add(user: UserDTO): Promise<void> {
    this.cache.set(JSON.stringify(user), user.id);
  }
}

export { CacheLocalAddUserAuthRepository };
