import express from "express";

import { createPost } from "../controllers/posts/createPost.controller";
import { getPostsByUserId } from "../controllers/posts/getPostsByUserId.controller";
import { getPosts } from "../controllers/posts/getPosts.controller";

import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/get-posts", verifyToken, getPosts);
router.get("/get-posts-by-user-id", verifyToken, getPostsByUserId);

export default router;
