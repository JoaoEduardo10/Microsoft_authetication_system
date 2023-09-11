import { UserDTO } from "../../../interfaceDTO/user";

export interface ICreateMicrosoftAuthrepository {
  create(user: UserDTO): Promise<void>;
}
