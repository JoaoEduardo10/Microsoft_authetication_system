/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { microsoftRouter } from "./Router/microsoft";
import { userRouter } from "./Router/user.";
import { userPermissionsRouter } from "./Router/user-permission";

const router = Router();

router.use("/", microsoftRouter);
router.use("/", userRouter);
router.use("/", userPermissionsRouter);

export { router };
