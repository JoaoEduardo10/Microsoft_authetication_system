import { NextFunction, Request, Response } from "express";
import { cache } from "../../database/cache";

class CacheMiddleware {
  middleware(req: Request, res: Response, next: NextFunction) {
    const { _json } = req.user as { _json: { id: string } };

    const id = _json.id;

    const user = cache.get(id);

    if (user !== "falha") {
      const redirect_url = process.env.URL_REDIRECT_SUCESS || "";
      return res.redirect(`${redirect_url}${id}`);
    }

    next();
  }
}

export { CacheMiddleware };
