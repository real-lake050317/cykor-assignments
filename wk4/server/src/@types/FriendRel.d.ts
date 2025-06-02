import { Document } from "mongoose";

export interface FriendRel extends Document {
    userId: string;
    friendId: string;
    status: "pending" | "accepted" | "rejected" | "blocked";
    isBlocked: boolean;
    isFriend: boolean;
    createdAt: Date;
    updatedAt: Date;
}
