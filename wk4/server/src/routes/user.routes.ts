import express from "express";

import { register } from "../controllers/users/register.controller";
import { login } from "../controllers/users/login.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
