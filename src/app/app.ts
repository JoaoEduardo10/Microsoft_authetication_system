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
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/v1", router);

app.use(globalsErrors);

export { app };
