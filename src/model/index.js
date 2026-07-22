import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalName: String,
    localPath: String,
    cloudinaryUrl: String,
    status: {
        type: String,
        default: "pending"
    }

}, { timestamps: true });

export const UploadModel = mongoose.model("File", fileSchema);