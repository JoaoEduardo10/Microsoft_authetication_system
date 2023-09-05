import { UserDTO } from "../../interfaceDTO/user";

export interface IMicrosoftAuthrepository {
  set(user: UserDTO): Promise<void>;
}
