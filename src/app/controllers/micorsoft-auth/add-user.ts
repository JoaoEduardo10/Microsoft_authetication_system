/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddUserAuthRepository } from "../../repositories/micorsoft-auth/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

class AddUserAuthController implements IController {
  constructor(private readonly addUserAuthrepository: IAddUserAuthRepository) {}

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<string>> {
    const { user } = req;

    this.addUserAuthrepository.add({
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

export { AddUserAuthController };
