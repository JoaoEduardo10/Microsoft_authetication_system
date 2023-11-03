/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { microsoftRouter } from "./endpoints/microsoft";
import { userRouter } from "./endpoints/user";

const router = Router();

router.use("/", microsoftRouter);
router.use("/", userRouter);

export { router };
