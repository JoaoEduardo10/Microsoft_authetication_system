/* eslint-disable @typescript-eslint/no-unused-vars */
import { createJwt } from "../helpers/jsonwebtoken";
import { ApiRequest, ApiResponse, IController } from "./protocols";

class MicrosoftAuthController implements IController {
  private name: string;
  private email: string;
  private id: string;
  private jobs: string;

  constructor() {
    this.email = "";
    this.id = "";
    this.jobs = "";
    this.name = "";
  }

  async handle(req: ApiRequest<unknown>): Promise<ApiResponse<string>> {
    const { user } = req;

    this.email = user._json.mail;
    this.id = user._json.id;
    this.jobs = user.jobTitle;
    this.name = user.name.givenName;

    const token = createJwt({
      email: this.email,
      id: this.id,
      name: this.name,
      jobs: this.jobs,
    });

    return {
      body: token,
      statusCode: 200,
    };
  }
}

export { MicrosoftAuthController };
