import { UserMongoDTO } from "../../../interfaceDTO/user";
import { User } from "../../../models/User";
import {
  ICreateUserPemissionDTO,
  ICreateUserPemissionRepository,
} from "./protocols";

export class MongoCreateUserPermissionRepository
  implements ICreateUserPemissionRepository
{
  private User: typeof User;

  constructor() {
    this.User = User;
  }

  async create(params: ICreateUserPemissionDTO): Promise<UserMongoDTO> {
    const user = await this.User.create(params);

    if (!user) {
      throw new Error("Não foi possivel criar o usuário");
    }

    const { _id, name, email, typeGroup } = user;

    return { id: _id.toHexString(), name, email, typeGroup };
  }
}
