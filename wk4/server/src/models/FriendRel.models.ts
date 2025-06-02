import mongoose from "mongoose";

import { FriendRel } from "../@types/FriendRel";

const { Schema } = mongoose;

const FriendRelSchema: mongoose.Schema<FriendRel> = new Schema<FriendRel>(
  {
    userId: { type: String, required: true },
    friendId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "blocked"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isBlocked: { type: Boolean, default: false },
    isFriend: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const FriendRelModel: mongoose.Model<FriendRel> =
  mongoose.model<FriendRel>("FriendRel", FriendRelSchema, "FriendRel");
