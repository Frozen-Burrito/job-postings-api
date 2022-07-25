import { Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "The user must provide a valid e-mail address."],
        unique: true,
        lowercase: true,
    },

    username: {
        type: String,
        maxLength: 24,
        required: [true, "The user must provide a valid e-mail address."],
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        minLength: 12,
        maxLength: 64,
        required: [true, "The user must provide a password"]
    },

    role: {
        type: Number,
        min: 0, 
        max: 2,
        default: 0,
    },

    lastLogin: {
        type: Date,
        default: null,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default UserSchema;