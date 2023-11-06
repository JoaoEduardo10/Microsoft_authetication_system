/* eslint-disable @typescript-eslint/no-explicit-any */
import { Internal_Server_Error } from "../../errors/api-errors";
import { UserDTO } from "../../interfaceDTO/user";
import { IGetUserAuthRepositoty } from "../../repositories/user/user-auth/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

class GetUserController implements IController {
  constructor(private readonly getUserAuthRepository: IGetUserAuthRepositoty) {}

  async handle(req: ApiRequest<any>): Promise<ApiResponse<UserDTO>> {
    if (!req.params) {
      throw new Internal_Server_Error("Não foi possvel carrage o usuário");
    }

    const { id } = req.params;

    const user = await this.getUserAuthRepository.get({ id });

    return {
      body: user.key,
      statusCode: 200,
    };
  }
}

export { GetUserController };
