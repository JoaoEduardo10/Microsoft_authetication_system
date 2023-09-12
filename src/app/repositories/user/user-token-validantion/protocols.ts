import { UserMongoDTO } from "../../../interfaceDTO/user";

export interface IUserTokenValidationrepository {
  get(email: string): Promise<UserMongoDTO>;
}
