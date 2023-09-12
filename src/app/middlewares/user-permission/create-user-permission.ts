/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from "express";
import { UserMongoDTO } from "../../interfaceDTO/user";
import { Bad_Request } from "../../errors/api-errors";
import { User } from "../../models/User";

export class CreateUserPermissionMiddleware {
  async middleware(
    req: Request<{}, {}, Omit<UserMongoDTO, "id">>,
    res: Response,
    next: NextFunction
  ) {
    const { email, name, typeGroup } = req.body;

    if (!email) {
      throw new Bad_Request("adicione o email");
    }

    if (!name) {
      throw new Bad_Request("adicione o nome");
    }

    if (!typeGroup) {
      throw new Bad_Request("adicione o tipo do grupo");
    }

    const allowedTypes = [
      "ADM",
      "tecnico",
      "atendimento",
      "vendas_ativo",
      "vendas_passivo",
      "estoque",
      "financeiro",
    ];

    if (!allowedTypes.includes(typeGroup)) {
      throw new Bad_Request("tipo de grupo invalido");
    }

    const user = await User.findOne({ email });

    if (user) {
      if (user.typeGroup === "atendimento") {
        throw new Bad_Request("Já existe alguem com essa permição");
      }

      if (user.typeGroup === "estoque") {
        throw new Bad_Request("Já existe alguem com essa permição");
      }

      if (user.typeGroup === "financeiro") {
        throw new Bad_Request("Já existe alguem com essa permição");
      }

      if (user.typeGroup === "tecnico") {
        throw new Bad_Request("Já existe alguem com essa permição");
      }

      if (user.email === email && user.typeGroup == typeGroup) {
        throw new Bad_Request("este usuário já tem essa permição");
      }
    }

    next();
  }
}
