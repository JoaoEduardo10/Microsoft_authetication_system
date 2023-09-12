/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { microsoftRouter } from "./router/microsoft";
import { userRouter } from "./router/user.";
import { userPermissionsRouter } from "./router/user-permissions";

const router = Router();

router.use("/", microsoftRouter);
router.use("/", userRouter);
router.use("/", userPermissionsRouter);

export { router };
