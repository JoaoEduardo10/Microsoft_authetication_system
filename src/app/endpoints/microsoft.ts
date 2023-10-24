/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import passport from "passport";
import { AddUserAuthRouter } from "../usecase/microsoft-auth/add-user-auth";
import { MicrosoftAuthMiddleware } from "../middlewares/microsoft-auth/microsoft-auth";
import { CacheMiddleware } from "../middlewares/cache";
import { cache } from "../../database/cache";
import "dotenv/config";

const microsoftRouter = Router();

const VERSION = process.env.VERSION || "/v0";

microsoftRouter.get(
  "/auth/microsoft",
  passport.authenticate("microsoft", {
    // Optionally define any authentication parameters here
    // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
    scope: [
      "User.Read",
      "APIConnectors.Read.All",
      "APIConnectors.ReadWrite.All",
      "openid",
    ],

    prompt: "select_account",
  })
);

microsoftRouter.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: `${VERSION}/auth/microsoft/failure`,
    successRedirect: `${VERSION}/auth/microsoft/users`,
    scope: ["User.Read"],
  })
);

const addUserAuthRouter = new AddUserAuthRouter();
const addUserAuthMiddleware = new MicrosoftAuthMiddleware();
const cacheMiddleware = new CacheMiddleware();

microsoftRouter.get(
  "/auth/microsoft/users",
  addUserAuthMiddleware.middleware,
  cacheMiddleware.middleware,
  addUserAuthRouter.logged
);

microsoftRouter.get("auth/microsoft/failure", (_req, res) => {
  return res.sendStatus(401);
});

microsoftRouter.get("/logout/:id", (req, res) => {
  req.logout((message: any) => console.log(message));
  const { id } = req.params;
  cache.delete(id);

  const url_redirect = process.env.URL_REDIRECT_LOGOUT || "/";

  res.redirect(url_redirect);
});

export { microsoftRouter };
