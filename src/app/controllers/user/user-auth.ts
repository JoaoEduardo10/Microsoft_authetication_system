import { createJwt } from "../../helpers/jsonwebtoken";
import { IGetUserRepository } from "../../repositories/user/get-user/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

class GetUserAuthController implements IController {
  constructor(private readonly getUserAuthRepository: IGetUserRepository) {}

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<string>> {
    const id = req.params.id as string;

    const {
      key: { email, id: valueId, jobTitle, name },
    } = await this.getUserAuthRepository.get({ id });

    const token = createJwt({
      email,
      id: valueId,
      jobs: jobTitle,
      name,
    });

    return {
      body: token,
      statusCode: 200,
    };
  }
}

export { GetUserAuthController };
