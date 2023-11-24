import { UserDTO } from "../../../interfaceDTO/user";

export type IGetUserResponse = {
  key: UserDTO;
  valueId: string;
};

export interface IGetUserRepository {
  get(params: { id: string }): Promise<IGetUserResponse>;
}
