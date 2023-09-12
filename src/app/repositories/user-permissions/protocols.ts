import { UserMongoDTO } from "../../interfaceDTO/user";

export type ICreateUserPemissionDTO = Omit<UserMongoDTO, "id">;

export interface ICreateUserPemissionRepository {
  create(params: ICreateUserPemissionDTO): Promise<UserMongoDTO>;
}
