import { UploadModel } from "../model/index.js";
import { uploadQueue } from "../queue/queue.js"

const uploadFileController = async (req, res) => {

    const file = await UploadModel.create({
        originalName: req.file.originalname,
        localPath: req.file.path
    });

    await uploadQueue.add("uploadJob", {
        id: file._id,
        path: req.file.path
    });

    res.json({
        message: "Added to Queue"
    });
};

export default uploadFileController