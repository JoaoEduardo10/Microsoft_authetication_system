/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ijwt, IjwtComplete } from "../../helpers/jsonwebtoken";
import { IUserTokenValidationrepository } from "../../repositories/user/user-token-validantion/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

export class UserTokenValidationController implements IController {
  constructor(
    private readonly userTokenValidationRepository: IUserTokenValidationrepository
  ) {}

  async handle(
    req: ApiRequest<{ token: Ijwt & IjwtComplete }>
  ): Promise<ApiResponse<any>> {
    const email = req.headers.email! as string;
    const token = req.body!.token;

    const user = await this.userTokenValidationRepository.get(email);

    return {
      body: { token, ...user },
      statusCode: 200,
    };
  }
}
