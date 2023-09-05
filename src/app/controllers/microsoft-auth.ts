/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMicrosoftAuthrepository } from "../repositories/set-microsoft-auth/protocols";
import { ApiRequest, ApiResponse, IController } from "./protocols";

class MicrosoftAuthController implements IController {
  constructor(
    private readonly microsoftaAuthrepository: IMicrosoftAuthrepository
  ) {}

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<string>> {
    const { user } = req;

    this.microsoftaAuthrepository.set({
      email: user._json.mail,
      id: user._json.id,
      jobTitle: user.jobTitle,
      name: user.name.givenName,
    });

    return {
      body: user._json.id,
      statusCode: 308,
    };
  }
}

export { MicrosoftAuthController };
