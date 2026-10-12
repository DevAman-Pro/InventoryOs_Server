import mongoose, { model, Schema } from "mongoose";
import { boolean, lowercase, string, trim } from "zod";
import { required } from "zod/mini";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: string,
            enum: ["owner", "manager", "cashier"],
            default: "cashier"
        },
        isActive: {
            type: boolean,
            default: true,
        },

    },
    { timestamps: true }
)

export const User = model("User",userSchema);