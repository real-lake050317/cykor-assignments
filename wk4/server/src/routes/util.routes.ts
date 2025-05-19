import express from "express";

import { checkLogin } from "../controllers/utils/checkLogin.controller";

import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.get("/check-login", verifyToken, checkLogin);

export default router;
