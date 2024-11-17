import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true
    },
    targetUrl: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    urls: {
        type: [urlSchema],
        default: []
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
