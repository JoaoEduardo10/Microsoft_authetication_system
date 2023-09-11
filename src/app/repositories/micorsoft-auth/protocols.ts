import { UserDTO } from "../../interfaceDTO/user";

export interface IAddUserAuthRepository {
  add(user: UserDTO): Promise<void>;
}
