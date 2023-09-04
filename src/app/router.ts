import { Router } from "express";
import passport from "passport";

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
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/v1/auth/microsoft/users");
  }
);

router.get("/auth/microsoft/users", (req, res) => {
  res.send(req.user);
});

export { router };
