import jwt from "jsonwebtoken";

export interface Ijwt {
  email: string;
  name: string;
  id: string | number;
  jobs: string;
}

export interface IjwtComplete {
  iat: number;
  exp: number;
}

export const createJwt = (data: Ijwt) => {
  const jwtHash = process.env.HASH_JWT as string;

  return jwt.sign(data, jwtHash, { expiresIn: "3h" });
};

export const compareJwt = (token: string): Ijwt & IjwtComplete => {
  const jwtHash = process.env.HASH_JWT as string;

  const varifyToken = jwt.verify(token, jwtHash);

  if (typeof varifyToken === "string") {
    throw new Error("Token invalido");
  }

  return varifyToken as Ijwt & IjwtComplete;
};
