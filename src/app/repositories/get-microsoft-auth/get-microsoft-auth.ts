import { cache } from "../../../database/cache";
import { formtJsonParse } from "../../helpers/fomatJsonParse";
import {
  IGetMicrosoftAuthRepositoty,
  IGetMicrosoftAuthResponse,
} from "./protocols";

class CacheLocalGetMicrosoftAuthrepository
  implements IGetMicrosoftAuthRepositoty
{
  private cache: typeof cache;

  constructor() {
    this.cache = cache;
  }

  async get(params: { id: string }): Promise<IGetMicrosoftAuthResponse> {
    const { id } = params;

    const getUser = this.cache.get(id);

    const user = formtJsonParse(getUser);

    return user;
  }
}

export { CacheLocalGetMicrosoftAuthrepository };
