import "express-async-errors";
import express from "express";
import { router } from "./router";
import { config } from "dotenv";
import { configurePassport } from "../config/passport-microsoft-";
import passport from "passport";
import session from "express-session";
import { globalsErrors } from "./middlewares/globals-errors";
import path from "path";
import cors from "cors";

const app = express();
config();
configurePassport();

app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));

app.use(cors());

app.use(express.json());

app.use(
  session({
    resave: false,
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
    name: "Microsoft-auth",
  })
);
app.use(passport.initialize());
app.use(passport.session());

const VERSION = process.env.VERSION || "/v0";

app.use(VERSION, router);

app.use(globalsErrors);

export { app };
