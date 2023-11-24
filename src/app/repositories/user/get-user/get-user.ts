import { cache } from "../../../../database/cache";
import { Internal_Server_Error } from "../../../errors/api-errors";
import { formtJsonParse } from "../../../helpers/fomatJsonParse";
import { IGetUserRepository, IGetUserResponse } from "./protocols";

class CacheLocalGetUserRepository implements IGetUserRepository {
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async get(params: { id: string }): Promise<IGetUserResponse> {
    const { id } = params;

    const getUser = this.cache.get(id);

    if (getUser == "falha") {
      throw new Internal_Server_Error("Não foi possivel buscar o usuário");
    }

    const user = formtJsonParse(getUser);

    return user;
  }
}

export { CacheLocalGetUserRepository };
