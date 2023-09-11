/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetUserIdsRepository } from "../../repositories/user/get-users-id/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

export class GetUserIdsController implements IController {
  constructor(private readonly getUserIdsRepository: IGetUserIdsRepository) {}

  async handle(_req: ApiRequest<unknown>): Promise<ApiResponse<string[]>> {
    const users = await this.getUserIdsRepository.get();

    return {
      body: users,
      statusCode: 200,
    };
  }
}
