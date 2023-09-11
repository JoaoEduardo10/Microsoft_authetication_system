/* eslint-disable @typescript-eslint/no-explicit-any */
import { connection } from "../../../../database/mysql";
import { Internal_Server_Error } from "../../../errors/api-errors";
import { UserMysqlDTO } from "../../../interfaceDTO/user";
import { IUserTokenValidationrepository } from "./protocols";

export class UserTokenValidationRepositor
  implements IUserTokenValidationrepository
{
  async get(email: string): Promise<UserMysqlDTO> {
    const [queryResponse] = (await (
      await connection
    ).execute(
      `SELECT usuarios.id, usuarios.id_grupo ,usuarios.email , usuarios_grupo.grupo
            FROM usuarios
            INNER JOIN usuarios_grupo ON usuarios.id_grupo = usuarios_grupo.id
            WHERE usuarios.email = '${email}';`
    )) as any;

    const user: UserMysqlDTO | undefined = queryResponse[0];

    if (!user) {
      throw new Internal_Server_Error("Não autorizado!");
    }

    return user;
  }
}
