/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { Unauthorezid } from "../errors/api-errors";
import { Ijwt, IjwtComplete, compareJwt } from "../helpers/jsonwebtoken";

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

  try {
    const token = compareJwt(token_auth);

    if (token == undefined) {
      throw new Unauthorezid("Não autorizado");
    }

    req.headers.email = token.email as string;
    req.body.token = token as Ijwt & IjwtComplete;

    next();
  } catch (error: any) {
    throw new Unauthorezid(error.message);
  }
};
