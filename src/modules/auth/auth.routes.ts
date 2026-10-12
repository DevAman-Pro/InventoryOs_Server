
import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validateBody } from "../../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

export default router;
