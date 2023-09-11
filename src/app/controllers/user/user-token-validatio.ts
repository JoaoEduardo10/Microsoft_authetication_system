/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareJwt } from "../../helpers/jsonwebtoken";
import { ITokenValidationrepository } from "../../repositories/user/user-token-validantion/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

export class TokenValidationController implements IController {
  constructor(
    private readonly tokenValidationRepository: ITokenValidationrepository
  ) {}

  async handle(req: ApiRequest<{ token: string }>): Promise<ApiResponse<any>> {
    const { token } = req.body!;

    const isToken = compareJwt(token);
    const user = await this.tokenValidationRepository.get(isToken.email);

    return {
      body: { ...isToken, typeGroup: user.grupo },
      statusCode: 200,
    };
  }
}
