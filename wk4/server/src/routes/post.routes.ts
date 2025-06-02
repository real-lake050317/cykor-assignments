import express from "express";

import { createPost } from "../controllers/posts/createPost.controller";
import { getPostsByUserId } from "../controllers/posts/getPostsByUserId.controller";
import { getPosts } from "../controllers/posts/getPosts.controller";
import { deletePost } from "../controllers/posts/deletePost.controller";
import { updatePost } from "../controllers/posts/updatePost.controller";

import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/get-posts", verifyToken, getPosts);
router.get("/get-posts-by-user-id", verifyToken, getPostsByUserId);
router.delete("/delete-post/:id", verifyToken, deletePost);
router.put("/update-post/:postId", verifyToken, updatePost);

export default router;
