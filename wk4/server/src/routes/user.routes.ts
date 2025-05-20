import express from "express";

import { register } from "../controllers/users/register.controller";
import { login } from "../controllers/users/login.controller";
import { getUserInfo } from "../controllers/users/getUserInfo.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user-info/:id", getUserInfo);

export default router;
