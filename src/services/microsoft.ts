/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy } from "passport-microsoft";

class MicrosoftAuthentication {
  private passport: typeof passport;
  private MicrosoftStrategy: typeof Strategy;

  constructor() {
    this.passport = passport;
    this.MicrosoftStrategy = Strategy;
  }

  connectAuth() {
    this.passport.use(
      new this.MicrosoftStrategy(
        {
          clientID: process.env.CLIENT_ID || "",
          clientSecret: process.env.CLIENT_SECRET || "",
          callbackURL: process.env.CALLBACK_URL || "",
          tenant: process.env.TENANT_ID || "",
        },
        (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
          return done(null, profile);
        }
      )
    );

    this.passport.serializeUser(function (user, done) {
      done(null, user);
    });

    this.passport.deserializeUser(function (obj: any, done) {
      done(null, obj);
    });
  }
}

export { MicrosoftAuthentication };
