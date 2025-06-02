import express from "express";

import { register } from "../controllers/users/register.controller";
import { login } from "../controllers/users/login.controller";
import { getUserInfo } from "../controllers/users/getUserInfo.controller";
import { sendFriendRequest } from "../controllers/users/sendFriendRequest.controller";
import { acceptFriendRequest } from "../controllers/users/acceptFriendRequest.controller";
import { getFriendsList } from "../controllers/users/getFriendsList.controller";
import { getFriendInvitations } from "../controllers/users/getFriendInvitations.controller";
import { rejectFriendRequest } from "../controllers/users/rejectFriendRequest.controller";
import { removeFriend } from "../controllers/users/removeFriend.controller";
import { getFriendRelation } from "../controllers/users/getFriendRelation.controller";

import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/get-user-info/:id", getUserInfo);

router.get("/friends/send-friend-request", verifyToken, sendFriendRequest);
router.post("/friends/accept-friend-request", verifyToken, acceptFriendRequest);
router.get("/friends/get-friends-list", getFriendsList);
router.get("/friends/get-friend-invitations", verifyToken, getFriendInvitations);
router.post("/friends/reject-friend-request", verifyToken, rejectFriendRequest);
router.delete("/friends/remove-friend", verifyToken, removeFriend);
router.get("/friends/get-friend-relation", verifyToken, getFriendRelation);

export default router;
