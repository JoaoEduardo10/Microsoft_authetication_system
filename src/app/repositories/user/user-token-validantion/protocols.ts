import { UserMysqlDTO } from "../../../interfaceDTO/user";

export interface ITokenValidationrepository {
  get(email: string): Promise<UserMysqlDTO>;
}
