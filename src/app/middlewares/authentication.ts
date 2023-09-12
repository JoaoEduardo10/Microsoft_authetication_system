import { RequestHandler } from "express";
import { Unauthorezid } from "../errors/api-errors";
import { compareJwt } from "../helpers/jsonwebtoken";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authorization = req.headers.authorization as string;

  if (!authorization) {
    throw new Unauthorezid("Voçê não esta altenticado.!");
  }

  const [type, token] = authorization.split(" ");

  if (type != "Interativabr") {
    throw new Unauthorezid("Tipo de token invalido!");
  }

  compareJwt(token);

  req.headers.token = token as string;

  next();
};
