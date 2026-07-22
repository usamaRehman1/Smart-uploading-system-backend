import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Image from "../models/image.model.js";

export const uploadImage = async (req, res) => {

    try {

        const image = await Image.create({

            localPath: req.file.path,

            status: "pending"

        });

        try {

            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            fs.unlinkSync(req.file.path);

            image.cloudinaryUrl = result.secure_url;

            image.publicId = result.public_id;

            image.status = "uploaded";

            image.localPath = "";

            await image.save();

        } catch (err) {

            console.log(
                "Cloudinary Upload Failed"
            );

        }

        res.json({

            success: true,

            image

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};