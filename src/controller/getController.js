import { UploadModel } from "../model/index.js";

const getuploadFileController = async (req, res) => {
	try {
 		const { id } = req.params;

 		if (id) {
 			const file = await UploadModel.findById(id);
 			if (!file) return res.status(404).json({ message: "File not found" });

 			return res.json({
 				id: file._id,
 				originalName: file.originalName,
 				localPath: file.localPath,
 				cloudinaryUrl: file.cloudinaryUrl,
 				status: file.status,
 				createdAt: file.createdAt,
 				updatedAt: file.updatedAt,
 			});
 		}

 		const files = await UploadModel.find().sort({ createdAt: -1 });

 		return res.json(
 			files.map((file) => ({
 				id: file._id,
 				originalName: file.originalName,
 				localPath: file.localPath,
 				cloudinaryUrl: file.cloudinaryUrl,
 				status: file.status,
 				createdAt: file.createdAt,
 				updatedAt: file.updatedAt,
 			}))
 		);
 	} catch (err) {
 		res.status(500).json({ message: "Server error", error: err.message });
 	}
};

export default getuploadFileController;

