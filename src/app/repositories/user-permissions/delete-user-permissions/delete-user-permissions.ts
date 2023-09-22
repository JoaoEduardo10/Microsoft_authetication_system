import { User } from "../../../models/User";
import { IDeleteUserPermissions } from "./protocols";

class MongoDeleteUserRepository implements IDeleteUserPermissions {
  private user: typeof User;

  constructor() {
    this.user = User;
  }

  async delete(id: string): Promise<void> {
    await this.user.findByIdAndDelete(id);
  }
}

export { MongoDeleteUserRepository };
