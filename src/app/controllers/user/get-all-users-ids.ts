/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetAllUserIdsRepository } from "../../repositories/user/get-all-users-id/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

export class GetAllUserIdsController implements IController {
  constructor(
    private readonly getAllUserIdsRepository: IGetAllUserIdsRepository
  ) {}

  async handle(_req: ApiRequest<unknown>): Promise<ApiResponse<string[]>> {
    const users = await this.getAllUserIdsRepository.get();

    return {
      body: users,
      statusCode: 200,
    };
  }
}
