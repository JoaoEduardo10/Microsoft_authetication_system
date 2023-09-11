import { UserMysqlDTO } from "../../../interfaceDTO/user";

export interface IUserTokenValidationrepository {
  get(email: string): Promise<UserMysqlDTO>;
}
