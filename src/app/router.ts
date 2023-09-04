/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import passport from "passport";
import { MicrosoftAuthController } from "./controllers/microsoft-auth";
import { error } from "console";

const router = Router();

router.get("/users", (req, res) => {
  res.send("ok");
});

router.get(
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

router.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/login",
    successRedirect: "/v1/auth/microsoft/users",
  })
);

router.get("/auth/microsoft/users", async (req, res) => {
  const controller = new MicrosoftAuthController();

  const { body, statusCode } = await controller.handle(req);

  res.status(statusCode).json({ token: body });
});

router.get("/logout", (req, res) => {
  req.logout(error);
  res.redirect("/");
});

export { router };
