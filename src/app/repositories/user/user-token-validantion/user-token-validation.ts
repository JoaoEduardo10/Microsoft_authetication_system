/* eslint-disable @typescript-eslint/no-explicit-any */
import { Internal_Server_Error } from "../../../errors/api-errors";
import { UserMongoDTO } from "../../../interfaceDTO/user";
import { User } from "../../../models/User";
import { IUserTokenValidationrepository } from "./protocols";

export class UserTokenValidationRepositor
  implements IUserTokenValidationrepository
{
  private User: typeof User;

  constructor() {
    this.User = User;
  }

  async get(email: string): Promise<UserMongoDTO> {
    const user = await this.User.findOne({ email });

    if (!user) {
      throw new Internal_Server_Error("Não autorizado!");
    }

    const { _id, name, typeGroup, email: userEmail } = user;

    return { id: _id.toHexString(), name, typeGroup, email: userEmail };
  }
}
