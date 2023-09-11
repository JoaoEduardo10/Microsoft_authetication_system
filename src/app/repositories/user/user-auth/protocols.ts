import { UserDTO } from "../../../interfaceDTO/user";

export type IGetUserAuthResponse = {
  key: UserDTO;
  valueId: string;
};

export interface IGetUserAuthRepositoty {
  get(params: { id: string }): Promise<IGetUserAuthResponse>;
}
