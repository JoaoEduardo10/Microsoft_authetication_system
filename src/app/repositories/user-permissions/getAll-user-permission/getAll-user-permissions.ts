import { UserMongoDTO } from "../../../interfaceDTO/user";
import { User } from "../../../models/User";
import { IGetAllUserPermissions } from "./protocols";

class MongoGetAllUserPermission implements IGetAllUserPermissions {
  private user: typeof User;

  constructor() {
    this.user = User;
  }

  async get(): Promise<UserMongoDTO[]> {
    const users = await this.user.find();

    return users.map(({ _id, name, email, typeGroup }) => ({
      id: _id.toHexString(),
      name,
      email,
      typeGroup,
    }));
  }
}

export { MongoGetAllUserPermission };
