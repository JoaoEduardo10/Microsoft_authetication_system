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

  return jwt.sign(data, jwtHash);
};

export const compareJwt = (
  token: string
): (Ijwt & IjwtComplete) | undefined => {
  const jwtHash = process.env.HASH_JWT as string;

  try {
    const varifyToken = jwt.verify(token, jwtHash);

    return varifyToken as Ijwt & IjwtComplete;
  } catch (error) {
    if (error) return undefined;
  }
};
