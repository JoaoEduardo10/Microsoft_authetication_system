import { Router } from "express";
import passport from "passport";
import { MicrosoftAuthRouter } from "../usecase/set-microsoft-auth";
import { MicrosoftAuthMiddleware } from "../middlewares/microsoft-auth";
import { CacheMiddleware } from "../middlewares/cache";

const microsoftRouter = Router();

microsoftRouter.get(
  "/auth/microsoft",
  passport.authenticate("microsoft", {
    // Optionally define any authentication parameters here
    // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
    scope: [
      "APIConnectors.Read.All",
      "APIConnectors.ReadWrite.All",
      "openid",
      "User.Read",
    ],
    prompt: "select_account",
  })
);

microsoftRouter.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/v1/auth/microsoft/failure",
    successRedirect: "/v1/auth/microsoft/users",
  })
);

const microsoftAuthRouter = new MicrosoftAuthRouter();
const microsoftAuthMiddleware = new MicrosoftAuthMiddleware();
const cacheMiddleware = new CacheMiddleware();

microsoftRouter.get(
  "/auth/microsoft/users",
  microsoftAuthMiddleware.middleware,
  cacheMiddleware.middleware,
  microsoftAuthRouter.logged
);

microsoftRouter.get("auth/microsoft/failure", (_req, res) => {
  return res.sendStatus(401);
});

microsoftRouter.get("/logout", (req, res) => {
  req.logout((message) => console.log(message));

  const url_redirect = process.env.URL_REDIRECT_LOGOUT || "/";

  res.redirect(url_redirect);
});

export { microsoftRouter };
