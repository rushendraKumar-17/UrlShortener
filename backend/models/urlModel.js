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
    visitHistory: [{ timestamp: { type: Number } }]
}, {
    timestamps: true
});

const urlModel = mongoose.model("url", urlSchema);
export default urlModel;