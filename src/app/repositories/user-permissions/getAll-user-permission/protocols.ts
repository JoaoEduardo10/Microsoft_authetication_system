import { UserMongoDTO } from "../../../interfaceDTO/user";

export interface IGetAllUserPermissions {
  get(): Promise<UserMongoDTO[]>;
}
