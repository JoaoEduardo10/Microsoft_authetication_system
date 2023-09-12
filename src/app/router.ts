/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { microsoftRouter } from "./Router/microsoft";
import { userRouter } from "./Router/user.";
import { userPermissionsRouter } from "./Router/user-permissions";

const router = Router();

router.use("/", microsoftRouter);
router.use("/", userRouter);
router.use("/", userPermissionsRouter);

export { router };
