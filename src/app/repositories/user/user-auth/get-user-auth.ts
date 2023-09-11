import { cache } from "../../../../database/cache";
import { formtJsonParse } from "../../../helpers/fomatJsonParse";
import { IGetUserAuthRepositoty, IGetUserAuthResponse } from "./protocols";

class CacheLocalGetUserAuthRepository implements IGetUserAuthRepositoty {
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async get(params: { id: string }): Promise<IGetUserAuthResponse> {
    const { id } = params;

    const getUser = this.cache.get(id);

    const user = formtJsonParse(getUser);

    return user;
  }
}

export { CacheLocalGetUserAuthRepository };
