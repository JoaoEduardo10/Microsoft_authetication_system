/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { microsoftRouter } from "./router/microsoft";

const router = Router();

router.use("/", microsoftRouter);

export { router };
