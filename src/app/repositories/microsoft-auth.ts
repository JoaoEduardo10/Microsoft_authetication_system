import { Redis } from "../../services/redis";
import { UserDTO } from "../interfaceDTO/user";
import { IMicrosoftAuthrepository } from "./protocols";

class RedisMicrosoftAuthRepository implements IMicrosoftAuthrepository {
  private redis: Redis;

  constructor() {
    this.redis = new Redis();
  }

  async set(user: UserDTO): Promise<void> {
    const { email, id, jobTitle, name } = user;

    await this.redis.set(
      {
        email,
        id,
        jobTitle,
        name,
      },
      id
    );
  }
}

export { RedisMicrosoftAuthRepository };
