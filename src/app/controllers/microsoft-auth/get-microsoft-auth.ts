import { createJwt } from "../../helpers/jsonwebtoken";
import { IGetMicrosoftAuthRepositoty } from "../../repositories/micorsoft-auth/get-microsoft-auth/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

class GetMicrosoftAuthController implements IController {
  constructor(
    private readonly getMicrosoftAuthRepository: IGetMicrosoftAuthRepositoty
  ) {}

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<string>> {
    const id = req.params.id as string;

    const {
      key: { email, id: valueId, jobTitle, name },
    } = await this.getMicrosoftAuthRepository.get({ id });

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

export { GetMicrosoftAuthController };
