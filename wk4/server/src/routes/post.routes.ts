import express from "express";

import { createPost } from "../controllers/posts/createPost.controller";

import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/create-post", verifyToken, createPost);

export default router;
