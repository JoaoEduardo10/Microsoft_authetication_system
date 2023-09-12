import { UserMongoDTO } from "../../interfaceDTO/user";
import { ICreateUserPemissionRepository } from "../../repositories/user-permissions/protocols";
import { ApiRequest, ApiResponse, IController } from "../protocols";

export class CreateUserPermissionController implements IController {
  constructor(
    private readonly createUserPermissionRepository: ICreateUserPemissionRepository
  ) {}

  async handle(
    req: ApiRequest<Omit<UserMongoDTO, "id">>
  ): Promise<ApiResponse<UserMongoDTO>> {
    const { email, name, typeGroup } = req.body!;

    const user = await this.createUserPermissionRepository.create({
      email,
      name,
      typeGroup,
    });

    return {
      body: user,
      statusCode: 201,
    };
  }
}
