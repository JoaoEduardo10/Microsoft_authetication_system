/* eslint-disable @typescript-eslint/ban-types */
import { IDeleteUserPermissions } from "../../repositories/user-permissions/delete-user-permissions/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

class DeleteUserPermissionController implements IController {
  constructor(
    private readonly deleteUserPermissionRepository: IDeleteUserPermissions
  ) {}

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<{}>> {
    const userId = req.params.userId as string;

    await this.deleteUserPermissionRepository.delete(userId);

    return {
      body: {},
      statusCode: 204,
    };
  }
}

export { DeleteUserPermissionController };
