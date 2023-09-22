/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserMongoDTO } from "../../interfaceDTO/user";
import { IGetAllUserPermissions } from "../../repositories/user-permissions/getAll-user-permission/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

class GetAllUserPermissionController implements IController {
  constructor(private readonly getAlluserPermission: IGetAllUserPermissions) {}

  async handle(_req: ApiRequest<any>): Promise<ApiResponse<UserMongoDTO[]>> {
    const users = await this.getAlluserPermission.get();

    return {
      body: users,
      statusCode: 200,
    };
  }
}

export { GetAllUserPermissionController };
