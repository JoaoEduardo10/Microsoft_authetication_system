import { cache } from "../../../database/cache";
import { Internal_Server_Error } from "../../errors/api-errors";
import { IGetUserIdsRepository } from "./protocols";

export class CacheLocalGetUserIdsRepository implements IGetUserIdsRepository {
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async get(): Promise<string[]> {
    const users = this.cache.findMany();

    if (users == "falha") {
      throw new Internal_Server_Error("falha no banco");
    }

    return users.map(({ valueId }) => {
      return valueId;
    });
  }
}
