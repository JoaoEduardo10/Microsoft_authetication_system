/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { Unauthorezid } from "../errors/api-errors";
import { compareJwt } from "../helpers/jsonwebtoken";
import { User } from "../models/User";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authorization = req.headers.authorization as string;

  if (!authorization) {
    throw new Unauthorezid("Voçê não esta altenticado.!");
  }

  const [type, token_auth] = authorization.split(" ");

  const authorization_type = process.env.TYPE_AUTHORIZATION;

  if (type != authorization_type) {
    throw new Unauthorezid("Tipo de token invalido!");
  }

  const token = compareJwt(token_auth);

  if (token == undefined) {
    throw new Unauthorezid("Não autorizado");
  }

  const user = await User.findOne({ email: token.email });

  if (!user) {
    throw new Unauthorezid("Não autorizado");
  }

  if (user.typeGroup !== "ADM") {
    throw new Unauthorezid("Não autorizado");
  }

  next();
};
