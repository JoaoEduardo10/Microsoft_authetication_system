import { redisClient } from "../config/redis";
import { UserDTO } from "../app/interfaceDTO/user";

class Redis {
  private redisClient: typeof redisClient;

  constructor() {
    this.redisClient = redisClient;
  }

  async get(valueId: string) {
    const users = (await this.redisClient.get(valueId)) as string;

    return JSON.parse(users) as UserDTO;
  }

  async set(key: UserDTO, valueId: string) {
    await this.redisClient.set(JSON.stringify(key), valueId);
  }
}

export { Redis };
