/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareJwt } from "../../helpers/jsonwebtoken";
import { IUserTokenValidationrepository } from "../../repositories/user/user-token-validantion/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

export class UserTokenValidationController implements IController {
  constructor(
    private readonly userTokenValidationRepository: IUserTokenValidationrepository
  ) {}

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<any>> {
    const token = req.headers.token as string;

    const isToken = compareJwt(token);
    const user = await this.userTokenValidationRepository.get(isToken.email);

    return {
      body: { ...isToken, typeGroup: user.typeGroup },
      statusCode: 200,
    };
  }
}
