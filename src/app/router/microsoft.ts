import { Router } from "express";
import passport from "passport";
import { MicrosoftAuthController } from "../controllers/microsoft-auth";

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
    failureRedirect: "/login",
    successRedirect: "/v1/auth/microsoft/users",
  })
);

microsoftRouter.get("/auth/microsoft/users", async (req, res) => {
  const controller = new MicrosoftAuthController();

  const { body, statusCode } = await controller.handle(req);

  res.status(statusCode).json({ token: body });
});

microsoftRouter.get("/logout", (req, res) => {
  req.logout((error) => console.log(error));
  res.redirect("/");
});

export { microsoftRouter };
