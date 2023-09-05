import { UserDTO } from "../../interfaceDTO/user";

export type IGetMicrosoftAuthResponse = {
  key: UserDTO;
  valueId: string;
};

export interface IGetMicrosoftAuthRepositoty {
  get(params: { id: string }): Promise<IGetMicrosoftAuthResponse>;
}
